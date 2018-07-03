- 这是一个子组件向父组件传递数据的示例

# 子组件向父组件传递数据

- 父组件自定义事件,以【ev-事件名】
- 子组件在合适的地方通知自定义事件执行

## 父组件自定义事件
```html
<div ev-click = "fatherClick">
 <子组件></子组件>
</div>
```

## 在子组件中通知自定义事件
```js
notify(event.node, 'ev-click', { value: 'tangmin' });
```
- event.node  : dom节点，必传(待讨论)
- ev-click : 自定义事件名,【ev-】开头
- {} ： 参数对象