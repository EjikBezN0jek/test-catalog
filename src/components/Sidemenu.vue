<template>
  <div v-if="isShown">
    <router-link
      v-for="child in category.children"
      :key="child.id"
      :to="{ name: 'category', params: { categorySlug: category.slug, subcategorySlug: child.slug } }">
      {{ child.name }}
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Sidemenu',
    props: {
      category: Object,
    },
    data() {
      return {};
    },
    computed: {
      isShown() {
        return this.category?.children && this.category.children.length >= 2;
      },
    },
  };
</script>

<style scoped></style>
