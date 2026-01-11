import { useScroll } from '@miaoma-rhooks/hooks'
import React, { useRef, useState } from 'react'

function UseScrollDemo() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [useThrottle, setUseThrottle] = useState(false)

    // 根据是否使用节流来调用不同的配置
    const scroll = useScroll(scrollRef, useThrottle ? { wait: 100 } : undefined)

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    background: '#f5f5f5',
                    borderRadius: '8px'
                }}
            >
                <h3>滚动位置</h3>
                <p>
                    <strong>X:</strong> {scroll.x.toFixed(0)} px
                </p>
                <p>
                    <strong>Y:</strong> {scroll.y.toFixed(0)} px
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={useThrottle} onChange={e => setUseThrottle(e.target.checked)} />
                    <span>启用节流（100ms）</span>
                </label>
            </div>

            <div
                ref={scrollRef}
                style={{
                    width: '100%',
                    height: '300px',
                    border: '2px solid #d9d9d9',
                    borderRadius: '8px',
                    overflow: 'auto',
                    padding: '20px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                <div
                    style={{
                        width: '800px',
                        height: '800px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '40px',
                        borderRadius: '8px'
                    }}
                >
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>📜 可滚动区域</h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>这是一个可滚动的容器区域。请尝试上下左右滚动查看效果。</p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', marginTop: '20px' }}>useScroll Hook 会实时监听滚动位置并更新显示。</p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', marginTop: '20px' }}>
                        你可以勾选上方的"启用节流"选项来体验节流优化效果。
                    </p>

                    <div
                        style={{
                            marginTop: '40px',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '8px'
                        }}
                    >
                        <h3>💡 使用场景</h3>
                        <ul style={{ lineHeight: '2' }}>
                            <li>实现返回顶部按钮</li>
                            <li>无限滚动加载</li>
                            <li>滚动位置指示器</li>
                            <li>滚动动画触发</li>
                        </ul>
                    </div>

                    <div
                        style={{
                            marginTop: '40px',
                            padding: '20px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '8px'
                        }}
                    >
                        <h3>⚡ 性能优化</h3>
                        <p>
                            滚动事件触发频率非常高，建议在需要高频更新时使用节流功能。 可以通过设置 <code>wait</code> 参数来控制更新频率。
                        </p>
                    </div>

                    {/* 填充内容以支持滚动 */}
                    <div style={{ marginTop: '100px', textAlign: 'center' }}>
                        <p>⬇️ 继续向下滚动 ⬇️</p>
                    </div>
                    <div style={{ height: '200px' }} />
                    <div style={{ marginTop: '100px', textAlign: 'center' }}>
                        <p>⬇️ 更多内容 ⬇️</p>
                    </div>
                    <div style={{ height: '200px' }} />
                </div>
            </div>

            <div
                style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: '#e6f7ff',
                    border: '1px solid #91d5ff',
                    borderRadius: '8px'
                }}
            >
                <p style={{ margin: 0, color: '#0050b3' }}>
                    <strong>💡 提示：</strong>
                    滚动容器的实时位置会显示在上方。启用节流后，位置更新频率会降低， 但可以提升性能。
                </p>
            </div>
        </div>
    )
}

export default UseScrollDemo
