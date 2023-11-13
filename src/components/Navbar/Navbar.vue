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
            <li v-if="authIsReady && user">
                <IcRoundSpaceDashboard />
                <router-link to="/dashboard">
                    Dashboard
                </router-link>
            </li>
            <li v-if="authIsReady && !user">
                <IonMdKey />
                <router-link to="/signup">
                    Sign up
                </router-link>
            </li>
            <li v-if="authIsReady && user">
                <button @click.prevent="handleLogout">
                    Log out
                </button>
            </li>
            <div class="user__avatar"></div>
        </ul>
    </nav>
</template>

<script setup>
    import { computed } from 'vue'
    import { RouterLink, useRouter } from 'vue-router';
    import { useStore } from 'vuex'
    import IonHome from '../../assets/icons/IonHome.vue'
    import IcBaselineDoorFront from '../../assets/icons/IcBaselineDoorFront.vue'
    import IcRoundSpaceDashboard from '../../assets/icons/IcRoundSpaceDashboard.vue'
    import IonMdKey from '../../assets/icons/IonMdKey.vue'

    const store = useStore()

    const user = computed(() => store.state.user)

    const authIsReady = computed(() => store.state.authIsReady)
    
    const router = useRouter()
    
    const handleLogout = () => {
        store.dispatch('logout')

        router.push('/')
    }
</script>

<style lang="sass" scoped></style>
