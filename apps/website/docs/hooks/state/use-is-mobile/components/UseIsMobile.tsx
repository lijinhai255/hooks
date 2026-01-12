import { useIsMobile } from '@miaoma-rhooks/hooks'
import { useState } from 'react'

export default function UseIsMobileDemo() {
  const isMobile = useIsMobile()
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  // 监听窗口大小变化
  useState(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>useIsMobile 示例</h3>

      {/* 当前状态 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px',
        border: '2px solid #2196f3'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          当前设备状态:
        </div>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: isMobile ? '#ff9800' : '#4caf50'
        }}>
          {isMobile ? '📱 移动端' : '🖥️ 桌面端'}
        </div>
      </div>

      {/* 窗口信息 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          窗口信息:
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          <div>宽度: {windowSize.width}px</div>
          <div>高度: {windowSize.height}px</div>
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#999'
        }}>
          断点: 768px (小于此值为移动端)
        </div>
      </div>

      {/* 响应式示例 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          响应式布局示例:
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '8px' : '16px'
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              style={{
                padding: isMobile ? '12px' : '24px',
                background: '#e3f2fd',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: isMobile ? '14px' : '16px'
              }}
            >
              项目 {item}
            </div>
          ))}
        </div>
      </div>

      {/* 使用说明 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          💡 提示:
        </div>
        <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.6' }}>
          调整浏览器窗口大小，观察上方内容的变化。
          当窗口宽度小于 768px 时，会自动切换为移动端布局。
        </div>
      </div>

      {/* 代码示例 */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        background: '#263238',
        borderRadius: '8px',
        overflow: 'auto'
      }}>
        <pre style={{
          margin: 0,
          fontSize: '13px',
          color: '#aed581',
          fontFamily: 'monospace'
        }}>
{`import { useIsMobile } from '@miaoma-rhooks/hooks'

function MyComponent() {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? '移动端视图' : '桌面端视图'}
    </div>
  )
}`}
        </pre>
      </div>
    </div>
  )
}
