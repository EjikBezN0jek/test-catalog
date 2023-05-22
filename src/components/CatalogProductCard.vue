<template>
  <div
    class="card"
    v-for="product in products"
    :key="product.id">
    <img
      :src="`${product.main_image_thumb_300}`"
      :alt="`${product.present_name}-image`" />
    <div class="card__wrapper">
      <div class="card__name-wrapper">
        <p class="card__category">{{ product.category.name }}</p>
        <p class="card__name">{{ product.present_name }}</p>
      </div>
      <div class="card__info-wrapper">
        <p class="card__comment">{{ product.comment_name }}</p>
        <p class="card__price">{{ product.price }} ₽</p>
        <button
          v-if="!product.allowed || !product.available"
          class="btn card__btn">
          Нет в наличии
        </button>
        <button
          v-else
          class="btn btn--active card__btn">
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CatalogProductCard',
    components: {},
    props: {
      products: Array,
    },
  };
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
    background: white;
  }
  .card__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 23px;
  }

  .card__name-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .card__info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .card__category {
    font-size: 14px;
    font-weight: 400;
    color: var(--light-base-color);
  }

  .card__name {
    font-size: 20px;
  }

  .card__comment {
    font-weight: 400;
  }

  .card__price {
    font-size: 26px;
  }

  .card__btn {
    font-size: 18px;
    padding: 8px 65px;
  }
</style>
