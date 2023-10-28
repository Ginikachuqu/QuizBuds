<template lang="">
    <div class='landing__container'>
        <div class="landing__container-inner">
            <div class="landing__container-inner-left">
                <div class="title">
                    <h1>
                        Unleash <br> Your <span class="gradient">Intellectual </span> Capabilities...
                    </h1>
                    <span>Explore the world's most specialized <br>quizzes.</span>
                    <router-link to="/signup">
                        <span>Sign up</span>
                        <GameIconsNinjaHeroicStance />
                    </router-link>
                </div>
            </div>
            <div class="landing__container-inner-right">
                <div class="landing__hero"> 
                    <div class="landing__images">
                        <div class="landing__images-pad">
                        <img src="../../assets/images/game-pad.png" alt="">
                    </div>
                    <div class="landing__images-engineer">
                        <img src="../../assets/images/engineer.png" alt="">
                    </div>  
                    <div class="landing__images-nature">
                        <img src="../../assets/images/nature-and-science.png" alt="">
                    </div>  
                    <div class="landing__images-literature">
                        <img src="../../assets/images/literature.png" alt="">
                    </div>  
                    </div>       
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import GameIconsPlanetConquest from '../../assets/icons/GameIconsPlanetConquest.vue'
import GameIconsNinjaHeroicStance from '../../assets/icons/GameIconsNinjaHeroicStance.vue'

export default {
    name: 'landing',
    components: {
        GameIconsPlanetConquest,
        GameIconsNinjaHeroicStance
    }
}
</script>
<style lang="scss" scoped></style>