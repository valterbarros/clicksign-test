<template>
  <Transition v-show="isOpen">
    <div class="backdrop">
      <div class="container">
        <div class="modal-header">
          <h1 class="title">{{ title }}</h1>
        </div>
        <hr class="line">
        <div class="modal-body">
          <form
            :id="'main-form' + id"
            action="#"
            @input="handleInput($event)"
            ref="mainForm"
            @submit.prevent="handleSubmit"
          >
            <slot name="inputs"></slot>
          </form>
          <slot name="message"></slot>
        </div>
        <hr class="line">
        <div class="modal-footer">
          <button class="cancel-button" @click="isOpen = false">
            Cancelar
          </button>
          <button
            type="submit"
            :form="'main-form' + id"
            class="action-button"
            :class="[isEdit || !thereIsInput || isValid ? '' : 'disabled']"
          >
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
        currentTime: -1,
        isOpen: false,
      }
    },
    mounted() {
      this.emitter.on(`toggleModal-${this.id}`, (e) => {
        this.isOpen = e
      })
      document.addEventListener('keyup', this.escapeModal.bind(this));
    },
    props: {
      id: String,
      title: String,
      action: String,
      actionFn: Function,
      thereIsInput: Boolean,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      escapeModal(e) {
        if (e.code === 'Escape') {
          this.isOpen = false;
        }
      },
      handleInput(e) {
        const { currentTarget } = e
        clearTimeout(this.currentTime)
        this.currentTime = setTimeout(_ => {
          this.isValid = currentTarget.checkValidity()
        }, 200)
      },
      async handleSubmit() {
        try {
          await this.actionFn();
          this.isOpen = false;
        } catch (e) {
          console.log('[db-error]', e);
        }
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
