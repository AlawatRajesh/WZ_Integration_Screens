<template>
  <div id="app" class="Zoho-container">
    <!-- <router-link to="/steps" style="float: right;">Go to Steps</router-link> -->
    <!-- <router-view/> -->
  <div> 
      <Filters 
        :branches="branches" 
        :workshops="workshops" 
        :customers="customers"
        :selectedBranchId="selectedBranchId" 
        :selectedWorkshopId="Number(selectedWorkshopId)"
        :searchQuery="searchQuery" 
        :dateFilter="dateFilter"
        @update:selectedBranchId="updateSelectedBranchId"
        @update:selectedWorkshopId="updateSelectedWorkshopId"
        @update:searchQuery="updateSearchQuery"
        @update:dateFilter="updateDateFilter" />
    </div>
    <div v-if="selectedWorkshopId">
      <h3 class="hello mb-3">Failed Invoice Details for {{ getWorkshopName(selectedWorkshopId) }}</h3>
    </div>
    <div v-if="selectedWorkshopId && customers.length > 0">
      <table-component :customers="pagedCustomers" c @view-customer="onViewCustomer" @sync-customer="onSyncCustomer" />
      <pagination 
        :total-items="customerCount" 
        :items-per-page="itemsPerPage" 
        :current-page="customerCurrentPage" 
        @page-changed="onCustomerPageChanged" />
    </div>
    <modal-component v-if="showModal" 
    :customer="selectedCustomer" 
    :receipts="receipts" 
    :receipt="receiptNumber"
    @close="closeModal" 
    @click-outside="handleOutsideClick" />
  </div> 
  
</template> 
<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Filters from './Filters.vue';
import TableComponent from './Table.vue';
import ModalComponent from './Modal.vue';
import Pagination from './Pagination.vue';
import router from '../router';
import Steps from './Steps.vue';


