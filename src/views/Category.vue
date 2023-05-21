<template>
  <div class="container">
    <div
      v-if="category?.name"
      class="nav">
      <router-link
        :to="{ name: 'catalog' }"
        class="btn-prev">
      </router-link>
      <h1 class="title">{{ category.name }}</h1>
    </div>

    <p v-else>Загрузка...</p>

    <Sidemenu :category="category" />
  </div>
</template>

<script>
  import Sidemenu from '@/components/Sidemenu.vue';

  import router from '@/router';

  export default {
    name: 'Category',
    components: { Sidemenu, router },
    inject: ['city', 'categories'],
    data() {
      return {
        products: [],
      };
    },
    methods: {
      async setProducts(slug) {},
    },
    computed: {
      category() {
        return this.categories.find(category => category.slug === this.$route.params.categorySlug);
      },
    },
    async mounted() {
      // fetch products this.$route.params.categorySlug
    },
    beforeRouteUpdate(to) {
      console.log(to);
      // refetch products to.params.subcategorySlug
    },
  };
</script>

<style scoped>
  .catalog {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .categories {
    display: flex;
    gap: 22px;
    flex-wrap: wrap;
  }

  .categories__item {
    width: 100%;
    max-width: 271px;
    height: 145px;
    padding: 20px;
    font-size: 24px;
    text-decoration: none;
    border-radius: 8px;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--dark-base-color);
  }

  .btn-prev {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: #030303;
    cursor: pointer;
  }

  .btn-prev::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 10px;
    background: url(../assets/arrow-icon.svg) center/contain no-repeat;
  }
</style>
