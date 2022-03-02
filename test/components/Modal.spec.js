import { render, fireEvent } from '@testing-library/vue'
import { vi, expect, beforeEach, describe, afterEach } from 'vitest'
import { h } from 'vue';
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
  beforeEach(async () => {
    await vi.useFakeTimers()
    vi.mock('dexie')
    vi.mock('@/services/storage')
    vi.mock('@/services/store')
  })

  afterEach(async () => {
    await vi.useRealTimers()
    vi.unmock('dexie')
    vi.unmock('@/services/store')
    vi.unmock('@/services/storage')
  })
  
  test('Check toggle modal behavior', async () => {
    const { getByTestId } = render(Modal, {
      props: {
        id: 'create-modal'
      },
      data () {
        return {
          modalStore: {
            toggleModal: true,
            modalId: 'create-modal',
            setToggleModal: function() {
              this.toggleModal = false
            }
          }
        }
      }
    })

    const backdrop = getByTestId('backdrop')
    
    expect(backdrop.style.display).toBe('')
    
    await fireEvent.click(backdrop)

    expect(backdrop.style.display).toBe('none')
  })

  test('Check action is enable on edit form', async () => {
    const { getByTestId } = render(Modal, {
      props: {
        id: 'edit-modal',
        thereIsInput: true,
        isEdit: true
      }
    })

    const backdrop = getByTestId('action-button')
    
    expect(backdrop.classList.contains('disabled')).toBe(false)
  })

  test('Check action is disabled on create form', async () => {
    const { getByTestId } = render(Modal, {
      props: {
        id: 'create-modal',
        thereIsInput: true,
        isEdit: false
      }
    })

    const backdrop = getByTestId('action-button')
    
    expect(backdrop.classList.contains('disabled')).toBe(true)
  })

  test('Check action is enable on delete form', async () => {
    const { getByTestId } = render(Modal, {
      props: {
        id: 'delete-modal',
        thereIsInput: false,
        isEdit: false
      },
      slots: {
        message: '<p>Do you really want to remove this?</p>'
      },
    })

    const backdrop = getByTestId('action-button')
    
    expect(backdrop.classList.contains('disabled')).toBe(false)
  })

  test('Fill required fields and check if form is valid', async () => {
    const renderInput = (id) => {
      return h('input', {
        required: 'required',
        'data-testid': `${id}-input`,
        modelValue: this.modelValue,
        'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value)
      }, '')
    }

    const { debug, getByTestId } = render(Modal, {
      props: {
        id: 'create-modal',
        thereIsInput: true,
        isEdit: false
      },
      slots: {
        inputs: [
            renderInput('name'),
            renderInput('email'),
          ]
      }
    })

    const action = getByTestId('action-button')
    expect(action.classList.contains('disabled')).toBe(true)

    const name = getByTestId('name-input')
    const email = getByTestId('email-input')
    await fireEvent.update(name, 'valter');
    await fireEvent.update(email, 'valter@gmail.com')
    await vi.advanceTimersToNextTimer()

    expect(action.classList.contains('disabled')).toBe(false)
  })
  test('Submit form action', async () => {
    const renderInput = (id, focus) => {
      return h('input', {
        required: 'required',
        'data-testid': `${id}-input`,
        modelValue: this.modelValue,
        'onFocus': ($event) => console.log('focus', $event.target),
        'onUpdate:modelValue': (value) => this.$emit('update:modelValue', value)
      }, '')
    }

    const actionSpy = vi.fn()
    const setToggleSpy = vi.fn()

    const { getByTestId } = render(Modal, {
      props: {
        id: 'create-modal',
        thereIsInput: true,
        isEdit: false,
        action: 'save',
        actionFn: actionSpy
      },
      slots: {
        inputs: [
          renderInput('name'),
          renderInput('email'),
        ]
      },
      data() {
        return {
          modalStore: {
            setToggleModal: setToggleSpy
          }
        }
      }
    })

    const name = getByTestId('name-input')
    const email = getByTestId('email-input')
    await fireEvent.update(name, 'Valter');
    await fireEvent.update(email, 'valter@gmail.com')
    
    await vi.advanceTimersToNextTimer()

    const action = getByTestId('action-button')
    await fireEvent.click(action)

    expect(actionSpy).toHaveBeenCalledTimes(1)
    expect(setToggleSpy).toHaveBeenCalledTimes(1)
  })
})
