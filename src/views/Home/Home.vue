<template lang="">
    <div class="container">
        <navbar />
        <landing />
    </div>
</template>

<script>
    import landing from '@components/Landing/Landing.vue'

    export default {
        // name: 'Home',
        components: {
            landing,
        }
    }
</script>
