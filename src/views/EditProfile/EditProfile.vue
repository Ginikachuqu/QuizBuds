<template lang="">
    <!-- <ErrorToast /> -->
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
                                    <input type="text" v-model="username" name="username" id="username" placeholder="Enter new display name">
                                </label>
                            </div>

                            <!-- Gender -->
                            <div class="gender">
                                <span>Select Gender</span>
                                <div>
                                    <label for="male">
                                        <input type="radio" v-model='gender' name="gender" id="male" value="male">
                                        <span>Male</span>
                                    </label>
                                    <label for="female">
                                        <input type="radio" v-model="gender" name="gender" id="female" value="female">
                                        <span>Female</span>
                                    </label>
                                </div>
                            </div>

                            <button :disabled="isDisabled" @click.prevent='handleUpdate' class="s__button">
                                <SvgSpinners12DotsScaleRotate v-if="isLoading"/>
                                <span v-if="!isLoading">Update Details</span>
                            </button>
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
import { ref } from 'vue'
import { db } from '../../../firebase.config'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { useStore } from 'vuex'
import ErrorToast from '@components/ErrorToast/ErrorToast.vue'
import SvgSpinners12DotsScaleRotate from '../../assets/icons/SvgSpinners12DotsScaleRotate.vue'

const store = useStore()

const username = ref(store.state.user.displayName)
const gender = ref('')
const isDisabled = ref(false)
const isLoading = ref(false)


console.log(store.state.user)

const getUsername = async () => {
    const docRef = doc(db, 'users', store.state.user.uid)
    const docSnap = await getDoc(docRef)
    let response = null

    if (docSnap.exists()) {
        response = docSnap.data()
    } else {
        console.log('Document does not exist')
    }
    
    console.log(response.username)

    username.value = response.username
}

const getGender = async () => {
    const docRef = doc(db, 'users', store.state.user.uid)
    const docSnap = await getDoc(docRef)
    let response = null

    if (docSnap.exists()) {
        response = docSnap.data()
    } else {
        console.log('Document does not exist')
    }
    
    console.log(response.gender)

    gender.value = response.gender
}

getUsername()
getGender()

const handleUpdate = async (e) => {
    e.preventDefault();
    isLoading.value = true
    isDisabled.value = true
    const docRef = doc(db, 'users', store.state.user.uid)
    
    try {
        await updateDoc(docRef, {'username': username.value})

        await updateDoc(docRef, {'gender': gender.value})
    } catch (err) {
        console.log(err.message)
    }

    isLoading.value = false
    isDisabled.value = false
}
</script>
<style lang="scss" scoped>
    
</style>