<template>
  <div id="app" class="Zoho-container">
    <div class="text-right" v-if="isLoggedIn"> 
    <b-button size="sm" variant="primary" class="Zoho-Logout"   v-if="isLoggedIn" @click="logout"> Logout</b-button>
    </div>
    <div v-if="!isLoggedIn">
      <advanced-login-page-vue @login-success="onLoginSuccess" />
    </div>
    
    <div v-if="isLoggedIn">
  
      <Filters 
        :branches="branches"
        :workshops="workshops"
        :customers="customers"
        :selectedBranchId="selectedBranchId"
        :selectedWorkshopId="selectedWorkshopId"
        :searchQuery="searchQuery"
        :dateFilter="dateFilter"
        @update:selectedBranchId="updateSelectedBranchId"
        @update:selectedWorkshopId="updateSelectedWorkshopId"
        @update:searchQuery="updateSearchQuery"
        @update:dateFilter="updateDateFilter"
      />
    </div>
    
    <div v-if="isLoggedIn && selectedWorkshopId">
      <h3 class="hello mb-3">Failed Invoice Details for {{ getWorkshopName(selectedWorkshopId) }}:</h3>
    </div>
    <div v-if="selectedWorkshopId && filteredCustomers.length > 0">
      <table-component 
        :customers="pagedCustomers" 
        @view-customer="onViewCustomer" 
        @sync-customer="onSyncCustomer"
      />
      <pagination 
        :total-items="filteredCustomers.length"
        :items-per-page="itemsPerPage"
        :current-page="customerCurrentPage"
        @page-changed="onCustomerPageChanged"
      />    
    </div>

    <modal-component 
      v-if="showModal" 
      :customer="selectedCustomer" 
      @close="closeModal"
      @click-outside="handleOutsideClick" 
    />
    
 
  </div>
  
</template>

<script>
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import TableComponent from './Table.vue';
import ModalComponent from './Modal.vue';
import Pagination from './Pagination.vue';
import { useRouter } from 'vue-router';
import Filters from './Filters.vue';
import AdvancedLoginPageVue from './AdvancedLoginPage.vue';
import router from '../router';

