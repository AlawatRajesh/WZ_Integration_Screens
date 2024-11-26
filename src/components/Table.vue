<template>
  <table>
    <thead>
      <tr>
        <th>Customer Name</th>
            <th>Customer Type</th>
            <th>Invoice No</th>
            <th>Invoice Date</th>
            <th>Is Updated Invoice</th>
            <th>Status</th>
            <th>Receipt View</th>
            <th>Resync</th>
      </tr>

    </thead>
    <tbody>
      <tr v-if="customers.length === 0">
        <td colspan="8" class="text-center">No customer details available</td>
      </tr>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.name }}</td>
            <td>{{ customer.type }}</td>
            <td>{{ customer.invoiceno }}</td>
            <td>{{ customer.date }}</td>
            <td>{{ customer.update }}</td>
            <td>{{ customer.status }}</td>
        <td>
          <button @click="viewCustomer(customer)" class="btn btn-primary">View</button>
          </td>
          <td> 
          <button @click="syncCustomer()" class="btn btn-success">Sync</button>
        </td>
      </tr>
      
    </tbody>
    
    
  </table>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
  props: {
    customers: Array
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
th,tr{
  background-color: #007bff;
  padding: 10px;
  
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
  
  scrollbar-width: thin; /* For Firefox */
}
* Webkit-based browsers */
table tbody::-webkit-scrollbar {
  width: 6px; /* Control scrollbar width */
}

table tbody::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Track background */
}

table tbody::-webkit-scrollbar-thumb {
  background-color: #888; /* Scrollbar color */
  border-radius: 10px; /* Rounded corners */
}

table tbody::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Darker color on hover */
}


</style> 