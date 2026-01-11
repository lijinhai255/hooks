---
title: DOM 操作型 Hooks
order: 1
group:
    title: 分类
    order: 2
---

# DOM 操作型 Hooks

DOM 操作型 Hooks 用于简化 DOM 元素的操作和事件监听，提供了一套类型安全、易于使用的 React Hooks。

## 包含哪些 Hooks

| Hooks 名称 | 描述 |
| --- | --- |
| `useScroll` | 获取元素的滚动位置，支持节流优化 |
| `useClickAway` | 监听点击元素外部的事件 |

## 为什么需要 DOM 操作型 Hooks？

在 React 中操作 DOM 元素和处理 DOM 事件时，通常需要：

1. 使用 `useRef` 获取 DOM 元素引用
2. 在 `useEffect` 中添加事件监听器
3. 在清理函数中移除事件监听器
4. 使用 `useState` 管理相关状态

这些重复的代码逻辑可以通过封装成 Hooks 来简化使用。

## 特性

- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **自动清理**: 组件卸载时自动移除事件监听器
- ✅ **性能优化**: 内置节流和防抖功能
- ✅ **易于使用**: 简洁的 API 设计
