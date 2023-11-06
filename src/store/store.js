import { createStore } from 'vuex'
import { auth } from '../../firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

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
        }
    }
})

export default store