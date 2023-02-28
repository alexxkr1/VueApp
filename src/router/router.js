import { createRouter, createWebHistory } from "vue-router";

const login = {
  path: "/login",
  name: "login",
  component: () => import("../views/auth/LoginView.vue"),
  meta: {
    redirect: true,
  },
};


const home = {
  path: "/",
  name: "home",
  component: () => import("../views/home/IndexView.vue"),
};

const dashboard = {
  path: "/dashboard",
  name: "dashboard",
  component: () => import("../views/dashboard/DashboardView.vue"),
  meta: {
    layout: "platform",
    requiresAuth: true,
  },
};



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/auth/SignupView.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/events/:id",
      name: "event-details",
      component: () => import("../views/home/EventDetailsView.vue"),
    },
    {
      path: "/createOrganization",
      name: "create organization",
      component: () => import("../views/organizations/CreateOrganization.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/auth/reset-password",
      name: "reset-password",
      component: () => import("../views/auth/LoginView.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/reporting",
      name: "reporting",
      component: () => import("../views/auth/LoginView.vue"),
      meta: {
        requiresAuth: true,
        layout: "platform",
      },
    },
    {
      path: "/client-base",
      name: "Client Base",
      component: () => import("../views/clientbase/ClientBaseView.vue"),
      meta: {
        requiresAuth: true,
        layout: "platform",
      },
    },
    {
      path: "/events",
      name: "events",
      component: () => import("../views/events/EventsView.vue"),
      meta: {
        requiresAuth: true,
        layout: "platform",
      },
    },
    {
      path: "/events/createEvent/:id?",
      name: "CreateEvents",
      component: () => import("../views/events/CreateEvent.vue"),
      meta: {
        requiresAuth: true,
        layout: "platform",
      },
      props: true
    },
    {
      path: '/events/:id/edit',
      name: 'EditEvent',
      component: () => import('../components/events/EditEventComp.vue'),
      meta: {
        requiresAuth: true,
        layout: 'platform',
      },
    },
    {
      path: "/organization-settings",
      name: "organization-settings",
      component: () => import("../views/organizations/OrganizationView.vue"),
      meta: {
        requiresAuth: true,
        layout: "platform",
      },
    },

    login,
    dashboard,
    home
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
