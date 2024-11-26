

// Vue.use(VueRouter);
// const app = new Vue({
//       el: '#app',
//       data() {
//         return {
//           selectedWorkshop: '',
//           searchCustomers: '',
//           filterType: 'all',
//           showModal: false,
//           workshops: [
//             { name: 'SS Workshop', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', 
//                 receipts: [
//                   { receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R002', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-12', message: 'Payment successful', status: 'success' },
//                   { receiptId: 'R004', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R005', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R006', date: '2024-11-12', message: 'Payment successful', status: 'success' },
//                   { receiptId: 'R007', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R008', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R009', date: '2024-11-12', message: 'Payment successful', status: 'success' },
//                   { receiptId: 'R0010', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R0011', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R0012', date: '2024-11-12', message: 'Payment successful', status: 'success' }
  
  
  
  
//                 ] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active',
//                  receipts: [
//                   { receiptId: 'R001', date: '2024-11-16', message: 'Payment Successful', status: 'success' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }
//                 ] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', 
//                 receipts: [
//                   { receiptId: 'R001', date: '2024-11-17', message: 'Payment Successful', status: 'success' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }
//                 ] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive',
//                  receipts: [
//                   { receiptId: 'R001', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }
//                 ] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', 
//                 receipts: [{ receiptId: 'R001', date: '2024-11-19', message: 'Payment Successful', status: 'success' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }

//                 ] },
//                 {customerId:6,name:'praveen',type:'Business',invoiceno:'1238',date:'2024-11-18',update:'Paid',status:'active'},
//                 {customerId:7,name:'nithin',type:'Individual',invoiceno:'1239',date:'2024-11-17',update:'Paid',status:'active'},
//                 {customerId:8,name:'viraj',type:'Individual',invoiceno:'1240',date:'2024-11-16',update:'Paid',status:'active'},
//                 {customerId:9,name:'vikas',type:'Individual',invoiceno:'1241',date:'2024-11-17',update:'Paid',status:'active'},
//                 {customerId:10,name:'rajveer',type:'Individual',invoiceno:'1242',date:'2024-11-14',update:'Paid',status:'active'},
//                 {customerId:11,name:'ali',type:'Individual',invoiceno:'1242',date:'2024-11-14',update:'Paid',status:'active'},
//             ]},
//             { name: ' RR Workshop ', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', 
//                 receipts: [
//                   { receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }
//                 ] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', 
//                 receipts: [
//                   { receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' },
//                   { receiptId: 'R002', date: '2024-11-17', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R003', date: '2024-11-18', message: 'Failed due to incorrect details', status: 'failed' },
//                   { receiptId: 'R004', date: '2024-11-15', message: 'Payment successful', status: 'success' }
//                 ] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//             ]},
//             { name: ' Praveen Workshop', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//             ]},
//             { name: ' Nithin Workshop', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//             ]},
//             { name: ' Rajesh Workshop ', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 6, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] }
//             ]},
//             { name: ' Ramesh Workshop ', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//             ]},
//             { name: ' Suresh Workshop ', customers: [
//                 { customerId: 1, name: 'Ram', type: 'Individual', invoiceno: '1233', date: '2024-11-15', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R001', date: '2024-11-10', message: 'Failed due to incorrect details', status: 'failed' }] },
//                 { customerId: 2, name: 'Rajesh', type: 'Individual', invoiceno: '1234', date: '2024-11-16', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R002', date: '2024-11-16', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 3, name: 'John', type: 'Individual', invoiceno: '1235', date: '2024-11-17', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R003', date: '2024-11-17', message: 'Payment Successful', status: 'success' }] },
//                 { customerId: 4, name: 'Mike', type: 'Business', invoiceno: '1236', date: '2024-11-18', update: 'Paid', status: 'inactive', receipts: [{ receiptId: 'R004', date: '2024-11-18', message: 'Failed due to technical issues', status: 'failed' }] },
//                 { customerId: 5, name: 'Alice', type: 'Individual', invoiceno: '1237', date: '2024-11-19', update: 'Paid', status: 'active', receipts: [{ receiptId: 'R005', date: '2024-11-19', message: 'Payment Successful', status: 'success' }] },
//             ]}
//           ],
//           customerDetails: [],
//           selectedCustomerReceipts: [],
//           currentPage: 1,
//           customersPerPage: 10,
         
            
//         };
//       },
//     methods: {
//         updateCustomerDetails() {
//           const selected = this.workshops.find(workshop => workshop.name === this.selectedWorkshop);
//           this.customerDetails = selected ? selected.customers : [];
//           this.currentPage = 1;
//         },
//         viewCustomerHistory(customer) {
//           this.selectedCustomer = customer;
//           this.selectedCustomerReceipts = customer.receipts || [];
         
//           this.showModal = true;
//         },
//         closeModal() {
//           this.showModal = false;
//         },
//         // Method to handle Sync button click
//         syncCustomer() {
    
//         this.showModal = true;  // Show the modal
//         },
//         handleBackdropClick(event) {
           
//             if (event.target === event.currentTarget) {
//               this.closeModal();
//             }
//           },

        
//         previousPage() {
//           if (this.currentPage > 1) {
//             this.currentPage -= 1;
//           }
//         },
//         nextPage() {
//           if (this.currentPage < this.totalPages) {
//             this.currentPage += 1;
//           }
//         },
//         goToPage(page) {
//           this.currentPage = page;
//         },
//       },
//       computed: {
//         filteredCustomers() {
//           return this.customerDetails.filter(customer => {
//             const searchTerm = this.searchCustomers.toLowerCase();
//             const matchSearch = customer.name.toLowerCase().includes(searchTerm) || customer.status.toLowerCase().includes(searchTerm);

//             const today = new Date();
//             const customerDate = new Date(customer.date);
//             let matchFilter = true;

//             customerDate.setHours(0, 0, 0, 0);
//             today.setHours(0, 0, 0, 0);

//             switch (this.filterType) {
//               case 'today':
//                 matchFilter = customerDate.toDateString() === today.toDateString();
//                 break;
//               case 'yesterday':
//                 const yesterday = new Date(today);
//                 yesterday.setDate(today.getDate() - 1);
//                 matchFilter = customerDate.toDateString() === yesterday.toDateString();
//                 break;
//               case 'this-week':
//                 const startOfWeek = new Date(today);
//                 startOfWeek.setDate(today.getDate() - today.getDay());
//                 matchFilter = customerDate >= startOfWeek && customerDate <= today;
//                 break;
//               case 'this-month':
//                 matchFilter = customerDate.getMonth() === today.getMonth() && customerDate.getFullYear() === today.getFullYear();
//                 break;
//               default:
//                 break;
//             }

//             return matchSearch && matchFilter;
//           });
//         },
//         customerCount() {
//             return this.filteredCustomers.length;
//           },
//         paginatedCustomers() {
//           const start = (this.currentPage - 1) * this.customersPerPage;
//           return this.filteredCustomers.slice(start, start + this.customersPerPage);
//         },
//         totalPages() {
//           return Math.ceil(this.filteredCustomers.length / this.customersPerPage);
//         },

        
//       }
//     });
//     function showSteps() {
//         var stepsElement = document.getElementById("steps");
        
//         // Toggle between showing and hiding the steps
//         if (stepsElement.style.display === "none") {
//           stepsElement.style.display = "block";
//         } else {
//           stepsElement.style.display = "none";
//         }
//       }