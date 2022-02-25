<template>
  <div class="container">
    <template v-if="!this.contacts.length">
      <div class="empty-container">
        <img class="book" src="@/assets/ic-book.svg" alt="">
        <p class="empty-message">Nenhum contato foi criado ainda.</p>
        <button class="new-button" @click="handleToggleModal">
          <img class="vertical-align-bottom" src="@/assets/ic-plus.svg" alt="plus icon">
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
            :class="[featured ? 'featured' : '']"
            v-for="contact of contacts"
          >
            <span class="badge" :style="getColorStyle()">
              {{contact?.name?.substring(0, 1)}}
            </span>
            <span class="item name">{{contact.name}}</span>
            <span class="item">{{contact.email}}</span>
            <span class="item">{{contact.phone}}</span>
            <span class="action">
              <button @click="handleEdit(contact.id)" class="edit">
                <img src="@/assets/ic-edit.svg" alt="edit">
              </button>
              <button @click="handleDelete(contact.id)" class="delete">
                <img src="@/assets/ic-delete.svg" alt="delete">
              </button>
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { getConn, getAll } from '@/services/storage'
  getConn()

  export default {
    async mounted() {
      this.contacts = await getAll();
      this.emitter.on('contacts:updated', async () => {
        this.contacts = await getAll();
      })
      this.emitter.on('contacts:created', async () => {
        this.featured = true
        clearTimeout(this.currentTime)
        this.currentTime = setTimeout(_ => {
          this.featured = false
        }, 10000)
      })
    },
    data() {
      return {
        colors: [
          '#fa8d68',
          '#90d26c',
          '#68a0fa',
          '#fab668',
          '#8368fa',
          '#fa68b5',
          '#5fe2c4',
          '#f55a5a'
        ],
        colorIndex: 0,
        contacts: [],
        featured: false,
        currentTime: -1
      }
    },
    methods: {
      getColorStyle() {
        if (this.colorIndex >= this.colors.length) {
          this.colorIndex = 0;
        }
        this.colorIndex += 1;
        return { background: this.colors[this.colorIndex] }
      },
      handleEdit(id) {
        this.emitter.emit('toggleModal-edit-modal', true)
        this.emitter.emit('editClicked', id)
      },
      async handleDelete (id) {
        this.emitter.emit('toggleModal-delete-modal', true)
        this.emitter.emit('deleteClicked', id)
      },
      handleToggleModal() {
        this.emitter.emit('toggleModal-create-modal', true)
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
    background: white;
    border: 0.09rem solid var(--grey4);
    border-bottom: none;
    padding: 1rem 1rem 0.5rem 0;
    display: flex;
    justify-content: space-between;
    color: var(--grey2);
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
  }

  .data-head .item {
    flex: 1 25.555%;
  }

  .data-head .action {
    flex: 1 2%;
  }

  .data-head .name {
    margin-left: 2.93rem
  }

  .data-item {
    background: white;
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
  }

  .badge {
    border-radius: 50%;
    background: hsla(0, 100%, 50%, 1);
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
