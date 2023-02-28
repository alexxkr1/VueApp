<template>
    <Dialog 
    :visible="clientBaseStore.showUpsertClientModal"
    :closable="false"
    >
    <template #header>
        <h1>Add new client</h1>
    </template>
    <form action="">
        <div class="p-inputgroup w-20rem">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
            <InputText v-model="state.name" placeholder="Name" />
        </div>
        <br>
       <div class="p-inputgroup w-20rem">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>
            <InputText v-model="state.email" placeholder="Email" />
        </div>
    </form>
         <template #footer>
            <Button @click="clientBaseStore.showUpsertClientModal = false" label="Cancel" />
            <Button  @click="handleSubmit" label="Add" />
        </template>
       
    </Dialog>
   
</template>

<script setup>
import { useClientBaseStore } from '../../stores/clientbase'
import { reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';

const clientBaseStore = useClientBaseStore()
const authStore = useAuthStore()

const state = reactive({
    name: '',
    email: ''
})

const handleSubmit = async () => {
    var id = authStore.users.organization_id
  console.log(id)
    await clientBaseStore.createClient(id, state.name, state.email)
}

</script>