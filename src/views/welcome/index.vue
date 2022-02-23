<template>
  <div class="container">
    <template v-if="false">
      <img class="book" src="@/assets/ic-book.svg" alt="">
      <p class="empty-message">Nenhum contato foi criado ainda.</p>
      <button class="new-button" @click="modalStatus = true">
        <img class="vertical-align-bottom" src="@/assets/ic-plus.svg" alt="plus icon">
        Criar contato
      </button>
    </template>
    <div class="data-container">
      <div class="data-head">
        <span class="font-size-13 item name">
          Contatos
        </span>
        <span class="font-size-13 item">
          E-mail
        </span>
        <span class="font-size-13 item">
          Telefone
        </span>
        <span class="action">
          .
        </span>
      </div>
      <div class="data-body font-size-14">
        <span class="badge">A</span>
        <span class="item name">Alana</span>
        <span class="item">valterinside@gmail.com</span>
        <span class="item">82 996875791</span>
        <span class="action">
          <img src="@/assets/ic-edit.svg" alt="edit">
          <img class="delete" src="@/assets/ic-delete.svg" alt="delete">
        </span>
      </div>
    </div>
  </div>
  <Modal
    :action="'Salvar'"
    :title="'Criar novo contato'"
    @toggleModal="handleToggleModal($event)"
    :isOpen="modalStatus"
    :dataContact="contact"
  >
    <label class="font-size-12" for="name">Nome:</label> <br>
    <input v-model="contact.name" class="w-100 mb-10" id="name" type="text" required>
    <br>
    <label class="font-size-12" for="email">Email:</label> <br>
    <input v-model="contact.email" class="w-100 mb-10" type="email" id="email" required>
    <br>
    <label class="font-size-12" for="phone">Telefone:</label> <br>
    <input v-model="contact.phone" type="text" id="phone">
  </Modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'

  export default {
    components: {
      Modal
    },
    data() {
      return {
        modalStatus: false,
        contact: {
          name: '',
          email: '',
          phone: ''
        }
      }
    },
    methods: {
      handleToggleModal(toggle) {
        console.log('close', toggle)
        this.modalStatus = toggle
      }
    }
  }
</script>

<style scoped>
  .container {
    /* text-align: center; */
    /* margin-top: 7rem; */
    padding: 0 1rem;
  }

  .book, .empty-message {
    margin-bottom: 2rem;
  }

  .data-head {
    background: white;
    border: 0.09rem solid var(--grey4);
    border-bottom: none;
    padding: 1rem 1rem 0.5rem 0;
    display: flex;
    justify-content: space-between;
    color: var(--grey2)
  }

  .data-head .item {
    flex: 1 25.555%;
  }

  .data-head .action {
    flex: 1 2%;
    color: transparent;
  }

  .data-head .name {
    margin-left: 2.93rem
  }

  .data-body {
    background: white;
    border: 0.09rem solid var(--grey4);
    padding: 0.75rem 1rem 0.75rem 0;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .data-body .item {
    flex: 1 25.555%;
  }

  .data-body .action {
    flex: 1 2%;
  }

  .badge {
    border-radius: 50%;
    background: red;
    padding-top: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 0.6rem;
    left: 0.3rem;
    flex: 1 2.93rem;
  }

  .name {
    margin-left: 2.93rem;
  }

  .delete {
    margin-left: 1.5rem;
  }
</style>
