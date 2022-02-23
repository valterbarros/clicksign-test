<template>
  <Menu/>
  <RouterView />
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import Menu from '@/components/Menu.vue'

  export default {
    components: {
      Menu,
      RouterView
    }
  }
</script>

<style>
@import '@/assets/base.css';

html {
  background-color: var(--default-background-color);
}
</style>
