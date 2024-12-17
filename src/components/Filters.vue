<template>
  <div class="Zoho-filters-container">
    <b-form-select v-model="selectedBranchId"
      @change="onBranchChanged"
      class="Zoho-branch-dropdown custom-dropdown">
      <option value="">Select Branch</option>
      <option v-for="branch in branches" :key="branch.id" :value="branch.id">
        {{ branch.name }}
      </option>
    </b-form-select>

    <div class="custom-dropdown" v-if="selectedBranchId">
      <input 
        type="text"
        v-model="workshopSearchQuery"  
        @input="resetDropdown()"
        class="search-input"
        placeholder="Search Workshop"
        @focus="isOpen = true"  
      />
      <div v-if="isOpen && filteredWorkshops.length > 0" class="dropdown-options">
        <div 
          v-for="workshop in filteredWorkshops" 
          :key="workshop.id" 
          class="dropdown-option"
          @click="selectWorkshop(workshop)">
          {{ workshop.name }}
        </div>
      </div>
      <div v-if="isOpen && filteredWorkshops.length === 0" class="dropdown-options">
        <div 
          v-for="workshop in workshops" 
          :key="workshop.id" 
          class="dropdown-option"
          @click="selectWorkshop(workshop)">
          {{ workshop.name }}
        </div>
      </div>
      <div v-if="workshopSearchQuery && filteredWorkshops.length === 0" class="no-results">
        No results found
      </div>
    </div>
    <div v-if="selectedWorkshopId" class="Zoho-customer-count">
      <p>Customer Count: {{ customerCount }}</p>
    </div>

    <div v-if="selectedWorkshopId" class="Zoho-filter-controls">
      <b-form-input 
        v-model="customerSearchQuery"  
        placeholder="Search customers"
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
    selectedBranchId: [Number, String],
    selectedWorkshopId: Number,
    searchQuery: String,  
    dateFilter: String,
  },
  emits: ['update:selectedBranchId', 'update:selectedWorkshopId', 'update:searchQuery', 
    'update:dateFilter', 'workshop-selected'],
  
  setup(props, { emit }) {
    const selectedBranchId = ref(props.selectedBranchId);
    const selectedWorkshopId = ref(props.selectedWorkshopId);
    const workshopSearchQuery = ref('');  
    const customerSearchQuery = ref('');  
    const dateFilter = ref(props.dateFilter);
    const isOpen = ref(false);  

    const filteredWorkshops = computed(() => {
      if (!props.workshops) return [];
      return props.workshops.filter(workshop => {
        const matchesSearch = !workshopSearchQuery.value || workshop.name.toLowerCase().includes(workshopSearchQuery.value.toLowerCase());
        return matchesSearch;
      });
    });

    const selectWorkshop = (workshop) => {
      emit('workshop-selected', workshop.id);
      workshopSearchQuery.value = workshop.name;  
      selectedWorkshopId.value = workshop.id;  
      isOpen.value = !isOpen.value;  
    };
    const filteredCustomers = computed(() => {
      if (!props.customers) return [];
      return props.customers.filter(customer => {
        return (
          (!selectedWorkshopId.value || customer.workshopId === selectedWorkshopId.value) &&
          customer.refNumber.toString().includes(customerSearchQuery.value)  
        );
      });
    });

    const customerCount = computed(() => filteredCustomers.value.length);

    const debouncedFilterCustomers = debounce(() => {
      emit('update:searchQuery', customerSearchQuery.value);  
    }, 300);

    const onBranchChanged = () => {
      emit('update:selectedBranchId', selectedBranchId.value);
      selectedWorkshopId.value = '';  
    };

    const filterCustomers = () => {
      emit('update:dateFilter', dateFilter.value);
    };

    const resetDropdown = () => {
      isOpen.value = true;  
    };

    return {
      selectedBranchId,
      selectedWorkshopId,
      workshopSearchQuery,
      customerSearchQuery,
      dateFilter,
      filteredWorkshops,
      filteredCustomers,
      customerCount,
      debouncedFilterCustomers,
      onBranchChanged,
      filterCustomers,
      selectWorkshop,
      isOpen,
      resetDropdown,
    };
  }
};
</script>

<style>  
.Zoho-filters-container {
  display: flex;
  align-items: center;
  gap: 10px;  
  margin-bottom: 10px;
  flex-wrap: nowrap;  
}
.Zoho-branch-dropdown {
  max-width: 150px;
  font-size: 14px;
}
.Zoho-workshop-dropdown option {
  padding: 10px;
  font-size: 15px;
}
.Zoho-filter-controls {
  display: flex;
  align-items: center;
  gap: 10px;  
  max-width: 550px;
  flex-wrap: nowrap;
  margin-left: 17%;  
}


.Zoho-search-bar {
  padding: 8px 12px;
  font-size: 14px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
}


.Zoho-date-filter-dropdown {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  width: 100px;  
  border: 1px solid #ccc;
}


.Zoho-customer-count {
  width: auto;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;           
  display: inline-block;  
}


.custom-dropdown {
  position: relative;
  width: 20%;
}
.search-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.dropdown-options {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
  box-sizing: border-box;
}
.dropdown-option {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.dropdown-option:hover {
  background-color: #f0f0f0;
}
.no-results {
  padding: 8px;
  color: gray;
  font-style: italic;
}

</style>


           