<template lang="">
    <div class="life__lines">
        <span>Life lines:</span>
        <button :disabled="lifelines.fiftyFifty" @click="useFiftyFifty" class="life__btn fifty__fity">
            50:50
        </button>
        <button :disabled="lifelines.phoneAFriend" @click="usePhoneAFriend" class="life__btn phone__a__friend">
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
                    <SvgSpinners12DotsScaleRotate v-if="isChecking && selectedOption === option"/>
                    <span v-html="option" v-else></span>
                </button>
            </li>
        </ul>
    </div>            
</template>
<script setup>
import { ref, toRef, computed, watch, onMounted, defineEmits } from 'vue'
import { db } from '../../../firebase.config'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { useStore } from 'vuex'
import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'

// props defination
const { gameData } = defineProps(['gameData'])
const questionsData = gameData.results

// Variable Definitions
const emits = defineEmits(['incrementAmount', 'endGame'])
const currentQuestionIndex = ref(0)
const options = ref([])
const selectedOption = ref(null)
const isChecking = ref(false)
const lifelines = ref({
    phoneAFriend: false,
    fiftyFifty: false
})
const friends = ref(['Eduardo', 'Wyatt', 'Chloe', 'Charlotte'])
const answered = ref(false)
const gameEnded = ref(false)
const store = useStore()

console.log(questionsData[currentQuestionIndex.value])
const shuffleOptions = () => {
    const correct_answer = questionsData[currentQuestionIndex.value].correct_answer
    const incorrect_answers = questionsData[currentQuestionIndex.value].incorrect_answers
    const optionsList = [correct_answer, ...incorrect_answers]

    for (let i = optionsList.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))

        const temp = optionsList[i]
        optionsList[i] = optionsList[j]
        optionsList[j] = temp
    }

    // console.log(optionsArray)
    options.value = optionsList
}

// Call the shuffleOptions function when the component is mounted or when the question changes
onMounted(() => {
    shuffleOptions();
});

watch(() => questionsData[currentQuestionIndex.value], () => {
    shuffleOptions();
});

// Get the current Question
const currentQuestion = computed(() => questionsData[currentQuestionIndex.value].question)

// Update Current Quiz in firebase
const updateQuiz = async (values) => {
    const docRef = doc(db, 'users', store.state.user.uid)
        
    try {
        // Get current state of the game
        const gameState = {
            questionIndex: currentQuestionIndex.value,
            lifelineValues: {
                phoneAFriend: lifelines.value.phoneAFriend,
                fiftyFifty: lifelines.value.fiftyFifty
            },
            question: currentQuestion.value
        }
        
        // Update current quiz value
        await updateDoc(docRef, {'currentQuiz': values})

        // Update game state
        await updateDoc(docRef, {'gameState': gameState})
        
    } catch (err) {
        console.log(err.message)
    }
}


// Lifelines functions
const usePhoneAFriend = () => {
    // Get a random friend
    const randomFriendIndex = Math.floor(Math.random() * friends.value.length)
    // Get random option
    const randomOptionIndex = Math.floor(Math.random() * options.value.length)

    lifelines.value.phoneAFriend = false

    return [friends.value[randomFriendIndex, options.value[randomOptionIndex]]]
}

const useFiftyFifty = () => {

    if (!answered.value) {
        // clone options array to avoid modifying original array
        const clonedOptions = [...options.value]

        // Find correct option
        const correctOptionIndex = options.value.findIndex(option => option === questionsData[currentQuestionIndex.value].correct_answer)

        // remove two random incorrect options
        let removedCount = 0
        let currentIndex = 0


        while (clonedOptions.length > 2) {
            
            if (clonedOptions[currentIndex] !== options.value[correctOptionIndex]) {
                clonedOptions.splice(currentIndex, 1)
                currentIndex++
            } else {
                currentIndex++
                continue
            }
            removedCount++
        }

        // update options with the modified array
        options.value = clonedOptions

        // Disable lifeline
        lifelines.value.fiftyFifty = true
    }
}

const selectOption = async (option) => {
    selectedOption.value = option
    isChecking.value = true
    answered.value = true

    setTimeout(() => {
        if (option === questionsData[currentQuestionIndex.value].correct_answer) {
            console.log('Correct')
            if (currentQuestionIndex.value + 1 === questionsData.length) {
                // End game
                updateQuiz(null)
                gameEnded.value = true
            } else {
                console.log(currentQuestionIndex.value)
                updateQuiz(questionsData)
                currentQuestionIndex.value++
            }
            isChecking.value = false
            answered.value = false
            } else {
                // End Game
                updateQuiz(null)
                gameEnded.value = true

                console.log('Weird response. You failed!')
            }
    }, 3000)

}

watch(currentQuestionIndex, () => {
    emits('incrementAmount')
})

watch(gameEnded, () => {
    emits('endGame')
})

console.log('currentQuestionIndex: ' + currentQuestionIndex.value)
</script>
<style lang="scss" scoped>
    
</style>