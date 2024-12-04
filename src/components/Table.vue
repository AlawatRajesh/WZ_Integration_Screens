<template>
  <b-table :items="customers" :fields="fields" class=" hovered table-bordered ">
    
      <b-alert show variant="info" class="text-center">
        No customer details available
      </b-alert>
    

    <template #cell(view)="row">
      <b-button size="sm" variant="primary" @click="viewCustomer(row.item)">
        View
      </b-button>
    </template>

    <template #cell(sync)="row">
      <b-button size="sm" variant="success" @click="syncCustomer(row.item)">
        Sync
      </b-button>
    </template>
  </b-table>
</template>

<script>
import { BTable, BButton, BAlert } from 'bootstrap-vue-next';

export default {
  components: {
    BTable,
    BButton,
    BAlert
  },
  props: {
    customers: Array
  },
  data() {
    return {
      fields: [
        { key: 'name', label: 'Customer Name' },
        { key: 'type', label: 'Customer Type' },
        { key: 'invoiceno', label: 'Invoice No' },
        { key: 'date', label: 'Invoice Date' },
        { key: 'update', label: 'Is Updated Invoice' },
        { key: 'status', label: 'Status' },
        { key: 'view', label: 'View' },
        { key: 'sync', label: 'Sync' }
      ]
    };
  },
  methods: {
    viewCustomer(customer) {
      this.$emit('view-customer', customer);
    },
    syncCustomer(customer) {
      this.$emit('sync-customer', customer);
    }
  }
};
</script>




<style>
table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
  
}
table thead, table tbody tr {
  display: table;         
  width: 100%;            
  table-layout: fixed; 
  text-align: center;   
}

table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
td {
  background-color: #fff;
}
table tbody {
  display: block;        
  max-height: 250px;  
  overflow-y: auto;
  
  scrollbar-width: thin; 
}
</style> 