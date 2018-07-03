- 这是使用多个wcss类的示例


# 组件间属性传递2

- 单个变量的传递

```html
<div>
    <componentName>{{it}}</componentName>
</div> 
```
- 在标签内使用{{}}可以传递单个变量


# 多样式类

- w-class 后可以跟多个class,也可以通过{{}}使用变量

```html
<div w-class = "child {{it}}">
    i am child, i am gray
</div>
```

grand中直接传递it值，但是并没有对其设置初值，相当于传递一个null，如果传递其他变量名则会报错。