<template lang="">
    <div class="signup__container">
        <div class="form__container">
            <div class="form__container-inner">
                <div class="header">
                    <h2>Sign in!</h2>
                </div>
                <form>
                    <!-- Email -->
                    <div class="email__container">
                        <label for="email">Enter email:</label>
                        <input type="email" name="email" id="email" placeholder="Enter email">
                    </div>
                    <!-- Password -->
                    <div class="password__container">
                        <label for="password">Enter password:</label>
                        <input type="password" name="password" id="password" placeholder="Enter password">
                    </div>
                    <button class="s__button">Sign in</button>
                </form>
                <div>
                    <p>Don't have an account? <router-link to='/signup'>Sign up</router-link> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router';
</script>
