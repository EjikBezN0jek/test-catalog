<template>
  <Header @setCity="setCity" />
  <main><router-view /></main>
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
        isCategoryLoading: true,
      };
    },
    provide() {
      return {
        city: computed(() => this.city),
        categories: computed(() => this.categories),
        isCategoryLoading: computed(() => this.isCategoryLoading),
      };
    },
    methods: {
      async setCity(id = 1) {
        this.city = await fetchCityById(id);
        localStorage.setItem('city', JSON.stringify(this.city));
      },
      async getCategories() {
        this.isCategoryLoading = true;
        if (this.city.id) this.categories = await fetchAllCategories(this.city.id);
        this.isCategoryLoading = false;
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
    --lightest-base-color: #9797974d;
    --light-base-color: #979797;
    --medium-base-color: #e9eef3;

    font-family: 'Futura PT', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: var(--dark-base-color);
    font-weight: 600;
    font-size: 15px;
    overflow: hidden;
    min-height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
  }

  main {
    flex-grow: 1;
    background: #f7f7f7;
  }

  .container {
    padding: 35px 10px;
  }

  @media screen and (min-width: 576px) {
    .container {
      padding: 35px 20px;
    }
  }

  .title {
    font-size: 30px;
  }

  @media screen and (min-width: 576px) {
    .title {
      font-size: 44px;
    }
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

  .btn {
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    padding: 13px 24px;
    color: var(--dark-base-color);
    border-radius: 24px;
    border: 2px solid var(--lightest-base-color);
    background: transparent;
    opacity: 0.5;
    cursor: pointer;
  }

  .btn--active {
    color: white;
    border: none;
    background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
    box-shadow: 0 20px 20px -15px #ff6f00;
    opacity: 1;
  }
</style>
