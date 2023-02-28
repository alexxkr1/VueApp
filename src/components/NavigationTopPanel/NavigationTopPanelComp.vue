<template>
  <div class="surface-card p-3 flex justify-content-between align-items-center max-h-4rem">
    <div class="flex align-items-center">
      <Button v-if="routeName !== 'Dashboard' && routeName !== 'Stores'" @click="goPreviousPage" icon="pi pi-arrow-left"
        class="p-button-rounded p-button-text text-800" />
      <div>

      </div>
    </div>

    <div ref="target" class="flex align-items-center">
      <div class="username">Hi, {{ authStore.users.name }}</div>

      <button class="button ml-3" @click="authStore.logout">
        Logout
      </button>
      <div v-if="showDropdown" class="dropdown">
        <button class="button dropdown-item">Account settings</button>
        <button class="button dropdown-item">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore()

const uuuu = () => {
  console.log()
}

const users = ref([]);
const uName = ref(''); 
const uOrgId = ref(''); 
onMounted(async()=>{

  await authStore.getUser()

  // if(!authStore.users.organization_id)
  //   router.push('/createOrganization')

  // const damn = axios.defaults.headers.common["Authorization"] =
  //               "Bearer " + localStorage.getItem("token");

  // const response = await axios.get('http://localhost:3000/userData', damn);
  // console.log(response.data.results[0])

  // uOrgId.value = response.data.results[0].organization_id;
  // uName.value = response.data.results[0].name

  //   console.log(users.value)

  // if (!uOrgId.value) {
  //   router.push('/createOrganization')
  // } 
}
)


const usersComputed = computed(() => {
      return users.value.map(users => ({
        id: users.id,
        email: users.email,
        name: users.used_at,
        organization_id: users.expires_at,
        role: users.role
      }));
    });







  const target = ref(null);
  const showDropdown = ref(false);


  const router = useRouter();

  const goPreviousPage = () => {
    router.go(-1);
  };

  const routeName = computed(() => {
    const route = router.currentRoute.value;
    const name = route.name;

    if (name === "stores") {
      return "Stores";
    }



    if (name === "reporting") {
      return "Reporting";
    }

    if (name === "organization-settings") {
      return "Organization settings";
    }

    return "Dashboard";
  });


</script>
  
<style scoped lang="scss">
.button {
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  text-align: left;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 5px;
}

.dropdown {
  position: absolute;
  width: 150px;
  top: 50px;
  right: 0;
  background-color: var(--surface-a);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-item {
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 10px;

  &:hover {
    background-color: var(--surface-d);
  }
}

.username {
  min-width: 150px;
  width: 100%;
  text-align: right;
}
</style>
  