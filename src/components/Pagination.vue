<template>
  <div class="pagination">
    <button 
      :disabled="currentPage === 1" 
      @click="goToPage(currentPage - 1)"
       aria-label="Go to previous page"
    >
      Previous
    </button>
    <span></span>
    <button 
      :disabled="currentPage === totalPages" 
      @click="goToPage(currentPage + 1)"
      aria-label="Go to next page"

    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: Number,
    itemsPerPage: Number,
    currentPage: Number
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: right;
  align-items: right;
  gap: 5px;
  margin-top: 20px;
}
button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
button{
  background-color: #007bff;
  border-radius: 10%;
}

</style>
