- 选择数量ui-selectnumber对话框示例

# ui-selectnumber组件

```
<ui-selectnumber>{"count":1, "maxCount":50, "interval":200, "minCount": 0}</ui-selectnumber>
```

## props属性

- props可以有count初始值, 默认为1
- props可以有maxCount最大值, 默认为Number.MAX_SAFE_INTEGER
- props可以有minCount最小值, 默认为0
- props可以有interval自动变化的时延, 默认为200毫秒


# 父组件可以自定义ev-selectcount事件来监听数据变化