# useIsMobile

响应式检测设备是否为移动端的自定义 Hook。

## 函数签名

```typescript
function useIsMobile(): boolean
```

## 返回值

返回一个布尔值：
- `true` - 当前窗口宽度小于 768px（移动端）
- `false` - 当前窗口宽度大于等于 768px（桌面端）

## 功能特性

1. **响应式检测** - 自动监听窗口大小变化
2. **SSR 兼容** - 服务端渲染时默认返回 `false`
3. **自动清理** - 组件卸载时自动移除事件监听器
4. **性能优化** - 使用防抖机制避免频繁计算

## 使用示例

### 基本用法

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function MyComponent() {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? '移动端视图' : '桌面端视图'}
    </div>
  )
}
```

### 条件渲染

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function ResponsiveLayout() {
  const isMobile = useIsMobile()

  return (
    <div>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  )
}
```

### 调整样式

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Card() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      padding: isMobile ? '12px' : '24px',
      fontSize: isMobile ? '14px' : '16px'
    }}>
      内容
    </div>
  )
}
```

### 隐藏元素

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Sidebar() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return null // 移动端不显示侧边栏
  }

  return (
    <aside>
      侧边栏内容
    </aside>
  )
}
```

### 组合使用其他 Hooks

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'
import { useState, useEffect } from 'react'

function ResponsiveData() {
  const isMobile = useIsMobile()
  const [items, setItems] = useState([])

  useEffect(() => {
    // 移动端显示更少的项
    const count = isMobile ? 5 : 10
    fetchData(count).then(setItems)
  }, [isMobile])

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## 响应式断点

默认断点设置为 **768px**，这是常见的移动端/桌面端分界线：

| 设备类型 | 屏幕宽度 | useIsMobile 返回值 |
| --- | --- | --- |
| 移动端 | < 768px | `true` |
| 平板(横屏) | >= 768px | `false` |
| 桌面端 | >= 768px | `false` |

常见的屏幕宽度参考：
- 手机竖屏：320px - 428px
- 手机横屏：480px - 926px
- 平板竖屏：768px - 1024px
- 平板横屏：1024px - 1366px
- 桌面端：1366px+

## 实际应用场景

### 1. 响应式导航

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Navigation() {
  const isMobile = useIsMobile()

  return isMobile ? (
    <HamburgerMenu />
  ) : (
    <HorizontalMenu />
  )
}
```

### 2. 网格布局

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Grid() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '8px' : '16px'
    }}>
      {children}
    </div>
  )
}
```

### 3. 图像显示

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Image({ src, alt }) {
  const isMobile = useIsMobile()

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: isMobile ? '100%' : '50%',
        height: isMobile ? '200px' : '400px'
      }}
    />
  )
}
```

### 4. 弹窗显示方式

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Modal({ isOpen, onClose }) {
  const isMobile = useIsMobile()

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      inset: isMobile ? 0 : '50px auto',
      width: isMobile ? '100%' : '500px',
      height: isMobile ? '100%' : 'auto'
    }}>
      模态框内容
    </div>
  )
}
```

## 注意事项

1. **SSR 场景** - 在服务端渲染时，`window` 对象不存在，会默认返回 `false`
2. **性能考虑** - 该 Hook 会监听 `resize` 事件，避免在多个组件中重复使用
3. **断点固定** - 默认断点为 768px，如需自定义断点，建议创建自己的 Hook
4. **初始值** - 组件首次渲染时会执行一次检测，确保初始状态正确

## 与 CSS 媒体查询的对比

| 特性 | useIsMobile | CSS 媒体查询 |
| --- | --- | --- |
| 类型 | JavaScript Hook | CSS |
| 使用场景 | 需要在 JS 中判断 | 纯样式调整 |
| 性能 | 每次渲染都会执行 | 浏览器优化 |
| 灵活性 | 可以结合条件逻辑 | 仅用于样式 |
| 推荐场景 | 条件渲染、逻辑判断 | 纯视觉调整 |

## 自定义断点版本

如果需要自定义断点，可以这样修改：

```tsx
import { useState, useEffect } from 'react'

function useResponsive(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [breakpoint])

  return isMobile
}

// 使用
function Component() {
  const isSmallScreen = useResponsive(480)
  const isTablet = useResponsive(1024)

  // ...
}
```

## 最佳实践

### ✅ 推荐做法

```tsx
// 1. 用于条件渲染
{isMobile ? <MobileView /> : <DesktopView />}

// 2. 用于调整布局
<div style={{ flexDirection: isMobile ? 'column' : 'row' }}>

// 3. 用于性能优化（移动端不加载某些内容）
{!isMobile && <HeavyComponent />}
```

### ❌ 不推荐做法

```tsx
// 1. 避免在多个组件中重复使用
// 可以在顶层组件判断后通过 props 传递

// 2. 不要用于纯样式调整
// 应该使用 CSS 媒体查询
<div style={{ fontSize: isMobile ? '14px' : '16px' }}>
// 更好的方式：
// CSS: @media (max-width: 768px) { font-size: 14px; }

// 3. 不要依赖它来做关键业务逻辑
// 应该使用响应式设计的通用原则
```

## TypeScript 支持

该 Hook 完全支持 TypeScript：

```tsx
import { useIsMobile } from '@miaoma-rhooks/hooks'

function Component(): JSX.Element {
  const isMobile: boolean = useIsMobile()

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```
