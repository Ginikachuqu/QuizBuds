<template lang="">
    <div class="leaderboard__container-inner">
        <ul>
            <SvgSpinners12DotsScaleRotate v-if="!isReady"/>
            <li v-for="(participant, index) in participants" :key="index" v-else>
                <span class="image__position">
                    <span class="image" :style="{ 'background-image': 'url(' + participant.avatar + ')' }"></span>
                    <span class="position">
                        <span>{{ index + 1 }}</span>
                    </span>
                </span>
                <span class="name">{{ participant.name }}</span>
                <span class="prize">${{ participant.score }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'

const { players } = defineProps(['players'])

const participants = players
const isReady = ref(false)

watchEffect(() => {
  if (participants !== undefined) {
    isReady.value = true
  }
})

console.log(participants)

</script>
<style lang="scss" scoped>
    
</style>