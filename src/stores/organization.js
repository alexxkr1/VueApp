import { defineStore } from 'pinia'
import { httpClient } from "../axios";
import axios from 'axios';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useOrganizationStore = defineStore('organization', () => {
    const errorMessage = ref("");
    const router = useRouter()

    const organization = reactive({
        id: '',
        name: '',
        registry_number: '',
        phone_number: '',
        country: '',
        city: '',
        street: '',
      })

    function setErrorMessage(error) {
        if (error.response) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = "Something went wrong. Please try again later.";
        }
    }

    async function getOrganization(organization_id) {
        
        try {
            errorMessage.value = "";
            console.log('this is', organization_id)
      const { data } = await httpClient.get(`/organization/${organization_id}`);

            organization.name = data.organization.name
            organization.country = data.organization.country
            organization.city = data.organization.city
            organization.street = data.organization.street
            organization.phone_number = data.organization.phone_number
            organization.registry_number = data.organization.registry_number
            console.log(organization)
        } catch (error) {
           setErrorMessage(error)
        }
    }

    async function updateOrganization(organization_id, name, registry_number, phone_number,  country, city, street,  ) {
        try {
            errorMessage.value = "";
            const { data } = await httpClient.put(`/organization/${organization_id}`, {
                
                name,
                phone_number,
                registry_number,
                country,
                city,
                street,

            
                
            }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            
        } catch (error) {
            setErrorMessage(error)
        }
    }


      
  return { errorMessage, getOrganization, organization, updateOrganization  }
})
