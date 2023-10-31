// Essentials
import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from '@/views/Home/Home.vue'
import Dashboard from '@views/Dashboard/Dashboard.vue'
import Signup from '@views/SignUp/SignUp.vue'
import Signin from '@views/SignIn/SignIn.vue'
import Tournament from '@views/Tournament/Tournament.vue'


// Routes
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
}, {
    path: '/signup',
    name: 'Signup',
    component: Signup
},
 {
    path: '/signin',
    name: 'Signin',
    component: Signin
}, {
    path: '/create-tournament',
    name: 'Tournament',
    component: Tournament
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router