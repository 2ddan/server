/**
 * 生成  生成vdom的函数
 * VirtualNode才有children
 * VirtualWidgetNode只有child
 * VirtualTextNode没有子节点
 */
/**
 * 改进:
 * 1. 加上staticid
 * 2. json的hash值可以提前计算
 */
/**
 * json每层的每层ParserNode都计算了childHash,但是反映到函数上则只有最外层需要计算
 */
/**
 * syntax上的preType专门用于JS，用于存储在进入JS之前所属的type类型
 */
// ====================================== 导入
import {Syntax} from "../../pi/compile/parser";
import * as match from "../../pi/util/hash";

// ====================================== 导出
export const toStr = (syntax:Syntax) => {
	funcStrArr = [];
	funcStrIndex = 1;
	preorder(syntax, null);
	return joinStr();
	// return (new Function(`_stringify`,`_get`,`_hash`, '_path',  "return function(_cfg,it,it1){"+joinStr()+"}"));
}

// ====================================== 本地
//先序遍历
// child -> node -> pre -> suf
const preorder = (syntax:Syntax, parent:Syntax)=>{
	let index:number = funcStrIndex;
	let funcs = seekFunc(syntax, parent);
	let childs:Array<Syntax> = funcs.child();
	let childNodes:Array<ParserNode> = [];
	funcStrIndex++; 
	for(let i = 0; i < childs.length; i++){
		let childNode = preorder(childs[i], syntax);
		if(childNode)childNodes.push(childNode);//存在空文本节点的情况		
	}	
	let node:ParserNode = funcs.node(childNodes);	
	funcStrArr[index] = funcs.pre(node);
	funcStrArr[funcStrIndex++] = funcs.suf(node);
	return node;
}

interface interParser{
	pre:(node)=>String;
	suf:(node)=>String;
	child:()=>Array<Syntax>;
	node:(childs:Array<ParserNode>)=>ParserNode;
}

//每一个节点都有pre字符串和suf字符串
const seekFunc = (syntax:Syntax, parent:Syntax):interParser=>parserFunc[<any>syntax.type](syntax, parent);

const joinStr = ()=>funcStrArr.join("");
// 用来存储位置的
let funcStrIndex:number = 0;
// 需要拼接成函数字符串
let funcStrArr:Array<String> = [];
//还没想好里面存什么
class ParserNode{
	childHash:number = 0;
	attrs:any = {};
	attrHash:number = 0;
	hash:number = 0;
	str:string = "";//当前节点对应的文本值,暂时只在js中拼表达式用到
	v?:string = "";//v字段专门处理value是jsexpr的情况
	// childfuncstr:Array<String> = [];
}

//入参parent暂时没用到
const genTagSufFunc = (parent:Syntax):any=>{//返回值为一个函数	
	return (node:ParserNode)=> {
		let str = ``;
		str += `
		node.attrHash = _calAttrHash(node);		
		node.childHash ^=` + node.childHash +`;			
		if(node.children && node.children.length > 0){
			for(let i = 0; i < node.children.length; i++)
			node.childHash ^= _hash.nextHash(calTextHash(node.children[i].hash+""),i+1);
		}
		node.hash ^= node.attrHash ^ node.childHash;
		if(_$parent){
			_$parent.children.push(node);
		}else{
			return node;
		}
		}`;
		return str;
	}
}

const genMathChildFunc = (syntax:Syntax) => {
	return ():Array<Syntax> => {
			let childs = [];
			if(!isBuildIn(syntax.left))
				childs.push(syntax.left)
			if(!isBuildIn(syntax.right[0]))
				childs.push(syntax.right[0])
			return childs;
		}
}

const genMathNodeFunc = (operator:string, syntax:Syntax) => {
	return (childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			if(!isBuildIn(syntax.left)){
				node.str = childs[0].str + operator;
			}else{
				node.str = syntax.left.value + operator;
			}
			if(!isBuildIn(syntax.right[0])){
				node.str += childs[childs.length - 1].str;
			}else{
				node.str += syntax.right[0].value;
			}
			return node;
		}
}

