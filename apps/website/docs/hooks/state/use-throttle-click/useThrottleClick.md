# useThrottleClick

防抖点击 Hook，防止按钮在短时间内被多次点击，通过节流机制控制点击频率。

## 函数签名

```typescript
function useThrottleClick<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 500
): [throttledCallback: (...args: T) => void, isLoading: boolean]
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `callback` | `(...args: T) => void` | - | 点击时执行的回调函数 |
| `delay` | `number` | `500` | 节流延迟时间（毫秒） |

## 返回值

返回一个元组：
- **throttledCallback** - 节流后的回调函数，绑定到按钮的 onClick
- **isLoading** - 当前是否处于节流等待中（可用来禁用按钮或显示加载状态）

## 功能特性

1. **节流机制** - 确保回调在指定时间内只能执行一次
2. **加载状态** - 提供 isLoading 状态用于 UI 反馈
3. **类型安全** - 完整的 TypeScript 类型支持
4. **自动清理** - 组件卸载时自动清理定时器
5. **灵活配置** - 可自定义节流延迟时间

## 使用示例

### 基本用法

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function SubmitButton() {
  const [handleClick, isLoading] = useThrottleClick(() => {
    console.log('提交表单')
    // 执行提交逻辑
  }, 1000)

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? '提交中...' : '提交'}
    </button>
  )
}
```

### 带参数的回调

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function LikeButton({ postId }: { postId: string }) {
  const [handleLike, isLiking] = useThrottleClick((id: string) => {
    fetch(`/api/like/${id}`).then(res => res.json())
  }, 2000)

  return (
    <button onClick={() => handleLike(postId)} disabled={isLiking}>
      {isLiking ? '点赞中...' : '👍 点赞'}
    </button>
  )
}
```

### 异步操作

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'
import { useState } from 'react'

function AsyncButton() {
  const [result, setResult] = useState(null)

  const [handleFetch, isLoading] = useThrottleClick(async () => {
    const response = await fetch('/api/data')
    const data = await response.json()
    setResult(data)
  }, 1000)

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        {isLoading ? '加载中...' : '获取数据'}
      </button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
```

