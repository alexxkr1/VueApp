<template>
  <div class="flex justify-content-center align-items-center w-full content-body p-4"> 
    <div class="surface-card p-4 shadow-1 border-round w-full lg:w-6 root">
      <div class="text-center mb-5">
        <img src="./happenFind.png" alt="Image" width="150" height="150">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"><router-link to="/signup">Create today!</router-link></a>
    </div>

    <form class="p-fluid" @submit.prevent="handleSubmit">
      <div>
        <small v-if="authStore.errorMessage" class="p-error">{{
      authStore.errorMessage
    }}</small>
        <div>
          <label :class="{ 'p-error': v$.email.$invalid && submitted }" for="email">Email*</label>
          <InputText :class="{ 'p-invalid': v$.email.$invalid && submitted }" v-model="state.email" id="email" />
          <span v-if="v$.email.$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.email.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", " Email")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.email.$invalid && submitted) || v$.email.$pending.$response
          "
          class="p-error"
          >{{ v$.email.required.$message.replace("Value", "Email") }}</small>
        </div>
      </div>
      <div>
        <div>
          <label :class="{ 'p-error': v$.password.$invalid && submitted }" for="password">Password*</label>
          <InputText :class="{ 'p-invalid': v$.password.$invalid && submitted }" v-model="state.password" id="password" type="password" />
          <span v-if="v$.password.$error && submitted">
          <span
            id="password-error"
            v-for="(error, index) of v$.password.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", " Password")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.password.$invalid && submitted) || v$.password.$pending.$response
          "
          class="p-error"
          >{{ v$.password.required.$message.replace("Value", "Password") }}</small>
        </div>
      </div>
      <Button icon="pi pi-user" type="submit" label="Login" class="mt-2" />
      <!-- <div class="mt-2">
        <small>
          Don't have an account? <router-link to="/signup">Sign up</router-link>
        </small>
      </div> -->
    </form>
  </div>
  </div>

 
 
</template>


<script setup>
import { reactive, computed, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'

const submitted = ref(false);
const authStore = useAuthStore()

const state = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required },
  }
});

const v$ = useVuelidate(rules, state)


const handleSubmit = async () => {
  submitted.value = true;

  const result = await v$.value.$validate()
  if (result) {
     authStore.signIn(state.email, state.password);
  }
}

</script>