const genMathFunc = (operator:string) => {
	return (syntax:Syntax, parent:Syntax) => {
		return Object.assign({}, defaultParse,{
			"child":genMathChildFunc(syntax),
			"node":genMathNodeFunc(operator, syntax)
		})
	}
}

const genAutoFunc = (operator:string) => {
	return (syntax:Syntax, parent:Syntax)=> {
		return Object.assign({}, defaultParse,{
			"child":():Array<Syntax>=> {
				let childs = [];
				if(syntax.left && !isBuildIn(syntax.left)){
					childs.push(syntax.left);
				}
				if(syntax.right && syntax.right[0] && !isBuildIn(syntax.right[0])){
					childs.push(syntax.right[0]);
				}
				return childs;
			},
			"node":(childs:Array<ParserNode>)=>{
				let node = new ParserNode;			
				if(childs.length == 1){
					if(syntax.left){
						node.str = childs[0].str + operator;
					}
					else{
						node.str = operator + childs[0].str;
					}
				}else{
					if(syntax.left){
						node.str = syntax.left.value + operator;
					}
					else{
						node.str = operator + syntax.right[0].value;
					}
				}			
				return node;
			}
		})
	}
}

const genKvDvChildFunc = (syntax:Syntax) => {
	return ():Array<Syntax>=> isBuildIn(syntax.right[1]) ? [] :  [syntax.right[1]]
}

const genKvDvNodeFunc = (operator:string, syntax:Syntax) => {
	return (childs:Array<ParserNode>)=>{
		let node = new ParserNode;			
		node.str = syntax.right[0].value + operator + (childs.length == 0 ? syntax.right[1].value : childs[0].str);
		return node;
	}
}


const genifelseifChildFunc = (syntax:Syntax) => {
	return ():Array<Syntax>=> {
		let childs = [];
		if(!isBuildIn(syntax.right[0])){
			syntax.right[0].parent = syntax;
			childs.push(syntax.right[0]);
		}
			

		for(let i = 1; i < syntax.right.length; i++){
			syntax.right[i].parent = syntax;
			childs.push(syntax.right[i]);
		}
			
		return childs;
	}
}

const genifelseifNodeFunc = (operator:string, syntax:Syntax) => {
	return (childs:Array<ParserNode>)=>{
		let node = new ParserNode;
		if(!isBuildIn(syntax.right[0]))
			node.str = operator + `(` + childs[0].str + `)`;
		else
			node.str = operator + `(` + syntax.right[0].value + `)`;

		return node;
	}
}

//单指json中的数组
//且数组中的元素必须为同一类型
// 暂时没有处理["aa","aa {{it.name}}"]这种情况
// jarr其实有BUG,无法处理数组嵌套，且其中有变量的情况,除非变量放在尾部，不然顺序会被换掉
const jarrFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs =[];
			for(let i = 0; i < syntax.right.length; i++){
				if(!isBuildIn(syntax.right[i])){
					syntax.right[i].parent = syntax;
					if(syntax.right[i].type == "script" && syntax.right[i].right[0].type == "jsexpr"){
						syntax.right[i].right[0].index = i;
					}
					childs.push(syntax.right[i]);
				}				
			}
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			if(childs){
				for(let i = 0; i < childs.length; i++)
				node.hash ^= childs[i].hash
			}else{
				for(let i = 0; i < syntax.right.length; i++)
				node.hash ^=calTextHash(syntax.right[i].value);
			}
			return node;
		},
		"pre":():String=>`
		//jarr pre
			_$temp=node;{
			let _$parent = _$temp;
			let node = [];`,
		"suf":(node:ParserNode):String=>{
			let str = `
			//jarr suf
			`;
			for(let i = 0; i < syntax.right.length; i++){
				if(isBuildIn(syntax.right[i])){
					str += `
					node[${i}] = ${syntax.right[i].value}
					`;
				}else if(syntax.right[i].type == "jstr"){
					str += `
					node[${i}] = "${syntax.right[i].right[0].value}
					`;
				}
			}			
			if(!parent){
				str +=`
				return node;}`;
			}else{
				if(parent.type === "jarr"){
					str +=`
					_$parent.push(node);}`;
				}else if(parent.type === "jpair"){
					str += `
					_$parent["` + parent.right[0].right[0].value + `]= node;}`;
				}
				else if(parent.type === "body"){
					//parent分为真正有意义的节点和body节点
					str +=`
					if(_$parent){
						let deep = {"obj":null};
						_$parent.childHash = _hash.deepCopyHash(node, deep, "obj", _$parent.childHash);
						_$parent.child = deep.obj;
						_$parent.hasChild = true;
						//_$parent.hash ^= _$parent.childHash;
					}
						else{return node;}
					}`;
				}
			}			
			return str;
		}
	})
}

const jstrFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre":(node:ParserNode):String=>`//jStrPre
			jvalue = "`+  syntax.right[0].value +  `;`,
		"node":(childs:Array<ParserNode>)=>null//不需要返回,免得被重复计算
	})
}

const jscriptFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> {
			if(syntax.right.length == 3){
				syntax.right[1].parent = syntax;
				return [syntax.right[1]];
			}else{
				syntax.right[0].parent = syntax;
				return [syntax.right[0]];
			}
		},
		"pre":(node:ParserNode):String=>{
			let str = `//jscriptPre`;
			if(syntax.right.length == 3){
				//必须空一行，不然会放被注释覆盖
				str +=`
				{
			jvalue = "` + syntax.right[0].value +`";`
		}else{
				//必须空一行，不然会放被注释覆盖
				str +=`
				{
			jvalue = "";`
			}
			return str;
		},
		"suf":(node:ParserNode):String=>{
			let str = `//jscriptsuf`;
			if(syntax.right.length == 3){
				str +=`
					jvalue += "` + syntax.right[2].value +`;
				}`
			}else{
				str +=`
					jvalue += "` + syntax.right[1].value +`;
				}`
			}
			return str;
		},
		"node":(childs:Array<ParserNode>)=>null//不需要返回,免得被重复计算
	})
}

//单指json中的键值对
const jpairFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let child = [];
			if(!isBuildIn(syntax.right[1])){
				syntax.right[1].parent = syntax;
				child = [syntax.right[1]]
			}
			return child;
		},
		"node":(childs:Array<ParserNode>)=>{//肯定只有一个子节点			
			let node = new ParserNode;
			node.hash = calTextHash(`"` + syntax.right[0].right[0].value)
			if(childs.length == 0){
				node.hash ^= calTextHash(syntax.right[1].value)//如果去掉引号数字会算不出来hash
			}else if(isScript(syntax.right[1])){
				node.hash ^= calTextHash( childs[0].str);
				node.v = childs[0].str;
			}else{
				node.hash ^= childs[0].hash;
			}
			return node;
		},
		"pre":(node:ParserNode):String=>{
			let str = `//jpair pre
			`;
			if(isBuildIn(syntax.right[1])){
				str += `
				node["` + syntax.right[0].right[0].value +`]=` + parseBuildIn(syntax.right[1]) +`;`
			}				
			else if(isScript(syntax.right[1])){				
				str += `
				node["` + syntax.right[0].right[0].value +`]=` + node.v +`;`
			}
			else if(isjstrjscript(syntax.right[1])){
				str +=`
				{
					let jvalue = "";
					`
			}
			else{
				str += `
				_$temp=node;{let _$parent = _$temp;	`;
			}				
			return str;
		},
		"suf":(node:ParserNode):String=>{
			let str = `
			//jpair suf
			`;
			if(isjstrjscript(syntax.right[1])){
				str += `
				node["` + syntax.right[0].right[0].value +`]=jvalue;
				}
				`
			}
			else if((!isBuildIn(syntax.right[1])) && (!isScript(syntax.right[1]))){
				str += `
				}`;
			}				
			return str;
		}
	})
}

const jobjFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>syntax.right,
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			for(let i = 0; i < childs.length; i++)
				node.hash ^= childs[i].hash
			return node;
		},
		"pre":():String=>`//jobj pre
		_$temp=node;{
			let _$parent = _$temp;
			let node = {};`,
		"suf":(node:ParserNode):String=>{
			let str = `//jobj suf
			`;
			if(!parent){
				str +=`
				return node;}`;
			}else{
				if(parent.type === "jarr"){
					str +=`
					_$parent.push(node);}`;
				}else if(parent.type === "jpair"){
					str += `
					_$parent["` + parent.right[0].right[0].value + `]= node;}`;
				}
				else if(parent.type === "body"){
					//parent分为真正有意义的节点和body节点
					str +=`
					if(typeof _$parent !== "undefined"){
						let deep = {"obj":null};
						_$parent.childHash = _hash.deepCopyHash(node, deep, "obj", _$parent.childHash);
						_$parent.child = deep.obj;
						_$parent.hasChild = true;
						//A^B^A的结果是B，这里多异或了一次
						//_$parent.hash ^= _$parent.childHash;
					}else{return node;}
				}`;
				}
			}			
			return str;
		}		
	})
}

const scriptFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			syntax.parent = parent;
			for(let i = 0; i < syntax.right.length; i++){
				syntax.right[i].parent = syntax;
			}
			return syntax.right;
		},
		"node": (childs: Array<ParserNode>) => {
			let node = new ParserNode;
			node.str = childs[0].str;
			return node;
		}
	})
}

const execFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>syntax.right,
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			node.str = childs[0].str;
			return node;
		},
		"suf":(node:ParserNode):String=> node.str+`;`
	})
}

//[]
const fieldeFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs =[];
			(!isBuildIn(syntax.left)) && childs.push(syntax.left);
			(!isBuildIn(syntax.right[0])) && childs.push(syntax.right[0]);
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			let left = "";
			let right = "";
			if(childs.length == 2){
				left = childs[0].str;
				right = childs[1].str;
			}else if(childs.length == 1){
				if(isBuildIn(syntax.left)){
					left = syntax.left.value;
					right = childs[0].str;
				}else{
					left = childs[0].str;
					right = syntax.left.value;					
				}
			}
			else{
				left = syntax.left.value;
				right = syntax.right[0].value;
			}
			node.str = left + `[` + right + `]`;
			return node;
		}
	})
}
//.
const fieldFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs = [];
			if(!isBuildIn(syntax.left))
				childs.push(syntax.left);
			if(!isBuildIn(syntax.right[0]))//理论上右边肯定是identifier
				childs.push(syntax.right[0]);
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			if(!isBuildIn(syntax.left)){
				node.str += childs[0].str  + `.`;
			}else{
				node.str += syntax.left.value + `.`;
			}
			if(!isBuildIn(syntax.right[0])){
				node.str += childs.length == 2 ? childs[1].str : childs[0].str ;
			}else{
				node.str += syntax.right[0].value;
			}
			return node;
		}
	})
}

//a("xx",2);

const callFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs = [];
			if(!isBuildIn(syntax.left))
				childs.push(syntax.left);
			for(let i = 0; i < syntax.right.length; i ++){
				if(!isBuildIn(syntax.right[i]))
					childs.push(syntax.right[i]);
			}
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			let index = 0;
			if(!isBuildIn(syntax.left))
				node.str += childs[index++].str + "(";
			else
				node.str +=syntax.left.value + "(";

			for(let i = 0; i < syntax.right.length - 1; i ++){
				if(!isBuildIn(syntax.right[i]))
					node.str += childs[index++].str + ",";
				else
					node.str+=syntax.right[i].value + ",";
			}

			if(syntax.right.length > 0){
				if(!isBuildIn(syntax.right[syntax.right.length - 1]))
					node.str += childs[childs.length - 1].str;
				else
					node.str += syntax.right[syntax.right.length - 1].value
			}
			node.str+=")";
			return node;
		}
	})
}

