<template>
    <div class="flex justify-content-between align-items-center mb-4">
        <span class="p-input-icon-left">
            <i class="pi pi-search z-1" />
            <InputText placeholder="Search users" />
        </span>

        <div class="flex">
            <Button @click="authStore.showUpsertUserModal = true" class="mr-2">Add new user</Button>
        </div>
        <UpsertUserModalComp/>
    </div>



  
    <div>
      
<DataTable :value="authStore.usersInvitedComputed" responsiveLayout="scroll" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
  <Column field="id" header="ID"></Column>
  <Column field="email" header="Email"></Column>
  <Column field="expires_at" header="Expiration Date"></Column>
  <Column field="status" header="Status"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import UpsertUserModalComp from './UpsertUserModalComp.vue';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

onMounted(async() => {
    try {
    await authStore.getInvites();
  
  } catch (error) {
    console.error(error);
  }
})



const state = reactive({
  selectedRole: null,
  email: '',
  organizationId: ''
})

</script>