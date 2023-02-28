<template>
    <Dialog
    header="Invite new user"
    v-model:visible="authStore.showUpsertUserModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', zIndex: 2 }"
    :closable="false"
    >
    <template #header>
            <h1>Invite new user</h1>

        </template>
        <form>
            <small v-if="authStore.errorMessage" class="p-error">{{
      authStore.errorMessage
    }}</small> 
            <div class="col-12 md:col-12">
                <div class="p-inputgroup w-20rem">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText v-model="state.email" placeholder="Email" />

                </div>
                <span v-if="v$.email.$error && submitted">
          <span
            id="name-error"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", "Email")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.email.$invalid && submitted) || v$.email.$pending.$response
          "
          class="p-error"
          >{{ v$.email.required.$message.replace("Value", "Email") }}</small
        >
            </div>
           
            <div>
                <Dropdown class=" w-21rem" v-model="state.selectedRole" :options="roles" optionLabel="name"
                placeholder="Select a Role" />
            </div>
            
                <span v-if="v$.selectedRole.$error && submitted">
          <span
            id="selectedRole-error"
            v-for="(error, index) of v$.selectedRole.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", "Role")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.selectedRole.$invalid && submitted) || v$.selectedRole.$pending.$response
          "
          class="p-error"
          >{{ v$.selectedRole.required.$message.replace("Value", "Role") }}</small
        >
        </form>

        <template #footer>
            <Button @click="authStore.showUpsertUserModal = false" label="Cancel" />
            <Button  @click="handleSubmit" label="Invite" />
        </template>
    </Dialog>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const submitted = ref(false);

const rules = {
    selectedRole: { required },
    email: { required, email },
};

const state = reactive({
  selectedRole: null,
  email: '',
  organizationId: ''
})

const roles = ref([
    { name: 'Admin', code: 'admin' },
    { name: 'Promoter', code: 'promoter' },
    { name: 'Member', code: 'member' },
])

const v$ = useVuelidate(rules, state);


const authStore = useAuthStore()

const handleSubmit = async () => {
    console.log(5)
    submitted.value = true;
    const result = await v$.value.$validate()
    if (result) {
         authStore.inviteUser(state.email, state.selectedRole.code)
    }

   
}
    

</script>