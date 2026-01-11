# useScroll

获取元素的滚动位置的 Hook。

## 功能特性

- ✅ 支持监听任意 DOM 元素的滚动
- ✅ 支持监听整个页面的滚动
- ✅ 内置节流功能，优化性能
- ✅ TypeScript 类型支持
- ✅ 完整的测试覆盖

## API

```typescript
const position = useScroll(
  target?: Element | Document | React.MutableRefObject<Element>,
  options?: Options
);
```

### 参数

| 参数   | 说明                                              | 类型                                                    | 默认值    |
| ------ | ------------------------------------------------- | ------------------------------------------------------- | --------- |
| target | DOM 节点或者 Ref 对象                             | `Element \| Document \| React.MutableRefObject<Element>` | `document` |
| options | 配置项                                            | `Options`                                               | -         |

### Options

| 参数 | 说明           | 类型     | 默认值 |
| ---- | -------------- | -------- | ------ |
| wait | 节流等待时间 (ms) | `number` | `0`    |

### 返回值

| 参数     | 说明       | 类型                  |
| -------- | ---------- | --------------------- |
| position | 滚动位置   | `{x: number, y: number}` |

## 使用示例

### 基础用法

监听特定元素的滚动：

```tsx
import { useScroll } from 'miaoma-rhooks'
import React, { useRef } from 'react'

function Demo() {
    const scrollRef = useRef(null)
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
                <div style={{ height: 500, width: 500 }}>
                    这是一个可滚动的区域，请尝试滚动查看效果
                </div>
            </div>
        </div>
    )
}
```

### 监听页面滚动

```tsx
import { useScroll } from 'miaoma-rhooks'

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
            </div>
        </div>
    )
}
```

### 使用节流优化性能

```tsx
import { useScroll } from 'miaoma-rhooks'

function ThrottledScrollDemo() {
    const scrollRef = useRef(null)

    // 使用节流，每 100ms 更新一次
    const scroll = useScroll(scrollRef, { wait: 100 })

    return (
        <div>
            <p>滚动位置: {JSON.stringify(scroll)}</p>
            <div
                ref={scrollRef}
                style={{
                    width: 300,
                    height: 200,
                    border: '1px solid #e8e8e8',
                    overflow: 'auto'
                }}
            >
                <div style={{ height: 500, width: 500 }}>
                    可滚动内容
                </div>
            </div>
        </div>
    )
}
```

## 实现细节

### 核心功能

1. **元素监听**: 支持直接传入 DOM 元素或 Ref 对象
2. **文档监听**: 默认监听整个文档的滚动
3. **节流优化**: 通过 `wait` 参数控制更新频率，避免过度渲染
4. **自动清理**: 组件卸载时自动移除事件监听器

### 性能优化

- 使用节流机制减少状态更新频率
- 检查位置是否实际发生变化，避免不必要的渲染
- 自动清理定时器和事件监听器

### TypeScript 支持

完整的 TypeScript 类型定义：

```typescript
interface UseScrollOptions {
    wait?: number
}

interface ScrollPosition {
    x: number
    y: number
}

type Target<T> = T | MutableRefObject<T> | null | undefined
```

## 测试

运行测试：

```bash
pnpm test -- packages/hooks/src/use-scroll
```

测试覆盖：
- ✅ 默认位置初始化
- ✅ 文档滚动监听
- ✅ 元素滚动监听
- ✅ 节流功能
- ✅ 事件监听器清理
- ✅ 水平滚动
- ✅ 多次滚动事件

## 注意事项

1. **节流时间**: 根据实际需求设置 `wait` 参数，通常 50-100ms 较为合适
2. **性能**: 滚动事件触发频率很高，建议在需要高频更新时使用节流
3. **Ref 对象**: 确保传入的 ref 对象已经绑定到 DOM 元素
