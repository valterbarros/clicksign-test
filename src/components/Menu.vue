<template>
  <header class="menu">
    <div class="wrapper">
      <nav class="menu-nav">
        <img class="logo" src="@/assets/icons/ic-logo.svg" alt="">
        <button class="new-button minor" @click="handleClick">
          <img class="vertical-align-bottom" src="@/assets/icons/ic-plus.svg" alt="plus icon">
          Criar contato
        </button>
        <div class="search-container">
          <input
            @input="handleSearch($event.target.value)"
            class="search-input"
            type="search"
            placeholder="Buscar..."
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  import { store, modalStore } from '@/services/store'

  export default {
    data() {
      return {
        store,
        modalStore
      }
    },
    methods: {
      handleClick() {
        this.modalStore.setModalId('create-modal');
        this.modalStore.setToggleModal(true)
      },
      async handleSearch(query) {
        this.store.searchContacts(query)
      }
    }
  }
</script>

<style scoped>
  .menu {
    padding: 1rem 1rem 0 1rem;
    margin-bottom: 2rem;
  }

  .menu-nav {
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    width: 100%;
    padding-right: 2rem;
  }

  .search-container {
    display: inline-block;
    width: 70%;
  }
  .search-container::after {
    content: url('@/assets/icons/ic-search.svg');
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
</style>
