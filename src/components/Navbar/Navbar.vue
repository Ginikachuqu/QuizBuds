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
                <GameIconsBirdHouse />
                <router-link to="/">
                    Home
                </router-link>
                
            </li>
            <li>
                <GameIconsNinjaHeroicStance />
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
    import GameIconsBirdHouse from '../../assets/icons/GameIconsBirdHouse.vue'
    // import GameIconsPlanetConquest from '../../assets/icons/GameIconsPlanetConquest.vue'
    import GameIconsNinjaHeroicStance from '../../assets/icons/GameIconsNinjaHeroicStance.vue'

    export default {
        name: 'navbar',
        components: {
            GameIconsBirdHouse,
            GameIconsNinjaHeroicStance
        }
    }
</script>

<style lang="sass" scoped></style>
