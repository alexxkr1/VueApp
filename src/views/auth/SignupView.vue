<template>
  <div class="flex justify-content-center align-items-center w-full content-body p-4">
  <div class="surface-card p-4 shadow-1 border-round w-full lg:w-6 root">
    <div class="mb-5">
      <div class="label mb-3">Sign up</div>
    </div>

    <form class="p-fluid" @submit.prevent="handleSubmit">
      <small v-if="authStore.errorMessage" class="p-error">{{
      authStore.errorMessage
    }}</small> 
      <div class="field">
        <div>
          <label :class="{ 'p-error': v$.name.$invalid && submitted }" for="name">Name*</label>
          <InputText :class="{ 'p-invalid': v$.name.$invalid && submitted }" v-model="state.name" id="name" />
          <span v-if="v$.name.$error && submitted">
          <span
            id="name-error"
            v-for="(error, index) of v$.name.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", " Name")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.name.$invalid && submitted) || v$.name.$pending.$response
          "
          class="p-error"
          >{{ v$.name.required.$message.replace("Value", "Name") }}</small
        >
        </div>
      </div>
      <div class="field">
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
        <div class="field">
          <div>
          <label :class="{ 'p-error': v$.password.$invalid && submitted }" for="password">Password*</label>
          <!-- <label for="password" :class="{ 'p-error': v$.password.$invalid && submitted }">Password*</label> -->
          <Password id="password" v-model="state.password" :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            toggleMask>
            <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer="sp">
              {{ sp.level }}
              <Divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
          <span v-if="v$.password.$error && submitted">
          <span
            id="password-error"
            v-for="(error, index) of v$.password.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", "Password")
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
      </div>
      <div class="field">
        <div>
          <label :class="{ 'p-error': v$.verifyPassword.$invalid && submitted }" for="verifyPassword">Verify Password*</label>
          <InputText :class="{ 'p-invalid': v$.verifyPassword.$invalid && submitted }" v-model="state.verifyPassword" id="verifyPassword" type="password" />
          <span v-if="v$.verifyPassword.$error && submitted">
          <span
            id="password-error"
            v-for="(error, index) of v$.verifyPassword.$errors"
            :key="index"
          >
            <small class="p-error">{{
              error.$message.replace("Value", "Verify Password")
            }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.verifyPassword.$invalid && submitted) || v$.verifyPassword.$pending.$response
          "
          class="p-error"
          >{{ v$.verifyPassword.required.$message.replace("Value", "Verify Password") }}</small>

        </div>
      </div>
      <Button type="submit" label="Sign up" class="mt-2" />
     
      <div class="mt-2">
        <small>
          Already have an account? <router-link to="/login">Sign in</router-link>
        </small>
      </div>
    
    </form>
  </div>
  </div>

</template>


<script setup>
import { reactive, computed, ref } from 'vue';
import Password from 'primevue/password';
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const submitted = ref(false);

const state = reactive({
  name: '',
  email: '',
  password: '',
  verifyPassword: ''
})

const rules = computed(() => {
  return {
    name: {required},
    email: { required, email },
    password: { required },
    verifyPassword: {required, sameAsPassword: sameAs(state.password) }
  }
});
const v$ = useVuelidate(rules, state)

const urlParams = new URLSearchParams(window.location.search);

const token = urlParams.get('token');


const handleSubmit = async () => {
  console.log(token)
  submitted.value = true;
  const result = await v$.value.$validate()
  if (result) {
     authStore.signUp(state.name, state.email, state.password, token);
  }
}

</script>