export default {

   name: "App",
  components: {
    TableComponent,
    ModalComponent,
    Pagination,
    Filters,
    Steps,
    
  },
  setup() {
    const branches = ref([
      { id: 1, name: 'Branch A' },
      { id: 2, name: 'Branch B' },
      { id: 3, name: 'Branch C' },
      { id: 4, name: 'Branch D' }
    ]);
    const workshops = ref([]);
    const customers = ref([]);
    const selectedBranchId = ref("");
    const selectedWorkshopId = ref('');
    const searchQuery = ref('');
    const dateFilter = ref('all');
    const selectedCustomer = ref(null);
    const showModal = ref(false);
    const itemsPerPage = ref(10);
    const customerCurrentPage = ref(1);
    const router = useRouter();
    const receipts = ref([]);
    const referenceNumber = ref([]); 
    const fetchWorkshops = async () => {
      if (!selectedBranchId.value) {
         
        workshops.value = [];
        return;
      }
      try {
        const token = import.meta.env.VITE_API_BEARER_TOKEN;
        if (!token) {
          console.error('No token found in .env file');
          return;
        }
        const response = await axios.get(import.meta.env.VITE_APP_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          
        });
        const apiData = response.data.data;
        if (apiData) {
          workshops.value = apiData.map(workshop => ({
            id: workshop.workshopId,
            name: workshop.name,
          }));
        } 
        
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };
    
    const fetchCustomers = async () => {
      if (!selectedWorkshopId.value) {
        customers.value = [];
        customerCount.value = 0;
        return;
      }
      try {
        const token = import.meta.env.VITE_API_BEARER_TOKEN;
        if (!token) {
          console.error('No token found in .env file');
          return;
        }
        const response = await axios.get(import.meta.env.VITE_APP_API_CUSTOMER, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            workshopId: selectedWorkshopId.value,  
          },
        });
        const customerCount = ref(0);
        const apiData = response.data.data;
        customers.value = apiData.map((customer, index) => ({
          id: index + 1,
          sequenceNumber: customer.sequenceNumber,
          createdAt: customer.createdAt,
          refNumber: customer.ref_numbers,
          workshopId: selectedWorkshopId.value,
        }));
        customerCount.value = customers.value.length;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    watch(selectedWorkshopId, (newWorkshopId) => {
      if (newWorkshopId) {
        fetchCustomers();
      }
    });
    onMounted(() => {
      fetchWorkshops();
    });
    const updateSelectedBranchId = (newBranchId) => {
      selectedBranchId.value = newBranchId;
      selectedWorkshopId.value = ''; 
      fetchWorkshops(); 
    };
    const updateSelectedWorkshopId = (newWorkshopId) => {
      selectedWorkshopId.value = newWorkshopId; 
    };
    const updateSearchQuery = (newSearchQuery) => {
      searchQuery.value = newSearchQuery;
    };
    const updateDateFilter = (newDateFilter) => {
      dateFilter.value = newDateFilter;
    };
    const getWorkshopName = (workshopId) => {
      const workshop = workshops.value.find(w => w.id === workshopId);
      
      return workshop ? workshop.name : '';

    };
    const filteredCustomers = computed(() => {
    return customers.value.filter(customer => {
    const matchesSearch = !searchQuery.value ||  
    customer.refNumber.toString().includes(searchQuery.value);
   
    const matchesDateFilter = applyDateFilter(customer.createdAt);
    return matchesSearch && matchesDateFilter;
  });
});
const customerCount = computed(() => filteredCustomers.value.length);
    const pagedCustomers = computed(() => {
      const start = (customerCurrentPage.value - 1) * itemsPerPage.value;
      return filteredCustomers.value.slice(start, start + itemsPerPage.value);
    });
    const applyDateFilter = (date) => {
      const today = new Date();
      const customerDate = new Date(date);
      switch (dateFilter.value) {
        case 'today':
          return customerDate.toDateString() === today.toDateString();
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return customerDate.toDateString() === yesterday.toDateString();
        case 'this_week':
          const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
          return customerDate >= startOfWeek;
        case 'this_month':
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          return customerDate >= startOfMonth;
        default:
          return true;
      }
    }; 
    const onCustomerPageChanged = (newPage) => {
      customerCurrentPage.value = newPage;
    }; 
    const onViewCustomer = async (customer) => {
    console.log("onViewCustomer called, showModal:", showModal.value);
  if (showModal.value) {
    referenceNumber.value = [];
    closeModal();
  } else {
    selectedCustomer.value = customer;
    showModal.value = true;
  }
  try {
    const token = import.meta.env.VITE_API_BEARER_TOKEN; 
    const response = await axios.get(import.meta.env.VITE_APP_API_RECEIPT, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        workshopId: selectedWorkshopId.value,
        referenceNumber: customer.refNumber
      },
    });
    console.log('API response:', response);  
    const apiData = response.data.data;
    receipts.value = apiData.map((receipt) => ({
      receiptNumber: receipt.receiptNumber,  
      receiptDate: receipt.receiptDate,
      message: receipt.message,
      //workshopId: selectedWorkshopId.value,
    }));
    console.log('Processed customer data:', receipts.value);
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
};
const toggleModal = () => {
  console.log("Toggling modal, current state:", showModal.value);
  showModal.value = !showModal.value; 
  if (showModal.value) {
    selectedCustomer.value = null;
  } 
};
    const closeModal = () => {
      showModal.value = false;
      selectedCustomer.value = null;
    };
    const handleOutsideClick = () => {
      if (showModal.value && !event.target.closest('.modal-container')) {
      closeModal();
      }
    };
const onSyncCustomer = (customer) => {
      console.log('Syncing customer data:', customer);
    };

    return {
      receipts,
      branches,
      workshops,
      customers,
      selectedBranchId,
      selectedWorkshopId,
      searchQuery,
      dateFilter,
      updateSelectedBranchId,
      updateSelectedWorkshopId,
      filteredCustomers,
      pagedCustomers,
      updateSearchQuery,
      updateDateFilter,
      getWorkshopName,
      onCustomerPageChanged,
      onViewCustomer,
      onSyncCustomer,
      closeModal,
      handleOutsideClick,
      showModal,
      selectedCustomer,
      applyDateFilter,
      itemsPerPage,
      customerCurrentPage,
      toggleModal,
      customerCount,
      
      
    };
  },
};
</script>  

<style scoped>
.Zoho-container {
  background-color: #fff;
  width: 90%;
  max-width: 3000px;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:   0.35rem 0.2rem 0.35rem 0.35rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 10px;
  user-select: none;
}





</style>

