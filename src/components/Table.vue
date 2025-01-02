 <template>
  <div>
    <Alert v-if="apiMessage" :message="apiMessage" :type="alertType" :duration="1900" />
    
    <Alert v-if="syncingAlert" :type="type" :message="messsage" class="text-center my-2" style="height: 40px; line-height: 40px;"/>
     
    <div v-if="apiMessage">
      <div v-for="(msg, index) in apiMessage" :key="index">
        <p>{{ msg.apiMessage }}</p>
      </div>
    </div>

    <b-table
      :items="customers"
      :fields="fields"
      :busy="loading"
      responsive
      class="hovered table-bordered"
    >
      <template v-slot:table-busy>
        <div class="spinner-container">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </template>

      <template #cell(view)="row">
        <b-button v-b-modal.modal-1 size="sm" variant="primary" @click="viewCustomer(row.item)">
          View
        </b-button>
      </template>

      <template #cell(sync)="row">
        <b-button size="sm" variant="success" @click="syncCustomer(row.item)" :disabled="syncInProgress || row.item.syncing">
          Sync
        </b-button>
      </template>
    </b-table>

    <b-alert v-if="!loading && customers.length === 0" show variant="info" class="text-center my-3">
      No customer details available
    </b-alert>
  </div>
</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  name: 'Table',
  components: {
    Alert,
  },
  props: {
    customers: {
      type: Array,
      required: true,
    },
    loading: {  
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    messsage:{
      type: String,
      default:true
    }
  },
  data() {
    return {
      fields: [
        { key: 'sequenceNumber', label: 'Sequence Number', tdClass: 'small-column', thClass: 'small-column' },
        { key: 'createdAt', label: 'Created At', tdClass: 'small-column', thClass: 'small-column' },
        { key: 'refNumber', label: 'Invoice No', tdClass: 'small-column', thClass: 'small-column' },
        { key: 'apiResponse', label: 'Zoho Message', tdClass: 'zoho-message-column', thClass: 'zoho-message-column' },
        { key: 'view', label: 'Receipts', tdClass: 'small-columns', thClass: 'small-columns' },
        { key: 'sync', label: 'Sync', tdClass: 'small-columns', thClass: 'small-columns' }
      ],
      syncingAlert: false,
      syncInProgress: false,
      messsage:' Syncing in progress...',
      apiMessage: '',
      alertType: '',
    };
  },
  methods: {
    viewCustomer(customer) {
      this.$emit('view-customer', customer);
    },
    async syncCustomer(customer) {
      if (this.syncInProgress || customer.syncing) return;

      customer.syncing = true;
      this.apiMessage = '';
      this.alertType = '';
      this.syncingAlert = true; 
      this.syncInProgress = true;
      

      try {
        const token = import.meta.env.VITE_API_BEARER_TOKEN;
        if (!token) {
          console.error('No token found in .env file');
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_SYNC_CUSTOMER}?referenceNumber=${customer.refNumber}&workshopId=${customer.workshopId}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log('Response from API:', response.data);

        if (response.data && response.data.data) {
          const zohoResponse = response.data.data;
          console.log('ZOHO_INVOICE_RESPONSE:', zohoResponse);
          if (zohoResponse) {
            let zohoArray = zohoResponse[0];
            let res = zohoArray[zohoArray.length - 1];
            this.apiMessage = res.ZOHO_INVOICE_RESPONSE.code + ":" + res.ZOHO_INVOICE_RESPONSE.message;
            this.alertType = 'success';

            this.$emit('remove-customer', customer.id);
          } else {
            this.apiMessage = 'No message available in Zoho response';
            this.alertType = 'danger';
          }
        } else {
          this.apiMessage = `Code: ${response.data.data}, Message: ${response.data.data}`;
          this.alertType = 'danger';
        }
        
      } catch (error) {
        console.error('Error syncing customer:', error);
        this.apiMessage = `Sync failed!\n\nERROR: ${error.message}`;
        this.alertType = 'danger';
      } finally {
        customer.syncing = false;
        this.syncInProgress = false;
        this.syncingAlert = false; 
      }
    }
  }
}
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
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
}

table tbody {
  display: block;
  max-height: 250px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.small-column {
  width: 120px !important;
}

.small-columns {
  width: 100px !important;
}

.zoho-message-column {
  width: 300px !important;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.my-2 {
  height: 40px !important;
  line-height: 40px !important;
}
</style> 





