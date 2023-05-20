<template>
  <Header />
  <router-view />
</template>

<script>
  import Header from '@/components/Header.vue';

  export default {
    name: 'App',
    components: { Header },
    data() {
      return {};
    },
  };
</script>

<style>
  @import 'assets/css/fonts.css';

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #app {
    --dark-base-color: #272727;
    --light-base-color: #979797;
    --lightest-base-color: #9797974d;

    font-family: 'Futura PT', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: var(--dark-base-color);
    font-weight: 600;
    font-size: 15px;
    overflow: hidden;
    min-height: calc(var(--vh, 1vh) * 100);
  }
</style>
