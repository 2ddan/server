- 这是一个点击事件绑定的示例

# 事件绑定

- 通过在标签中使用on-click属性来绑定点击事件
- 其他事件同理【on-事件名】实现绑定
- 事件处理函数在ts文件中定义 
- 事件处理后要刷新页面需要手动调用this.paint()

```html
<div on-click="onClick">
    click number is : {{it.count}}
</div>  
```
```js
interface Props {
	count:number;
}

export class Html extends Widget {
	public props:Props;
	constructor() {
		super();
		this.props = {count : 0};
	}
	public onClick(event:any) {
		alert('hey!');
		this.props.count++;
		this.paint();
	}
}
```