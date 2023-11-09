<template>
    <nav>
        <div class="logo">
            <router-link to="/">
                <!-- <img src="../../assets/images/logo.png" alt="buddies-logo"> -->
                ?uizbudz
            </router-link>
        </div>
        <ul>
            <li>
                <IonHome />
                <router-link to="/">
                    Home
                </router-link>
                
            </li>
            <li v-if="noUser">
                <router-link to="/signup">
                    Sign up
                </router-link>
            </li>
            <li>
                <button @click.prevent="handleLogout">
                    Log out
                </button>
            </li>
            <div class="user__avatar"></div>
        </ul>
    </nav>
</template>

<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { useStore } from 'vuex'
    import IonHome from '../../assets/icons/IonHome.vue'

    const store = useStore()

    const noUser = true

    store.state.user !== null ? noUser === false : noUser === true

    
    const router = useRouter()
    
    const handleLogout = () => {
        store.dispatch('logout')
        console.log(noUser)

        router.push('/')
    }
</script>

<style lang="sass" scoped></style>
