<template>
    <Dialog
    header="Create new ticket"
    v-model:visible="eventsStore.showUpsertTicketModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', zIndex: 2 }"
    :closable="false"
    >
    <template #header>
            <h1>Create new ticket</h1>

        </template>
      
        <form class="p-fluid" >
        <div class="field">
          <div>
            <label for="ticket-name">Ticket Name*</label>
            <InputText v-model="state.ticketName" id="ticket-name" />
            <div class="p-error" v-if="v$.ticketName.$error">Ticket name required</div>
          </div>
        </div>
  <div class="field">
          <div>
            <label for="ticket-description">Description</label>
            <InputText v-model="state.ticketDescription" id="ticket-description" rows="5" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="price">Price*</label>
            <InputNumber v-model="state.price" id="price" mode="decimal"  />
            <div class="p-error" v-if="v$.price.$error">Price required</div>
          </div>
        </div>
        <div class="field">
          <div>
            <label for="total-amount">Total Amount*</label>
            <InputNumber v-model="state.totalAmount" id="total-amount" mode="decimal" />
            <div class="p-error" v-if="v$.totalAmount.$error">Total amount required</div>
          </div>
        </div>
      
  
      </form>
        <template #footer>
            <Button @click="eventsStore.showUpsertTicketModal = false" label="Cancel" />
            <Button  @click="handleSubmit" label="Create" />
        </template>
    </Dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useEventsStore } from '../../stores/events';

const eventsStore = useEventsStore()

const submitted = ref(false);


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



const handleSubmit = async () => {

    submitted.value = true;
    const result = await v$.value.$validate()
    if (result) {
         eventsStore.createTicket(state.ticketName, state.ticketDescription, state.price, state.totalAmount)
    }
}
    

</script>