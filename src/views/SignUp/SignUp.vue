<template lang="">
    <div class="signup__container">
        <div class="form__container">
            <div class="form__container-inner">
                <div class="header">
                    <h2>Sign up!</h2>
                </div>
                <form>
                    <!-- Email -->
                    <div class="email__container">
                        <label for="email">Enter email:</label>
                        <input type="email" name="email" id="email" placeholder="Enter email" v-model="user__email">
                    </div>
                    <!-- Password -->
                    <div class="password__container">
                        <label for="password">Enter password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter password" v-model="user__password">
                    </div>
                    <div class="confirm__password__container">
                        <label for="confirm password">Confirm password:</label>
                        <input type="password" name="confirm password" id="confirm password" placeholder="Confirm password" v-model="user__confirmpass">
                    </div>
                    <button @click.prevent="handleSubmit" class="s__button">Sign up</button>
                </form>
                <div>
                    <p>Already have an account? <router-link to='/signin'>Sign in</router-link> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { RouterLink, useRouter } from 'vue-router';

    const user__email = ref('')
    const user__password = ref('')
    const user__confirmpass = ref('')

    const store = useStore()

    const router = useRouter()

    const handleSubmit = async () => {
        try {
            await store.dispatch('signup', {
                email: user__email.value,
                password: user__password.value
            })

            router.push('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
</script>