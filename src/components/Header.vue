<template>
  <div class="header">
    <p
      v-if="city"
      class="header__item"
      @click="toggleModal">
      {{ city.city }}
    </p>
    <Modal
      v-if="isModalOpen"
      @toggleModal="toggleModal"
      @setCity="setCity"></Modal>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue';
  import { fetchCityById } from '@/api/catalog';

  export default {
    name: 'Header',
    components: { Modal },
    data() {
      return {
        isModalOpen: false,
        city: {},
      };
    },
    methods: {
      toggleModal() {
        return (this.isModalOpen = !this.isModalOpen);
      },
      async setCity(id = 1) {
        this.city = await fetchCityById(id);
        localStorage.setItem('city', JSON.stringify(this.city));
      },
    },
    async mounted() {
      !JSON.parse(localStorage.getItem('city'))
        ? this.setCity()
        : (this.city = JSON.parse(localStorage.getItem('city')));
    },
  };
</script>

<style scoped>
  .header {
    width: 100%;
    padding: 28px 20px;
    background: white;
    box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
  }

  .header__item {
    position: relative;
    margin-left: 19px;
    cursor: pointer;
  }

  .header__item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -19px;
    width: 11px;
    height: 16px;
    background: url(../assets/icon.svg) center/contain no-repeat;
  }
</style>
