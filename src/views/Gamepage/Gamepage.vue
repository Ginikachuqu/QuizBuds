<template lang="">
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
                        <h2>Who was the first man to ever kick ass?</h2>
                    </div>
                    <div class="options__container">
                        <ul>
                            <li>
                                <button>A. Jackie Chan</button>
                                <button>B. Bruce Lee</button>
                            </li>
                            <li>
                                <button>C. Arnold Schwazeneger</button>
                                <button>D. Sylvester Stallone</button>
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
<script>
import Leaderboard from '@components/Leaderboard/Leaderboard.vue'

export default {
    name: 'Gamepage',

    setup () {
        const cashReward = [{
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
        },].reverse()

        return { cashReward }
    },
    components: {
        Leaderboard,
    }
}
</script>
<style lang="">
    
</style>