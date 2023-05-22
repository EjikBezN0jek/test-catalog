<template>
  <div class="categories">
    <router-link
      v-for="category in this.categories"
      :key="category.id"
      :to="{ name: 'catalog', params: { categorySlug: category.slug } }"
      class="categories__item"
      :style="{ 'background-image': `url(${category.image})`, color: category.text_color }">
      <p>{{ category.name }}</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Menutags',
    components: {},
    inject: ['categories'],
  };
</script>

<style scoped>
  .categories {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(1, 1fr);
    gap: 22px;
  }

  @media screen and (min-width: 576px) {
    .categories {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 992px) {
    .categories {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 1200px) {
    .categories {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media screen and (min-width: 1400px) {
    .categories {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .categories__item {
    display: block;
    width: 100%;
    height: 145px;
    padding: 20px;
    font-size: 24px;
    text-decoration: none;
    border-radius: 5px;
    background-size: cover;
    background-position: right 85%;
    background-repeat: no-repeat;
  }
</style>
