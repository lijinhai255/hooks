# useTimeCountdown

时间倒计时 Hook，用于计算当前时间到目标时间的倒计时。

## 函数签名

```typescript
function useTimeCountdown(
  targetTime: number | Date | string
): {
  isTimeReached: boolean;
  formattedRemaining: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `targetTime` | `number \| Date \| string` | 目标时间，支持时间戳（秒或毫秒）、Date 对象或日期字符串 |

## 返回值

返回一个包含以下属性的对象：

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `isTimeReached` | `boolean` | 是否已到达目标时间 |
| `formattedRemaining` | `string` | 格式化的剩余时间字符串（如 "01:23:45" 或 "23:45"） |
| `days` | `number` | 剩余天数 |
| `hours` | `number` | 剩余小时数（0-23） |
| `minutes` | `number` | 剩余分钟数（0-59） |
| `seconds` | `number` | 剩余秒数（0-59） |

## 功能特性

1. **自动更新** - 每秒自动刷新倒计时
2. **灵活输入** - 支持多种时间格式（时间戳、Date 对象、字符串）
3. **智能识别** - 自动识别秒级或毫秒级时间戳
4. **格式化输出** - 提供人类可读的时间格式
5. **详细分解** - 返回天、时、分、秒的详细信息

## 使用示例

### 基本用法

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function CountdownTimer() {
  const targetDate = new Date('2024-12-31 23:59:59')
  const { isTimeReached, formattedRemaining } = useTimeCountdown(targetDate)

  if (isTimeReached) {
    return <div>时间到了！</div>
  }

  return <div>剩余时间：{formattedRemaining}</div>
}
```

### 使用时间戳

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function TimestampCountdown() {
  // 秒级时间戳
  const targetTimestamp = Math.floor(Date.now() / 1000) + 3600 // 1小时后
  const { formattedRemaining, hours, minutes, seconds } = useTimeCountdown(targetTimestamp)

  return (
    <div>
      <div>倒计时：{formattedRemaining}</div>
      <div>详细：{hours}小时 {minutes}分 {seconds}秒</div>
    </div>
  )
}
```

### 显示详细倒计时

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function DetailedCountdown() {
  const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5天后
  const { days, hours, minutes, seconds } = useTimeCountdown(futureDate)

  return (
    <div>
      <div>{days} 天</div>
      <div>{hours} 小时</div>
      <div>{minutes} 分钟</div>
      <div>{seconds} 秒</div>
    </div>
  )
}
```

### 活动倒计时

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function EventCountdown() {
  const eventDate = '2024-12-25T00:00:00'
  const { isTimeReached, formattedRemaining, days } = useTimeCountdown(eventDate)

  if (isTimeReached) {
    return <div>活动已开始！</div>
  }

  return (
    <div className="countdown">
      <h3>距离活动开始还有：</h3>
      {days > 0 && <div>{days} 天</div>}
      <div className="time-display">{formattedRemaining}</div>
    </div>
  )
}
```

### 限时优惠倒计时

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function LimitedTimeOffer() {
  // 24小时后结束
  const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const { isTimeReached, formattedRemaining } = useTimeCountdown(endTime)

  return (
    <div style={{
      background: isTimeReached ? '#ccc' : '#ff5722',
      color: 'white',
      padding: '16px',
      borderRadius: '8px'
    }}>
      {isTimeReached ? (
        <div>优惠已结束</div>
      ) : (
        <div>
          <div>限时优惠</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formattedRemaining}
          </div>
        </div>
      )}
    </div>
  )
}
```

### 验证码倒计时

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function VerificationCodeCountdown() {
  // 60秒后可以重新发送
  const resendTime = new Date(Date.now() + 60 * 1000)
  const { isTimeReached, formattedRemaining } = useTimeCountdown(resendTime)

  return (
    <button disabled={!isTimeReached}>
      {isTimeReached ? '发送验证码' : `重新发送 (${formattedRemaining})`}
    </button>
  )
}
```

### 多个倒计时

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function MultipleCountdowns() {
  const targets = [
    new Date(Date.now() + 60 * 1000),      // 1分钟后
    new Date(Date.now() + 5 * 60 * 1000),  // 5分钟后
    new Date(Date.now() + 60 * 60 * 1000)  // 1小时后
  ]

  return (
    <div>
      {targets.map((target, index) => {
        const { formattedRemaining, isTimeReached } = useTimeCountdown(target)
        return (
          <div key={index}>
            {isTimeReached ? '时间到' : formattedRemaining}
          </div>
        )
      })}
    </div>
  )
}
```

## 时间格式说明

### formattedRemaining 格式

- 如果剩余时间超过 1 小时：显示 `HH:MM:SS` 格式
  - 例如：`02:30:45`（2小时30分45秒）
  - 例如：`123:45:67`（123小时45分67秒）

