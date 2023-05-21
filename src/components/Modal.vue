<template>
  <div
    class="modal"
    @click.self="$emit('toggleModal')">
    <div class="modal__dialog">
      <p class="modal__header">Выбор населённого пункта:</p>
      <form
        class="modal__form"
        @submit.prevent="applyCity">
        <div class="search">
          <input
            type="text"
            class="form__input"
            placeholder="Например, Санкт-петербург"
            v-model.trim="searchedCityQuery"
            ref="input" />
          <div
            v-if="citiesList.length"
            class="city__list">
            <div
              v-for="city in citiesList"
              :key="city.id"
              class="list__item"
              @click="chooseCity(city)">
              {{ city.label }}
            </div>
          </div>
          <i
            v-if="searchedCityQuery.length"
            class="btn-times input__btn--remove"
            @click="clearInput" />
        </div>
        <button
          type="submit"
          class="form__btn"
          :class="{ 'active-btn': isChosenCity }">
          Подтвердить
        </button>
      </form>
      <i
        class="btn-times modal__btn--close"
        @click="$emit('toggleModal')"></i>
    </div>
  </div>
</template>

<script>
  import { fetchCities } from '@/api/catalog';

  export default {
    name: 'Modal',
    data() {
      return {
        searchedCityQuery: '',
        citiesList: [],
        timer: 0,
        isChosenCity: false,
        chosenCityId: 0,
      };
    },
    emits: ['toggleModal', 'setCity'],
    watch: {
      searchedCityQuery(newValue) {
        newValue.length >= 3 ? this.debounceSearch() : clearTimeout(this.timer);
      },
    },
    methods: {
      async searchCity() {
        this.citiesList = await fetchCities(this.searchedCityQuery);
      },
      clearInput() {
        return (this.searchedCityQuery = ''), (this.citiesList = []), (this.isChosenCity = false);
      },
      debounceSearch() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.searchCity(), 300);
      },
      chooseCity(city) {
        this.searchedCityQuery = city.label;
        this.chosenCityId = city.id;
        this.isChosenCity = true;
      },
      applyCity() {
        if (this.isChosenCity) {
          this.$emit('setCity', this.chosenCityId);
          this.$emit('toggleModal');
        }
      },
    },
    mounted() {
      this.$refs.input.focus();
    },
  };
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .modal__dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 30px 18px;
    margin: 0 auto;
    width: 100%;
    max-width: 769px;
    border-radius: 5px;
    background: white;
  }

  .modal__header {
    font-size: 20px;
    width: auto;
  }

  .modal__btn--close {
    top: 18px;
    right: 18px;
    width: 16px;
    height: 16px;
  }

  .btn-times {
    position: absolute;
    background: url(../assets/times-icon.svg) center/contain no-repeat;
    z-index: 999;
    cursor: pointer;
  }

  .modal__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  @media screen and (min-width: 576px) {
    .modal__form {
      display: flex;
      flex-direction: row;
      gap: 18px;
    }
  }

  .search {
    width: 100%;
    position: relative;
  }

  .form__input {
    position: relative;
    border-radius: 5px;
    padding: 12px 44px 12px 12px;
    border: 1px solid var(--light-base-color);
    width: 100%;
    max-width: 540px;
    font-size: 18px;
  }

  .form__input::-webkit-input-placeholder {
    color: var(--light-base-color);
  }
  .form__input::-moz-placeholder {
    color: var(--light-base-color);
  }

  .input__btn--remove {
    top: 20px;
    right: 20px;
    width: 12px;
    height: 12px;
  }

  .form__input:focus-visible {
    outline: none;
    border: 1px solid var(--dark-base-color);
  }

  .form__btn {
    font-family: inherit;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1.75px;
    text-transform: uppercase;
    padding: 13px 24px;
    color: var(--dark-base-color);
    border-radius: 24px;
    border: 2px solid var(--lightest-base-color);
    background: transparent;
    opacity: 0.5;
    cursor: pointer;
  }

  .active-btn {
    color: white;
    border: none;
    background: linear-gradient(270deg, #ffa800 0%, #ff6f00 60.2%);
    box-shadow: 0 20px 20px -15px #ff6f00;
    opacity: 1;
  }

  .city__list {
    position: absolute;
    top: 43px;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
    max-height: 172px;
    width: 100%;
    max-width: 540px;
    padding: 0 12px 12px;
    border-radius: 0 0 5px 5px;
    border-bottom: 1px solid var(--dark-base-color);
    border-left: 1px solid var(--dark-base-color);
    border-right: 1px solid var(--dark-base-color);
    background: white;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    z-index: 9999;
  }

  .city__list::before {
    content: '';
    position: sticky;
    top: 0;
    border: 1px solid var(--lightest-base-color);
  }

  .city__list::-webkit-scrollbar {
    display: none;
  }

  .list__item {
    color: var(--light-base-color);
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
  }

  .list__item:hover {
    color: var(--dark-base-color);
  }
</style>
