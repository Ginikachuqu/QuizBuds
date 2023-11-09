<template lang="">
    <div class="edit__container">
        <div class="edit__container-inner">
            <div class="top">
                <div class="top__inner">
                    <div class="display__image">
                        <div class="display__image-image"></div>
                    </div>
                    <div class="user__details">
                        <form>
                            <!-- Username -->
                            <div class="user__name">
                                <label for="username">
                                    <span>Change Display Name:</span>
                                    <input type="text" name="username" id="username" placeholder="Enter new display name">
                                </label>
                            </div>

                            <!-- Gender -->
                            <div class="gender">
                                <span>Select Gender</span>
                                <div>
                                    <label for="male">
                                        <input type="radio" name="gender" id="male" value="male">
                                        <span>Male</span>
                                    </label>
                                    <label for="female">
                                        <input type="radio" name="gender" id="female" value="female">
                                        <span>Female</span>
                                    </label>
                                </div>
                            </div>

                            <button>Update Details</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom__header">
                    <h2>Pick a new Avatar</h2>
                    <span>Studies reveal looks guarantees firmer confidence!</span>
                </div>
                <div class="avatar__picker__container">
                    <div class="avatar__picker__container-inner">
                        <button @click.prevent='' class="avatar avatar__1"></button>
                        <button @click.prevent='' class="avatar avatar__2"></button>
                        <button @click.prevent='' class="avatar avatar__3"></button>
                        <button @click.prevent='' class="avatar avatar__4"></button>
                        <button @click.prevent='' class="avatar avatar__5"></button>
                        <button @click.prevent='' class="avatar avatar__6"></button>
                        <button @click.prevent='' class="avatar avatar__7"></button>
                        <button @click.prevent='' class="avatar avatar__8"></button>
                        <button @click.prevent='' class="avatar avatar__9"></button>
                        <button @click.prevent='' class="avatar avatar__10"></button>
                        <button @click.prevent='' class="avatar avatar__11"></button>
                        <button @click.prevent='' class="avatar avatar__12"></button>
                        <button @click.prevent='' class="avatar avatar__12"></button>
                        <button @click.prevent='' class="avatar avatar__13"></button>
                        <button @click.prevent='' class="avatar avatar__14"></button>
                        <button @click.prevent='' class="avatar avatar__15"></button>
                        <button @click.prevent='' class="avatar avatar__16"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
    
</style>