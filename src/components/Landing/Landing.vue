<template lang="">
    <div class='landing__container'>
        <div class="landing__container-inner">
            <div class="landing__container-inner-left">
                <div class="title">
                    <h1>
                        Unleash <br> Your Intellectual Capabilities...
                    </h1>
                    <span>Quiz like a pro...</span>
                    <router-link to="/signup">
                        <span>Sign up</span>
                        <GameIconsNinjaHeroicStance />
                    </router-link>
                </div>
            </div>
            <div class="landing__container-inner-right">
                <div class="blocks">
                    <div class="block block__1">
                        <div class="header">
                            <GameIconsPlanetConquest />
                            <span>Play</span>
                        </div>
                        <div class="body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque autem mollitia, aliquid dolorum tempora sint incidunt nisi a dolor?
                        </div>
                    </div>
                    <div class="block block__2">
                        <div class="header">
                            <span class="icon"></span>
                            <h3>Difficulty Level</h3>
                        </div>
                        <div class="body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque autem mollitia, aliquid dolorum tempora sint incidunt nisi a dolor?
                        </div>
                    </div>
                    <div class="block block__3">
                        <div class="header">
                            <span class="icon"></span>
                            <h3>Engender competition</h3>
                        </div>
                        <div class="body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque autem mollitia, aliquid dolorum tempora sint incidunt nisi a dolor?
                        </div>
                    </div>
                    <div class="block block__4">
                        <div class="header">
                            <span class="icon"></span>
                            <h3>Tailored Quiz</h3>
                        </div>
                        <div class="body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse doloremque autem mollitia, aliquid dolorum tempora sint incidunt nisi a dolor?
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