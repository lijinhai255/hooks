import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { useScroll } from '../use-scroll'

describe('useScroll', () => {
    let container: HTMLDivElement
    let scrollableContent: HTMLDivElement

    beforeEach(() => {
        // 创建一个可滚动的容器
        container = document.createElement('div')
        container.style.width = '300px'
        container.style.height = '200px'
        container.style.overflow = 'auto'

        scrollableContent = document.createElement('div')
        scrollableContent.style.width = '500px'
        scrollableContent.style.height = '500px'
        scrollableContent.textContent = 'Scrollable content'

        container.appendChild(scrollableContent)
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
    })

    test('should initialize with default position', () => {
        const { result } = renderHook(() => useScroll())

        expect(result.current).toEqual({ x: 0, y: 0 })
    })

    test('should track scroll position for document', () => {
        const { result } = renderHook(() => useScroll())

        // 模拟文档滚动
        act(() => {
            Object.defineProperty(document.documentElement, 'scrollTop', {
                value: 200,
                writable: true,
                configurable: true
            })
            Object.defineProperty(document.documentElement, 'scrollLeft', {
                value: 100,
                writable: true,
                configurable: true
            })
            document.dispatchEvent(new Event('scroll', { bubbles: true }))
        })

        expect(result.current.x).toBe(100)
        expect(result.current.y).toBe(200)
    })

    test('should track scroll position for element', () => {
        const { result } = renderHook(() => useScroll(container))

        act(() => {
            container.scrollTop = 50
            container.scrollLeft = 30
            container.dispatchEvent(new Event('scroll'))
        })

        // 等待状态更新
        setTimeout(() => {
            expect(result.current.x).toBe(30)
            expect(result.current.y).toBe(50)
        }, 0)
    })

    test('should throttle scroll updates when wait is provided', () => {
        vi.useFakeTimers()

        const { result } = renderHook(() => useScroll(container, { wait: 100 }))
        const updateSpy = vi.spyOn(console, 'log')

        act(() => {
            container.scrollTop = 10
            container.dispatchEvent(new Event('scroll'))

            container.scrollTop = 20
            container.dispatchEvent(new Event('scroll'))

            container.scrollTop = 30
            container.dispatchEvent(new Event('scroll'))
        })

        // 在节流时间内，不应该更新
        expect(result.current.y).toBe(0)

        // 快进到节流时间后
        act(() => {
            vi.advanceTimersByTime(100)
        })

        // 应该更新到最后的位置
        expect(result.current.y).toBe(30)

        vi.useRealTimers()
        updateSpy.mockRestore()
    })

    test('should cleanup event listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(container, 'removeEventListener')

        const { unmount } = renderHook(() => useScroll(container))

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    test('should update position when scrolling horizontally', () => {
        const { result } = renderHook(() => useScroll(container))

        act(() => {
            container.scrollLeft = 100
            container.dispatchEvent(new Event('scroll'))
        })

        setTimeout(() => {
            expect(result.current.x).toBe(100)
            expect(result.current.y).toBe(0)
        }, 0)
    })

    test('should handle multiple scroll events', () => {
        const { result } = renderHook(() => useScroll(container))

        act(() => {
            container.scrollTop = 10
            container.dispatchEvent(new Event('scroll'))
        })

        setTimeout(() => {
            expect(result.current.y).toBe(10)

            act(() => {
                container.scrollTop = 50
                container.dispatchEvent(new Event('scroll'))
            })

            setTimeout(() => {
                expect(result.current.y).toBe(50)
            }, 0)
        }, 0)
    })
})
