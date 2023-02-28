<template>
    <div class="surface-card p-4 shadow-1 border-round w-full  root">
      <div class="mb-5">
        <div class="label mb-3">Edit an Event</div>
      </div>
  
      <form class="p-fluid" @submit.prevent="handleSubmit">
        <div class="field">
          <div>
            <label for="event-name">Event Name*</label>
            <InputText v-model="eventsStore.events.name" id="event-name" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Event Location*</label>
            <InputText v-model="eventsStore.events.location" id="event-name" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-date">Date & Time*</label>
            <Calendar v-model="eventsStore.events.start_datetime" id="event-date" showTime="true" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-description">Description*</label>
            <InputText v-model="eventsStore.events.description" id="event-description" rows="5" />
          </div>
        </div>
        <div class="field">
          <div>
            <label>Tags*</label>
            <Dropdown v-model="eventsStore.events.tags" :options="tagOptions"  optionLabel="name" placeholder="Select tags" />
          </div>
        </div>
        <div class="field">
          <div>
            <label>Cover Image</label>
            <FileUpload v-model="state.eventCoverImage" name="event-cover-image" accept="image/*" maxFileSize="2000000"
              chooseLabel="Choose file" />
          </div>
        </div>
       
        <div class="field">
          <div>
            <label for="price-at-door">Price at Door</label>
            <InputNumber v-model="state.priceAtDoor" id="price-at-door" mode="currency" currency="USD" />
          </div>
        </div>
        <Button type="submit" label="Edit Event" class="mt-2" />
      </form>

   
    </div>
    <br>
   <Button @click="handleDelete" class="danger">Delete</Button>

  </template>
  
  <script setup>
import { reactive } from 'vue';
import axios from 'axios';
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { useEventsStore } from '../../stores/events';
import { useAuthStore } from '../../stores/auth';

const eventsStore = useEventsStore()
const submitted = ref(false);
const authStore = useAuthStore


const tagOptions = ref([
  { name: 'Concert', code: 'Concert' },
  { name: 'Festival', code: 'Festival' },
  { name: 'Theatre', code: 'Theatre' },
  { name: 'Comedy', code: 'Comedy' },
  { name: 'Art', code: 'Art' },
  { name: 'Sport', code: 'Sport' },
  { name: 'Conference', code: 'Conference' },
  { name: 'Workshop', code: 'Workshop' },
  { name: 'Food', code: 'Food' },
  { name: 'Party', code: 'Party' },
])


const props = defineProps({
    eventId: {
      type: String,
      default: 'Empty'
    }
})

onMounted(async () => {


console.log('event id', props.eventId)
await eventsStore.getEvent(props.eventId)

})


const handleDelete = () => {
  eventsStore.deleteEvent(eventsStore.events.id)
}

const handleSubmit = () => {
  submitted.value = true
  eventsStore.updateEvent(eventsStore.events.id, eventsStore.events.name, eventsStore.events.location, eventsStore.events.start_datetime , eventsStore.events.description, eventsStore.events.tags.code);
}

const state = reactive({
  //eventName: '',
  eventName: props.isEdit ? props.selectedEvent.name : "",
  eventDate: '',
  eventDescription: '',
  eventTags: [],
  eventCoverImage: null,
  eventFlyer: null,
  priceAtDoor: null
});


</script>
