<template>
  <Menu/>
  <RouterView />

  <Modal
    :action="'Salvar'"
    :title="'Criar novo contato'"
    id="create-modal"
    :actionFn="createModalAction"
    :thereIsInput="true"
  >
    <template v-slot:inputs>
      <label class="font-size-12" for="name">Nome:</label> <br>
      <input v-model="newContact.name" class="w-100 mb-10" id="name" type="text" required>
      <br>
      <label class="font-size-12" for="email">Email:</label> <br>
      <input v-model="newContact.email" class="w-100 mb-10" type="email" id="email" required>
      <br>
      <label class="font-size-12" for="phone">Telefone:</label> <br>
      <input v-model="newContact.phone" type="text" id="phone">
    </template>
  </Modal>

  <Modal
    :action="'Salvar'"
    :title="'Editar contato'"
    id="edit-modal"
    :actionFn="editModalAction"
    :thereIsInput="true"
    isEdit
  >
    <template v-slot:inputs>
      <label class="font-size-12" for="name">Nome:</label> <br>
      <input v-model="editContact.name" class="w-100 mb-10" id="name" type="text" required>
      <br>
      <label class="font-size-12" for="email">Email:</label> <br>
      <input v-model="editContact.email" class="w-100 mb-10" type="email" id="email" required>
      <br>
      <label class="font-size-12" for="phone">Telefone:</label> <br>
      <input v-model="editContact.phone" type="text" id="phone">
    </template>
  </Modal>

  <Modal
    :action="'Excluir'"
    :title="'Excluir contato'"
    id="delete-modal"
    :actionFn="deleteModalAction"
    :thereIsInput="false"
  >
    <template v-slot:message>
      <p class="font-size-14">Deseja realmente excluir o contato?</p>
    </template>
  </Modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import { RouterLink, RouterView } from 'vue-router'
  import Menu from '@/components/Menu.vue'
  import { getConn, getById, insert, update, deleteById } from '@/services/storage'
  getConn()

  export default {
    components: {
    Modal,
    Menu,
    RouterView
},
    async mounted() {
      this.emitter.on('editClicked', id => this.fillEditContact(id))
      this.emitter.on('deleteClicked', id => this.fillDelContactId(id))
    },
    data () {
      return {
        newContact: {
          name: '',
          email: '',
          phone: ''
        },
        editContact: {
          id: -1,
          name: '',
          email: '',
          phone: ''
        },
        contractDelId: -1
      }
    },
    methods: {
      async fillEditContact(id) {
        this.editContact = await getById(id)
      },
      async fillDelContactId(id) {
        this.contractDelId = id
      },
      async createModalAction() {
        await insert({...this.newContact})
        this.emitter.emit('contacts:updated')
        this.emitter.emit('contacts:created')
      },
      async editModalAction() {
        await update({...this.editContact})
        this.emitter.emit('contacts:updated')
      },
      async deleteModalAction() {
        await deleteById(this.contractDelId)
        this.emitter.emit('contacts:updated')
      }
    }
  }
</script>

<style>
@import '@/assets/base.css';

html {
  background-color: var(--default-background-color);
}
</style>
