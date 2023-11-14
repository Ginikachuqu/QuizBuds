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
                                    <input type="radio" name="difficulty" id="easy" value="easy" checked>
                                    <span>Easy</span>
                                </label>
                            </div>
                            <div>
                                <label for="medium">
                                    <input type="radio" name="difficulty" id="medium" value="medium">
                                    <span>Medium</span>
                                </label>
                            </div>
                            <div>
                                <label for="hard">
                                    <input type="radio" name="difficulty" id="hard" value="hard">
                                    <span>Hard</span>
                                </label>
                            </div>
                        </div>

                        <!-- Quiz type -->
                        <div class="set__quiz__type">
                            <h2>Choose quiz type</h2>
                            <select name="quiz__type" id="quiz__type">
                                <option value="Select preferred quiz type" disabled>Select preferred quiz type</option>
                                <option value="Anime">Anime</option>
                                <option value="Anime">Musicals</option>
                                <option value="Anime">Movies</option>
                                <option value="Anime">Science & Nature</option>
                                <option value="Anime">History</option>
                            </select>
                        </div>
                        <button :disabled="isPlaying" class="cta">Start Game</button>
                    </form>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-inner">
                    <div class="life__lines">
                        <span>Life lines:</span>
                        <button :disabled="!lifelines.fiftyFifty" @click="useFiftyFifty" class="life__btn fifty__fity">
                            50:50
                        </button>
                        <button :disabled="!lifelines.phoneAFriend" @click="usePhoneAFriend" class="life__btn phone__a__friend">
                            Call
                        </button>
                    </div>
                    <div class="question__display">
                        <h2 v-html="currentQuestion"></h2>
                    </div>
                    <div class="options__container">
                        <ul>
                            <li v-for="(option, index) in options" :key="index">
                                <button :disabled='answered' @click='selectOption(option)'>
                                    <SvgSpinners12DotsScaleRotate v-if="isChecking"/>
                                    <span v-if="!isChecking">{{ option }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
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
import { ref, computed, watch } from 'vue'
import ErrorToast from '@components/ErrorToast/ErrorToast.vue'
import Modal from '@components/Modal/Modal.vue'
import Leaderboard from '@components/Leaderboard/Leaderboard.vue'
import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'

    const cashReward = ref([{
                id: 1, amount: '$100'
            },{
                id: 2, amount: '$500'
            },{
                id:3, amount: '$1000'
            },{
                id: 4, amount: '$10,000'
            },{
                id: 5, amount: '$50,000'
            },{
                id: 6, amount: '$100,000'
            },{
                id: 7, amount: '$150,000'
            },{
                id: 8, amount: '$200,000'
            },{
                id: 9, amount: '$250,000'
            },{
                id: 10, amount: '$300,000'
            },{
                id: 11, amount: '$400,000'
            },{
                id: 12, amount: '$640,000'
            },{
                id: 13, amount: '$750,000'
            },{
                id: 14, amount: '$800,000'
            },{
                id: 15, amount: '$100,000'
        },].reverse())

    const questionsData = ref({
        responsecode: 0,
        results: [
            {
                category: "Entertainment: Japanese Anime & Manga",
                type: 'multiple',
                difficulty: 'medium',
                question: 'Who was the first man to ever kick ass?',
                correct_answer: 'Jackie Chan',
                incorrect_answers: ['Bruce Lee', 'Arnold Schwazeneger', 'Sylvester Stallone']
            }, {
                category: "Entertainment: Japanese Anime & Manga",
                type: "multiple",
                difficulty: "hard",
                question: "What year was &quot;JoJo&#039;s Bizarre Adventure: Phantom Blood&quot; first released?",
                correct_answer: "1987",
                incorrect_answers: ["2013", "1983","1995"]
            }, {
                "category": "Entertainment: Japanese Anime & Manga",
                "type": "multiple",
                difficulty: "hard",
                question: "In what year did the manga &quot;Ping Pong&quot; begin serialization?",
                correct_answer: "1996",
                incorrect_answers: ["2014", "2010", "2003"]
            }
            , {
                "category": "Entertainment: Japanese Anime & Manga",
                "type": "multiple",
                difficulty: "hard",
                question: "Who was the protagonist in the series PEAKY BLINDERS?",
                correct_answer: "Tommy Shelby",
                incorrect_answers: ["Arthur Shelby", "Suzzan", "Flitwick"]
            }
            , {
                "category": "Entertainment: Japanese Anime & Manga",
                "type": "multiple",
                difficulty: "hard",
                question: "What series has a villian named Lord Voldemort?",
                correct_answer: "Harry Potter",
                incorrect_answers: ["Merlin", "Robinhood", "Dominion"]
            }
        ]
    })

    const isPlaying = ref(true)
    const currentQuestionIndex = ref(0)
    const currentAmountIndex = ref(cashReward.value.length - 1)
    const winningAmount = ref('')
    const selectedOption = ref(null)
    const isChecking = ref(false)
    const lifelines = ref({
        phoneAFriend: true,
        fiftyFifty: true
    })
    const friends = ref(['Eduardo', 'Wyatt', 'Chloe', 'Charlotte'])
    const answered = ref(false)
    const showModal = ref(false)
    

    const shuffleOptions = (optionsArray) => {
        for (let i = optionsArray.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))

            const temp = optionsArray[i]
            optionsArray[i] = optionsArray[j]
            optionsArray[j] = temp
        }

        console.log(optionsArray)
        return optionsArray
    }

    // Get the current Question
    const currentQuestion = computed(() => questionsData.value.results[currentQuestionIndex.value].question)
    const options = computed(() => {
        const correct_answer = questionsData.value.results[currentQuestionIndex.value].correct_answer

        const incorrect_answers = questionsData.value.results[currentQuestionIndex.value].incorrect_answers

        const optionsList = [correct_answer, ...incorrect_answers]

        return shuffleOptions(optionsList)
    })
    

    // Lifelines functions
    const usePhoneAFriend = () => {
        // Get a random friend
        const randomFriendIndex = Math.floor(Math.random() * friends.value.length)
        // Get random option
        const randomOptionIndex = Math.floor(Math.random() * options.value.length)

        lifelines.value.phoneAFriend = false

        // console.log(randomFriendIndex, randomOptionIndex)
        // console.log(`${friends.value[randomFriendIndex]} thinks its ${options.value[randomOptionIndex]}`)
        return [friends.value[randomFriendIndex, options.value[randomOptionIndex]]]
    }

    const useFiftyFifty = () => {
        if (!answered.value) {
            // clone options array to avoid modifying original array
            const clonedOptions = [...options.value]

            // Find correct option
            const correctOptionIndex = options.value.findIndex(option => option === questionsData.value.results[currentQuestionIndex.value].correct_answer)

            // remove two random incorrect options
            let removedCount = 0
            let currentIndex = 0
            
            while (removedCount < 2 && currentIndex < clonedOptions.length) {
                if (currentIndex !== correctOptionIndex && Math.random() > 0.5) {
                    clonedOptions.splice(currentIndex, 1)
                    removedCount++
                } else {
                    currentIndex++
                }
            }

            // update options with the modified array
            // options.value = clonedOptions
            console.log(clonedOptions)

            // Disabled lifeline
            lifelines.fiftyFifty = false
        }
    }

    const selectOption =(option) => {
        selectedOption.value = option
        isChecking.value = true
        answered.value = true

        setTimeout(() => {
            if (option === questionsData.value.results[currentQuestionIndex.value].correct_answer) {
            console.log('Correct')
            if (currentQuestionIndex.value + 1 === questionsData.value.results.length) {
                // Get final prize amount
                const finalPrizeIndex = currentAmountIndex.value
                winningAmount.value = cashReward.value[finalPrizeIndex].amount

                // Add amount won to user's current funds

                // Display modal
                showModal.value = true

            } else {
                currentQuestionIndex.value++
            }
                isChecking.value = false
                answered.value = false
            } else {
                // Get final prize amount
                const finalPrizeIndex = currentAmountIndex.value

                // Set wining amount to zero if user fails first question
                currentQuestionIndex.value <= 0 ? winningAmount.value = 0 : winningAmount.value = cashReward.value[finalPrizeIndex].amount

                // Add amount won to user's current funds

                // Display modal
                showModal.value = true
                console.log('Weird response. You failed!', winningAmount.value)
            }
        }, 3000)

    }

    watch(currentQuestionIndex, () => {
        currentAmountIndex.value--
    })

    console.log(currentQuestionIndex.value)
</script>
<style lang="">
    
</style>