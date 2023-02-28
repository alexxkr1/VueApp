
<template>
  <div class="w-full">
    <div class="flex justify-content-between align-items-center mb-4">
      <span class="p-input-icon-left">
        <i class="pi pi-search z-1" />
        <InputText placeholder="Search events" />
      </span>

      <div class="flex">
        <Button @click="eventsStore.isCreatingEvent = true" class="mr-2">
          <RouterLink to="/events/createEvent">Create Event</RouterLink>
        </Button>
      </div>
    </div>

    <div>

    </div>
    <div v-if="events.length === 0">
      <p>No events found for this organization.</p>
    </div>

    <div v-if="events && events.length > 0">
      <Card class="mb-4" v-for="event in events" :key="event.id">
        <template #content>
          <div class="container">
            <div class="image-container">
              <img class="w-10" alt="user header" src="./img.jpg">
            </div>
            <div class="text-container">
              <div>
                  <i class="pi pi-clone mr-2"></i><span>{{ event.name }}</span>
              </div>
              <div>
                  <i class="pi pi-calendar-times mr-2"></i><span>{{ event.start_datetime }}</span>
              </div>
              <div>
                  <i class="pi pi-map-marker mr-2"></i><span>{{ event.location }}</span>
              </div>
              <div class="text-right">
          <Button @click="eventsStore.isCreatingEvent = false;" class="mr-2">
            <RouterLink :to="{ name: 'CreateEvents',  params: { id: event.id } }"> <i class="pi pi-wrench mr-2"></i>Edit</RouterLink>
          </Button>
            <!-- <Button class="" @click="eventsStore.isCreatingEvent = false;" icon="pi pi-wrench">
            <RouterLink :to="{ name: 'CreateEvents', params: { id: event.id }  }"> <i class="pi pi-wrench"></i> Edit</RouterLink>
          </Button> -->
              </div>

            </div>
          </div>
        </template>

        <hr>
      </Card>
    </div>

    <br>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useEventsStore } from '../../stores/events'
import { useAuthStore } from '../../stores/auth';
const isEdit = ref(false);
const events = ref([]);

const eventsStore = useEventsStore();
const authStore = useAuthStore();


const setCurrentEvent = (event) => {
  eventsStore.isCreatingEvent = false;
  isEdit.value = true;
  eventsStore.setSelectedEvent(event);
};

onMounted(async () => {
  try {
    var organization_id = authStore.users.organization_id
    console.log(organization_id)
    const data = await eventsStore.getAllEventsById(organization_id);
    events.value = data;
    console.log(data)
  } catch (error) {
    console.error(error);
  }
});



</script>

<style scoped>
 .container {
  display: flex;
}

.image-container {
  flex: 1;
}

.text-container {
  flex: 2;
} 
</style>
