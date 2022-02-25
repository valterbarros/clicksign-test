<template>
  <header class="menu">
    <div class="wrapper">
      <nav class="menu-nav">
        <img class="logo" src="@/assets/ic-logo.svg" alt="">
        <button class="new-button minor" @click="handleClick">
          <img class="vertical-align-bottom" src="@/assets/ic-plus.svg" alt="plus icon">
          Criar contato
        </button>
        <div class="search-container">
          <input class="search-input" type="search" placeholder="Buscar...">
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        this.emitter.emit('toggleModal-create-modal', true);
      }
    }
  }
</script>

<style scoped>
  .menu {
    padding: 1rem;
  }

  .menu-nav {
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    width: 100%;
  }

  .search-container {
    display: inline-block;
    width: 70%;
  }
  .search-container::after {
    content: url('@/assets/ic-search.svg');
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
</style>
