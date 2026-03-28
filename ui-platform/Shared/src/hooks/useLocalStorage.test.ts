import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('returns the stored value from localStorage', () => {
    localStorage.setItem('key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('updates state and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('updated')
  })

  it('works with object values', () => {
    const { result } = renderHook(() => useLocalStorage('obj', { count: 0 }))

    act(() => {
      result.current[1]({ count: 42 })
    })

    expect(result.current[0]).toEqual({ count: 42 })
    expect(JSON.parse(localStorage.getItem('obj')!)).toEqual({ count: 42 })
  })

  it('returns initial value when localStorage contains invalid JSON', () => {
    localStorage.setItem('key', 'not-json')
    const { result } = renderHook(() => useLocalStorage('key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })
})
