import { useThrottleClick } from '@miaoma-rhooks/hooks'
import { useState } from 'react'

export default function UseThrottleClickDemo() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState<Date | null>(null)
  const [delay, setDelay] = useState(500)

  const [handleClick, isLoading] = useThrottleClick(() => {
    setClickCount(prev => prev + 1)
    setLastClickTime(new Date())
  }, delay)

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>useThrottleClick 示例</h3>

      {/* 状态显示 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          点击统计：
        </div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196f3' }}>
          {clickCount} 次
        </div>
        {lastClickTime && (
          <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            最后点击：{lastClickTime.toLocaleTimeString('zh-CN')}
          </div>
        )}
      </div>

      {/* 按钮演示 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <button
          onClick={handleClick}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: isLoading ? '#ccc' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isLoading ? `节流中 (${delay}ms)...` : '点击我'}
        </button>
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>
          {isLoading ? '⏳ 节流期间，点击将被忽略' : '✅ 可以点击'}
        </div>
      </div>

      {/* 延迟时间选择 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          节流延迟：
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[300, 500, 1000, 2000].map(d => (
            <button
              key={d}
              onClick={() => setDelay(d)}
              style={{
                padding: '8px 16px',
                background: delay === d ? '#2196f3' : '#f5f5f5',
                color: delay === d ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
                {d}ms
              </button>
          ))}
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
{`import { useThrottleClick } from '@miaoma-rhooks/hooks'

function Button() {
  const [handleClick, isLoading] = useThrottleClick(() => {
    console.log('点击执行')
  }, 1000)

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? '处理中...' : '点击'}
    </button>
  )
}`}
        </pre>
      </div>
    </div>
  )
}
