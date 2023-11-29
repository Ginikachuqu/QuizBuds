<template>
    <div class="challenge__container">
        <div class="challenge__container-inner">
            <div class="challenge__header">
                <h2>Create Challenge</h2>
                <span>Forge a path of friendly competition among friends, where tackling challenges not only <br>tests your knowledge but also boosts your confidence to new heights.</span>
            </div>
            <div class="challenge__body">
                <div class="challenge__body-category">
                    <div class="category__header">
                        <h2>Choose Category</h2>
                    </div>
                    <!-- Slider -->
                    <div class="slider">
                        <swiper-container navigation="true" :slides-per-view="4" :space-between="10">
                            <swiper-slide v-for="item in gameTypes" :key="item">
                                <gameItem :item="item"/>
                            </swiper-slide>
                        </swiper-container>
                    </div>
                </div>
                <div class="challenge__body-difficulty">
                    <div class="difficulty__header">
                        <h2>Choose Difficulty</h2>
                        <div class="difficulty__body">
                            <div>
                                <label for="easy">
                                    <input type="radio" v-model="difficulty" name="difficulty" id="easy" value="easy">
                                    <span>Easy</span>
                                </label>
                            </div>
                            <div>
                                <label for="medium">
                                    <input type="radio" v-model="difficulty" name="difficulty" id="medium" value="medium">
                                    <span>Medium</span>
                                </label>
                            </div>
                            <div>
                                <label for="hard">
                                    <input type="radio" v-model="difficulty" name="difficulty" id="hard" value="hard">
                                    <span>Hard</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="challenge__body-wager">
                    <div class="wager__header">
                        <div class="title">
                            <h2>Wager Settings</h2>
                        </div>
                        <div class="mode__button">
                            <label for="mode">
                                <input class="toggler" type="checkbox" name="mode" id="mode">
                                <div class="button__toggle" @click="handleCheck">
                                    <div class="handle"></div>
                                    <div class="bars"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="wager__body" v-if="wagerActive">
                        <input type="number" placeholder="Enter wager amount..." name="wagerAmount" id="wagerAmount"/>
                    </div>
                </div>
                <div class="button__container">
                    <div class="link__display">
                        <input disabled placeholder="https://quizbuds.com?join=345678" type="text" />
                        <div class="copy__btn">
                            <button class="copy">
                                <span>Copy</span>
                                <IonCopy />
                            </button>
                        </div>
                    </div>
                    <button class="cta">Create Challenge</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide} from 'swiper/vue'
import gameItem from '../../components/GameItem/GameItem.vue'
import IonCopy from '../../assets/icons/IonCopy.vue'

register()

const wagerActive = ref(false)

const handleCheck = () => {
    wagerActive.value = !wagerActive.value
    console.log(wagerActive.value)
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
               }, 
                {
                    name: 'Politics',
                   image: '../../../public/politics.jpg',
               }, {
                    name: 'Science & Nature',
                   image: '../../../public/nature-science.jpg',
    }])
</script>

<style lang="scss">
    
</style>