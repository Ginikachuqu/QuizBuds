<template>
    <div class="dashboard__wrapper">
        <div class="dashboard__wrapper-inner">
            <div class="left__pane">
                <div class="left__pane-inner">
                    <ul>
                        <li>
                            <router-link to="/game">
                                <IonPlayCircleSharp />
                                <span>Play Game</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/challenge">
                                <IonIosGameControllerB />
                                <span>Create Challenge</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/editprofile">
                                <IonMdSettings />
                                <span>Settings</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-welcome">
                    <div class="middle__pane-welcome-left">
                        <div class="intro">
                            <h2>Good {{ timeOfDay() }}, {{ username }}</h2>
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
                                <span>
                                    <SvgSpinners12DotsScaleRotate v-if="walletBalance == null"/>
                                    <span v-else>${{ walletBalance }} </span>
                                </span>
                            </div>
                            <div class="progress__blocks-block">
                                <h3>Buds Progress</h3>
                                <div class="progress__path">
                                    <div class="progress__num">
                                        <span>Total Games Played: {{ totalGamesPlayed }}</span>
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
                        <swiper-container navigation="true" :slides-per-view="4" :space-between="30" @swiper="onSwiper" @slideChange="onSlideChange">
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
                            <div class="user__info-avatar" :style="{ 'background-image': 'url(' + user__avatar + ')' }"></div>
                            <div class="user__info-details">
                                <h4>{{ username }}</h4>
                                <router-link to="/editprofile">
                                    <IonEdit />
                                    <span>Edit Profile</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue'
    import { db } from '../../../firebase.config'
    import { collection, doc, getDoc } from 'firebase/firestore'
    import { RouterLink } from 'vue-router'
    import { register } from 'swiper/element/bundle'
    import { Swiper, SwiperSlide} from 'swiper/vue'
    import IonPlayCircleSharp from '../../assets/icons/IonPlayCircleSharp.vue'
    import IonIosGameControllerB from '../../assets/icons/IonIosGameControllerB.vue'
    import IonCash from '../../assets/icons/IonCash.vue'
    import IonMdSettings from '../../assets/icons/IonMdSettings.vue'
    import IonEdit from '../../assets/icons/IonEdit.vue'
    import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'
    import { useStore } from 'vuex'

    import gameItem from '../../components/GameItem/GameItem.vue'
    
    register()

    const store = useStore()

    const user = computed(() => store.state.user)

    console.log(user.value)

    const authIsReady = computed(() => store.state.authIsReady)

    const user__avatar = ref(store.state.user.photoURL)

    const username = ref('')

    const walletBalance = ref(null)

    const totalGamesPlayed = ref(0)

    const getUsername = async () => {
        const docRef = doc(db, 'users', store.state.user.uid)
        const docSnap = await getDoc(docRef)
        let response = null

        if (docSnap.exists()) {
            response = docSnap.data()
        } else {
            console.log('Document does not exist')
        }
    
        console.log(response.username)

        username.value = response.username
    }

    const getWalletBalance = async () => {
        const docRef = doc(db, 'users', store.state.user.uid)
        const docSnap = await getDoc(docRef)
        let response = null;

        if (docSnap.exists()) {
            response = docSnap.data()
        } else {
            console.log('Document does not exist')
        }
        console.log(response.walletBalance)
        walletBalance.value = response.walletBalance
    }

    const totalGames = async () => {
        const docRef = doc(db, 'users', store.state.user.uid)
        const docSnap = await getDoc(docRef)
        let response = null;

        if (docSnap.exists()) {
            response = docSnap.data()
        } else {
            console.log('Document does not exist')
        }
        console.log(response.walletBalance)
        totalGamesPlayed.value = response.totalGamesPlayed
    }
    
    getUsername()
    getWalletBalance()
    totalGames()

    // Get time of day
    const timeOfDay = () => {
        let myDate = new Date()
        let hours = myDate.getHours()
        let daytime;

        if (hours < 12) {
            daytime = 'Morning'
        } else if (hours >= 12 && hours <= 17) {
            daytime = 'Afternoon'
        } else {
            daytime ='Evening'
        }

        return daytime
    }

    const gameTypes = ref([{
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
    }])

</script>
<style lang="scss" scoped></style>