<template>
    <div class="root flex flex-column card-container align-items-center">
    <div class="mb-4 mr-auto pl-3 pt-4">
      <h1>HappenFind</h1>
      <p style="font-size: smaller; font-style: italic;">Where the Fun is Always Happening</p>
    </div>

    <div>
      <PanelMenu
        @panel-close="() => (isActive = false)"
        @panel-open="() => (isActive = true)"
        :model="items"
      >
      </PanelMenu>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isActive = ref(false);
const items = ref([
  { key: "0", label: "Dashboard", icon: "pi pi-th-large", to: "/dashboard" },
  {
    key: "1",
    label: "Events",
    icon: "pi pi-calendar-plus",
    to: "/events",
  },
  { key: "0", label: "Reporting", icon: "pi pi-chart-pie", to: "/reporting" },
  {
    key: "0",
    label: "Client Base",
    icon: "pi pi-database",
    to: "/client-base",
  },
  {
    key: "0",
    label: "Organization settings",
    icon: "pi pi-sliders-h",
    to: "/organization-settings",
  },
]);
</script>

<style lang="scss" scoped>
::v-deep(.p-panelmenu) {
  width: 212px;

  .p-panelmenu-header:not(.p-disabled).p-highlight .p-panelmenu-header-content {
    background-color: #223A5E;
    box-shadow: none;
  }

  .p-panelmenu-header-content {
    background-color: #223A5E;
    border: none;
    color: #ffffff;
  }

  .p-panelmenu-header-action:hover {
    background-color: #586357;
    color: #ffffff;
    border-radius: 6px;
  }

  .p-submenu-icon {
    order: 1;
    color: #ffffff;
  }

  .p-menuitem-text {
    flex-grow: 1;
    color: #ffffff;
  }

  .p-menuitem-icon {
    color: #ffffff;
  }

  .p-panelmenu-header-action.router-link-active.router-link-active-exact {
    border-radius: 5px;
    background: #2a4368;
  }

  // .p-panelmenu-content {
  //   border: none;
  //   background: #2e3c2d;
  //   padding-left: 24px;
  // }
  // .p-menuitem-link {
  //   color: #ffffff;
  // }

  // .p-panelmenu-content
  //   .p-menuitem
  //   > .p-menuitem-content
  //   .p-menuitem-link
  //   .p-menuitem-text {
  //   color: #ffffff !important;
  // }

  // .p-panelmenu-content:hover .p-menuitem > .p-menuitem-content {
  //   background-color: #2e3c2d !important;
  // }

  // .p-menuitem-link.router-link-active.router-link-active-exact {
  //   background-color: #2e3c2d !important;
  // }

  // .p-menuitem-link.router-link-active.router-link-active-exact
  //   .p-menuitem-text {
  //   background-color: #2e3c2d !important;
  //   font-weight: 800;
  // }

  // .p-menuitem-link:hover {
  //   background-color: #2e3c2d !important;
  //   color: #ffffff !important;
  //   border-radius: 6px;
  // }

  // .p-menuitem-link:hover .p-menuitem-text {
  //   font-weight: 800;
  // }
}

.root {
  max-width: 240px;
  color: #ffffff;
  background-color: #223A5E;
}

.router-link {
  color: #ffffff;
  text-decoration: none;
}

.base-item {
  border: none !important;
  color: #ffffff;
  cursor: pointer;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
    background-color: #586357;
  }
}
.item {
  @extend .base-item;
  background-color: #2e3c2d;
}

.item-active {
  @extend .base-item;

  background-color: #586357;
}
</style>