### 表单提交

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function LoginForm() {
  const [handleSubmit, isSubmitting] = useThrottleClick((e: React.FormEvent) => {
    e.preventDefault()
    // 表单提交逻辑
    console.log('表单提交')
  }, 2000)

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="邮箱" />
      <input type="password" placeholder="密码" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
```

### 支付按钮

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function PaymentButton({ amount }: { amount: number }) {
  const [handlePayment, isPaying] = useThrottleClick(() => {
    // 调用支付接口
    alert(`支付 $${amount}`)
  }, 3000)

  return (
    <button
      onClick={handlePayment}
      disabled={isPaying}
      style={{
        background: isPaying ? '#ccc' : '#4caf50',
        cursor: isPaying ? 'not-allowed' : 'pointer'
      }}
    >
      {isPaying ? '支付处理中...' : `支付 $${amount}`}
    </button>
  )
}
```

### 批量操作

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function BatchDelete({ ids }: { ids: string[] }) {
  const [handleDelete, isDeleting] = useThrottleClick((selectedIds: string[]) => {
    console.log('删除：', selectedIds)
    // 批量删除逻辑
  }, 1500)

  return (
    <button
      onClick={() => handleDelete(ids)}
      disabled={isDeleting || ids.length === 0}
    >
      {isDeleting ? '删除中...' : `删除选中项 (${ids.length})`}
    </button>
  )
}
```

### 自定义延迟时间

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

function CustomDelayButton() {
  // 快速操作 - 300ms
  const [handleQuickClick, isQuickLoading] = useThrottleClick(
    () => console.log('快速操作'),
    300
  )

  // 慢速操作 - 2000ms
  const [handleSlowClick, isSlowLoading] = useThrottleClick(
    () => console.log('慢速操作'),
    2000
  )

  return (
    <div>
      <button onClick={handleQuickClick} disabled={isQuickLoading}>
        {isQuickLoading ? '处理中...' : '快速操作 (300ms)'}
      </button>
      <button onClick={handleSlowClick} disabled={isSlowLoading}>
        {isSlowLoading ? '处理中...' : '慢速操作 (2000ms)'}
      </button>
    </div>
  )
}
```

## 节流原理

```tsx
// 时间轴示例（delay = 500ms）

点击1: |● 立即执行
点击2: | ○  ● (100ms后) - 被忽略，时间不足
点击3: |   ○ ● (400ms后) - 被忽略，时间不足
点击4: |     ○ ● (600ms后) - 执行成功，距离上次超过500ms
       └─────────────────┴───────────────────>
       0ms              500ms              1100ms
```

## 工作流程

1. **首次点击** - 立即执行回调，设置 `isLoading = true`
2. **节流期内的点击** - 忽略所有点击，不执行回调
3. **延迟结束** - 自动重置 `isLoading = false`
4. **下次点击** - 可以再次执行

## 与防抖 (Debounce) 的区别

| 特性 | 节流 (Throttle) | 防抖 (Debounce) |
| --- | --- | --- |
| 执行时机 | 第一次立即执行 | 最后一次执行 |
| 适用场景 | 防止重复点击、提交 | 搜索输入、滚动事件 |
| 用户体验 | 立即响应，有节奏 | 延迟响应，去抖动 |
| 典型延迟 | 500-2000ms | 300-500ms |

**选择建议：**
- 按钮、提交操作 → 使用节流 (`useThrottleClick`)
- 搜索框、输入框 → 使用防抖

## 注意事项

1. **延迟时间选择** - 根据操作类型选择合适的延迟
   - 快速操作：300-500ms
   - 普通操作：500-1000ms
   - 慢速操作：1000-3000ms

2. **isLoading 状态** - 始终使用 isLoading 禁用按钮，提供视觉反馈

3. **异步操作** - 如果回调是异步的，确保在操作完成后手动处理状态

4. **依赖数组** - 不要在 useCallback 的依赖数组中包含 isLoading，会导致无限循环

5. **组件卸载** - 如果有异步操作，确保在组件卸载时取消或清理

## 实际应用场景

### 1. 表单提交防重复

```tsx
function SubmitForm() {
  const [handleSubmit, isSubmitting] = useThrottleClick(async () => {
    await submitForm()
  }, 2000)

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  )
}
```

### 2. API 请求节流

```tsx
function LoadMoreButton() {
  const [handleLoadMore, isLoading] = useThrottleClick(async () => {
    const data = await fetchMoreData()
    appendData(data)
  }, 1000)

  return (
    <button onClick={handleLoadMore} disabled={isLoading}>
      {isLoading ? '加载中...' : '加载更多'}
    </button>
  )
}
```

### 3. 游戏操作

```tsx
function GameControls() {
  const [handleAttack, isAttacking] = useThrottleClick(() => {
    performAttack()
  }, 500)

  const [handleDefend, isDefending] = useThrottleClick(() => {
    performDefense()
  }, 800)

  return (
    <div>
      <button onClick={handleAttack} disabled={isAttacking}>
        {isAttacking ? '攻击中...' : '⚔️ 攻击'}
      </button>
      <button onClick={handleDefend} disabled={isDefending}>
        {isDefending ? '防御中...' : '🛡️ 防御'}
      </button>
    </div>
  )
}
```

### 4. 投票按钮

```tsx
function VoteButton({ optionId }: { optionId: string }) {
  const [handleVote, isVoting] = useThrottleClick(async (id: string) => {
    await submitVote(id)
    showSuccess('投票成功！')
  }, 1500)

  return (
    <button onClick={() => handleVote(optionId)} disabled={isVoting}>
      {isVoting ? '投票中...' : '🗳️ 投票'}
    </button>
  )
}
```

## 最佳实践

### ✅ 推荐做法

```tsx
// 1. 始终使用 isLoading 禁用按钮
const [handleClick, isLoading] = useThrottleClick(callback, 1000)
<button onClick={handleClick} disabled={isLoading}>
  {isLoading ? '处理中...' : '点击'}
</button>

// 2. 提供明确的视觉反馈
<button
  onClick={handleClick}
  disabled={isLoading}
  style={{ opacity: isLoading ? 0.6 : 1 }}
>
  {isLoading ? '加载中...' : '确定'}
</button>

// 3. 根据操作类型调整延迟
const quick = useThrottleClick(fn, 300)   // 快速操作
const normal = useThrottleClick(fn, 1000) // 普通操作
const slow = useThrottleClick(fn, 3000)   // 慢速操作
```

### ❌ 不推荐做法

```tsx
// 1. 不要忽略 isLoading 状态
<button onClick={handleClick}>  // 没有 disabled
  点击
</button>

// 2. 不要设置过长的延迟
const [handleClick] = useThrottleClick(fn, 10000)  // 太长了！

// 3. 不要在节流期内使用 alert/confirm
const [handleClick] = useThrottleClick(() => {
  alert('确定？')  // 可能多次弹出
}, 1000)
```

## TypeScript 支持

完整的 TypeScript 类型支持：

```tsx
import { useThrottleClick } from '@miaoma-rhooks/hooks'

// 无参数回调
const [handleClick1, isLoading1] = useThrottleClick(() => {
  console.log('clicked')
}, 1000)

// 带参数回调
const [handleClick2, isLoading2] = useThrottleClick((id: string, value: number) => {
  console.log(id, value)
}, 1000)

// 使用事件对象
const [handleSubmit, isLoading3] = useThrottleClick((e: React.FormEvent) => {
  e.preventDefault()
  // ...
}, 2000)

// 返回值是元组，可以解构
const [throttledCallback, isLoading] = useThrottleClick(fn, 1000)
```

## 性能考虑

1. **内存占用** - 只维护一个 ref 和一个 state，内存开销很小
2. **定时器清理** - 虽然使用 setTimeout，但不需要手动清理
3. **避免重复创建** - 使用 useCallback 缓存回调函数
4. **适用场景** - 适合按钮点击等低频事件，不适合 scroll/mousemove 等高频事件

## 错误处理

```tsx
function ErrorHandlingButton() {
  const [handleClick, isLoading] = useThrottleClick(async () => {
    try {
      await riskyOperation()
    } catch (error) {
      console.error('操作失败:', error)
      // 错误处理逻辑
    }
  }, 1000)

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? '处理中...' : '执行操作'}
    </button>
  )
}
```
