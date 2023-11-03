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
            <li>
                
                <router-link to="/signup">
                    Sign up
                </router-link>
            </li>
            <div class="user__avatar"></div>
        </ul>
    </nav>
</template>

<script>
    import { RouterLink } from 'vue-router';
    import IonHome from '../../assets/icons/IonHome.vue'

    export default {
        name: 'navbar',
        components: {
            IonHome,
        }
    }
</script>

<style lang="sass" scoped></style>
