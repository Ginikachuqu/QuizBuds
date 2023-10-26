<template>
    <nav>
        <div class="logo">
            <router-link to="/">
                <!-- <img src="../../assets/images/logo.png" alt="buddies-logo"> -->
                ?uizbuds
            </router-link>
        </div>
        <ul>
            <li>
                <v-icon name="gi-hobbit-door" />
                <router-link to="/">

                    Home
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    Sign up
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    FAQs
                </router-link>
            </li>
            <div class="user__avatar"></div>
        </ul>
    </nav>
</template>

<script>
    import { RouterLink } from 'vue-router';

    export default {
        name: 'navbar',
        components: {
            
        }
    }
</script>

<style lang="sass" scoped></style>
