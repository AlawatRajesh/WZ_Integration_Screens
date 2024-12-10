<!-- <template>
  
  <b-modal
    :visible="isModalVisible"
    @update:visible="handleModalVisibility"
    aria-labelledby="modal-title"
     size="xl"
  >
 
    <h5 class="Zoho-modal-title" id="modal-title">Receipt History for {{ customer.name }}</h5>
    <b-table :items="paginatedReceipts" :fields="fields" bordered hover class="Zoho-tables">
      <template v-slot:cell(resync)="data">
      <b-button 
        variant="success" 
        :disabled="false">  
        Sync
      </b-button>
      </template>
    </b-table>
    <div v-if="!customer.receipts || customer.receipts.length === 0">
      <p id="Zoho-receipt"> No receipts found for this customer.</p>
    </div>
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
      
      fields: [
        { key: 'referenceNumber', label: 'Receipt No' },
        { key: 'workshopId', label: 'Receipt Date' },
        //{ key: 'message', label: 'Message' },
        { key: 'status', label: 'Status' },
        { key: 'resync', label: 'Resync' }
      ],
      itemsPerPage: 10, 
      receiptCurrentPage: 1, 
    };
  },
  computed: {
    paginatedReceipts() {
      const startIndex = (this.receiptCurrentPage - 1) * this.itemsPerPage;
      const sortedReceipts = this.customer.receipts.sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedReceipts.slice(startIndex, startIndex + this.itemsPerPage);
    }
  },
  
  methods: {
    handleModalVisibility(val) {
      this.$emit('update:isModalVisible', val);
    },
    onReceiptPageChanged(newPage) {
      this.receiptCurrentPage = newPage;
    },
  
  },
  
};
</script> -->

<template>
  <b-modal
    :visible="isModalVisible"
    @update:visible="handleModalVisibility"
    aria-labelledby="modal-title"
    size="xl"
  >
    <h5 class="Zoho-modal-title" id="modal-title">Receipt History for {{ customer.name }}</h5>
    <b-table :items="paginatedReceipts" :fields="fields" bordered hover class="Zoho-tables">
      <template v-slot:cell(resync)="data">
        <b-button variant="success" :disabled="false">Sync</b-button>
      </template>
    </b-table>
    <div v-if="!customer.receipts || customer.receipts.length === 0">
      <p id="Zoho-receipt"> No receipts found for this customer.</p>
    </div>
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
      fields: [
        { key: 'referenceNumber', label: 'Receipt No' },
        { key: 'workshopId', label: 'Receipt Date' },
        { key: 'status', label: 'Status' },
        { key: 'resync', label: 'Resync' }
      ],
      itemsPerPage: 10, 
      receiptCurrentPage: 1, 
    };
  },
  computed: {
    paginatedReceipts() {
      if (!this.customer.receipts || this.customer.receipts.length === 0) {
        return []; 
      }

      const startIndex = (this.receiptCurrentPage - 1) * this.itemsPerPage;
      return this.customer.receipts.slice(startIndex, startIndex + this.itemsPerPage);
    }
  },
  methods: {
    handleModalVisibility(val) {
      this.$emit('update:isModalVisible', val);
    },
    onReceiptPageChanged(newPage) {
      this.receiptCurrentPage = newPage;
    },
  },
};
</script>


<style> 
.Zoho-tables{
  user-select: none;
}
#Zoho-receipt{
  text-align: center;
}
</style>


