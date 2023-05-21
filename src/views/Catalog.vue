<template>
  <div class="container catalog">
    <p class="title">Категории товаров</p>
    <Transition name="fade">
      <p v-if="isLoading">Загрузка...</p>
      <div
        v-else
        class="categories">
        <router-link
          v-for="category in this.categories"
          :key="category.id"
          :to="{ name: 'category', params: { categorySlug: category.slug } }"
          class="categories__item"
          :style="{ background: `url(${category.image}) center/contain no-repeat`, color: category.text_color }">
          <p>{{ category.name }}</p>
        </router-link>
      </div>
    </Transition>
  </div>
</template>

<script>
  export default {
    name: 'Catalog',
    components: {},
    inject: ['city', 'categories', 'isLoading'],
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
</style>
