<template>
    <div class="Zoho-filters-container">
        
      <b-form-select v-model="selectedBranchId"
       @change="onBranchChanged" 
       class="Zoho-branch-dropdown">
        <option value="">Select Branch</option>
        <option v-for="branch in branches" :key="branch.id" :value="branch.id" >
          {{ branch.name }}
        </option>
      </b-form-select>
  
      <b-form-select v-model="selectedWorkshopId" v-if="selectedBranchId" @change="onWorkshopChanged" class="Zoho-workshop-dropdown">
        <option value="">Select Workshop</option>
        <option v-for="workshop in filteredWorkshops" :key="workshop.id" :value="workshop.id">
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
  </template>
  <script>
  import { ref, computed } from 'vue';
  import { debounce } from 'lodash';
  
  export default {
    props: {
      branches: Array,
      workshops: Array,
      customers: Array,
      selectedBranchId: Number,
      selectedWorkshopId: Number,
      searchQuery: String,
      dateFilter: String
    },
    emits: ['update:selectedBranchId', 'update:selectedWorkshopId', 'update:searchQuery', 'update:dateFilter'],
    setup(props, { emit }) {
      const selectedBranchId = ref(props.selectedBranchId);
      const selectedWorkshopId = ref(props.selectedWorkshopId);
      const searchQuery = ref(props.searchQuery);
      const dateFilter = ref(props.dateFilter);
  
      const filteredWorkshops = computed(() => {
        return props.workshops.filter(workshop =>
          !selectedBranchId.value || workshop.branchId === selectedBranchId.value
        );
      });
  
      const filteredCustomers = computed(() => {
        return props.customers.filter(customer => {
          return (
            (!selectedWorkshopId.value || customer.workshopId === selectedWorkshopId.value) &&
            (!searchQuery.value || customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
            
          );
        });
      });
  
      const customerCount = computed(() => filteredCustomers.value.length);
  
      const debouncedFilterCustomers = debounce(() => {
        emit('update:searchQuery', searchQuery.value);
      }, 500);
  
      const onBranchChanged = () => {
        emit('update:selectedBranchId', selectedBranchId.value);
        selectedWorkshopId.value = ''; 
      };
  
      const onWorkshopChanged = () => {
        emit('update:selectedWorkshopId', selectedWorkshopId.value);
      };
  
      const filterCustomers = () => {
        emit('update:dateFilter', dateFilter.value);
      };
  
      return {
        selectedBranchId,
        selectedWorkshopId,
        searchQuery,
        dateFilter,
        filteredWorkshops,
        filteredCustomers,
        customerCount,
        debouncedFilterCustomers,
        onBranchChanged,
        onWorkshopChanged,
        filterCustomers
      };
    }
  };
  </script>
  

  
  <style> 
  
.Zoho-filters-container {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
}
.Zoho-branch-dropdown{
    max-width: 150px;
}
.Zoho-workshop-dropdown {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    max-width: 170px;
}
button:hover {
    background-color: #0056b3;
    color: #fff;
  }
.Zoho-filter-controls {
    display: flex;
    align-items: left;
    gap: 5px;
    margin-left: 33%;
    max-width:400px
  }
  
.Zoho-search-bar {
    padding: 8px 12px;
    font-size: 14px;
    width: 250px;
    border-radius: 4px;
  }
.Zoho-date-filter-dropdown {
    padding: 8px 12px;
   width: 50px;
    font-size: 14px;
    border-radius: 4px;
  }
  
.Zoho-customer-count {
    width:180px;
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
   
  }
  
  
  </style>
  

  