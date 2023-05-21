<template>
  <Header @setCity="setCity" />
  <router-view />
</template>

<script>
  import { computed } from 'vue';

  import Header from '@/components/Header.vue';

  import { fetchCityById, fetchAllCategories } from '@/api/catalog';

  export default {
    name: 'App',
    components: { Header },
    data() {
      return {
        city: {},
        categories: [],
        isLoading: true,
      };
    },
    provide() {
      return {
        city: computed(() => this.city),
        categories: computed(() => this.categories),
        isLoading: computed(() => this.isLoading),
      };
    },
    methods: {
      async setCity(id = 1) {
        this.city = await fetchCityById(id);
        localStorage.setItem('city', JSON.stringify(this.city));
      },
      async getCategories() {
        this.isLoading = true;
        if (this.city.id) this.categories = await fetchAllCategories(this.city.id);
        this.isLoading = false;
      },
    },
    watch: {
      async city(newValue, oldValue) {
        if (oldValue.id !== newValue.id) this.getCategories();
      },
    },
    async mounted() {
      !JSON.parse(localStorage.getItem('city'))
        ? this.setCity()
        : (this.city = JSON.parse(localStorage.getItem('city')));
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

  .container {
    padding: 35px 20px;
  }

  .title {
    font-size: 44px;
  }

  .lock {
    overflow: hidden;
  }

  /* Animation fade */
  .fade-enter-active {
    transition: opacity 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
