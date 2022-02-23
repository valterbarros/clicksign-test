<template>
  <Transition>
    <div class="backdrop" v-if="isOpen">
      <div class="container">
        <div class="modal-header">
          <h1 class="title">{{ title }}</h1>
        </div>
        <hr class="line">
        <div class="modal-body">
          <form action="#" @input="handleInput($event)">
            <slot></slot>
          </form>
        </div>
        <hr class="line">
        <div class="modal-footer">
          <button class="cancel-button" @click="$emit('toggleModal', false)">
            Cancelar
          </button>
          <button class="action-button" :class="[isValid ? '' : 'disabled']" @click="handleConfirm">
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
  export default {
    data () {
      return {
        isValid: false,
        currentTime: -1
      }
    },
    props: {
      title: String,
      action: String,
      isOpen: Boolean,
      dataContact: Object
    },
    methods: {
      handleInput(e) {
        const { currentTarget } = e
        clearTimeout(this.currentTime)
        this.currentTime = setTimeout(() => {
          this.isValid = currentTarget.checkValidity()
        }, 200)
      },
      handleConfirm() {
        console.log('confirm');
      }
    }
  }
</script>

<style scoped>
  .backdrop {
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-content: stretch;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .container {
    background: white;
    width: 50%;
    max-width: 27rem;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 1rem;
  }

  .title {
    font-size: 1rem;
  }

  .modal-header {
    padding-bottom: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }

  .line {
    margin: 0 -1rem;
  }

  /* modal animation classes */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 300ms ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
