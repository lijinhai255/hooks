import type { MutableRefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

export interface UseScrollOptions {
    /**
     * 节流等待时间 (ms)
     * @default 0
     */
    wait?: number
}

export interface ScrollPosition {
    x: number
    y: number
}

type Target<T> = T | MutableRefObject<T> | null | undefined

/**
 * 获取元素的滚动位置的 Hook
 * @param target - DOM 节点或者 Ref 对象，默认为 document
 * @param options - 配置项
 * @returns 滚动位置 { x, y }
 */
export const useScroll = <T extends Element | Document>(target?: Target<T>, options?: UseScrollOptions): ScrollPosition => {
    const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })
    const { wait = 0 } = options || {}
    const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastPositionRef = useRef<ScrollPosition>({ x: 0, y: 0 })

    useEffect(() => {
        // 获取实际的 DOM 元素
        const getTargetElement = (): Element | Document => {
            if (!target) {
                return document
            }

            // 如果是 Ref 对象
            if ('current' in target) {
                return target.current || document
            }

            return target
        }

        const targetElement = getTargetElement()

        // 节流处理函数
        const throttledUpdate = (newPosition: ScrollPosition) => {
            if (wait <= 0) {
                // 不使用节流
                setPosition(newPosition)
                return
            }

            // 检查位置是否发生变化
            if (lastPositionRef.current.x === newPosition.x && lastPositionRef.current.y === newPosition.y) {
                return
            }

            // 清除之前的定时器
            if (throttleTimerRef.current) {
                clearTimeout(throttleTimerRef.current)
            }

            // 设置新的定时器
            throttleTimerRef.current = setTimeout(() => {
                setPosition(newPosition)
                lastPositionRef.current = newPosition
            }, wait)
        }

        // 滚动事件处理函数
        const handleScroll = () => {
            let newPosition: ScrollPosition

            if (targetElement === document) {
                // 监听整个页面的滚动
                newPosition = {
                    x: document.documentElement.scrollLeft || window.scrollX,
                    y: document.documentElement.scrollTop || window.scrollY
                }
            } else {
                // 监听具体元素的滚动
                newPosition = {
                    x: (targetElement as Element).scrollLeft,
                    y: (targetElement as Element).scrollTop
                }
            }

            throttledUpdate(newPosition)
        }

        // 初始化滚动位置
        handleScroll()

        // 添加滚动事件监听
        targetElement.addEventListener('scroll', handleScroll)

        // 清理函数
        return () => {
            targetElement.removeEventListener('scroll', handleScroll)
            if (throttleTimerRef.current) {
                clearTimeout(throttleTimerRef.current)
            }
        }
    }, [target, wait])

    return position
}
