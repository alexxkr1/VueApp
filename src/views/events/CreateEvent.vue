<template>
    <div class="w-full">
      <TabView>
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar-times mr-2"></i>
            <span>Event Management</span>
          </template>
          <div v-if="eventsStore.isCreatingEvent">
             <CreateEventComp />
          </div>
          <div v-else>
            <EditEventComp :selectedProduct="selectedProduct" :eventId="$route.params.id" />
         </div>
        </TabPanel>

  
        <TabPanel :disabled="eventsStore.isCreatingEvent">
          <template #header>
            <i class="pi pi-ticket mr-2"></i>
            <span>Tickets</span>
          </template>
          <TicketComp />
        </TabPanel>
        
        <TabPanel :disabled="eventsStore.isCreatingEvent">
          <template #header>
            <i class="pi pi-money-bill mr-2"></i>
            <span>Billing Settings</span>
          </template>
        
        </TabPanel>
       
      </TabView>
    </div>
  </template>
  


<script setup>
import CreateEventComp from '../../components/events/CreateEventComp.vue';
import EditEventComp from '../../components/events/EditEventComp.vue';
import TicketComp from '../../components/events/TicketsComp.vue'

import { useEventsStore } from '../../stores/events'
   
const eventsStore = useEventsStore()

const props = defineProps({
    eventId: {
      type: String,
      default: 'Empty'
    }
})


</script>



<style lang="scss" scoped>
::v-deep(.p-tabview) {
  padding: 0;

  .p-tabview-nav {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .p-tabview-nav li .p-tabview-nav-link {
    border: solid var(--surface-d);
    border-width: 0 0 2px 0;
    border-color: transparent transparent var(--surface-d) transparent;
    background: var(--surface-a);
    font-weight: 700;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    transition: box-shadow 0.2s;
    margin: 0 0 -2px 0;
    height: 54px;
  }

  .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    border-width: 0 0 2px 0;
    border-color: transparent transparent var(--primary-color) transparent;
    color: var(--primary-color);
    outline: none;
    outline-offset: 0;
    box-shadow: none;
  }
}



::v-deep(.p-tabview-panels) {
  background: none;
  padding: 2rem 0;
  border: 0 none;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
</style>
