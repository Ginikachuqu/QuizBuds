<template>
    <div class="dashboard__wrapper">
        <div class="dashboard__wrapper-inner">
            <div class="dashboard__wrapper-inner-top">
                <div class="db__container">
                    <div class="left">
                        <h3>Hello, Charles</h3>
                        <p>Welcome back! ready for more challenges?</p>
                    </div>
                    <div class="right">
                        <router-link to="/">Logout</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { RouterLink } from 'vue-router'
    export default {
        name: 'Dashboard'
    }
</script>
<style lang="scss" scoped></style>