// Essentials
import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from '@/views/Home/Home.vue'
import Dashboard from '@views/Dashboard/Dashboard.vue'
import Signup from '@views/SignUp/SignUp.vue'
import Signin from '@views/SignIn/SignIn.vue'
import Tournament from '@views/Tournament/Tournament.vue'
import Gamepage from '@views/Gamepage/Gamepage.vue'
import EditProfile from '@views/EditProfile/EditProfile.vue'


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
}
, {
    path: '/game',
    name: 'Gamepage',
    component: Gamepage
}, {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router