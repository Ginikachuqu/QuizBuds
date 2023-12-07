<template>
    <Modal v-if="showModal" :amount='winningAmount'/>
    <!-- <div v-if="loader" class="loading__screen">
        <div class="loading__screen-inner">
            <SvgSpinners12DotsScaleRotate />
            <p>Fetching questions...</p>
        </div>
    </div> -->
    <div class="challenge__wrapper">
        <div class="challenge__wrapper-inner">
            <div class="left__pane">
                <div class="cash__reward__container">
                    <div class="cash__reward__container-inner">
                        <ul>
                            <li v-for="(cash, index) in cashReward" :key="cash.id">
                                <span>{{ cash.id }}</span>
                                <span :class="{'active' : index === currentAmountIndex}">${{ cash.amount }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="middle__pane">
                <div class="middle__pane-inner">
                    <!-- Gameboard Component -->
                    <GameBoard v-if="isPlaying" :gameData="gameData" @endGame="endGame" @incrementAmount="incrementAmount"/>
                    <!-- Placeholder Component -->
                    <Placeholder v-else :placeholderMessage="placeholderMessage"/>
                </div>
            </div>
            <div class="right__pane">
                <!-- Leaderboard -->
                <div class="leaderboard__container">
                    <h2>Leaderboard</h2>
                    <Leaderboard :players="players" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import { db } from '../../../firebase.config'
    import { doc, updateDoc, getDoc } from 'firebase/firestore'
    import { useToast } from 'vue-toastification'
    import Modal from '@components/Modal/Modal.vue'
    import GameBoard from '@components/GameBoard/GameBoard.vue'
    import Placeholder from '@components/Placeholder/Placeholder.vue'
    import Leaderboard from '@components/Leaderboard/Leaderboard.vue'
    import { useStore } from 'vuex'


    const cashReward = ref([{
            id: 1, amount: 100
        },{
            id: 2, amount: 500
        },{
            id:3, amount: 1000
        },{
            id: 4, amount: 10000
        },{
            id: 5, amount: 50000
        },{
            id: 6, amount: 100000
        },{
            id: 7, amount: 150000
        },{
            id: 8, amount: 200000
        },{
            id: 9, amount: 250000
        },{
            id: 10, amount: 300000
        },{
            id: 11, amount: 400000
        },{
            id: 12, amount: 640000
        },{
            id: 13, amount: 750000
        },{
            id: 14, amount: 800000
        },{
            id: 15, amount: 1000000
    },].reverse())

    const store = useStore()

    const toast = useToast()

    const placeholderMessage = 'Kindly wait while the game is being setup...'

    const gameData = ref([])
    const showModal = ref(false)
    const loader = ref(false)
    const isPlaying = ref(false)
    const winningAmount = ref(0)
    let currentAmountIndex = ref(cashReward.value.length - 1)
    console.log(store.state.user)
    const players = ref([])
    
    // Extract game code from url
    const url = new URL(window.location)
    const path = url.pathname
    const pathParts = path.split('/')
    const gameCode = pathParts[pathParts.length - 1]

    // Get participants from firebase
    const getPlayers = async (gameCode) => {
        const docRef = doc(db, 'challenges', gameCode)
        const docSnap = await getDoc(docRef)
        let response = null

        if (docSnap.exists()) {
            response = docSnap.data()
        } else {
            console.log('Document does not exist')
        }
    
        console.log(response.participants)

        return response.participants
        // username.value = response.username
    }

    // Add new user to the list of participants
    const addUser = async () => {
        // const userRef = doc(db, 'users', store.state.user.uid)
        const docRef = doc(db, 'challenges', gameCode)

        try {
            // Get participants data
            const previousList = await getPlayers(gameCode);

            // Check if the new user is already in the list
            const isNewUser = previousList.some(user => user.id === store.state.user.uid);

            // If the new user is not in the list, add them
            if (!isNewUser) {
              previousList.push({
                id: store.state.user.uid,
                avatar: store.state.user.photoURL,
                name: store.state.user.displayName.split(' ')[0],
                score: 0
            });

              // Update firestore with new data
              await updateDoc(docRef, {'participants': previousList})
  
              console.log('previousList sent!')
            } else {
              console.log('User already exists in the list');
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch questions
    const fetchQuestions = async () => {
        const docRef = doc(db, 'challenges', gameCode)
        let response = null
        
        if (isPlaying) {
            try {
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    response = docSnap.data()
                } else {
                    console.log('Document does not exist')
                }
            } catch (err) {
                console.log(err.message)
            }
        } else {
            return
        }

        gameData.value = {...response.questionData}

        setTimeout(() => {
            isPlaying.value = true
            console.log(gameData.value)
            console.log('Active')
        }, 5000)
    }

    fetchQuestions()
    
    /******************
 Challenge Logic
******************/

// If it is a challenge, update user details
// in the challenge collection firebase
const updateChallengeDetails = async (amount) => {
    // Challenge Document Reference
    const docRef = doc(db, 'challenges', gameCode)
    let player = null
    try {
        // Get & update player details
        const playersList = await getPlayers(gameCode);

        player = playersList.filter(player => player.id == store.state.user.uid)
        player[0].score = 100

        // Inject Player back into List
        await updateDoc(docRef, {'participants': playersList})
        console.log(playersList)
    } catch (error) {
        console.log(error)
    }
}

// Initialize game logic
const initialize = async() => {
    try {
        // Fetch participants
        players.value = await getPlayers(gameCode)
        console.log(players.value)
    } catch (err) {
        console.log(err.message)
        toast.error(err.message)
    }
    
}

initialize()
addUser()

    // Emit functions
const incrementAmount = () => {
    console.log('emit: ' + currentAmountIndex.value--)
    updateChallengeDetails(cashReward.value[currentAmountIndex.value--].amount)
}

const endGame = async () => {
    const finalPrizeIndex = currentAmountIndex.value
    currentAmountIndex.value >= cashReward.value.length - 1 ? winningAmount.value = 0 : winningAmount.value = cashReward.value[finalPrizeIndex].amount

    // Update user's funds in firestore
    await updateFunds(winningAmount.value)
    await updateTotal()
    showModal.value = true
}
</script>

<style lang="scss" scoped> 

</style>