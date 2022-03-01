<template>
  <Transition v-show="modalStore.toggleModal && id === modalStore.modalId">
    <div class="backdrop" @click.self="modalStore.setToggleModal(false)">
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
          <button class="cancel-button" @click="modalStore.setToggleModal(false)">
            Cancelar
          </button>
          <button
            type="submit"
            :form="'main-form' + id"
            class="action-button"
            :class="[!thereIsInput || isValid ? '' : 'disabled']"
          >
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
  import { modalStore } from '@/services/store'

  export default {
    data () {
      return {
        isValid: this.isEdit,
        currentTime: -1,
        isOpen: false,
        modalStore
      }
    },
    mounted() {
      this.escapeModalHandler();
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
          this.modalStore.setToggleModal(false)
        } catch (e) {
          console.log('[db-error]', e);
        }
      },
      escapeModalHandler() {
        document.addEventListener('keyup', this.escapeModal.bind(this));
      },
      escapeModal(e) {
        if (e.code === 'Escape') {
          this.modalStore.setToggleModal(false)
        }
      }
    }
  }
</script>

<style scoped>
  .backdrop {
    background: var(--backdrop-black);
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
  }

  .container {
    background: white;
    width: 50%;
    max-width: 27rem;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 1rem;
    margin-top: 15rem;
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
