定义变量时用双大括弧，赋的值为json对象时，大括弧要与外层括弧空格分离

```html
{{: it = {name:"a"}}}  -----------(X 编译无法通过)
{{: it = {name:"a"} }}
```

对于HTML中的注释无法编译通过
```html
<!-- <span style="float: right;right: 20px; {{it.isopen?'transform:rotate(-90deg)':'transform:rotate(90deg)' }}" >></span> -->
```

修改为{{%...}}格式也不能编译通过，因为会匹配到前面的两个括号，当语句中含有需要执行的语句时不能注释成功
```html
{{%<span style="float: right;right: 20px; {{it.isopen?'transform:rotate(-90deg)':'transform:rotate(90deg)' }}" >></span> }}
```

对于css样式的继承效果不方便，wcss中的样式都会转换为内联样式加载到页面中，无法实现父级样式影响子级样式


在鼠标事件mouseover和mouseout中会自动改变他的值为false

```js
	public clearActive(data,index){
		for(let i in data){
			if(index!=data[i].index){
				data[i].isActivated = false;				
			}
			if(data[i].submenu){
				this.clearActive(data[i].arr,index);
			}
		}
	}

	public doClick(event: any){	
		this.clearActive(this.props.arr,`${event.index}`);		
		this.props.isactive=true;
		console.log(this.props.isactive)    //true
		this.paint();
	}

	public subMouseover(event:any){
		this.state.left = getRealNode(event.node).offsetLeft;
		this.state.top = getRealNode(event.node).offsetTop+getRealNode(event.node).offsetHeight;	
		this.props.isopen = true;
		console.log(this.props.isactive)    //false				
		this.paint();
	}

	public subMouseout(event:any){
		this.props.isopen = false;
		console.log(this.props.isactive)    //false		
		this.paint();
	}
```