//子节点一定是一个dv
const defFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>[syntax.right[0]],
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			node.str = `let ` + childs[0].str + `;`;
			return node;
		},
		"suf":(node:ParserNode):String=>node.str
	})
}

const dvFunc = (syntax:Syntax, parent:Syntax)=> {
	return Object.assign({}, defaultParse,{
		"child":genKvDvChildFunc(syntax),
		"node":genKvDvNodeFunc(`=`, syntax)
	})
}

const kvFunc = (syntax:Syntax, parent:Syntax)=> {
	return Object.assign({}, defaultParse,{
		"child":genKvDvChildFunc(syntax),
		"node":genKvDvNodeFunc(`:`, syntax)
	})
}


//自增自减
const mulmulFunc = genAutoFunc(`--`);
const addaddFunc = genAutoFunc(`++`);
const negFunc = genAutoFunc(`!`);

//赋值是不会被嵌套的，可以等到返回了再赋值
const assignFunc = genMathFunc(`=`);
const addFunc = genMathFunc(`+`);
const subFunc = genMathFunc(`-`);
const mulFunc = genMathFunc(`*`);
const divFunc = genMathFunc(`/`);
const remFunc = genMathFunc(`%`);
const addEqualFunc = genMathFunc(`+=`);
const subEqualFunc = genMathFunc(`-=`);
const mulEqualFunc = genMathFunc(`*=`);
const divEqualFunc = genMathFunc(`/=`);
const remEqualFunc = genMathFunc(`%=`);
const tripleEqualFunc = genMathFunc(`===`);
const tripleUnequalFunc = genMathFunc(`!==`);
const doubleEqualFunc = genMathFunc(`==`);
const doubleUnequalFunc = genMathFunc(`!=`);
const lessEqualFunc = genMathFunc(`<=`);
const bigEqualFunc = genMathFunc(`>=`);
const lessFunc = genMathFunc(`<`);
const bigFunc = genMathFunc(`>`);
const orFunc = genMathFunc(`|`);
const andFunc = genMathFunc(`&`);
const ororFunc = genMathFunc(`||`);
const andandFunc = genMathFunc(`&&`);

const bracketFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> isBuildIn(syntax.right[0]) ? [] :  [syntax.right[0]],
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;			
			node.str = `(` + (childs.length == 0 ? syntax.right[0].value : childs[0].str)+ `)`;
			return node;
		}
	})
}

const objFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> syntax.right,
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;			
			node.str = `{`;
			for(let i = 0; i < childs.length - 1; i ++){
				node.str += childs[i].str + `,`;
			}
			if(childs.length > 0){
				node.str += childs[childs.length - 1].str;
			}
			node.str +=`}`;
			return node;
		}
	})	
}

const arrFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> (syntax.right.length > 0 && !isBuildIn(syntax.right[0])) ? syntax.right : [],
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;			
			node.str = `[`; 
			if(childs.length == 0){
				for(let i = 0; i < syntax.right.length - 1; i++){
					node.str += syntax.right[i].value + `,`;	
				}
				if(syntax.right.length > 0){
					node.str += syntax.right[syntax.right.length-1].value;
				}
			}else{
				for(let i = 0; i < childs.length - 1; i ++){
					node.str += childs[i].str + `,`;
				}
				if(childs.length > 0){
					node.str += childs[childs.length - 1].str;
				}
			}			
			node.str +=`]`;
			return node;
		}
	}) 
}

//本质上就退化为了一个文本节点
const jsExprFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> isBuildIn(syntax.right[0]) ? [] : syntax.right,
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			if(!isBuildIn(syntax.right[0])){
				node.str = childs[0].str.trim();
			}else{
				node.str = syntax.right[0].value.trim();
			}
			if(node.str){
				node.hash = calTextHash(node.str);
			}
			return node;
		},
		"suf":(node:ParserNode):String=>{
			return node.str;
		}
	})
}

const ifFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":genifelseifChildFunc(syntax),
		"node":genifelseifNodeFunc(`if`, syntax),
		"pre": (node: ParserNode): String => `{{${node.str}}}`,
		"suf": (node: ParserNode): String => `{{end}}`
	})
}

const elseifFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":genifelseifChildFunc(syntax),
		"node":genifelseifNodeFunc(`else if`, syntax),
		"pre": (node: ParserNode): String => `{{${node.str}}}`
	})
}

const elseFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> syntax.right,
		"pre": (node: ParserNode): String => `{{else}}`
	})
}

const forFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs = [];
			if(!isBuildIn(syntax.right[2])){
				childs.push(syntax.right[2])
			}
			childs.push(syntax.right[3])
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			node.str = `for(let ` + syntax.right[0].value + `=0;` + syntax.right[0].value + `<`;
			if(childs.length == 2){
				node.str+= childs[0].str + `.length; ` + syntax.right[0].value + `++){
					let ` + syntax.right[1].value + `= ` + childs[0].str + `[` +  syntax.right[0].value + `];` ;
			}				
			else{
				node.str+= syntax.right[2].value + `.length; ` + syntax.right[0].value + `++){
					let ` + syntax.right[1].value + `= ` + syntax.right[2].value + `[` +  syntax.right[0].value + `];` ;
			}				
			return node;
		},
		"pre": (node: ParserNode): String => `{{${node.str}}}`,
		"suf": (node: ParserNode): String => `{{end}}`
	})
}

const whileFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs = [];
			if(!isBuildIn(syntax.right[0])){
				childs.push(syntax.right[0]);
			}
			childs.push(syntax.right[1])
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			node.str = `while(`;
			if(childs.length == 2)
				node.str+=childs[0].str + `){`;
			else
				node.str+=syntax.right[0] + `){`;			
			return node;
		},
		"pre": (node: ParserNode): String => `{{${node.str}}}`,
		"suf": (node: ParserNode): String => `{{end}}`
	})
}

const jscontinueFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre":(node:ParserNode):String=> `continue;`
	})
}

const jsbreankFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre":(node:ParserNode):String=> `break;`
	})
}

const jsFuncDef = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre":(node:ParserNode):String=> syntax.right[0].value + `;`
	})
}

const newFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>isBuildIn(syntax.right[0]) ? [] : syntax.right,
		"node":(childs:Array<ParserNode>)=>{
			let node = new ParserNode;
			if(!isBuildIn(syntax.right[0]))
				node.str = `new ` + childs[0].str + `;`;
			else
				node.str = `new ` + syntax.right[0].value + `;`;
			return node;
		}
	})
}

const condFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>{
			let childs = [];
			if(!isBuildIn(syntax.left))
				childs.push(syntax.left)
			if(!isBuildIn(syntax.right[0]))
				childs.push(syntax.right[0])
			if(!isBuildIn(syntax.right[1]))
				childs.push(syntax.right[1])
			return childs;
		},
		"node":(childs:Array<ParserNode>)=>{
			let index = 0;
			let node = new ParserNode;
			if(!isBuildIn(syntax.left))
				node.str = childs[index++].str + `?`;
			else
				node.str = syntax.left.value + `?`;
			if(!isBuildIn(syntax.right[0]))
				node.str += childs[index++].str + `:`;
			else
				node.str += syntax.right[0].value + `:`;
			if(!isBuildIn(syntax.right[1]))
				node.str += childs[index].str;
			else
				node.str += syntax.right[1].value;
			return node;
		}
	})
}

const genSignleTagFunc = (tagName:string)=>{
	return (syntax:Syntax, parent:Syntax)=>{
		return Object.assign({}, defaultParse, {
			"child":():Array<Syntax>=>syntax.right,//肯定只有一个child，而且是属性
			"pre":() => ("<" + tagName),
			"suf":() => "/>"		
		})
	}
}

const tagFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse, {
		"child":():Array<Syntax>=>[syntax.right[1],syntax.right[2]],
		"pre":() => ("<" + syntax.right[0].value),
		"suf":() => ("</" + syntax.right[0].value + ">")
	})
}

const inputTagFunc = genSignleTagFunc("input");

const imgTagFunc = genSignleTagFunc("img");

const metaTagFunc = genSignleTagFunc("meta");

const bodyFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse, {
		"child":():Array<Syntax>=>{
			parent && (syntax.parent = parent);
			for(let i = 0; i< syntax.right.length; i++){
				syntax.right[i].parent = syntax;
			}
			return syntax.right;
		}
	})
}

const textFunc = (syntax:Syntax, parent:Syntax)=>{
	return Object.assign({}, defaultParse,{
		"node":(childs:Array<ParserNode>=null):ParserNode=>{
			syntax.value = syntax.value.trim();
			let node = null;
			if(syntax.value){//
			node = new ParserNode;
			node.hash = calTextHash(syntax.value);
			}			
			return node;
		},
		"suf":(node:ParserNode):String=>{
			return syntax.value || syntax.token.value;
		}		
	})
}

//attrs仅出现在tag, imgtag, inputtag, metatag中，tag是双标签，attrs结束后，需要增加一个">"结束符
const attrsFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=>syntax.right,
		"suf":(): String => {
			if(parent.type === "tag")
				return ">";
			else
				return "";
		}
	})
}

const attrFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child":():Array<Syntax>=> {
			let child = [];
			if(syntax.right[1] && syntax.right[1].type !== "identifier")
				child = [syntax.right[1]]
			return child;
		},		
		"pre":(node:ParserNode):String=> " " + syntax.right[0].value + "=",
		"suf":(node:ParserNode):String=>{
			if(syntax.right[1] && syntax.right[1].type == "identifier")
				return syntax.right[1].value;
			return "";
		}		
	})
}

const attrscriptFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"child": (): Array<Syntax> => {
			if(syntax.right.length == 3){
				syntax.right[1].parent = syntax;
				return [syntax.right[1]];
			}else{
				syntax.right[0].parent = syntax;
				return [syntax.right[0]];
			}
		},
		"pre": (node:ParserNode): String =>{
			if(syntax.right.length == 3)
				if (syntax.right[0].type === "lstring")
					return `${syntax.right[0].value}`;
				else if(syntax.right[0].type === "single")	
					return `${syntax.right[0].value}`;		
			else
				if (syntax.right[1].type === "hstring")
					return `"`;
				else if(syntax.right[1].type === "singlehstring")	
					return `'`;
		},
		"suf": (node:ParserNode): String =>{
			if(syntax.right.length == 3)
				return syntax.right[2].value;				
			else
				return syntax.right[1].value
		}
	})
}

const singleattrscriptFunc = attrscriptFunc;

const attrStrFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre": (node:ParserNode): String => `"${syntax.right[0].value}"`
	})
}

const singleAttrStrFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre": (node:ParserNode): String => `'${syntax.right[0].value}'`
	})
}

const lstringFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre": (): String => `${syntax.value}`		
	})
}

const singlelstringFunc = (syntax:Syntax, parent:Syntax) => {
	return Object.assign({}, defaultParse,{
		"pre": (): String => `${syntax.value}`		
	})
}

