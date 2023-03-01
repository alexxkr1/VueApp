import { defineStore } from 'pinia'
import { httpClient } from "../axios";
import axios from 'axios';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const errorMessage = ref("");
    const router = useRouter()
    const showUpsertUserModal = ref(false)

    const users = reactive({
        id: '',
        name: '',
        email: '',
        organization_id: '',
        role: ''
      })

     
    const invites = ref([]) 

    function setErrorMessage(error) {
        if (error.response) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = "Something went wrong. Please try again later.";
        }
    }


    async function signUp(name, email, password, token){
        try {
            errorMessage.value = "";
            const { data } = await httpClient.post('/registration', {
               name,
               email,
               password,        
               token
            })
            console.log(email,token)
            router.push('login')
        } catch (error) {
            setErrorMessage(error);
        }
    }

    async function signIn(email, password) {
        try {
            errorMessage.value = "";
            const { data } = await httpClient.post('/login',{
                email,
                password
            });
            localStorage.setItem('token', data.token);
            router.push('/dashboard')
        } catch (ex) {
            setErrorMessage(ex);
        }
    }

    async function getUser() {
        try {
            const token = axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
            errorMessage.value = "";
            const { data } = await axios.get('https://100.26.237.62:3000/userData', {
                token: token
            });

            users.id = data.results[0].id
            users.name = data.results[0].name
            users.email = data.results[0].email
            users.organization_id = data.results[0].organization_id
            users.role = data.results[0].role
     
        } catch (error) {
            setErrorMessage(error);
        }
    }

    async function logout() {
        localStorage.setItem('token', '') // store token in local storage
        router.push('/login')
    } 

    async function getInvites() {
        try {
            const response = await httpClient.post('/invites', {
                organization_id: users.organization_id,
            });
            invites.value = response.data;
          } catch (error) {
            console.error(error);
        }
    }

    async function inviteUser(email, selectedRole){
        try {
            const { data } = httpClient.post('/invite', {
                email,
                selectedRole,
                organization_id: users.organization_id,
            })
        
        } catch (error) {
            setErrorMessage(error)
        }
    }


    const usersInvitedComputed = computed(() => {
        return invites.value.map((invite, index) => ({
            id: index + 1,
            email: invite.email,
            used_at: invite.used_at,
            expires_at: invite.expires_at,
            status: invite.used_at ? 'Accepted' : (invite.used_at === null ? 'Pending' : 'Pending'),
            role: invite.role
        }));
    });

    




      
  return { errorMessage, signIn, signUp, logout, getUser, users, invites, getInvites, usersInvitedComputed, showUpsertUserModal, inviteUser }
})
