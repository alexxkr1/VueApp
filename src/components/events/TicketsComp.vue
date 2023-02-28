<template>
  <div class="w-full">
<div class="flex justify-content-between align-items-center mb-4">
        <span class="p-input-icon-left">
            <i class="pi pi-search z-1" />
            <InputText placeholder="Search Ticket" />
        </span>

        <div class="flex">
            <Button @click="eventsStore.showUpsertTicketModal = true" class="mr-2">Add new ticket</Button>
        </div>
        <UpsertTicketModalComp/>
    </div>
    <DataTable :value="eventsStore.ticketsComputed" responsiveLayout="scroll" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
      <Column field="id" header="ID"></Column>
      <Column field="ticketName" header="Ticket Name"></Column>
      <Column field="price" header="Ticket Price"></Column>
      <Column field="quantity" header="Ticket Quantity"></Column>
      <Column header="Delete Ticket">
        <template #body="slotProps">
          <Button @click="eventsStore.deleteTicket(slotProps.data.id)" class="mr-2">Delete</Button>
        </template>
        <!-- <template #body="slotProps">
          <div class="flex align-items-center">
              <i
                v-tooltip="
                  'Your camera url is not set. Please configure your camera to set the url.'
                "
                v-if="slotProps.data?.price === null"
                class="pi pi-exclamation-triangle text-900 text-2xl"
              ></i
              ><span v-else><Button @click="eventsStore.showUpsertTicketModal = true" class="mr-2">Delete</Button></span>
            </div>
        </template> -->
      </Column>
    </DataTable>

  </div>
  </template>
  

  <script setup>
  import { reactive, onMounted } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import UpsertTicketModalComp from '../../components/events/UpsertTicketComp.vue'
  import { useEventsStore } from '../../stores/events';
  
const eventsStore = useEventsStore()

  onMounted(async() => {
    try {
    await eventsStore.getTickets(eventsStore.events.id);
  
  } catch (error) {
    console.error(error);
  }
})


  const state = reactive({
    ticketName: '',
    saleStartDate: '',
    price: null,
    totalAmount: null,
    ticketDescription: ''
  });
  
  const rules = {
    ticketName: { required },
    price: { required },
    totalAmount: { required }
  };
  
  const v$ = useVuelidate(rules, state);
  
  function createTicket() {
    if (v$.value.$invalid) {
      v$.touch();
      return;
    }
    
    // API call to create ticket
  }
  </script>
  