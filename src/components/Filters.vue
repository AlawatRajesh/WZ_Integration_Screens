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
      <Multiselect
        v-model="selectedWorkshops"
        :options="filteredWorkshops"
        label="name"
        track-by="id"
        placeholder="Select or search for a workshop"
        :multiple="true"
        :taggable="true"
        @tag="addWorkshopTag"
        :loading="loadingWorkshops"
        @select="selectWorkshop"
        @remove="deselectWorkshop"   
      />
    </div>

    <div v-if="selectedWorkshopId" class="Zoho-customer-count">
      <p>Customer Count: {{ customers.length  }}</p>
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
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
  components: {
    Multiselect
  },
  props: {
    branches: Array,
    workshops: Array,
    customers: Array,
    selectedBranchId: [Number, String],
    selectedWorkshopId: [Number,Array],
    searchQuery: String,  
    dateFilter: String,
  },
  emits: ['update:selectedBranchId', 'update:selectedWorkshopId', 'update:searchQuery', 
    'update:dateFilter', 'workshop-selected','workshop-deselected'],
  
  setup(props, { emit }) {
    const selectedBranchId = ref(props.selectedBranchId);
    const selectedWorkshopId = ref(props.selectedWorkshopId);
    const selectedWorkshops = ref([]);  
    const workshopSearchQuery = ref('');  
    const customerSearchQuery = ref('');  
    const dateFilter = ref(props.dateFilter);
    const isOpen = ref(false);  
    const loadingWorkshops = ref(false);  

    const filteredWorkshops = computed(() => {
      if (!props.workshops) return [];
      return props.workshops.filter(workshop => {
        const matchesSearch = !workshopSearchQuery.value || workshop.name.toLowerCase().includes(workshopSearchQuery.value.toLowerCase());
        return matchesSearch;
      });
    });

    const selectWorkshop = (workshop) => {
      emit('workshop-selected', workshop.id);
      selectedWorkshopId.value = workshop.id;
    };
    const deselectWorkshop = (workshop) => {
      emit('workshop-deselected', workshop.id);  
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

   

    


    return {
      selectedBranchId,
      selectedWorkshopId,
      selectedWorkshops,
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
      
      loadingWorkshops,
      deselectWorkshop,
     
      
    };
  }
};
</script>    


<style scoped>

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
  max-width: 350px;
  flex-wrap: nowrap;
  margin-left: 13%;  
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
  max-width: 200px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;           
  display: inline-block;  
 
}

.multiselect {
  max-width: 145%;
  max-width: 950px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.multiselect__input {
  border: 2px solid #007bff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 10px;
  outline: none;
}
.multiselect__input:focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.multiselect__tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  margin-top: 5px;
}
.multiselect__tag {
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  padding: 5px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.multiselect__tag .multiselect__tag-icon {
  margin-left: 5px;
  cursor: pointer;
}
.multiselect__option {
  padding: 10px;
  font-size: 14px;
}
.multiselect__option--highlight {
  background-color: #f0f0f0;
}
.multiselect__option--selected {
  background-color: #007bff;
  color: white;
} 



</style>









