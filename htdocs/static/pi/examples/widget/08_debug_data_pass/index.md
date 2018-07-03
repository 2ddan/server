# props赋值方式

- 声明并赋值

```js
export class JSONX extends Widget {
	/* tslint:disable:typedef */
	public props = {
		data: {
			boss: 'zwx',
			cpy: {
				addr: 'cd',
				name: 'yn'
			},
			staff: [
				'tm1',
				'cjh1'
			]
		}
	};

} 
```


- 定义接口并在constructor构造函数中赋值

```js
interface Props {
	begindate:string;
	stopdate:string;
}

export class Father extends Widget {
	public props: Props;
	constructor() {
		super();
		this.props = {
			begindate: '',
			stopdate: ''
		};
	}
} 
```

用接口的形式赋初值，方便自己检验每个参数的数据类型，赋值时如果类型不同编辑器会有提示


- tpl文件只会匹配同名的ts文件处理，导入的子组件也只会匹配自己的ts文件处理，不受父组件中的props属性的影响
- create方法创建时调用，在渲染循环外调用，attach方法在添加dom后调用，在渲染循环内调用