<template>
    <div class="surface-card p-4 shadow-1 border-round w-full lg:w-6 root">
      <div class="mb-5">
        <div class="label mb-3">Create Organization</div>
      </div>
  
      <form class="p-fluid" @submit.prevent="createOrganization">
        <div class="field">
          <div>
            <label for="name">Organization Name*</label>
            <InputText v-model="state.organizationName" id="organizationName" />
            <div class="p-error" v-if="v$.organizationName.$error">Organization name required </div>
          </div>
        </div>
        
        <Button type="submit" label="Create Organization" class="mt-2" />
       
      </form>
    </div>
  </template>
  
  
  <script setup>
  import { reactive, computed, onMounted, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
import { httpClient } from '../../axios';
  
  const uId = ref(''); 
  onMounted(async()=>{
  const damn = axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
  console.log(damn)
  
  console.log()
  const response = await httpClient.get('/userData', damn);
  console.log(response.data.results[0])

  uId.value = response.data.results[0].id;

}
)


  const router = useRouter();
  
  const state = reactive({
    organizationName: '',
  })
  const damn = axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
  const rules = computed(() => {
    return {
      organizationName: {required},
    }
  });
  const v$ = useVuelidate(rules, state)
  
  const createOrganization = async () => {
    const result = await v$.value.$validate()
    if (result) {
      const data = {
        name: state.organizationName,
        id: uId.value
      };
    
      httpClient.post('/organizations', data, damn)
        .then(response => {
          console.log(response.data);
          router.push('/dashboard');
        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    }
  }
  </script>
  