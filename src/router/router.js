// Essentials
import { createRouter, createWebHistory } from "vue-router";
import store from '../store/store'

// Views
import Home from '@/views/Home/Home.vue'
import Dashboard from '@views/Dashboard/Dashboard.vue'
import Signup from '@views/SignUp/SignUp.vue'
import Signin from '@views/SignIn/SignIn.vue'
import Challenge from '@views/Challenge/Challenge.vue'
import ChallengeInterface from '@views/ChallengeInterface/ChallengeInterface.vue'
import Gamepage from '@views/Gamepage/Gamepage.vue'
import EditProfile from '@views/EditProfile/EditProfile.vue'
import Error from '@views/ErrorPage/Error.vue'


// Routes
const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true}
}, {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresGuest: true}
},
 {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: { requiresGuest: true}
}, {
    path: '/challenge',
    name: 'Challenge',
    component: Challenge,
    meta: { requiresAuth: true}
}, {
    path: '/challenge-interface/:id',
    name: 'ChallengeInterface',
    component: ChallengeInterface,
    meta: { requiresAuth: true}
}
, {
    path: '/game',
    name: 'Gamepage',
    component: Gamepage,
    meta: { requiresAuth: true}
}, {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true}
}, {
    path: '/error',
    name: 'Error',
    component: Error,
    // meta: { requiresAuth: true}
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     // Check for required auth guard
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // Check if not logged in
//         if (!store.state.user) {
//             // Go to login
//             next({
//                 path: '/signin',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         } else {
//             // Go to route
//             next()
//         }
//     } else if (to.matched.some(record => record.meta.requiresGuest)) {
//         // Check if logged in
//         if (store.state.user) {
//             // Go to dashboard
//             next({
//                 path: '/',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         } else {
//             // Proceed to route
//             next()
//         }
//     } else {
//         // Proceed to route
//         next()
//     }
// })

export default router