import { render, fireEvent } from '@testing-library/vue'
import Menu from '@/components/Menu.vue'
import { vi, expect, beforeEach, describe, afterEach } from 'vitest'
import { store, modalStore } from '@/services/store.js'

describe('Menu.vue', () => {
  beforeEach(async () => {
    vi.mock('dexie')
    vi.mock('@/services/storage')
    vi.mock('@/services/store')
  })

  afterEach(async () => {
    await vi.useRealTimers()
    vi.unmock('dexie')
    vi.unmock('@/services/storage')
    vi.unmock('@/services/store')
  })
  
  test('Check events and check if methods is called', () => {
    const { container, getByText } = render(Menu)
    const input = container.querySelector('.search-input')
    fireEvent.update(input, 'name to search')
  
    const newButton = container.querySelector('.new-button')
    fireEvent.click(newButton)
  
    expect(() => getByText('Criar contato')).not.toThrowError()
    expect(input.value).toBe('name to search')
    expect(store.searchContacts).toHaveBeenCalledWith('name to search')
    expect(modalStore.setModalId).toHaveBeenCalledWith('create-modal')
    expect(modalStore.setToggleModal).toHaveBeenCalledWith(true)
  })
})
