import { truncateText } from '@miaoma-rhooks/utils'

export default function TruncateTextDemo() {
  const examples = [
    { text: 'Hello World', maxLength: 8, label: '默认长度（8）' },
    { text: 'Hello World', maxLength: 5, label: '自定义长度（5）' },
    { text: 'Blockchain', maxLength: 6, label: '截断长单词' },
    { text: 'Short', maxLength: 8, label: '短文本（不截断）' },
    { text: '', maxLength: 8, label: '空文本' },
    { text: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', maxLength: 10, label: '钱包地址' },
  ]

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>truncateText 示例</h3>

      {examples.map((example, index) => (
        <div
          key={index}
          style={{
            marginBottom: '16px',
            padding: '12px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {example.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#999' }}>
                输入: "{example.text || '(空)'}"
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                最大长度: {example.maxLength}
              </div>
            </div>
            <div style={{
              padding: '8px 16px',
              background: '#e3f2fd',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1976d2'
            }}>
              {truncateText(example.text, example.maxLength)}
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '16px', padding: '12px', background: '#fff3e0', borderRadius: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          🔧 自定义测试
        </div>
        <input
          type="text"
          placeholder="输入测试文本..."
          onChange={(e) => {
            const result = truncateText(e.target.value, 8)
            e.target.nextElementSibling!.textContent = `结果: "${result}"`
          }}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#1976d2' }}>
          结果: ""
        </div>
      </div>
    </div>
  )
}