const parserFunc:any = {
	//tag还需要细分为node和wnode
	"tag":tagFunc,
	"inputtag":inputTagFunc,
	"imgtag":imgTagFunc,
	"metatag":metaTagFunc,
	"body":bodyFunc,	
	"text":textFunc,
	"jarr":jarrFunc,
	"jpair":jpairFunc,
	"jobj":jobjFunc,
	"script":scriptFunc,
	"exec":execFunc,	
	"fielde":fieldeFunc,
	"field":fieldFunc,
	"call":callFunc,
	"def":defFunc,
	"dv":dvFunc,
	"!":negFunc,
	"--":mulmulFunc,
	"++":addaddFunc,
	"=":assignFunc,
	"+":addFunc,
	"-":subFunc,
	"*":mulFunc,
	"/":divFunc,
	"%":remFunc,
	"+=":addEqualFunc,
	"-=":subEqualFunc,
	"*=":mulEqualFunc,
	"/=":divEqualFunc,
	"%=":remEqualFunc,
	"===":tripleEqualFunc,
	"!==":tripleUnequalFunc,
	"==":doubleEqualFunc,
	"!=":doubleUnequalFunc,
	"<=":lessEqualFunc,
	">=":bigEqualFunc,
	"<":lessFunc,
	">":bigFunc,
	"|":orFunc,
	"&":andFunc,
	"||":ororFunc,
	"&&":andandFunc,
	"bracket":bracketFunc,
	"obj":objFunc,//obj比jobj简单
	"kv":kvFunc,//kv比jpair简单
	"arr":arrFunc,//比jarr简单
	"jsexpr":jsExprFunc,
	"if":ifFunc,
	"else":elseFunc,
	"elseif":elseifFunc,
	"for":forFunc,
	"while":whileFunc,
	"jscontinue":jscontinueFunc,
	"jsbreak":jsbreankFunc,
	"jsfuncdef":jsFuncDef,
	"new":newFunc,
	"cond":condFunc,//三元运算符
	"attrs":attrsFunc,
	"attr":attrFunc,
	"attrStr":attrStrFunc,
	"singleattrStr":singleAttrStrFunc,
	"attrscript":attrscriptFunc,
	"singleattrscript":singleattrscriptFunc,
	"lstring":lstringFunc,
	"singlelstring":singlelstringFunc,
	"jstr":jstrFunc,
	"jscript":jscriptFunc
	// "identifier":identifierFunc//identifier,只在js中可能被解析到
}
parserFunc.html = parserFunc.body;
parserFunc.el = parserFunc.body;

/**
 * 将child的hash汇总为childhash
 */
const sumChildHash = (node:ParserNode, childs:Array<ParserNode>)=>{	
	for(let i = 0; i< childs.length; i++){
		node.childHash ^= match.nextHash(calTextHash(childs[i].hash+""),i+1);
	}
	node.hash ^= node.childHash;
}

/**
 * 只有tag才需要用到的
 */
const calTagHash = (node:ParserNode, tagName:string)=>{
	node.hash ^= calTextHash(tagName);
}

const calTextHash = (data:string) => match.iterHashCode(data, 0, match.charHash);

//字符都有双层引号，并不需要去掉，因为在字符串转函数的时候会自动去掉一层
const trimQuo = (str:String) => str.substring(1, str.length-1)

const isBuildIn = (syntax:Syntax):boolean => syntax.type == "string" || syntax.type == "number" || syntax.type == "bool" || syntax.type == "true" || syntax.type == "false" || syntax.type == "null" || syntax.type == "undefined" || 
syntax.type == "integer" || syntax.type == "integer16" || syntax.type == "float" || syntax.type == "identifier" || syntax.type == "singlequotestring";

const isScript = (syntax:Syntax):boolean => syntax.type == "script";
const isjstrjscript = (syntax:Syntax):boolean => syntax.type == "jscript" || syntax.type == "jstr";
//本身就有引号了
const parseBuildIn = (syntax:Syntax) => {
	return syntax.value;
}
const isAttrStr = (syntax:Syntax):boolean => syntax.type == "attrStr";

// ================ JS的处理整体要简单很多
// child -> node->pre -> suf
let defaultParse = {
	"child":():Array<Syntax>=>[],
	"node":(childs:Array<ParserNode>)=>{
		return new ParserNode;
	},
	"pre":(node:ParserNode):String=>``,
	"suf":(node:ParserNode):String=>``
}

let sid = 0;