<template lang="">
    <!-- <ErrorToast /> -->
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
                                <input type="radio" name="difficulty" id="easy" value="easy" checked>
                                <label for="easy">Easy</label>
                            </div>
                            <div>
                                <input type="radio" name="difficulty" id="medium" value="medium">
                                <label for="medium">Medium</label>
                            </div>
                            <div>
                                <input type="radio" name="difficulty" id="hard" value="hard">
                                <label for="hard">Hard</label>
                            </div>
                        </div>

                        <!-- Number of questions -->
                        <div class="set__question__number">
                            <h2>Set number of questions</h2>
                            <div>
                                <input type="radio" name="ques-num" id="10" value="10" checked>
                                <label for="easy">10</label>
                            </div>
                            <div>
                                <input type="radio" name="ques-num" id="20" value="20">
                                <label for="medium">20</label>
                            </div>
                            <div>
                                <input type="radio" name="ques-num" id="30" value="30">
                                <label for="hard">30</label>
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
                        <button class="cta">Start Game</button>
                    </form>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-inner">
                    <div class="question__display">
                        <h2 v-html="currentQuestion"></h2>
                    </div>
                    <div class="options__container">
                        <ul>
                            <li v-for="(option, index) in options" :key="index">
                                <button :disabled='answered' @click='selectOption(option)'>
                                    {{option}}
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
                            <li v-for="cash in cashReward" :key="cash.id">
                                <span>{{ cash.id }}</span>
                                <span>{{ cash.amount }}</span>
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
import { ref, computed } from 'vue'
import ErrorToast from '@components/ErrorToast/ErrorToast.vue'
import Leaderboard from '@components/Leaderboard/Leaderboard.vue'

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
        ]
    })

    const currentQuestionIndex = ref(0)
    const answered = ref(false)

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

    const selectedOption = ref(null)

    const selectOption =(option) => {
        selectedOption.value = option
        answered.value = true

        if (option === questionsData.value.results[currentQuestionIndex.value].correct_answer) {
            console.log('Correct')
            // option.classList.add('correct')
        } else {
            console.log('Weird response. You failed!')
        }

        currentQuestionIndex.value++
        answered.value = false
    }

    console.log(currentQuestionIndex.value)
</script>
<style lang="">
    
</style>