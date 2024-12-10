<!-- <template>
  <div>
    <b-table-simple v-if="customers && customers.length > 0" class="table table-bordered table-hover">
        <b-thead>
        <b-tr>
          <b-th>S.No</b-th>
          <b-th>Sequence Number</b-th>
          <b-th>Invoice No</b-th>
          <b-th>Created At</b-th>
          <b-th>View</b-th>
          <b-th>Sync</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(customer, index) in customers" :key="customer.id">
          <b-td>{{ customer.id }}</b-td>
          <b-td>{{ customer.sequenceNumber }}</b-td>
          <b-td>{{ customer.refNumber }}</b-td>
          <b-td>{{ customer.createdAt }}</b-td>
          <b-td>
            <b-button size="sm" variant="primary" @click="viewCustomer(customer)">
              View
            </b-button>
          </b-td>
          <b-td>
            <b-button size="sm" variant="success" @click="syncCustomer(customer)">
              Sync
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-alert v-if="customers.length === 0" show variant="info" class="text-center my-3">
      No customer details available
    </b-alert>
  </div>
</template>

<script>
import { BAlert } from 'bootstrap-vue-next';


export default {
  props: {
    customers: {
      type: Array,
      required: true
    }
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
</script> -->





<template>
  <div>
    <b-table
      v-if="customers && customers.length > 0"
      :items="customers"
      :fields="fields"
      responsive
      class="hovered table-bordered"
    >
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

    <b-alert v-if="customers.length === 0" show variant="info" class="text-center my-3">
      No customer details available
    </b-alert>
  </div>
</template>

<script>
import { BAlert, BButton, BTable } from 'bootstrap-vue-next';

export default {
  props: {
    customers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'S.No' },
        { key: 'sequenceNumber', label: 'Sequence Number' },
        { key: 'refNumber', label: 'Invoice No' },
        { key: 'createdAt', label: 'Created At' },
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

