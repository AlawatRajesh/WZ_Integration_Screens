<template>
  <b-modal
    :visible="isModalVisible"
    @update:visible="handleModalVisibility"
    aria-labelledby="modal-title"
    @shown="resetStates"
    
  >
    <h5 class="Zoho-modal-title" id="modal-title">Receipt History for {{ customer.name }}</h5>
    <b-table :items="paginatedReceipts" :fields="fields" striped hover>
      <template v-slot:cell(resync)="data">
        <!-- Resync button for each receipt row -->
        <b-button 
          @click="syncReceipt(data.item)" 
          variant="success" 
          :disabled="isSyncing">
          {{ isSyncing ? 'Syncing...' : 'Sync' }}
        </b-button>
      </template>
    </b-table>

    <!-- Sync operation feedback messages -->
    <div v-if="syncError" class="alert alert-danger">
      {{ syncError }}
    </div>
    <div v-if="syncSuccess" class="alert alert-success">
      Receipt sync successful!
    </div>

    <!-- Empty state message -->
    <div v-if="!customer.receipts || customer.receipts.length === 0">
      <p>No receipts found for this customer.</p>
    </div>

    <!-- Pagination Component -->
    <Pagination
      v-if="customer && customer.receipts && customer.receipts.length > 0"
      :total-items="customer.receipts.length"
      :items-per-page="itemsPerPage"
      :current-page="receiptCurrentPage"
      @page-changed="onReceiptPageChanged"
    />
  </b-modal>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    },
    isModalVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSyncing: false,
      syncError: null,
      syncSuccess: null,
      fields: [
        { key: 'receiptId', label: 'Receipt No' },
        { key: 'date', label: 'Receipt Date' },
        { key: 'message', label: 'Message' },
        { key: 'status', label: 'Status' },
        { key: 'resync', label: 'Resync' }
      ],
      itemsPerPage: 10, // Define the number of items per page
      receiptCurrentPage: 1, // Current page number
    };
  },
  computed: {
    // Calculate the paginated receipts based on the current page
    paginatedReceipts() {
      const startIndex = (this.receiptCurrentPage - 1) * this.itemsPerPage;
      return this.customer.receipts.slice(startIndex, startIndex + this.itemsPerPage);
    }
  },
  methods: {
    handleModalVisibility(val) {
      this.$emit('update:isModalVisible', val);
    },

    resetStates() {
      this.isSyncing = false;
      this.syncError = null;
      this.syncSuccess = null;
    },

    async syncReceipt(receipt) {
      this.syncError = null;
      this.syncSuccess = null;
      this.isSyncing = true;

      try {
        await api.syncReceipt(receipt); // Assuming `api.syncReceipt` exists
        this.syncSuccess = true;
      } catch (error) {
        this.syncError = 'Sync failed: ' + error.message;
      } finally {
        this.isSyncing = false;
      }
    },

    onReceiptPageChanged(newPage) {
      this.receiptCurrentPage = newPage;
    }
  }
};
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 85%;
  max-width: 90%;
  overflow-y: auto;
}
.close {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 25px;
  cursor: pointer;
}
.modal-header {
  background-color: #007bff;
  color: white;
}
.hello th {
  background-color: #007bff;
  color: white;
  text-align: center;
}

.modal-header th {
  padding: 10px;
  border: 1px solid #007bff;
}
</style>



