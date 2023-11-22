<script>
  import { RouterView } from 'vue-router';
  import navbar from '@components/Navbar/Navbar.vue'

  export default {
    components: {
      navbar,
    }
  }
</script>

<template>
  <div class="app__container">
    <navbar />
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
  .app__container {
    width: 100vw;
    padding: 1rem 2.5rem 0 2.5rem;

    @media screen and (max-width: 768px) {
      padding: .85rem
    }
  }
</style>
