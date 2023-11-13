import { createStore } from 'vuex'
import { auth } from '../../firebase.config'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'


const store = createStore({
    state: {
        user: null,
        authIsReady: false
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        }
    },
    actions: {
        async signup (context, { email, password }) {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            
            if (response) {
                context.commit('setUser', response.user)
                
            } else {
                throw new Error('Error occured')
            }
        },

        async login (context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password)
            
            if (response) {
                context.commit('setUser', response.user)
                
            } else {
                throw new Error('Error occured')
            }
        },

        async logout (context) {
            await signOut(auth)
            context.commit('setUser', null)
        }
    }
})

const unsubscribe = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    console.log('user is ' + store.state.user, 'auth is ' + store.state.authIsReady)
    unsubscribe()
})

export default store