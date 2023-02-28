<template>
    <div class="surface-card p-4 shadow-1 border-round w-full  root">
      <div class="mb-5">
        <div class="label mb-3">Create an Event</div>
      </div>
  
      <form class="p-fluid" @submit.prevent="handleSubmit">
        <div class="field">
          <div>
            <label for="event-name">Event Name*</label>
            <InputText v-model="state.eventName" id="event-name" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Event Location*</label>
            <InputText v-model="state.eventLocation" id="event-name" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-date">Date & Time*</label>
            <Calendar v-model="state.eventDate" id="event-date" showTime="true" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-description">Description*</label>
            <InputText class="p-inputtextarea" v-model="state.eventDescription" id="event-description" rows="5" cols="30" />
          </div>
        </div>
        <div class="field">
          <div>
            <label>Tags*</label>
            <!-- v-model="state.selectedRole" :options="roles" -->
            <Dropdown v-model="state.eventTags" :options="tagOptions" optionLabel="name" placeholder="Select tags" />
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
        <Button type="submit" label="Create Event" class="mt-2" />
      </form>
    </div>


  </template>
  
  <script setup>
import { reactive } from 'vue';
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { useEventsStore } from '../../stores/events';
import { useAuthStore } from '../../stores/auth';

const eventsStore = useEventsStore()
const authStore = useAuthStore()
const submitted = ref(false);

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



const handleSubmit = () => {
  submitted.value = true
  const organization_id = authStore.users.organization_id
  eventsStore.createEvent(organization_id,state.eventName, state.eventLocation, state.eventDate , state.eventDescription, state.eventTags.code);
  router.push('/events')
}
const router = useRouter()

onMounted(async()=>{

  } 
)

const state = reactive({
  //eventName: '',
  eventName: "",
  eventDate: '',
  eventLocation: '',
  eventDescription: '',
  eventTags: null,
  eventCoverImage: null,
  eventFlyer: null,
  priceAtDoor: null
});



</script>
