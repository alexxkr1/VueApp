<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="text-3xl font-medium text-900 mb-3">Organization Defaults</div>
    <div class="font-medium text-500 mb-3">Organization</div>
        <form class="p-fluid" @submit.prevent="handleSubmit" >
        <div class="field">
          <div>
            <label for="event-name">Organization Name</label>
            <InputText  v-model="organizationStore.organization.name" id="event-name" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Registry number</label>
            <InputText v-model="organizationStore.organization.registry_number" id="registry_number" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Phone number</label>
            <InputText v-model="organizationStore.organization.phone_number" id="phone_number" />
          </div>
        </div>
        <br>
        <div class="font-medium text-500 mb-3">Legal address</div>
        <div class="field">
          <div>
            <label for="event-name">Country</label>
            <InputText v-model="organizationStore.organization.country" id="country" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">City</label>
            <InputText v-model="organizationStore.organization.city" id="city" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Street</label>
            <InputText v-model="organizationStore.organization.street" id="street" />
          </div>
        </div>
        <div class="field">
          <div>
            <label for="event-name">Organization URL</label>
           <p>  <a style="color: blue" :href="`https://master.d1x7vys3fc5yj6.amplifyapp.com/organizations/${authStore.users.organization_id}`">
            https://master.d1x7vys3fc5yj6.amplifyapp.com/{{ authStore.users.organization_id }}
</a></p>
          </div>
        </div>

        <a>Organization url</a>
        <Button type="submit" label="Submit" class="mt-2" />
      </form>
   
</div>
</template>


<script setup>
import { useAuthStore } from '../../stores/auth';
import { useOrganizationStore } from '../../stores/organization'
import { onMounted } from 'vue';

onMounted(async () => {

  var id = authStore.users.organization_id
  console.log(id)
  await organizationStore.getOrganization(id)

  })



const authStore = useAuthStore()
const organizationStore = useOrganizationStore()


const handleSubmit = async () => {
  const id = authStore.users.organization_id
  const data = {
    name: organizationStore.organization.name,
    country: organizationStore.organization.country,
    registry_number: organizationStore.organization.registry_number,
    phone_number: organizationStore.organization.phone_number,
    street: organizationStore.organization.street,
    city: organizationStore.organization.city
  }
  await organizationStore.updateOrganization(id, organizationStore.organization.name, data.registry_number ,data.phone_number, data.country, data.city, data.street )
}




</script>