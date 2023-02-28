import { defineStore } from 'pinia'
import { httpClient } from "../axios";
import axios from 'axios';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useClientBaseStore = defineStore('clientbase', () => {
    const errorMessage = ref("");
    const router = useRouter()
    const showUpsertClientModal = ref(false)
    const clients = ref([])

    function setErrorMessage(error) {
        if (error.response) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = "Something went wrong. Please try again later.";
        }
    }

   
    async function createClient(organization_id, name, email){
        try {
         errorMessage.value = ''
         const { data } = httpClient.post('/clients', {
            organization_id,
            name,
            email
         })
        } catch (error) {
            setErrorMessage(error)
        }
    }

    async function getClients(organization_id, name, email){
        try {
         errorMessage.value = ''
         console.log('hello')
         const  response  = await httpClient.get(`/clients/${organization_id}`, {
            name,
            email
         })
         console.log('this is response',response)
         clients.value = response.data;
         console.log('sda'.clients.value)
         console.log('hello')
        } catch (error) {
            setErrorMessage(error)
        }
    }

    const clientsComputed = computed(() => {
        return clients.value.map((client, index) => ({
            id: client.id,
            name: client.name,
            email: client.email,
        }));
    })

  return { errorMessage, createClient, showUpsertClientModal, getClients, clientsComputed  }
})
