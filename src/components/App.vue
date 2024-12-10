<template>
  <div id="app" class="Zoho-container">
  <div> 
      <Filters 
        :branches="branches" 
        :workshops="workshops" 
        :selectedBranchId="selectedBranchId"
        :selectedWorkshopId="selectedWorkshopId" 
        :searchQuery="searchQuery" 
        :dateFilter="dateFilter"
        @update:selectedBranchId="updateSelectedBranchId"
        @update:selectedWorkshopId="updateSelectedWorkshopId"
        @update:searchQuery="updateSearchQuery"
        @update:dateFilter="updateDateFilter" />
    </div>

    <div v-if="selectedWorkshopId">
      <h3 class="hello mb-3">Failed Invoice Details for {{ getWorkshopName(selectedWorkshopId) }}:</h3>
    </div>

    <div v-if="selectedWorkshopId && customers.length > 0">
      <table-component :customers="pagedCustomers" @view-customer="onViewCustomer" @sync-customer="onSyncCustomer" />
      <pagination 
        :total-items="customerCount" 
        :items-per-page="itemsPerPage" 
        :current-page="customerCurrentPage" 
        @page-changed="onCustomerPageChanged" />
    </div>

    <modal-component v-if="showModal" :customer="selectedCustomer" @close="closeModal" @click-outside="handleOutsideClick" />
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


export default {
  components: {
    TableComponent,
    ModalComponent,
    Pagination,
    Filters
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
    const selectedBranchId = ref('');
    const selectedWorkshopId = ref('');
    const searchQuery = ref('');
    const dateFilter = ref('all');
    const selectedCustomer = ref(null);
    const showModal = ref(false);
    const itemsPerPage = ref(10);
    const customerCurrentPage = ref(1);
    const router = useRouter();

    
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
          params: {
            branchId: selectedBranchId.value,
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

        const apiData = response.data.data;
        customers.value = apiData.map((customer, index) => ({
          id: index + 1,
          sequenceNumber: customer.sequenceNumber,
          createdAt: customer.createdAt,
          refNumber: customer.ref_numbers,
        }));
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
        const matchesSearch = !searchQuery.value || customer.refNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        customer.sequenceNumber.toString().includes(searchQuery.value);
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
        closeModal();
      } else {
        selectedCustomer.value = customer;
        showModal.value = true;
      }
      try {
        const response = await axios.get(import.meta.env.VITE_APP_API_RECEIPT, {
          
        });
        console.log('API response:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };
    const closeModal = () => {
      showModal.value = false;
      selectedCustomer.value = null;
    };
    const handleOutsideClick = () => {
      closeModal();
    };

    const onSyncCustomer = (customer) => {
      console.log('Syncing customer data:', customer);
    };


    return {
    
      branches,
      workshops,
      customers,
      selectedBranchId,
      selectedWorkshopId,
      searchQuery,
      dateFilter,
      updateSelectedBranchId,
      updateSelectedWorkshopId,
      customerCount,
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

