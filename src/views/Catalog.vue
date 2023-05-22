<template>
  <div
    v-if="category?.name"
    class="container catalog">
    <div
      v-if="category?.name"
      class="nav">
      <router-link
        :to="{ name: 'home' }"
        class="btn-prev">
      </router-link>
      <h1 class="title">{{ category.name }}</h1>
    </div>

    <div class="catalog__content">
      <CatalogSidemenu :category="category" />

      <p v-if="isProductsLoading">Загрузка...</p>
      <div
        v-else
        class="products">
        <p v-if="!products.length">Нет товаров</p>
        <CatalogProductCard
          v-else
          :products="products" />
      </div>
    </div>
  </div>
  <p
    v-else
    class="container">
    Загрузка...
  </p>
</template>

<script>
  import { fetchProducts } from '@/api/catalog';

  import CatalogSidemenu from '@/components/CatalogSidemenu.vue';
  import CatalogProductCard from '@/components/CatalogProductCard.vue';

  import router from '@/router';

  export default {
    name: 'Catalog',
    components: { CatalogSidemenu, CatalogProductCard, router },
    inject: ['city', 'categories'],
    data() {
      return {
        products: [],
        isProductsLoading: true,
      };
    },
    methods: {
      async getProducts(slug) {
        this.isProductsLoading = true;
        this.products = await fetchProducts(this.city.id, slug);
        this.isProductsLoading = false;
      },
      productsHandler(subcategorySlug) {
        subcategorySlug ? this.getProducts(subcategorySlug) : this.getProducts(this.$route.params.categorySlug);
      },
    },
    computed: {
      category() {
        return this.categories.find(category => category.slug === this.$route.params.categorySlug);
      },
    },
    async mounted() {
      this.productsHandler(this.$route.params.subcategorySlug);
    },
    async beforeRouteUpdate(to) {
      this.productsHandler(to.params.subcategorySlug);
    },
  };
</script>

<style scoped>
  .catalog {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .catalog__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34px;
  }

  @media screen and (min-width: 576px) {
    .catalog__content {
      flex-direction: row;
      align-items: flex-start;
    }
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
    flex-shrink: 0;
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

  .products {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    width: 100%;
  }

  @media screen and (min-width: 992px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1200px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
