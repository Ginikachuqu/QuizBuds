<template lang="">
    <!-- <ErrorToast /> -->
    <Modal v-if="showModal" :amount='winningAmount'/>
    <div class="game__wrapper">
        <div class="game__wrapper-inner">
            <div class="left__pane">
                <div class="left__pane-header">
                    <h2>Game Settings</h2>
                    <span>Set preferred game modes</span>
                </div>
                <div class="left__pane-body">
                    <form>
                        <!-- Difficulty Level -->
                        <div class="difficulty__container">
                            <h2>Set difficulty level</h2>
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

                        <!-- Quiz type -->
                        <div class="set__quiz__type">
                            <h2>Choose quiz type</h2>
                            <select name="quiz__type" v-model="quizCategory" id="quiz__type">
                                <option value="Select preferred quiz type" disabled>Select preferred quiz type</option>
                                <option value="Anime">Anime</option>
                                <option value="Anime">Musicals</option>
                                <option value="Anime">Movies</option>
                                <option value="Anime">Science & Nature</option>
                                <option value="Anime">History</option>
                            </select>
                        </div>
                        <button :disabled="isPlaying" @click.prevent="handleFetch" class="cta">Start Game</button>
                    </form>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-inner">
                    <!-- Gameboard Component -->
                    <GameBoard v-if="isPlaying" :currentAmountIndex="currentAmountIndex" @endGame="endGame" @incrementAmount="incrementAmount"/>
                    <!-- Placeholder Component -->
                    <Placeholder v-else/>
                </div>
            </div>
            <div class="right__pane">
                <div class="cash__reward__container">
                    <div class="cash__reward__container-inner">
                        <ul>
                            <li v-for="(cash, index) in cashReward" :key="cash.id">
                                <span>{{ cash.id }}</span>
                                <span :class="{'active' : index === currentAmountIndex}">{{ cash.amount }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Leaderboard -->
                <div class="leaderboard__container">
                    <h2>Leaderboard</h2>
                    <Leaderboard />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { db } from '../../../firebase.config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import ErrorToast from '@components/ErrorToast/ErrorToast.vue'
import Modal from '@components/Modal/Modal.vue'
import GameBoard from '@components/GameBoard/GameBoard.vue'
import Placeholder from '@components/Placeholder/Placeholder.vue'
import Leaderboard from '@components/Leaderboard/Leaderboard.vue'
import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'
import { useStore } from 'vuex'


    const cashReward = ref([{
            id: 1, amount: '100'
        },{
            id: 2, amount: '500'
        },{
            id:3, amount: '1000'
        },{
            id: 4, amount: '10,000'
        },{
            id: 5, amount: '50,000'
        },{
            id: 6, amount: '100,000'
        },{
            id: 7, amount: '150,000'
        },{
            id: 8, amount: '200,000'
        },{
            id: 9, amount: '250,000'
        },{
            id: 10, amount: '300,000'
        },{
            id: 11, amount: '400,000'
        },{
            id: 12, amount: '640,000'
        },{
            id: 13, amount: '750,000'
        },{
            id: 14, amount: '800,000'
        },{
            id: 15, amount: '100,000'
    },].reverse())

    const store = useStore()

    const gameData = ref({
        // Question Data gotten from the API
        // questionData: null;
    })
    const showModal = ref(false)
    const isPlaying = ref(true)
    const difficulty = ref('easy')
    const quizCategory = ref('Select preferred quiz type')
    const winningAmount = ref(0)
    let currentAmountIndex = ref(cashReward.value.length - 1)


    // Fetch function
    const handleFetch = async () => {
        const url = ''
    }

    // Get current funds from firestore
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
        return response.walletBalance
    }

    // Update firestore Doc (update user's game money)
    const updateFunds = async (amount) => {
        const currentFunds = await getWalletBalance()
        const docRef = doc(db, 'users', store.state.user.uid)

        try {
            updateDoc(docRef, {'walletBalance': +amount})
        } catch (err) {
            console.log(err.message)
        }
    }

    // Emit functions
    const incrementAmount = () => {
        console.log('emit: ' + currentAmountIndex.value--)
        // return currentAmountIndex--
    }

    const endGame = () => {
        const finalPrizeIndex = currentAmountIndex.value
        currentAmountIndex.value >= cashReward.value.length - 1 ? winningAmount.value = 0 : winningAmount.value = cashReward.value[finalPrizeIndex].amount

        // Update user's funds in firestore
        updateFunds(cashReward.value[finalPrizeIndex].amount)
        // updateFunds(0)
        showModal.value = true
    }

    console.log('curentAmountIndex: ' + currentAmountIndex.value)
</script>
<style lang="">
    
</style>