<template>
    <div class="w-full">




     <div class="flex justify-content-between align-items-center mb-4">
        <span class="p-input-icon-left">
            <i class="pi pi-search z-1" />
            <InputText placeholder="Search clients" />
        </span>

        <div class="flex">
            <Button @click="clientBaseStore.showUpsertClientModal = true" class="mr-2">Add new client</Button>
        </div>
        <UpsertClientModalComp/>
    </div>

    <div>
                    <DataTable :value="clientBaseStore.clientsComputed"  responsiveLayout="scroll"
            :paginator="true" :rows="10"
            >
                <Column field="name" header="Name" :sortable="true"></Column>
                <Column field="email" header="Email" :sortable="true"></Column>
                <Column field="category" header="Join date" :sortable="true"></Column>      
                <template #empty>
                    You have no clients added.
        </template>      
            </DataTable>
      
    </div>
    


    </div>


</template>

<script setup>
import { useClientBaseStore } from '../../stores/clientbase';
import UpsertClientModalComp from '../../components/clientbase/UpsertClientModalComp.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore()


onMounted(async () => {
    var id = authStore.users.organization_id
  console.log(id)
    await clientBaseStore.getClients(id)
    console.log('computed',clientBaseStore.clientsComputed)
})

const clientBaseStore = useClientBaseStore()

</script>