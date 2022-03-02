import { reactive, watch, ref } from 'vue'
import {
  getConn,
  getAll,
  search,
  insert,
  update,
  deleteById,
  getById
} from '@/services/storage'
getConn()

export const store = reactive({
  contacts: [],
  async loadContacts() {
    this.contacts = await getAll()
  },
  async searchContacts(query) {
    this.contacts = await search(query)
  },
  async newContact(data) {
    await insert(data)
    this.contacts = [
      { isNew: true, ...data },
      ...this.contacts
    ]
  },
  async updateContact(data) {
    await update(data)
    this.loadContacts()
  },
  async deleteContact(id) {
    await deleteById(id)
    this.loadContacts()
  }
})

let colorIndex = 0

export const welcomeStore = reactive({
  newContactId: -1,
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
  getColorStyle() {
    const colorsZeroSize = this.colors.length
    if (colorIndex >= colorsZeroSize) {
      colorIndex = 0
    }
    const colorStyle = { background: this.colors[colorIndex] }
    colorIndex ++
    return colorStyle
  },
  resetColorIndex() {
    colorIndex = 0
  },
  setNewContactId(id) {
    this.newContactId = id
  }
})

const currentTime = ref(-1)

watch(() => store.contacts, (newV, oldV, cleanUp) => {
  const thereIsANewElementOnArray = !!oldV.length && newV.length > oldV.length && newV[0].isNew
  if (thereIsANewElementOnArray) {
    const contact = newV[0]
    welcomeStore.setNewContactId(contact.id)
    clearTimeout(currentTime.value)
    currentTime.value = setTimeout(_ => {
      welcomeStore.setNewContactId(-1)
    }, 10000)
  }

  cleanUp(_ => {
    welcomeStore.resetColorIndex()
  })
})

export const modalStore = reactive({
  contactId: -1,
  modalId: null,
  toggleModal: false,
  editData: {},
  deleteId: -1,
  setModalId(value) {
    this.modalId = value
  },
  resetModalId() {
    this.modalId = null
  },
  setToggleModal(value) {
    this.toggleModal = value
  },
  async fillEditData(id) {
    this.editData = await getById(id)
  },
  async fillDeleteId(id) {
    this.deleteId = id
  }
})
