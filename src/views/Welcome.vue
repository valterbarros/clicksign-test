<template>
  <div class="container">
    <template v-if="!store.contacts.length">
      <div class="empty-container">
        <img class="book" src="@/assets/icons/ic-book.svg" alt="book icon">
        <p class="empty-message">
          Nenhum contato foi criado ainda.
        </p>
        <button class="new-button" @click="handleToggleModal">
          <img class="vertical-align-bottom" src="@/assets/icons/ic-plus.svg" alt="plus icon">
          Criar contato
        </button>
      </div>
    </template>
    <template v-else>
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
          <span class="action"></span>
        </div>
        <div class="data-body font-size-14">
          <div
            class="data-item"
            :class="[welcomeStore.newContactId === contact.id ? 'featured' : '']"
            v-for="contact of store.contacts"
            :key="contact.id"
          >
            <span class="badge" :style="welcomeStore.getColorStyle()">
              {{contact?.name?.substring(0, 1)}}
            </span>
            <span class="item name">{{contact.name}}</span>
            <span class="item">{{contact.email}}</span>
            <span class="item">{{contact.phone}}</span>
            <span class="action">
              <button @click="handleEdit(contact.id)" class="edit">
                <img src="@/assets/icons/ic-edit.svg" alt="edit icon">
              </button>
              <button @click="handleDelete(contact.id)" class="delete">
                <img src="@/assets/icons/ic-delete.svg" alt="delete icon">
              </button>
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { store, welcomeStore, modalStore } from '@/services/store'

  export default {
    async mounted() {
      this.store.loadContacts()
    },
    data() {
      return {
        featured: false,
        store,
        welcomeStore,
        modalStore,
        modalStore
      }
    },
    methods: {
      handleEdit(id) {
        this.modalStore.setModalId('edit-modal')
        this.modalStore.setToggleModal(true)
        this.modalStore.fillEditData(id)
      },
      handleDelete (id) {
        this.modalStore.setModalId('delete-modal')
        this.modalStore.setToggleModal(true)
        this.modalStore.fillDeleteId(id)
      },
      handleToggleModal() {
        this.modalStore.setModalId('create-modal')
        this.modalStore.setToggleModal(true)
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 0 1rem;
  }

  .empty-container {
    text-align: center;
    margin-top: 7rem;
  }

  .book, .empty-message {
    margin-bottom: 2rem;
  }

  .data-head {
    background: var(--white);
    border: 0.09rem solid var(--grey4);
    border-bottom: none;
    padding: 1rem 1rem 0.5rem 0;
    display: flex;
    justify-content: space-between;
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
  }

  .data-head .item {
    color: var(--grey2);
    flex: 1 25.555%;
  }

  .data-head .action {
    flex: 1 2%;
  }

  .data-head .name {
    margin-left: 2.93rem
  }

  .data-item {
    background: var(--white);
    border: 0.09rem solid var(--grey4);
    padding: 0.75rem 1rem 0.75rem 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-top: none;
    transition: background-color 300ms;
  }

  .data-item:hover {
    background: var(--light-pink);
  }

  .data-item:first-child {
    border-top: 0.09rem solid var(--grey4);
  }

  .data-item:last-child {
    border-end-end-radius: 0.3rem;
    border-end-start-radius: 0.3rem;
  }

  .data-item .item {
    flex: 1 25.555%;
  }

  .data-item .action {
    flex: 1 2%;
    text-align: right;
  }

  .badge {
    border-radius: 50%;
    padding-top: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    color: var(--white);
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 0.6rem;
    left: 0.5rem;
    flex: 1 2.93rem;
    text-transform: uppercase;
  }

  .name {
    margin-left: 2.93rem;
  }

  .delete {
    margin-left: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .edit {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .data-item.featured:first-child {
    background: var(--light-pink);
  }
</style>
