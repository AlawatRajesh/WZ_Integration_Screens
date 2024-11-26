<template>
  <b-table :items="customers" :fields="fields" class="Zoho-table-striped">
    
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
table {
  width: 100%;
  margin-top: 10px;
  box-shadow: red;
  border: 1px solid white;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid #d3d3d3;   
}

th {
  background-color: #f8f9fa;
  color:white;
  font-weight: 700;
  border-top: 1px solid #d3d3d3; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.014); 
  
}



table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
  
}

table thead, table tbody tr {
  display: table;         
  width: 100%;            
  table-layout: fixed;    
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

table tbody::-webkit-scrollbar {
  width: 6px; 
}

table tbody::-webkit-scrollbar-track {
  background-color: #f1f1f1; 
}

table tbody::-webkit-scrollbar-thumb {
  background-color: #888; 
  border-radius: 10px; 
}

table tbody::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}


</style> 