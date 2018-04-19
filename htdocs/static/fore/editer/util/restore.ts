/**
 * syntax上的preType专门用于JS，用于存储在进入JS之前所属的type类型
 */
// ====================================== 导入
import { Syntax } from "../../pi/compile/parser";

let codeStr = [], layer = 0;
let isSave: boolean = false;
// ====================================== 导出
export const toStr = (syntax: Syntax, saveCode?: boolean) => {
	codeStr = [];
	layer = 0;
	isSave = saveCode || false;
	preorder(syntax);
	isSave = false;
	return joinStr();
}

// ====================================== 本地
//先序遍历
// child -> node -> pre -> suf
const preorder = (syntax: Syntax) => {
	let funcs = seekFunc(syntax, syntax.parent);
	funcs.toStr();
}

const preorders = (syntaxs: Array<Syntax>) => {
	if (syntaxs === null || syntaxs.length === 0)
		return;
	for (let i = 0; i < syntaxs.length; i++) {
		preorder(syntaxs[i]);
	}
}

interface interParser {
	toStr: () => null;
}

//每一个节点都有pre字符串和suf字符串
const seekFunc = (syntax: Syntax, parent: Syntax): interParser => parserFunc[<any>syntax.type](syntax, parent);

const joinStr = () => codeStr.join("");

const textFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			if (syntax.value)
				codeStr.push(syntax.value);
		}
	})
}

const onlyRightFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorders(syntax.right);
		}
	})
}

const genCommaJion = (syntaxs: Array<Syntax>) => {
	for (let i = 0; i < syntaxs.length; i++) {
		preorder(syntaxs[i]);//表达式
		if (i < syntaxs.length - 1) {
			codeStr.push(",");
		}
	}
}

const genSemicolonJion = (syntaxs: Array<Syntax>) => {
	for (let i = 0; i < syntaxs.length; i++) {
		preorder(syntaxs[i]);//表达式
		if (i < syntaxs.length - 1) {
			codeStr.push(";");
		}
	}
}

const genSignleTagFunc = (tagName: string) => {
	return (syntax: Syntax, parent: Syntax) => {
		return Object.assign({}, defaultParse, {
			"toStr": () => {
				//只解析容器中子元素时，子元素之间需要换行
				if (codeStr.length && layer == 0) {
					codeStr.push("\n");
				}
				if (layer) {
					codeStr.push("\n");
					for (let i = 0; i < layer; i++) {
						codeStr.push(isSave ? "\t" : "  ");
					}
				}
				codeStr.push(`<${tagName}`);
				preorder(syntax.right[0]);//attrs
				if (syntax["sid"] !== undefined && isSave)
					codeStr.push(` w-sid="${syntax["sid"]}"`)
				codeStr.push("/>");
			}
		})
	}
}

const tagFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			//只解析容器中子元素时，子元素之间需要换行
			if (codeStr.length && layer == 0) {
				codeStr.push("\n");
			}
			//标签开始时，换行&缩进
			if (layer) {
				codeStr.push("\n");
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}

			//widget
			let tagName;
			if (syntax.right[0].value === "widget") {
				for (let i = 0; i < syntax.right[1].right.length; i++) {
					if (syntax.right[1].right[i].right[0].value === "w-tag") {
						tagName = syntax.right[1].right[i].right[1].right[0].value;
					}
				}
			}
			else {
				tagName = syntax.right[0].value;
			}
			codeStr.push("<" + tagName);
			preorders([syntax.right[1]]);// attrs
			if (syntax["sid"] !== undefined && isSave)
				codeStr.push(` w-sid="${syntax["sid"]}"`)
			codeStr.push(">");

			layer++;
			//组件prop内容换行显示  &  有内容 且内容不为空
			if (layer && (syntax.right[0].value === "widget" || syntax.right[0].value.indexOf("-") !== -1) && syntax.right[2].right.length) {
				let prop = false;
				for (let i = 0; i < syntax.right[2].right.length; i++) {
					if (syntax.right[2].right[i].type === "jobj") {
						prop = true;
						break
					}
				}
				if (prop) {
					codeStr.push("\n");
					for (let i = 0; i < layer; i++) {
						codeStr.push(isSave ? "\t" : "  ");
					}
				}
			}
			//内容
			preorder(syntax.right[2]);
			//(如果内容不是文本) | (内容超过两个元素) 添加换行和缩进
			if (layer && ((syntax.right[2].right[0] && syntax.right[2].right[0].type !== "text") || syntax.right[2].right.length > 1)) {
				codeStr.push("\n");
				for (let i = 0; i < layer - 1; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			layer--;
			codeStr.push(`</${tagName}>`);
		}
	})
}

