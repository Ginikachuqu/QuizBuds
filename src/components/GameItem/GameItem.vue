<template lang="">
    <button class="item__container">
        <div class="item__container-inner">
            <div class="item__container-inner-image" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
            <div class="item__container-inner-details">
                <div class="detail__name">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </button>
</template>
<script setup>
defineProps(['item'])
</script>
<style lang="sass" scoped>

</style>