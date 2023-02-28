<template>
    <div class="flex root relative">
      <NavigationSidebarComp class="fixed" />
  
      <div class="w-full right-content">
        <Toast />
        <NavigationTopPanelComp />
  
        <div class="flex w-full content-body p-4">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useToast } from "primevue/usetoast";
  import NavigationSidebarComp from "../components/NavigationSidebar/NavigationSidebarComp.vue";
  import NavigationTopPanelComp from "../components/NavigationTopPanel/NavigationTopPanelComp.vue";

  
  const toast = useToast();  

toast.add({
    severity: "error",
    summary: "Error message",
    life: 3000,
        });
 
  </script>
  
  <style scoped>
  .root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .right-content {
    margin-left: 240px;
    overflow-x: auto;
  }
  </style>
  