<template>
  <div class="container catalog">
    <p class="title">Категории товаров</p>
    <Transition name="fade">
      <p v-if="isCategoryLoading">Загрузка...</p>
      <Menutags v-else />
    </Transition>
  </div>
</template>

<script>
  import Menutags from '@/components/Menutags.vue';

  export default {
    name: 'Home',
    components: { Menutags },
    inject: ['city', 'isCategoryLoading'],
  };
</script>

<style scoped>
  .catalog {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
