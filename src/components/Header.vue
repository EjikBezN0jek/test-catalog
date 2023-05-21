<template>
  <div class="header">
    <p
      v-if="city"
      class="header__item"
      @click="toggleModal">
      {{ this.city.city }}
    </p>
    <Modal
      v-if="isModalOpen"
      @toggleModal="toggleModal"
      @setCity="$emit('setCity', $event)" />
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue';

  export default {
    name: 'Header',
    components: { Modal },
    inject: ['city'],
    data() {
      return {
        isModalOpen: false,
      };
    },
    emits: ['setCity'],
    methods: {
      toggleModal() {
        this.isModalOpen = !this.isModalOpen;
        document.body.classList.toggle('lock');
      },
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
    background: url(../assets/pin-icon.svg) center/contain no-repeat;
  }
</style>
