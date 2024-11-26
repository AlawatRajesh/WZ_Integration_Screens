<template>
  <div id="app" class="container">
    <div class="text-right">
      <a href="/steps.html" class="btn btn-link">Important Steps To Follow</a>
    </div>
    <!-- Workshop Selection -->
    <div class="filters-container">
      <select v-model="selectedWorkshopId" @change="filterCustomers" class="workshop-dropdown">
        <option value="">Select Workshop</option>
        <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">
          {{ workshop.name }}
        </option>
      </select>
      <div v-if="selectedWorkshopId" class="customer-count">
        <p>Customer Count: {{ customerCount }}</p>
      </div>
      <!-- Customer Search and Date Filter Section (only show when a workshop is selected) -->
      <div v-if="selectedWorkshopId" class="filter-controls">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search customers by name" 
          @input="debouncedFilterCustomers" 
          class="search-bar"
        />
        <select v-model="dateFilter" @change="filterCustomers" class="date-filter-dropdown">
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>
    </div>
    <div v-if="selectedWorkshopId">
      <h3 class="hello mb-3">Failed Invoice Details for {{ getWorkshopName(selectedWorkshopId) }}:</h3>
    </div>
    <!-- Customer Table (Visible only when a workshop is selected) -->
    <div v-if="selectedWorkshopId">
      <table-component 
        :customers="pagedCustomers" 
        @view-customer="onViewCustomer" 
        @sync-customer="onSyncCustomer"
      />
      <!-- Pagination for Customers -->
      <pagination 
        :total-items="filteredCustomers.length"
        :items-per-page="itemsPerPage"
        :current-page="customerCurrentPage"
        @page-changed="onCustomerPageChanged"
      />
    </div>
    <!-- Modal for Customer Details & Receipt History -->
    <modal-component 
      v-if="showModal" 
      :customer="selectedCustomer" 
      @close="closeModal"
      @click-outside="handleOutsideClick" 
    />
  </div>
</template>

<script>
import TableComponent from './Table.vue'
import ModalComponent from './Modal.vue'
import Pagination from './Pagination.vue'
import { debounce } from 'lodash';

export default {
  components: {
    TableComponent,
    ModalComponent,
    Pagination
  },
  data() {
    return {
      workshops: [
        { id: 1, name: 'RR Workshop' },
        { id: 2, name: 'SS Workshop' },
        { id: 3, name: 'MR Workshop' },
        { id: 4, name: 'RM Workshop' },
        { id: 5, name: 'NN Workshop' },
        { id: 6, name: 'SR Workshop' },
      ],
      customers: [
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
                {Id:2,name:'praveen',workshopId: 1,type:'Business',invoiceno:'1234',date:'2024-11-24',update:'Paid',status:'active',
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
      ],
      selectedWorkshopId: '',
      searchQuery: '',
      dateFilter: 'all',
      selectedCustomer: null,
      showModal: false,
      itemsPerPage: 10,
      customerCurrentPage: 1
    };
  },
  computed: {
    pagedCustomers() {
      const start = (this.customerCurrentPage - 1) * this.itemsPerPage;
      return this.filteredCustomers.slice(start, start + this.itemsPerPage);
    },
    filteredCustomers() {
      let filtered = this.customers
        .filter(customer =>
          (!this.selectedWorkshopId || customer.workshopId === Number(this.selectedWorkshopId)) &&
          (!this.searchQuery || customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          this.applyDateFilter(customer.date)
        );
        return filtered
    .sort((a, b) => {
      const dateSort = new Date(b.date) - new Date(a.date);
      if (dateSort !== 0) return dateSort;
      return a.invoiceno.localeCompare(b.invoiceno);
    });
},
    customerCount() {
      return this.filteredCustomers.length;
    }
  },
  methods: {
    debouncedFilterCustomers: debounce(function() {
      this.filterCustomers();
    }, 300), 
    getWorkshopName(workshopId) {
      return this.workshops.find(workshop => workshop.id === Number(workshopId))?.name || 'Unknown';
    },
    onCustomerPageChanged(newPage) {
      this.customerCurrentPage = newPage;
    },
    onViewCustomer(customer) {
      this.selectedCustomer = customer;
      this.showModal = true;
    },
    onSyncCustomer() {
      console.log('Syncing customer', );
      this.selectedCustomer = null;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCustomer = null;
    },
    handleOutsideClick() {
      this.closeModal();
    },
    applyDateFilter(date) {
      const today = new Date();
      const customerDate = new Date(date);
      switch (this.dateFilter) {
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
    }
  }
};
</script>

<style scoped>

.container {
  background-color: #fff;
  width: 90%;
  max-width: 3000px;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:  0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  user-select: none;
}


.filters-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}


.workshop-dropdown {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  width: 200px;
}
button:hover {
  background-color: #0056b3;
  color: #fff;
}
.filter-controls {
  display: flex;
  align-items: left;
  gap: 15px;
  margin-left: 45%
}

.search-bar {
  padding: 8px 12px;
  font-size: 14px;
  width: 250px;
  border-radius: 4px;
}

.date-filter-dropdown {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
}


.customer-count {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}


.pagination-controls {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}

.pagination-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.pagination-controls button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.pagination-controls button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
