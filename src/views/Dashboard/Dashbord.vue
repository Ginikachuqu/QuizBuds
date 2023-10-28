<template>
    <div class="dashboard__wrapper">
        <div class="dashboard__wrapper-inner">
            <div class="dashboard__wrapper-inner-top">
                <div class="db__container">
                    <div class="left">
                        <h3>Hello, {{ username }}</h3>
                        <p>Welcome back! ready for more challenges?</p>
                    </div>
                    <div class="right">
                        <router-link to="/">Logout</router-link>
                    </div>
                </div>
            </div>
            <div class="dashboard__wrapper-inner-bottom">
                <div class="dashboard__wrapper-inner-bottom-left">
                    <div class="play__block">
                        <button class="play__button">
                            <GameIconsPlanetConquest />
                            <span>Play new game</span>
                        </button>
                    </div>
                    <div class="play__block">
                        <button class="play__button">
                            <GameIconsGauntlet />
                            <span>Create tournament</span>
                        </button>
                    </div>
                </div>
                <div class="dashboard__wrapper-inner-bottom-right">
                    <gameItem v-for="item in gameTypes" :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { RouterLink } from 'vue-router'
    import GameIconsGauntlet from '../../assets/icons/GameIconsGauntlet.vue'
    import GameIconsPlanetConquest from '../../assets/icons/GameIconsPlanetConquest.vue'
    // import GameIconsChampions from '../../assets/icons/GameIconsChampions.vue'

    import gameItem from '../../components/GameItem/GameItem.vue'
    

    export default {
        name: 'Dashboard',
        data () {
           return { 
               username: 'Charles',
               gameTypes: [{
                   name: 'Japanese Anime & Manga',
                   image: '../../../public/naruto.jpg',
               }, {
                    name: 'Architecture',
                   image: '../../../public/architecture.jpg',
               }, {
                    name: 'Video Games',
                   image: '../../../public/video-games.jpg',
               }, {
                    name: 'Sports',
                   image: '../../../public/sports.jpg',
               },  {
                    name: 'Politics',
                   image: '../../../public/politics.jpg',
               }, {
                    name: 'Science & Nature',
                   image: '../../../public/nature-science.jpg',
               }]
            }
        },
        components: {
            GameIconsPlanetConquest,
            GameIconsGauntlet,
            gameItem,
            // GameIconsChampions,
        }
    }
</script>
<style lang="scss" scoped></style>