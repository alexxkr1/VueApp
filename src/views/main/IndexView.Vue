<template>
    <!-- <div class="grid">
    <div class="col"></div>
    <div class="col">

    <div class="p-input-icon-left w-max">
        <i class="pi pi-search"/>
        <InputText type="text" v-model="value1" placeholder="Search" class="w-full"/>
    </div>
    <Card v-for="event in events" :key="event.id" class="my-4">
        <template #header>
            <img alt="user header" src="./batman.jpg">
        </template>
        <template #title>
            {{ event.EventName }}
        </template>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        </template>
    </Card>
    </div>
    <div class="col"></div>
</div> -->

<div class="card">
    <div class="flex card-container blue-container overflow-hidden">
        <div class="flex-none flex"></div>
        <div class="flex-grow-1  bg-blue-500 font-bold text-white m-2 px-5 py-3 border-round">
            <div class="InputSize">
                <span class="p-input-icon-left">
                    <i class="pi pi-search"/>
                    <InputText type="text" v-model="value1" placeholder="Search" class="w-full"/>
                 </span>
            </div>
            


            <Card v-for="event in events" :key="event.id" class="my-4">
                <template #header>
                    <img alt="user header" src="./batman.jpg" >
                </template>
                <template #title>
                    {{ event.EventName }}
                </template>
                <template #content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </template>
                <template #footer>
                    <Button icon="pi pi-check" label="Save" />
                    <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
                </template>
            </Card>

        </div>
        <div class="flex-none flex"></div>
    </div>
</div>

  </template>
  
<script>
  export default {
    data() {
      return {
        events: []
      };
    },
    mounted() {
      fetch('https://2ce5-84-50-88-149.eu.ngrok.io/events')
        .then(response => response.json())
        .then(data => {
          this.events = data;
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }
  };
  </script>
  

<style>


.InputSize{
    width: max-content;
}

</style>