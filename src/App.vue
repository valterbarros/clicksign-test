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
      <label class="font-size-12" for="name">
        Nome:
        <abbr title="required">*</abbr>
      </label> <br>
      <input v-model="newContact.name" class="w-100 mb-10" id="name" type="text" required placeholder="your name">
      <br>
      <label class="font-size-12" for="email">
        Email:
        <abbr title="required">*</abbr>
      </label> <br>
      <input v-model="newContact.email" class="w-100 mb-10" type="email" id="email" required placeholder="your email">
      <br>
      <label class="font-size-12" for="phone">Telefone:</label> <br>
      <input type="tel" v-mask="'(##) #####-####'" v-model="newContact.phone" id="phone" placeholder="(99) 12322-3232">
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
      <label class="font-size-12" for="name">
        Nome:
        <abbr title="required">*</abbr>
      </label> <br>
      <input v-model="modalStore.editData.name" class="w-100 mb-10" id="name" type="text" required placeholder="your name">
      <br>
      <label class="font-size-12" for="email">
        Email:
        <abbr title="required">*</abbr>
      </label> <br>
      <input v-model="modalStore.editData.email" class="w-100 mb-10" type="email" id="email" required placeholder="your email">
      <br>
      <label class="font-size-12" for="phone">Telefone:</label> <br>
      <input type="tel" v-mask="'(##) #####-####'" v-model="modalStore.editData.phone" id="phone" placeholder="(99) 12322-3232">
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
  import { getConn } from '@/services/storage'
  getConn()
  import { store, modalStore } from '@/services/store'
  import { mask } from 'vue-the-mask'

  const newContactInitial = () => {
    return {
      name: '',
      email: '',
      phone: ''
    }
  }

  export default {
    components: {
      Modal,
      Menu,
      RouterView
    },
    directives: {
      mask
    },
    data () {
      return {
        newContact: newContactInitial(),
        store,
        modalStore
      }
    },
    methods: {
      async createModalAction() {
        this.store.newContact({...this.newContact})
        this.newContact = newContactInitial();
      },
      async editModalAction() {
        this.store.updateContact({...this.modalStore.editData})
      },
      async deleteModalAction() {
        this.store.deleteContact(this.modalStore.deleteId)
      }
    }
  }
</script>

<style>
@import '@/assets/css/base.css';

html {
  background-color: var(--default-background-color);
}
</style>
