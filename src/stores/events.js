import { defineStore } from 'pinia'
import { httpClient } from "../axios";
import axios from 'axios';
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useEventsStore = defineStore('events', () => {
    const showUpsertTicketModal = ref(false)
    const errorMessage = ref("");
    const router = useRouter()
    const isCreatingEvent = ref(true);

    const events = reactive({
        id: '',
        name: '',
        date: '',
        description: '',
        tags: '',
      })



      const tickets = ref([]) 
    function setErrorMessage(error) {
        if (error.response) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = "Something went wrong. Please try again later.";
        }
    }

    async function getEvent(eventId) {
        try {
            errorMessage.value = "";
            const { data } = await httpClient.get(`/even/${eventId}`);
            events.name = data.events[0].name
            events.description = data.events[0].description
            events.location = data.events[0].location
            events.start_datetime = data.events[0].start_datetime
            events.tags = data.events[0].tags
            events.id = data.events[0].id
        } catch (error) {
           setErrorMessage(error)
        }
    }

   async function createEvent( organization_id,name, location, start_datetime, description, tags, coverImage) {
    try {
        errorMessage.value = "";
        const formData = new FormData();
        formData.append('organization_id', organization_id);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('start_datetime', start_datetime);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('cover_image', coverImage);
    
        httpClient.post('/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // httpClient.post('/events', {
        //     organization_id,
        //     name,
        //     location,
        //     start_datetime,
        //     description,
        //     tags,
        //   }, {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   })
          router.push('/events')
    } catch (error) {
        setErrorMessage(error)
    }
   }
    
   async function updateEvent(id,name, location, start_datetime, description, tags) {
    try {
        errorMessage.value = "";
        httpClient.put(`/events/${id}`, {
          name,
          location,
          start_datetime,
          description,
          tags,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

    } catch (error) {
        setErrorMessage
    }
   }

   async function deleteEvent(id) {
    try {
        errorMessage.value = "";
        httpClient.delete(`/events/${id}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          router.push('/events')
    } catch (error) {
        setErrorMessage
    }
   }

   async function getAllEventsById(organization_id) {
    try {
      errorMessage.value = '';
      const { data } = await httpClient.get(`/eventss/${organization_id}`);
      console.log('data', data)
      return data.events;
    } catch (error) {
      setErrorMessage(error);
    }
  }

  async function createTicket(event_id, name, price, quantity) {
    try {
      errorMessage.value = ""
      const { data } = httpClient.post('/createTicket', {
        event_id: events.id,
        name,
        price,
        quantity
      })
    } catch (error) {
      setErrorMessage(error)
    }
  }

  async function deleteTicket(id){
    try {
      errorMessage.value = ''
      httpClient.delete(`/tickets/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
    } catch (error) {
      setErrorMessage(error)
    }
  }

  async function getTickets(event_id) {
    try {
        const response = await httpClient.post('https://100.26.237.62:3000/tickets', {
            event_id
        });
        tickets.value = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
    }
}

  const ticketsComputed = computed(() => {
    return tickets.value.map((ticket, index) => ({
        id: ticket.id,
        ticketName: ticket.name,
        price: ticket.price,
        quantity: ticket.quantity,
    }));
});
  
      
  return { errorMessage, events, isCreatingEvent, createEvent, updateEvent, getAllEventsById, getEvent, showUpsertTicketModal, createTicket, ticketsComputed, getTickets, deleteEvent, deleteTicket }
})
