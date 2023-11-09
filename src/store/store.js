import { createStore } from 'vuex'
import { auth } from '../../firebase.config'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'


const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
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

export default store