const inputTagFunc = genSignleTagFunc("input");
const imgTagFunc = genSignleTagFunc("img");
const metaTagFunc = genSignleTagFunc("meta");

const attrRuleOut = ["w-sid", "w-tag", "maxId"];
const attrFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			//
			if (syntax.right[0].value === "w-class") {
				let tag = syntax.parent;
				while (tag.parent && tag.type.indexOf("tag") === -1) {
					tag = tag.parent
				}
				let sid = (tag as any).sid
				let clazz = syntax.right[1].right[0].value
				if (sid && clazz && sid != clazz) {
					debugger
				}
			}

			//过滤w-sid作为属性显示 
			if (attrRuleOut.indexOf(syntax.right[0].value) === -1) {
				codeStr.push(" ");
				preorder(syntax.right[0]);//属性名
				if (syntax.right[1]) {
					codeStr.push("=");
					preorder(syntax.right[1]);//属性值
				}
			}
		}
	})
}

//加引号
const quotaValue = (syntax: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push(`"`);
			preorders(syntax.right);
			codeStr.push(`"`);
		}
	})
}

//加单引号
const singleQuotaValue = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push(`'`);
			preorders(syntax.right);
			codeStr.push(`'`);
		}
	})
}

const valueFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push(syntax.value);
		}
	})
}

const scriptFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			if (parent.type === "jscript" && parent.parent.type !== "jpair" || parent.type === "body") {
				//只解析容器中子元素时，子元素之间需要换行
				if (codeStr.length && layer == 0) {
					codeStr.push("\n");
				}
				if (layer) {
					codeStr.push("\n");
					for (let i = 0; i < layer; i++) {
						codeStr.push(isSave ? "\t" : "  ");
					}
				}
			}
			codeStr.push("{{");
			preorder(syntax.right[0]);//脚本
		}
	})
}

const ifFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("if ");
			preorder(syntax.right[0]);//判断语句
			codeStr.push("}}");
			let right = syntax.right.slice(1, syntax.right.length);
			preorders(right);//body,elseif, else
			codeStr.push("\n");
			if (layer) {
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			codeStr.push("{{end}}");
		}
	})
}

const forFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			let right = syntax.right;
			codeStr.push("for ");
			if (right.length === 5) {
				preorder(syntax.right[0]);//key
				codeStr.push(",");
				preorder(syntax.right[1]);//value
				codeStr.push(" ");
				preorder(syntax.right[2]);//of|in
				codeStr.push(" ");
				preorder(syntax.right[3]);//obj
				codeStr.push("}}");
				preorder(syntax.right[4]);//body
			} else if (right.length === 4) {
				preorder(syntax.right[1]);//value
				codeStr.push(" ");
				preorder(syntax.right[2]);//of|in
				codeStr.push(" ");
				preorder(syntax.right[3]);//obj
				codeStr.push("}}");
				preorder(syntax.right[3]);//body
			}
			codeStr.push("\n");
			if (layer) {
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			codeStr.push("{{end}}");
		}
	})
}

const whileFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("while ");
			preorder(syntax.right[0]);//判断语句
			codeStr.push("}}");
			preorder(syntax.right[1]);//body
			codeStr.push("\n");
			if (layer) {
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			codeStr.push("{{end}}");
		}
	})
}

const elseifFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			//只解析容器中子元素时，子元素之间需要换行
			if (codeStr.length && layer == 0) {
				codeStr.push("\n");
			}
			if (layer) {
				codeStr.push("\n");
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			codeStr.push("{{elseif");
			preorder(syntax.right[0]);//判断语句
			codeStr.push("}}");
			preorder(syntax.right[1]);//body
		}
	})
}

const elseFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			//只解析容器中子元素时，子元素之间需要换行
			if (codeStr.length && layer == 0) {
				codeStr.push("\n");
			}
			if (layer) {
				codeStr.push("\n");
				for (let i = 0; i < layer; i++) {
					codeStr.push(isSave ? "\t" : "  ");
				}
			}
			codeStr.push("{{else}}");
			preorder(syntax.right[0]);//body
		}
	})
}

const execFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push(": ");
			preorders(syntax.right);//执行表达式，一个或多个
			codeStr.push("}}");
		}
	})
}

//子节点一定是一个dv
const defFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			let right = syntax.right;
			codeStr.push("let ");
			genCommaJion(right);//多个定义表达式(dv结构)
			codeStr.push("}}");
		}
	})
}

const jscontinueFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("continue}}");
		}
	})
}

const jsbreakFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("break}}");
		}
	})
}

//本质上就退化为了一个文本节点
const jsExprFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.right[0]);//表达式
			codeStr.push("}}");
		}
	})
}

const genMathNodeFunc = (operator: string) => {
	return (syntax: Syntax, parent: Syntax) => {
		return Object.assign({}, defaultParse, {
			"toStr": () => {
				if (syntax.left) {
					preorder(syntax.left);//左边
				}
				codeStr.push(operator);
				if (syntax.right && syntax.right.length === 1) {
					preorder(syntax.right[0]);//右边
				}
			}
		})
	}
}

//自增自减
const mulmulFunc = genMathNodeFunc(`--`);
const addaddFunc = genMathNodeFunc(`++`);
const negFunc = genMathNodeFunc(`!`);

//赋值是不会被嵌套的，可以等到返回了再赋值
const assignFunc = genMathNodeFunc(`=`);
const addFunc = genMathNodeFunc(`+`);
const subFunc = genMathNodeFunc(`-`);
const mulFunc = genMathNodeFunc(`*`);
const divFunc = genMathNodeFunc(`/`);
const remFunc = genMathNodeFunc(`%`);
const addEqualFunc = genMathNodeFunc(`+=`);
const subEqualFunc = genMathNodeFunc(`-=`);
const mulEqualFunc = genMathNodeFunc(`*=`);
const divEqualFunc = genMathNodeFunc(`/=`);
const remEqualFunc = genMathNodeFunc(`%=`);
const tripleEqualFunc = genMathNodeFunc(`===`);
const tripleUnequalFunc = genMathNodeFunc(`!==`);
const doubleEqualFunc = genMathNodeFunc(`==`);
const doubleUnequalFunc = genMathNodeFunc(`!=`);
const lessEqualFunc = genMathNodeFunc(`<=`);
const bigEqualFunc = genMathNodeFunc(`>=`);
const lessFunc = genMathNodeFunc(`<`);
const bigFunc = genMathNodeFunc(`>`);
const orFunc = genMathNodeFunc(`|`);
const andFunc = genMathNodeFunc(`&`);
const ororFunc = genMathNodeFunc(`||`);
const andandFunc = genMathNodeFunc(`&&`);

const bracketFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("(");
			preorder(syntax.right[0]);//表达式
			codeStr.push(")");
		}
	})
}

//[]
const fieldeFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.left);
			codeStr.push("[");
			preorder(syntax.right[0]);//表达式
			codeStr.push("]");
		}
	})
}
//.
const fieldFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.left);
			codeStr.push(".");
			preorder(syntax.right[0]);//identifier
		}
	})
}

const condFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.left);
			codeStr.push("?");
			preorder(syntax.right[0]);//表达式
			codeStr.push(":");
			preorder(syntax.right[1]);//表达式
		}
	})
}

const callFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.left);
			let right = syntax.right;
			codeStr.push("(");
			genCommaJion(right);//表达式
			codeStr.push(")");
		}
	})
}

const newFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			let right = syntax.right;
			codeStr.push("new ");
			preorder(right[0]);//identifier, 构建方法的名称
			codeStr.push("(");
			genCommaJion(right);//参数表达式
			codeStr.push(")");
		}
	})
}

const objFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("{");
			genCommaJion(syntax.right);//kv
			codeStr.push("} ");
		}
	})
}

const arrFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("[");
			genCommaJion(syntax.right);//kv
			codeStr.push("]");
		}
	})
}

const dvFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.right[0]);//key
			if (syntax.right[1]) {
				codeStr.push("=");
				preorder(syntax.right[1]);//v
			}
		}
	})
}

const kvFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.right[0]);//key
			codeStr.push(":");
			preorder(syntax.right[1]);//v
		}
	})
}

const exprgroupFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			genSemicolonJion(syntax.right);//用“,”连接各个表达式
		}
	})
}

const jsbodyFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("{");
			genSemicolonJion(syntax.right);
			codeStr.push("} ");
		}
	})
}

const jsblockFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("{");
			genSemicolonJion(syntax.right);
			codeStr.push("} ");
		}
	})
}

const jsdefFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("let ");
			genCommaJion(syntax.right);//一个或多个赋值语句
		}
	})
}

const jsifFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("if(");
			preorder(syntax.right[0]);
			codeStr.push(")");
			preorders([syntax.right[1], syntax.right[2], syntax.right[3]]);//jsbody, jselseif, jselse
		}
	})
}

const jselseifFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("else if(");
			preorder(syntax.right[0]);
			codeStr.push(")");
			preorder(syntax.right[1]);//jsbody
		}
	})
}

const jselseFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("else");
			preorder(syntax.right[0]);//jsbody
		}
	})
}

const jsforFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("for(");
			preorder(syntax.right[0]);//初始化语句
			codeStr.push(";");
			preorder(syntax.right[1]);//条件语句
			codeStr.push(";");
			preorder(syntax.right[2]);//控制语句
			codeStr.push(")");
			preorder(syntax.right[3]);//jsbody
		}
	})
}
const jswhileFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("while(");
			preorder(syntax.right[0]);//条件语句
			codeStr.push(")");
			preorder(syntax.right[1]);//jsbody
		}
	})
}
const jsswitchFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			let right = syntax.right;
			codeStr.push("switch(");
			preorder(right[0]);//表达式
			codeStr.push("){");
			preorders(right.slice(1, right.length));//表达式
			codeStr.push("} ");
		}
	})
}

const jscaseFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			let right = syntax.right;
			codeStr.push("case");
			preorder(right[0]);//条件
			codeStr.push(":");
			preorder(right[1]);//执行表达式
			codeStr.push(";");
		}
	})
}

const jsdefaultFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("default:");
			preorder(syntax.right[0]);//表达式
			codeStr.push(";");
		}
	})
}

const jstryFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorders(syntax.right);//jsblock, jscatch, jsfinally
		}
	})
}

const jscatchFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("catch(");
			preorder(syntax.right[0]);//参数表达式
			codeStr.push(")");
			preorder(syntax.right[1]);//jsblock
		}
	})
}

const jsfinallyFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("finally");
			preorder(syntax.right[1]);//jsblock
		}
	})
}

const jsfnFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("function(");
			preorder(syntax.right[0]);//jsfnargs(函数参数)
			codeStr.push(")");
			preorder(syntax.right[1]);//jsblock
		}
	})
}

const jsfnargsFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			genCommaJion(syntax.right);//","连接各个参数（参数为identifier
		}
	})
}

const jsreturnFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("return ");
			preorder(syntax.right[0]);//返回的表达式
		}
	})
}

const jarrFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("[");
			genCommaJion(syntax.right);//","连接各个表达式
			codeStr.push("]");
		}
	})
}

const jobjFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			codeStr.push("{");
			genCommaJion(syntax.right);//","连接各个表达式
			codeStr.push("} ");
		}
	})
}

const jpairFunc = (syntax: Syntax, parent: Syntax) => {
	return Object.assign({}, defaultParse, {
		"toStr": () => {
			preorder(syntax.right[0]);//key
			codeStr.push(":");
			preorder(syntax.right[1]);//v
		}
	})
}

const parserFunc: any = {
	"body": onlyRightFunc,
	"html": onlyRightFunc,
	"el": onlyRightFunc,
	//tag还需要细分为node和wnode
	"tag": tagFunc,
	"inputtag": inputTagFunc,
	"imgtag": imgTagFunc,
	"metatag": metaTagFunc,
	"text": textFunc,

	"jarr": jarrFunc,
	"jpair": jpairFunc,
	"jobj": jobjFunc,
	"jscript": quotaValue,
	"jstr": quotaValue,

	"script": scriptFunc,
	"exec": execFunc,
	"fielde": fieldeFunc,
	"field": fieldFunc,
	"call": callFunc,
	"def": defFunc,
	"dv": dvFunc,
	"!": negFunc,
	"--": mulmulFunc,
	"++": addaddFunc,
	"=": assignFunc,
	"+": addFunc,
	"-": subFunc,
	"*": mulFunc,
	"/": divFunc,
	"%": remFunc,
	"+=": addEqualFunc,
	"-=": subEqualFunc,
	"*=": mulEqualFunc,
	"/=": divEqualFunc,
	"%=": remEqualFunc,
	"===": tripleEqualFunc,
	"!==": tripleUnequalFunc,
	"==": doubleEqualFunc,
	"!=": doubleUnequalFunc,
	"<=": lessEqualFunc,
	">=": bigEqualFunc,
	"<": lessFunc,
	">": bigFunc,
	"|": orFunc,
	"&": andFunc,
	"||": ororFunc,
	"&&": andandFunc,
	"bracket": bracketFunc,
	"obj": objFunc,//obj比jobj简单
	"kv": kvFunc,//kv比jpair简单
	"arr": arrFunc,//比jarr简单
	"jsexpr": jsExprFunc,
	"if": ifFunc,
	"else": elseFunc,
	"elseif": elseifFunc,
	"for": forFunc,
	"while": whileFunc,
	"jscontinue": jscontinueFunc,
	"jsbreak": jsbreakFunc,
	"new": newFunc,
	"cond": condFunc,//三元运算符
	"attrs": onlyRightFunc,
	"attr": attrFunc,
	"attrStr": quotaValue,
	"singleattrStr": singleQuotaValue,
	"attrscript": quotaValue,
	"singleattrscript": singleQuotaValue,

	"jsdef": jsdefFunc,
	"jsif": jsifFunc,
	"jsfor": jsforFunc,
	"jswhile": jswhileFunc,
	"jsswitch": jsswitchFunc,
	"jstry": jstryFunc,
	"jsfn": jsfnFunc,
	"jsreturn": jsreturnFunc,

	"identifier": valueFunc,
	"lstring": valueFunc,
	"singlelstring": valueFunc,
	",": valueFunc,
	"number": valueFunc,
	"bool": valueFunc,
	"null": valueFunc,
	"true": valueFunc,
	"false": valueFunc,
	"undefined": valueFunc,
	"float": valueFunc,
	"floate": valueFunc,
	"string": valueFunc,
	"integer": valueFunc,
	"integer16": valueFunc,
	"integer10": valueFunc,
	"of": valueFunc,
	"in": valueFunc,
	"regular": valueFunc,
	"singlequotestring": valueFunc
}

// ================ JS的处理整体要简单很多
// child -> node->pre -> suf
let defaultParse = {
	"toStr": () => {

	}
}

let sid = 0;