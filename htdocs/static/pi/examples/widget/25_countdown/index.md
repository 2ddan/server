- 倒计时组件ui-countdown使用示例


# ui-countdown组件

```html
<ui-countdown>{"cd_time":{{100000}},"cd_interval":1000}</ui-countdown>
```
## props属性
- props必须有cd_time属性，表示倒计时的时间点，可以是时间点的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒。
- props可以有now_time属性(使用时间不是本地时间,请传)，表示现在时间，可以是时间点的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒
- props可以有cd_interval属性，表示倒计时的计时频率，单位毫秒，默认1000。
- props可以有cd_not_zerofill，表示是否不补零,默认补零.


# 存在问题
- 此组件使用imgtext画出倒计时文字，每次刷新有闪一下的感觉



参数cd_time，可以是表示时间段的毫秒数，也可以是表示时间点的字符串（yyyy-MM-dd HH:mm:ss），传递时间点有bug，全部转换为毫秒进行倒计时了。