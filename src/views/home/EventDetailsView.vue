

<template>
  <!-- <Card>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
    <template #header>
        Ticket Card
    </template>
    <template #title>
       Choose ticket
    </template>
    <template #content>
      <select v-model="selectedTicket">
      <option v-for="ticket in ticketsComputed" :key="ticket.id">
        {{ ticket.ticketName }} - {{ ticket.price }} USD
      </option>
    </select>
    </template>
    <template #footer>
        <Button icon="pi pi-check"  label="Checkout!" @click="submit"></Button>
    </template>
</Card > -->
<div class="field">
          <div>
            <label for="event-description">Event Name*</label>
            <h1>{{ eventsStore.events.name }}</h1>
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-description">Description</label>
            <h1>{{ eventsStore.events.description }}</h1>
          </div>
        </div>
<div v-if="tickets.length === 0">
      <p>No tickets found for this event.</p>
    </div>

    <div width="50%" v-if="tickets && tickets.length > 0">
      <Card class="mb-4"  v-for="ticket in tickets" :key="ticket.id">
        <template #content>
          <div class="container">
            <div class="image-container">
              <img class="w-10" alt="user header" >
            </div>
            <div class="text-container">
              <p>{{ ticket.name }}</p>
              <p>{{ ticket.price }}</p>

            </div>
          </div>
        </template>
        <template #footer>
        <Button icon="pi pi-check"  label="Checkout!" @click="submit(ticket.name, ticket.price)"></Button>
    </template>
        <hr>
      </Card>
    </div>

  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
    
  </div>
</template>
<script setup>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';
import { onMounted, ref, reactive, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEventsStore } from '../../stores/events';
//import { useGtag } from "vue-gtag";

const state = reactive({
    ticketName: '',
    price: 5,
  });

const route = useRoute()
//const { gtag } = useGtag();

const eventsStore = useEventsStore()
const event_id = route.params.id
console.log(event_id)
const publishableKey = 'pk_test_51McBtDI8HJOEZscU5VoibUl5Xzlaau69H20FuD4wfAGc9qjkmVZxEfhhRDvFG6r0wT8dJKAGBLj9kylQt4VgwypU00RDEMUqUU';
const loading = ref(false);
const sessionId = ref(null);
const tickets = ref([]);
const checkoutRef = ref(null)


onMounted(async () => {
  try {
    const response = await eventsStore.getTickets(event_id);
    await eventsStore.getEvent(event_id)

    tickets.value = response;

    console.log(response)
  } catch (error) {
    console.error(error);
  }

  
  
});





async function createCheckoutSession( ) {
  try {
    const response = await axios.post('https://100.26.237.62:3000/create-checkout-session', {
      lineItems: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: state.price * 100, // price in cents
            product_data: {
              name: state.ticketName,
              description: 'Ticket for: ' + state.ticketName,
              images: ['https://example.com/image.jpg'],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      successURL: 'http://localhost:5174/success',
      cancelURL: 'http://localhost:5174/cancel',
    });

    sessionId.value = response.data.sessionId;
  } catch (error) {
    console.error(error);
  }
}

async function submit(name, price) {
  if (!sessionId.value) {
    state.ticketName = name;
    state.price = price;
    console.log(name, price)
    console.log('state', state.ticketName, state.price)
    await createCheckoutSession(state.ticketName, state.price);
  }
  checkoutRef.value.redirectToCheckout({ sessionId: sessionId.value });

  // Track the checkout event
  // gtag.event("purchase", {
  //     transaction_id: sessionId.value,
  //     value: price,
  //     currency: "USD",
  //     items: [
  //       {
  //         id: name,
  //         name: name,
  //         category: "Tickets",
  //         quantity: 1,
  //         price: price,
  //       },
  //     ],
  //   });
}


</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