- 如果剩余时间少于 1 小时：显示 `MM:SS` 格式
  - 例如：`45:30`（45分30秒）
  - 例如：`05:03`（5分3秒）

### 时间单位说明

| 单位 | 范围 | 说明 |
| --- | --- | --- |
| `days` | 0+ | 完整天数 |
| `hours` | 0-23 | 去除天数后的小时数 |
| `minutes` | 0-59 | 去除小时后的分钟数 |
| `seconds` | 0-59 | 去除分钟后的秒数 |

## 支持的时间格式

### 1. 数字时间戳

```tsx
// 毫秒级时间戳
useTimeCountdown(1704067200000)

// 秒级时间戳
useTimeCountdown(1704067200)
```

### 2. Date 对象

```tsx
useTimeCountdown(new Date('2024-12-31'))
useTimeCountdown(new Date(Date.now() + 3600000))
```

### 3. 日期字符串

```tsx
useTimeCountdown('2024-12-31')
useTimeCountdown('2024-12-31T23:59:59')
useTimeCountdown('2024-12-31 23:59:59')
```

## 注意事项

1. **性能考虑** - 每秒更新一次，避免在组件卸载后继续运行（已自动清理）
2. **目标时间** - 如果传入过去的时间，`isTimeReached` 会立即返回 `true`
3. **时区问题** - 使用本地时区进行计算，注意时区转换
4. **精度** - 倒计时精度为秒级，不适合毫秒级倒计时场景
5. **SSR 兼容** - 在服务端渲染时，使用服务器当前时间作为基准

## 实际应用场景

### 1. 秒杀活动

```tsx
function FlashSale() {
  const endTime = new Date('2024-12-31 23:59:59')
  const { formattedRemaining, isTimeReached } = useTimeCountdown(endTime)

  return (
    <div>
      <h2>秒杀活动</h2>
      {isTimeReached ? (
        <p>活动已结束</p>
      ) : (
        <p>距结束：{formattedRemaining}</p>
      )}
    </div>
  )
}
```

### 2. 投票截止

```tsx
function VotingDeadline() {
  const deadline = new Date('2024-12-31 18:00:00')
  const { days, hours, minutes } = useTimeCountdown(deadline)

  return (
    <div>
      <h3>投票截止倒计时</h3>
      <div>{days}天 {hours}小时 {minutes}分</div>
    </div>
  )
}
```

### 3. 预约提醒

```tsx
function AppointmentReminder() {
  const appointmentTime = new Date('2024-12-25 14:30:00')
  const { isTimeReached, formattedRemaining } = useTimeCountdown(appointmentTime)

  return (
    <div>
      {isTimeReached ? (
        <p>预约时间到了！</p>
      ) : (
        <p>距离预约还有：{formattedRemaining}</p>
      )}
    </div>
  )
}
```

### 4. 游戏倒计时

```tsx
function GameTimer({ duration }) {
  const endTime = new Date(Date.now() + duration * 1000)
  const { isTimeReached, formattedRemaining } = useTimeCountdown(endTime)

  useEffect(() => {
    if (isTimeReached) {
      // 游戏结束逻辑
      handleGameOver()
    }
  }, [isTimeReached])

  return <div>剩余时间：{formattedRemaining}</div>
}
```

## 最佳实践

### ✅ 推荐做法

```tsx
// 1. 使用常量或计算目标时间
const targetTime = new Date(Date.now() + 3600000)
const { formattedRemaining } = useTimeCountdown(targetTime)

// 2. 检查 isTimeReached 状态
const { isTimeReached, formattedRemaining } = useTimeCountdown(targetTime)
if (isTimeReached) {
  return <div>时间到</div>
}

// 3. 使用详细的分解信息
const { days, hours, minutes, seconds } = useTimeCountdown(targetTime)
```

### ❌ 不推荐做法

```tsx
// 1. 不要在每次渲染时创建新的 Date 对象
// 错误：
const { formattedRemaining } = useTimeCountdown(new Date())

// 2. 不要在循环中创建多个倒计时
// 错误：
{[1,2,3].map(i => {
  const target = new Date(Date.now() + i * 1000)
  const { formattedRemaining } = useTimeCountdown(target)  // 性能问题
  return <div>{formattedRemaining}</div>
})}
```

## TypeScript 支持

该 Hook 完全支持 TypeScript：

```tsx
import { useTimeCountdown } from '@miaoma-rhooks/hooks'

function Component(): JSX.Element {
  const { isTimeReached, formattedRemaining, days }: {
    isTimeReached: boolean
    formattedRemaining: string
    days: number
  } = useTimeCountdown(1704067200000)

  return <div>{formattedRemaining}</div>
}
```
