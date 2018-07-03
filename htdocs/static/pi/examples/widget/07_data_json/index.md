- 使用props传递数据的示例

## 使用js数据传递

- 导入Widget组件
- 自定义类并且继承Widget
- 定义需要传递的props
- props中所有的变量都会映射到组件的it对象上去
- 在组件中使用{{it.变量名}}调用相关变量

```js
import { Widget } from '../../../widget/widget';

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

```html
<div>
    <div>
        boss is : {{it.data.boss}}
    </div>
    <div>
        company name is : {{it.data.cpy.name}}
    </div>
    <div>
        company address is : {{it.data.cpy.addr}}
    </div>
    {{for index,staff of it.data.staff}}
        <div>
            staff is : {{staff}}
        </div>
    {{end}}
</div>
```


## 数组

- 使用{{ for index,value of array}}  ...  {{end}}语法实现对数组的遍历
- indx 数组下标
- value 数组每一项的值
- array 待遍历的数组

```html
{{for index,value of array}}
    <p>{{value}}</p>
{{end}}
```

