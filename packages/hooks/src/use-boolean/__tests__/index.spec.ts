import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { useBoolean } from '../use-boolean'

// 测试模块
describe('useBoolean', () => {
    // 测试的单元
    // 先口头描述一下用例
    // 我们期望渲染的是默认值
    test('should initialize with default value', () => {
        const { result } = renderHook(() => useBoolean())
        expect(result.current[0]).toBe(false)

        const { result: res2 } = renderHook(() => useBoolean(false))
        expect(res2.current[0]).toBe(false)
    })

    // 当我们点击或者调用了 toggle 方法，就需要更新当前值
    test('should toggle value', () => {
        const { result } = renderHook(() => useBoolean())

        expect(result.current[0]).toBe(false)

        // 模拟了调用 toggle 方法
        act(() => {
            result.current[1]()
        })

        expect(result.current[0]).toBe(true)
    })
})
