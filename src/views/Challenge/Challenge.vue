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
                        <swiper-container navigation="true" :slides-per-view="4" :space-between="15">
                            <swiper-slide v-for="item in gameTypes" :key="item">
                                <gameItem :item="item" @click.prevent="handleClick(item.value)"/>
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
                        <input disabled ref="generatedTextRef" placeholder="https://quizbuds.com?join=345678" type="text" v-model="inputCodeValue"/>
                        <div class="copy__btn">
                            <button :disabled="isDisabled" class="copy" @click="copyToClipboard">
                                <span>Copy</span>
                                <IonCopy />
                            </button>
                        </div>
                    </div>
                    <button class="cta" @click.prevent="generateCode" v-show="!showCreateButton">Get game code</button>
                    <button class="cta" @click.prevent="createChallenge" v-if="showCreateButton">Create Challenge</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide} from 'swiper/vue'
import gameItem from '../../components/GameItem/GameItem.vue'
import IonCopy from '../../assets/icons/IonCopy.vue'

register()

const wagerActive = ref(false)
const gameCategory = ref('')
const difficulty = ref('easy')
const showCreateButton = ref(false)
const inputCodeValue = ref('')
const generatedTextRef = ref(null)
const isDisabled = ref(true)

const gameTypes = ref([{
                   name: 'Japanese Anime & Manga',
                   image: '../../../public/naruto.jpg',
                   value: 31
               }, {
                    name: 'Music',
                   image: '../../../public/architecture.jpg',
                   value: 12
               }, {
                    name: 'Television',
                   image: '../../../public/video-games.jpg',
                   value: 14
               }, {
                    name: 'Science & Nature',
                   image: '../../../public/sports.jpg',
               },  {
                    name: 'History',
                   image: '../../../public/politics.jpg',
               }, 
                {
                    name: 'General knowledge',
                   image: '../../../public/politics.jpg',
               }, {
                    name: 'Science & Nature',
                   image: '../../../public/nature-science.jpg',
                }, {
                    name: 'Books',
                    image: '../../../public/nature-science.jpg',
                    value: 10
                }, {
                    name: 'Film',
                    image: '../../../public/nature-science.jpg',
                    value: 11
                }, {
                    name: 'Video Games',
                    image: '../../../public/nature-science.jpg',
                    value: 15
                }, {
                    name: 'Computers',
                    image: '../../../public/nature-science.jpg',
                    value: 18
                }, {
                    name: 'Mythology',
                    image: '../../../public/nature-science.jpg',
                    value: 20
                }, {
                    name: 'Sports',
                    image: '../../../public/nature-science.jpg',
                    value: 21
                }, {
                    name: 'Geography',
                    image: '../../../public/nature-science.jpg',
                    value: 22
                }, {
                    name: 'Comics',
                    image: '../../../public/nature-science.jpg',
                    value: 29
                }, {
                    name: 'Gadgets',
                    image: '../../../public/nature-science.jpg',
                    value: 30
                }, {
                    name: 'Cartoons & Animations',
                    image: '../../../public/nature-science.jpg',
                    value: 32
}])

const handleCheck = () => {
    wagerActive.value = !wagerActive.value
    console.log(wagerActive.value)
}

const handleClick = (value) => {
    gameCategory.value = value
}

const generateCode = () => {
    // Generate Game code
    const gameCode = uuidv4()

    // Modify value of input box
    inputCodeValue.value = gameCode

    // Activate copy button
    isDisabled.value = false

    // Activate create button
    showCreateButton.value = !showCreateButton.value
}

const copyToClipboard = () => {
    generatedTextRef.value.select()
    document.execCommand('copy')
    console.log(generatedTextRef.value)
}

const createChallenge = () => {
    // Create game room in Firebase's Realtime Database

    // Fetch questions from opentdb api

    // Save questions data in RT DB

    // Route client to challenge game interface
}


</script>

<style lang="scss">
    
</style>