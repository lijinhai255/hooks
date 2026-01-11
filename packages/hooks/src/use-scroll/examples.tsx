/**
 * useScroll 使用示例
 */

import { useScroll } from 'miaoma-rhooks'
import React, { useRef, useState } from 'react'

// ========== 示例 1: 基础用法 - 监听特定元素的滚动 ==========
function BasicDemo() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const scroll = useScroll(scrollRef)

    return (
        <div>
            <p>滚动位置: {JSON.stringify(scroll)}</p>
            <div
                style={{
                    width: 300,
                    height: 200,
                    border: '1px solid #e8e8e8',
                    overflow: 'auto'
                }}
                ref={scrollRef}
            >
                <div style={{ height: 500, width: 500 }}>这是一个可滚动的区域，请尝试滚动查看效果</div>
            </div>
        </div>
    )
}

// ========== 示例 2: 监听整个页面滚动 ==========
function PageScrollDemo() {
    const scroll = useScroll()

    return (
        <div style={{ height: '200vh' }}>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: '#fff',
                    padding: 16
                }}
            >
                <p>页面滚动位置: {JSON.stringify(scroll)}</p>
                <p>请滚动页面查看效果</p>
            </div>
        </div>
    )
}

// ========== 示例 3: 使用节流优化性能 ==========
function ThrottledScrollDemo() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [eventCount, setEventCount] = useState(0)

    // 不使用节流的滚动监听
    const handleScroll = () => {
        setEventCount(c => c + 1)
    }

    // 使用节流的滚动监听
    const scroll = useScroll(scrollRef, { wait: 100 })

    return (
        <div>
            <p>滚动位置: {JSON.stringify(scroll)}</p>
            <p>滚动事件触发次数: {eventCount}</p>
            <div
                style={{
                    width: 300,
                    height: 200,
                    border: '1px solid #e8e8e8',
                    overflow: 'auto'
                }}
                ref={scrollRef}
                onScroll={handleScroll}
            >
                <div style={{ height: 500, width: 500 }}>
                    这是一个可滚动的区域，请尝试滚动查看效果。
                    <br />
                    注意观察滚动事件触发次数和实际更新的滚动位置数据。
                    <br />
                    由于使用了节流，滚动位置更新的频率会低于实际滚动事件的触发频率。
                </div>
            </div>
        </div>
    )
}

// ========== 示例 4: 滚动位置可视化 ==========
function ScrollVisualizerDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const scroll = useScroll(containerRef)

    const containerWidth = 300
    const containerHeight = 200
    const contentWidth = 500
    const contentHeight = 500

    // 计算滚动指示器的位置和大小
    const horizontalIndicatorWidth = (containerWidth / contentWidth) * containerWidth
    const horizontalIndicatorLeft = (scroll.x / (contentWidth - containerWidth)) * (containerWidth - horizontalIndicatorWidth)

    const verticalIndicatorHeight = (containerHeight / contentHeight) * containerHeight
    const verticalIndicatorTop = (scroll.y / (contentHeight - containerHeight)) * (containerHeight - verticalIndicatorHeight)

    return (
        <div>
            <p>滚动位置: {JSON.stringify(scroll)}</p>
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        width: containerWidth,
                        height: containerHeight,
                        border: '1px solid #e8e8e8',
                        overflow: 'auto'
                    }}
                    ref={containerRef}
                >
                    <div style={{ height: contentHeight, width: contentWidth }}>
                        这是一个可滚动的区域，请尝试滚动查看效果。
                        <br />
                        滚动时，右侧和底部的指示器会显示当前的滚动位置。
                    </div>
                </div>

                {/* 水平滚动指示器 */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: 4,
                        width: containerWidth,
                        background: '#f0f0f0'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: horizontalIndicatorWidth,
                            left: horizontalIndicatorLeft,
                            background: '#1890ff'
                        }}
                    />
                </div>

                {/* 垂直滚动指示器 */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 4,
                        height: containerHeight,
                        background: '#f0f0f0'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: verticalIndicatorHeight,
                            top: verticalIndicatorTop,
                            background: '#1890ff'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

// ========== 示例 5: 返回顶部按钮 ==========
function BackToTopDemo() {
    const scroll = useScroll()
    const [showButton, setShowButton] = useState(false)

    React.useEffect(() => {
        setShowButton(scroll.y > 300)
    }, [scroll.y])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div style={{ height: '200vh' }}>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: '#fff',
                    padding: 16
                }}
            >
                <p>页面滚动位置: {scroll.y}px</p>
                <p>向下滚动超过 300px 后，会显示返回顶部按钮</p>
            </div>

            {showButton && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: 50,
                        right: 50,
                        padding: '10px 20px',
                        background: '#1890ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 14
                    }}
                >
                    返回顶部
                </button>
            )}
        </div>
    )
}

export { BackToTopDemo, BasicDemo, PageScrollDemo, ScrollVisualizerDemo, ThrottledScrollDemo }
