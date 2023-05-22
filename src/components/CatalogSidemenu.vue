<template>
  <div
    v-if="isShown"
    class="sidemenu">
    <router-link
      :to="{ name: 'catalog', params: { categorySlug: category.slug } }"
      class="sidemenu__item sidemenu__item--first"
      :class="{ 'sidemenu__item--active': isActiveItem(category.slug) }"
      >Все продукты
    </router-link>
    <Transition name="fade">
      <div
        class="sidemenu__list"
        :class="{ 'sidemenu__list--open': isOpen }">
        <router-link
          v-for="child in category.children"
          :key="child.id"
          :to="{ name: 'catalog', params: { categorySlug: category.slug, subcategorySlug: child.slug } }"
          class="sidemenu__item"
          :class="{ 'sidemenu__item--active': isActiveItem(child.slug) }">
          {{ child.name }}
        </router-link>
      </div>
    </Transition>
    <button
      class="sidemenu__toggle"
      @click="toggleSidemenu">
      <i
        class="toggle__icon"
        :class="{ 'toggle__icon--open': isOpen, 'toggle__icon--close': !isOpen }" />
    </button>
  </div>
</template>

<script>
  export default {
    name: 'CatalogSidemenu',
    props: {
      category: Object,
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      isShown() {
        return this.category?.children && this.category.children.length >= 2;
      },
    },
    methods: {
      isActiveItem(slug) {
        return (
          (this.$route.params.categorySlug === slug && !this.$route.params.subcategorySlug) ||
          this.$route.params.subcategorySlug === slug
        );
      },
      toggleSidemenu() {
        return (this.isOpen = !this.isOpen);
      },
    },
  };
</script>

<style scoped>
  .sidemenu {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 240px;
    flex-shrink: 0;
  }

  .sidemenu__list {
    display: none;
  }

  .sidemenu__list--open {
    display: flex;
    flex-direction: column;
  }

  .sidemenu__item {
    font-weight: 400;
    font-size: 16px;
    text-decoration: none;
    color: var(--dark-base-color);
    padding: 8px 12px;
    border-bottom: 1px solid var(--medium-base-color);
  }

  .sidemenu__item--active {
    background: var(--medium-base-color);
  }

  .sidemenu__item--first {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidemenu__toggle {
    border: none;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    background: none;
    cursor: pointer;
  }

  @media screen and (min-width: 576px) {
    .sidemenu__list {
      display: flex;
      flex-direction: column;
    }
    .sidemenu__toggle {
      display: none;
    }
  }

  .toggle__icon {
    display: block;
    width: 100%;
    height: 15px;
    background: url(../assets/angle-icon.svg) center/contain no-repeat;
  }

  .toggle__icon--open {
    transform: rotate(90deg);
  }

  .toggle__icon--close {
    transform: rotate(-90deg);
  }
</style>
