import { createRouter, createWebHistory } from 'vue-router';
import AddProject from '../views/AddProject.vue';
import AddStaff from '../views/AddStaff.vue';
import EditProject from '../views/EditProject.vue';
import EditStaff from '../views/EditStaff.vue';
import Staffs from '../views/Staffs.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'AddProject',
    component: AddProject,
  },
  {
    path: '/addstaff',
    name: 'AddStaff',
    component: AddStaff,
  },
  {
    path: '/staff',
    name: 'Staffs',
    component: Staffs,
  },
  {
    path: '/staffs/:id',
    name: 'EditStaff',
    component: EditStaff,
    props: true,
  },
  {
    path: '/projects/:id',
    name: 'EditProject',
    component: EditProject,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
