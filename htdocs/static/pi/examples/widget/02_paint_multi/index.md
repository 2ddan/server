- 这是一个组件嵌套的示例，如何在父组件中使用子组件
1. 直接在父组件中使用子组件标签的形式
2. 在父组件中使用<widget></widget>标签，并且赋值w-tag为子组件名

# 子组件标签

包名-[包名-...]文件名
```html
<packageName-fileName></packageName-fileName>
```

# widget组件

```html
<widget w-tag="组件名"></widget>
```
w-tag内置属性，值为组件名

以上声明会被映射为

```html
<组件名></组件名>
```