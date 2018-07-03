- 在father中初始设置hasChild2=false,让一开始child2不显示，再在attach函数中设置定时器一段时间后改变hasChild2=true，同时调用this.paint()，刷新页面新增child2
- 在input.tpl中通过on-input绑定input事件。同时通知father组件的ev-input事件，并把输入内容通过fixedValue传递过去，father组件ev-input事件接受到fixedValue并把它赋值给hasChild，调用this.paint()重绘，从而实现input输入和显示的一致


# 条件语句
- 以{{if boolean}}开头  {{end}}结尾

- 以下可以实现对组件的动态加载
```js
{{if boolean}}<组件名></组件名>{{end}}
```