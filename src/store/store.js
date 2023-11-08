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
        async signup (context, { email, password, username }) {
            const response = await createUserWithEmailAndPassword(auth, email, password)

            if (response) {
                context.commit('setUser', response.user)
                
            } else {
                throw new Error('Error occured')
            }

            // console.log(state.user, username)
        }
    }
})

export default store