<template>
  <div id="app" class="Zoho-container">
    <div class="text-right">
      <b-button href="/steps.html" variant="link">Important Steps To Follow</b-button>
    </div>
    
    <div class="Zoho-filters-container">
      <b-form-select v-model="selectedWorkshopId" @change="filterCustomers" class="Zoho-workshop-dropdown">
        <option value="">Select Workshop</option>
        <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">
          {{ workshop.name }}
        </option>
      </b-form-select>
      
      <div v-if="selectedWorkshopId" class="Zoho-customer-count">
        <p>Customer Count: {{ customerCount }}</p>
      </div>
      
      <div v-if="selectedWorkshopId" class="Zoho-filter-controls">
        <b-form-input 
          v-model="searchQuery" 
          placeholder="Search customers by name" 
          @input="debouncedFilterCustomers" 
          class="Zoho-search-bar"
        />
        <b-form-select v-model="dateFilter" @change="filterCustomers" class="Zoho-date-filter-dropdown">
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </b-form-select>
      </div>
    </div>

    <div v-if="selectedWorkshopId">
      <h3 class="hello mb-3">Failed Invoice Details for {{ getWorkshopName(selectedWorkshopId) }}:</h3>
    </div>
    
    <div v-if="selectedWorkshopId">
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

export default {
  components: {
    TableComponent,
    ModalComponent,
    Pagination
  },
  setup() {
    const workshops = ref([
      { id: 1, name: 'RR Workshop' },
      { id: 2, name: 'SS Workshop' },
      { id: 3, name: 'MR Workshop' },
      { id: 4, name: 'RM Workshop' },
      { id: 5, name: 'NN Workshop' },
      { id: 6, name: 'SR Workshop' },
    ]);
    
    const customers = ref([
    { id: 1, name: 'Ram',workshopId: 1, type: 'Individual', invoiceno: '1233', date: '2024-11-25', update: 'Paid', status: 'active', 
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
                  { receiptId: 'R0011',date: '2024-11-24',message: 'Failed due to incorrect details', status: 'failed' },
                  { receiptId: 'R0012',date: '2024-11-25',message: 'Payment successful', status: 'success' },
                  
               ]},
                {id:2,name:'praveen',workshopId: 1,type:'Business',invoiceno:'1234',date:'2024-11-24',update:'Paid',status:'active',
                receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }]},
                {id:3,name:'nithin',workshopId: 1,type:'Individual',invoiceno:'1235',date:'2024-11-25',update:'Paid',status:'active',receipts:[]},
                {id:4,name:'viraj',workshopId: 1,type:'Individual',invoiceno:'1236',date:'2024-11-21',update:'Paid',status:'active',receipts:[]},
                {id:5,name:'vikas',workshopId: 1,type:'Individual',invoiceno:'1237',date:'2024-11-22',update:'Paid',status:'active',receipts:[]},
                {id:6,name:'rajveer',workshopId: 1,type:'Individual',invoiceno:'1238',date:'2024-11-23',update:'Paid',status:'active',receipts:[]},
                {id:7,name:'ali',workshopId: 1,type:'Individual',invoiceno:'1239',date:'2024-11-22',update:'Paid',status:'active',receipts:[]},
                {id:8,name:'vijay',workshopId: 1,type:'Individual',invoiceno:'1240',date:'2024-11-21',update:'Paid',status:'active',receipts:[]},
                {id:9,name:'raj',workshopId: 1,type:'Individual',invoiceno:'1241',date:'2024-11-20',update:'Paid',status:'active',receipts:[]},
                {id:10,name:'rakesh',workshopId: 1,type:'Individual',invoiceno:'1242',date:'2024-11-19',update:'Paid',status:'active',receipts:[]},
                {id:11,name:'ramesh',workshopId: 1,type:'Individual',invoiceno:'1243',date:'2024-11-18',update:'Paid',status:'active',receipts:[]},
                {id:12,name:'dinesh',workshopId: 1,type:'Individual',invoiceno:'1244',date:'2024-11-19',update:'Paid',status:'active',receipts:[]},
                {id:13,name:'surya',workshopId: 1,type:'Individual',invoiceno:'1245',date:'2024-11-18',update:'Paid',status:'active',receipts:[]},
                {id:1,name:'ravi',workshopId:2,type:'Individual',invoiceno:'1221',date:'2024-11-22',update:'Paid',status:'active',receipts:[]}

    ]);

    const selectedWorkshopId = ref('');
    const searchQuery = ref('');
    const dateFilter = ref('all');
    const selectedCustomer = ref(true);
    const showModal = ref(false);
    const itemsPerPage = ref(10);
    const customerCurrentPage = ref(1);

    const filteredCustomers = computed(() => {
      let filtered = customers.value.filter(customer =>
        (!selectedWorkshopId.value || customer.workshopId === Number(selectedWorkshopId.value)) &&
        (!searchQuery.value || customer.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
        applyDateFilter(customer.date)
      );
      
      return filtered.sort((a, b) => {
        const dateSort = new Date(b.date) - new Date(a.date);
        if (dateSort !== 0) return dateSort;
        return a.invoiceno.localeCompare(b.invoiceno);
      });
    });

    const customerCount = computed(() => filteredCustomers.value.length);

    const pagedCustomers = computed(() => {
      const start = (customerCurrentPage.value - 1) * itemsPerPage.value;
      return filteredCustomers.value.slice(start, start + itemsPerPage.value);
    });

    const debouncedFilterCustomers = debounce(function() {
      filterCustomers();
    }, 300);

    const getWorkshopName = (workshopId) => {
      return workshops.value.find(workshop => workshop.id === Number(workshopId))?.name || 'Unknown';
    };

    const onCustomerPageChanged = (newPage) => {
      customerCurrentPage.value = newPage;
    };

    const onViewCustomer = (customer) => {
      selectedCustomer.value = customer;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedCustomer.value = null;
    };

    const handleOutsideClick = () => {
      closeModal();
    };

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

    return {
      workshops,
      customers,
      selectedWorkshopId,
      searchQuery,
      dateFilter,
      selectedCustomer,
      showModal,
      itemsPerPage,
      customerCurrentPage,
      filteredCustomers,
      customerCount,
      pagedCustomers,
      debouncedFilterCustomers,
      getWorkshopName,
      onCustomerPageChanged,
      onViewCustomer,
      closeModal,
      handleOutsideClick,
      applyDateFilter
    };
  },
  computed: {
    filterCustomers() {
      // Define your logic for filtering customers here
      return this.customers.filter(customer => customer.active);
    }
  },
  methods: {
    onSyncCustomer() {
      // Define your logic for syncing customer data here
      console.log('Syncing customer data...');
    }
  
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
  box-shadow:  0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  user-select: none;
}


.Zoho-filters-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}


.Zoho-workshop-dropdown {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  width: 200px;
}
button:hover {
  background-color: #0056b3;
  color: #fff;
}
.Zoho-filter-controls {
  display: flex;
  align-items: left;
  gap: 15px;
  margin-left: 45%
}

.Zoho-search-bar {
  padding: 8px 12px;
  font-size: 14px;
  width: 250px;
  border-radius: 4px;
}

.Zoho-date-filter-dropdown {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
}


.Zoho-customer-count {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 500px;
  border-radius: 8px;
}

.close-modal {
  background-color: #ff4d4d;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
