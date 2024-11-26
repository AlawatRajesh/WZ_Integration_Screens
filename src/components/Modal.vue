<template>
  <div class="modal" @click="handleOutsideClick">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal" aria-label="Close modal" ref="closeButton">&times;</span>
      <!-- <h2>Receipt History of {{ customer.name }}</h2> -->
      <table>
        <thead>
          <tr class="hello">
            <th>Receipt No</th>
            <th>Receipt Date</th>
            <th>Message</th>
            <th>Status</th>
            <th>Resync</th>
          </tr>
        </thead>
        <tbody>
          <!-- Display a row with 'No receipt history available' when no receipts exist -->
          <tr v-if="!customer || !customer.receipts || customer.receipts.length === 0">
            <td colspan="5" class="text-center">No receipt history available.</td>
          </tr>
          <!-- Render receipt rows when receipts are available -->
          <tr v-for="receipt in pagedReceipts" :key="receipt.receiptId">
            <td>{{ receipt.receiptId }}</td>
            <td>{{ receipt.date }}</td>
            <td>{{ receipt.message }}</td>
            <td>{{ receipt.status }}</td>
            <td>
              <button @click="syncReceipt(receipt)" class="btn btn-success" :disabled="isSyncing">
                {{ isSyncing ? 'Syncing...' : 'Sync' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination will only be shown if receipts are present -->
      <Pagination
        v-if="customer && customer.receipts && customer.receipts.length > 0"
        :total-items="customer.receipts.length"
        :items-per-page="itemsPerPage"
        :current-page="receiptCurrentPage"
        @page-changed="onReceiptPageChanged"
      />
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default {
  components: {
    Pagination
  },
  props: {
    customer: {
      type: Object,
      default: ()=>({})
    }
  },
  data() {
    return {
      itemsPerPage: 10,
      receiptCurrentPage: 1,
      isSyncing: false, // Optional: for syncing state
    };
  },
  computed: {
    pagedReceipts() {
      if (!this.customer || !this.customer.receipts) return [];  // Handle case when customer or receipts is null

      const startIndex = (this.receiptCurrentPage - 1) * this.itemsPerPage;

      // Sort receipts by date (descending) and by receiptId (ascending) if dates are the same
      const sortedReceipts = [...this.customer.receipts].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateB - dateA !== 0) {
          return dateB - dateA; // Sort by date descending
        }

        return a.receiptId - b.receiptId; // If same date, sort by receiptId ascending
      });

      return sortedReceipts.slice(startIndex, startIndex + this.itemsPerPage);
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onReceiptPageChanged(newPage) {
      this.receiptCurrentPage = newPage;
    },
    handleOutsideClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    },
    async syncReceipt(receipt) {
      this.$emit('sync-receipt', receipt); // Notify the parent component
      try {
        this.isSyncing = true;
        await api.syncReceipt(receipt);  // Assume this API call exists
        this.isSyncing = false;
      } catch (error) {
        this.isSyncing = false;
        console.error('Sync failed:', error);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.closeButton) {
        this.$refs.closeButton.focus();
      }
    });
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
  width: 75%;
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
