<template>
    <div class="container mx-auto py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="event in events" :key="event.id" class="rounded-lg overflow-hidden shadow-lg">
          <div class="px-4 py-4">
            <h2 class="text-lg font-medium text-gray-900 mb-2">{{ event.name }}</h2>
            <p class="text-gray-700 text-sm mb-2">{{ formatDate(event.start_datetime) }}</p>
            <p class="text-gray-700 text-sm">{{ event.description }}</p>
          </div>
          <div class="px-4 py-2 bg-gray-100">
            <router-link :to="{ name: 'event-details', params: { id: event.id } }" class="text-indigo-600 font-medium">View Details</router-link>
 </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
 
  const events = ref([]);
  console.log
  onMounted(async () => {
    const response = await axios.get('http://localhost:3000/events');
    events.value = response.data.events;
    console.log(events.value)
  });
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  </script>