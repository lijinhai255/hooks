import { useTimeCountdown } from '@miaoma-rhooks/hooks'
import { useState } from 'react'

export default function UseTimeCountdownDemo() {
  const [selectedMinutes, setSelectedMinutes] = useState(5)

  // 目标时间：当前时间 + 选定的分钟数
  const targetTime = new Date(Date.now() + selectedMinutes * 60 * 1000)
  const { isTimeReached, formattedRemaining, days, hours, minutes, seconds } = useTimeCountdown(targetTime)

  // 预设时间选项
  const presets = [
    { label: '1分钟', value: 1 },
    { label: '5分钟', value: 5 },
    { label: '10分钟', value: 10 },
    { label: '30分钟', value: 30 },
    { label: '1小时', value: 60 },
  ]

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>useTimeCountdown 示例</h3>

      {/* 倒计时显示 */}
      <div
        style={{
          padding: '24px',
          background: 'white',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center',
          border: `2px solid ${isTimeReached ? '#4caf50' : '#2196f3'}`
        }}
      >
        {isTimeReached ? (
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              倒计时结束
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#4caf50'
            }}>
              ✓ 时间到！
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
              剩余时间
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#2196f3',
              fontFamily: 'monospace',
              marginBottom: '16px'
            }}>
              {formattedRemaining}
            </div>
            <div style={{ fontSize: '13px', color: '#999' }}>
              目标时间：{targetTime.toLocaleString('zh-CN')}
            </div>
          </div>
        )}
      </div>

      {/* 详细时间分解 */}
      {!isTimeReached && (
        <div style={{
          padding: '16px',
          background: 'white',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            详细时间分解：
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '12px'
          }}>
            {days > 0 && (
              <div style={{
                padding: '12px',
                background: '#e3f2fd',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                  {days}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>天</div>
              </div>
            )}
            <div style={{
              padding: '12px',
              background: '#e3f2fd',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                {hours.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>时</div>
            </div>
            <div style={{
              padding: '12px',
              background: '#e3f2fd',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                {minutes.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>分</div>
            </div>
            <div style={{
              padding: '12px',
              background: '#e3f2fd',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                {seconds.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>秒</div>
            </div>
          </div>
        </div>
      )}

      {/* 预设时间选择 */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          选择倒计时时长：
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setSelectedMinutes(preset.value)}
              style={{
                padding: '8px 16px',
                background: selectedMinutes === preset.value ? '#2196f3' : '#f5f5f5',
                color: selectedMinutes === preset.value ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              {preset.label}
            </button>
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
          💡 使用提示：
        </div>
        <ul style={{ fontSize: '13px', color: '#333', margin: 0, paddingLeft: '20px' }}>
          <li>倒计时每秒自动更新</li>
          <li>支持时间戳、Date 对象或日期字符串</li>
          <li>自动识别秒级和毫秒级时间戳</li>
          <li>返回详细的时分秒分解</li>
        </ul>
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
{`import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function Countdown() {
  const targetTime = new Date(Date.now() + 5 * 60 * 1000)
  const { isTimeReached, formattedRemaining } = useTimeCountdown(targetTime)

  return (
    <div>
      {isTimeReached ? '时间到！' : \`剩余：\${formattedRemaining}\`}
    </div>
  )
}`}
        </pre>
      </div>
    </div>
  )
}