export default {
  components: {
   
    AdvancedLoginPageVue,
    TableComponent,
    ModalComponent,
    Pagination,
    Filters,

    
  },
  setup() {
    const isLoggedIn = ref(false); 
    const showSteps = ref(false);

    
    const branches = ref([ 
      { id: 1, name: 'Branch A' },
      { id: 2, name: 'Branch B' },
      { id: 3, name: 'Branch C' },
      { id: 4, name: 'Branch D' } ]);
    const workshops = ref([ 
      { id: 1, name: 'RR Workshop', branchId: 1 },
      { id: 2, name: 'SS Workshop', branchId: 1 },
      { id: 3, name: 'AR Workshop', branchId: 1 },
      { id: 4, name: 'SM Workshop', branchId: 1 },
      { id: 5, name: 'RS Workshop', branchId: 1 },
      { id: 2, name: 'SS Workshop', branchId: 1 },
      { id: 3, name: 'MR Workshop', branchId: 2 },
      { id: 4, name: 'RM Workshop', branchId: 2 },
      { id: 5, name: 'NN Workshop', branchId: 3 },
      { id: 6, name: 'SR Workshop', branchId: 4 } ]);
    const customers = ref([
      { id: 1, name: 'Ram',branchId: 1,workshopId: 1, type: 'Individual', invoiceno: '1233', date: '2024-12-03', update: 'Paid', status: 'active', 
        receipts:[{ receiptId: 'R001', date: '2024-11-10',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R002', date: '2024-11-15',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R003', date: '2024-11-16',message: 'Payment successful', status: 'success' },
                  { receiptId: 'R004', date: '2024-11-17',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R005', date: '2024-11-18',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R006', date: '2024-11-19',message: 'Payment successful', status: 'success' },
                  { receiptId: 'R007', date: '2024-11-20',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R008', date: '2024-11-21',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R009', date: '2024-11-22',message: 'Payment successful', status: 'success' },
                  { receiptId: 'R0010',date: '2024-11-23',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R0011',date: '2024-11-29',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R0012',date: '2024-11-25',message: 'Payment successful', status: 'success' },
                  
               ]},
                {id:2,name:'praveen',branchId: 1,workshopId: 1,type:'Business',invoiceno:'1234',date:'2024-11-28',update:'Paid',status:'active',
                receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }]},
                {id:3,name:'nithin',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1235',date:'2024-11-26',update:'Paid',status:'active',receipts:[]},
                {id:4,name:'viraj',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1236',date:'2024-11-25',update:'Paid',status:'active',receipts:[]},
                {id:5,name:'vikas',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1237',date:'2024-11-22',update:'Paid',status:'active',receipts:[]},
                {id:6,name:'rajveer',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1238',date:'2024-11-23',update:'Paid',status:'active',receipts:[]},
                {id:7,name:'ali',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1239',date:'2024-11-22',update:'Paid',status:'active',receipts:[]},
                {id:8,name:'vijay',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1240',date:'2024-11-21',update:'Paid',status:'active',receipts:[]},
                {id:9,name:'raj',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1241',date:'2024-11-20',update:'Paid',status:'active',receipts:[]},
                {id:10,name:'rakesh',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1242',date:'2024-11-19',update:'Paid',status:'active',receipts:[]},
                {id:11,name:'ramesh',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1243',date:'2024-11-18',update:'Paid',status:'active',receipts:[]},
                {id:12,name:'dinesh',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1244',date:'2024-11-19',update:'Paid',status:'active',receipts:[]},
                {id:13,name:'surya',branchId: 1,workshopId: 1,type:'Individual',invoiceno:'1246',date:'2024-11-18',update:'Paid',status:'active',receipts:[]},
                {id:1,name:'ravi',branchId: 1,workshopId:2,type:'Individual',invoiceno:'1221',date:'2024-11-22',update:'Paid',status:'active',receipts:[]} ]);
    const selectedBranchId = ref('');
    const selectedWorkshopId = ref(0);
    const searchQuery = ref('');
    const dateFilter = ref('all');
    const selectedCustomer = ref(null); 
    const showModal = ref(false);
    const itemsPerPage = ref(10);
    const customerCurrentPage = ref(1);
    const router = useRouter();
    const onLoginSuccess = () => { 
  isLoggedIn.value = true;
  router.push('/steps'); 
    console.log(isLoggedIn.value);

    
     };

    const logout = () => {
      isLoggedIn.value = false; 
      selectedBranchId.value = ''; 
      selectedWorkshopId.value = 0; 
      searchQuery.value = ''; 
      dateFilter.value = 'all';
      selectedCustomer.value = null; 
      showModal.value = false;
      showSteps.value = false;
     
    };
    const goToStepsPage = () => {
      console.log("Navigating to steps page...");
      router.push('/steps');  // Try this if router.push('/steps') isn't working.
  
   };


    const updateSelectedBranchId = (newBranchId) => {
      selectedBranchId.value = newBranchId;
      selectedWorkshopId.value = 0;
    };

    const updateSelectedWorkshopId = (newWorkshopId) => {
      selectedWorkshopId.value = newWorkshopId || 0;
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
      const filtered = customers.value.filter(customer => {
        const matchesBranch = !selectedBranchId.value || customer.branchId === selectedBranchId.value;
        const matchesWorkshop = !selectedWorkshopId.value || customer.workshopId === selectedWorkshopId.value;
        const matchesSearch = !searchQuery.value || customer.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesDateFilter = applyDateFilter(customer.date);
        return matchesBranch && matchesWorkshop && matchesSearch && matchesDateFilter;
      });
      return filtered;
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
    const onViewCustomer = (customer) => {
      if (showModal.value) {
       closeModal(); 
      } else {
       selectedCustomer.value = customer;
       showModal.value = true;  
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
      isLoggedIn,
      branches,
      workshops,
      customers,
      selectedBranchId,
      selectedWorkshopId,
      searchQuery,
      dateFilter,
      updateSelectedBranchId,
      updateSelectedWorkshopId,
      onLoginSuccess, 
      customerCount,
      filteredCustomers, 
      pagedCustomers,
      updateSearchQuery,
      updateDateFilter,
      getWorkshopName,
      onCustomerPageChanged,
      onViewCustomer,
      onSyncCustomer,
      onViewCustomer,
      toggleModal,
      closeModal,
      handleOutsideClick,
      showModal,
      selectedCustomer,
      applyDateFilter,
      itemsPerPage,
      customerCurrentPage,
      pagedCustomers,
      logout,
      goToStepsPage,
      showSteps,
      router,
    };
  }
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


