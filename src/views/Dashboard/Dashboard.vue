<template>
    <div class="dashboard__wrapper">
        <div class="dashboard__wrapper-inner">
            <div class="left__pane">
                <div class="left__pane-inner">
                    <ul>
                        <li>
                            <IonPlayCircleSharp />
                            <router-link to="/game">
                                Play random game
                            </router-link>
                        </li>
                        <li>
                            <IonIosGameControllerB />
                            <router-link to="/">
                                Create Tournament
                            </router-link>
                        </li>
                        <li>
                            <IonCash />
                            <router-link to="/">
                                Wager Zone
                            </router-link>
                        </li>
                        <li>
                            <IonMdSettings />
                            <router-link to="/">
                                Settings
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-welcome">
                    <div class="middle__pane-welcome-left">
                        <div class="intro">
                            <h2>Good Evening, Charles</h2>
                            <span class="animated__span">
                                <span>Ready to unleash your inner quiz whiz? Dive in!</span>
                            </span>
                        </div>
                        <div class="progress__blocks">
                            <div class="progress__blocks-block">
                                <h3>Ranking</h3>
                                <span class="badge"></span>
                            </div>
                            <div class="progress__blocks-block">
                                <h3>Available Funds</h3>
                                <span>$1,000,000</span>
                            </div>
                            <div class="progress__blocks-block">
                                <h3>Buds Progress</h3>
                                <div class="progress__path">
                                    <div class="progress__path-bar">
                                        <div class="progress__path-bar-inner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <!-- Previous played quiz -->
                <div class="picker previous__attempts__block">
                    <div class="picker__header previous__attempts__block-header">
                        <h2>Previous Attempts</h2>
                        <span>Make another attempt</span>
                    </div>
                    <!-- Slider -->
                    <div class="slider">
                        <swiper-container navigation :slides-per-view="4" :space-between="30" @swiper="onSwiper" @slideChange="onSlideChange">
                            <swiper-slide v-for="item in gameTypes" :key="item">
                                <gameItem :item="item"/>
                            </swiper-slide>
                        </swiper-container>
                    </div>
                </div>                
                
                <!-- Choose new quiz -->
                <div class="picker choose__quiz__block">
                    <div class="picker__header choose__quiz__block-header">
                        <h2>Choose Category</h2>
                        <span>Prove your mettle!</span>
                    </div>
                    <!-- Slider -->
                    <div class="slider">
                        <swiper-container navigation :slides-per-view="4" :space-between="30" @swiper="onSwiper" @slideChange="onSlideChange">
                            <swiper-slide v-for="item in gameTypes" :key="item">
                                <gameItem :item="item"/>
                            </swiper-slide>
                        </swiper-container>
                    </div>
                </div>
            </div>
            <div class="right__pane">
                <div class="right__pane-top">
                    <div class="right__pane-top-inner">
                        <div class="user__info">
                            <div class="user__info-avatar"></div>
                            <div class="user__info-details">
                                <h4>Charles Grandison</h4>
                                <router-link to="/">
                                    <IonEdit />
                                    <span>Edit Profile</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right__pane-bottom">
                    <div class="achievements">
                        <ul>
                            <li>
                                <span>
                                    10th
                                </span>
                                <span>
                                    Musicals
                                </span>
                                <span>
                                    13/30
                                </span>
                                <span class="user__image">
                                    <!-- Image -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    1st
                                </span>
                                <span>
                                    Movies
                                </span>
                                <span>
                                    29/30
                                </span>
                                <span class="user__image">
                                    <!-- Image -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    2nd
                                </span>
                                <span>
                                    Politics
                                </span>
                                <span>
                                    28/30
                                </span>
                                <span class="user__image">
                                    <!-- Image -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    1st
                                </span>
                                <span>
                                    Architecture
                                </span>
                                <span>
                                    28/30
                                </span>
                                <span class="user__image">
                                    <!-- Image -->
                                </span>
                            </li>
                            <li>
                                <span>
                                    5th
                                </span>
                                <span>
                                    Sports
                                </span>
                                <span>
                                    20/30
                                </span>
                                <span class="user__image">
                                    <!-- Image -->
                                </span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { RouterLink } from 'vue-router'
    import { register } from 'swiper/element/bundle'
    import { Swiper, SwiperSlide} from 'swiper/vue'
    import IonPlayCircleSharp from '../../assets/icons/IonPlayCircleSharp.vue'
    import IonIosGameControllerB from '../../assets/icons/IonIosGameControllerB.vue'
    import IonCash from '../../assets/icons/IonCash.vue'
    import IonMdSettings from '../../assets/icons/IonMdSettings.vue'
    import IonEdit from '../../assets/icons/IonEdit.vue'

    import gameItem from '../../components/GameItem/GameItem.vue'
    
    register()

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
            IonPlayCircleSharp,
            IonIosGameControllerB,
            IonCash,
            IonMdSettings,
            IonEdit,
            gameItem,
            Swiper,
            SwiperSlide
        }
    }
</script>
<style lang="scss" scoped></style>