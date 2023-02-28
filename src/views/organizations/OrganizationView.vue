<template>
    <div class="w-full">
      <TabView>
        <TabPanel>
          <template #header>
            <i class="pi pi-sliders-v mr-2"></i>
            <span>Defaults</span>
          </template>
          <DefaultsComp/>
        </TabPanel>
   
        <TabPanel>
          <template #header>
            <i class="pi pi-money-bill mr-2"></i>
            <span>Billing Settings</span>
          </template>
          <BillingsComp/>
        </TabPanel>
  
        <TabPanel>
          <template #header>
            <i class="pi pi-users mr-2"></i>
            <span>User management</span>
          </template>
          <UserManagementComp/>
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="pi pi-code mr-2"></i>
            <span>Integration</span>
          </template>
          <IntegrationComp/>
        </TabPanel>
      </TabView>
    </div>
  </template>
  
  <script setup>
  import UserManagementComp from '../../components/organization/UserManagamentComp.vue'
  import BillingsComp from '../../components/organization/BillingsComp.vue'
  import IntegrationComp from '../../components/organization/IntegrationComp.vue';
  import DefaultsComp from '../../components/organization/DefaultsComp.vue';

  </script>
  
  <style lang="scss" scoped>
  ::v-deep(.p-tabview) {
    padding: 0;
  
    .p-tabview-nav {
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
    }
  
    .p-tabview-nav li .p-tabview-nav-link {
      border: solid var(--surface-d);
      border-width: 0 0 2px 0;
      border-color: transparent transparent var(--surface-d) transparent;
      background: var(--surface-a);
      font-weight: 700;
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      transition: box-shadow 0.2s;
      margin: 0 0 -2px 0;
      height: 54px;
    }
  
    .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      border-width: 0 0 2px 0;
      border-color: transparent transparent var(--primary-color) transparent;
      color: var(--primary-color);
      outline: none;
      outline-offset: 0;
      box-shadow: none;
    }
  }
  


  ::v-deep(.p-tabview-panels) {
    background: none;
    padding: 2rem 0;
    border: 0 none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  </style>
  