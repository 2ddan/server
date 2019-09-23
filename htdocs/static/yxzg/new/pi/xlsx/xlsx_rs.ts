/**
 * .xlsx配置解析
 * 
 * 表配置格式：
 * 		第一行：第一个单元格为表名称， 必填, $开头表示类型为结构体， e$为枚举，v$为变量 
 * 		第一行：除第一个单元格，其余为字段名称，可以是宏，必填
 * 		第二行：字段类型，选填，不填时为默认类型（bool, string, number）
 * 		剩余行：表数据
 * 
 * 例1  |$Tranform  |position |      |      |rotation |      |      |objName |
 * 		|           |{x:i32   |y:i32 |z:i32}|[i32     |i32   |i32]  |        |
 * 		|           |3        |4     |5     |3        |4     |5     |  例1   |
 * 将导出结构体Transform{postion:{x:i32,y:i32,z:i32}, rotation:[i32,i32,i32]}, 及其具体的配置数据
 * 
 * 例2 |e$SkyColor  |blue     |white   |black   |
 *     |            |         |str     |        |
 *     |            |#0000ff  |#ffffff |#000000 |
 * 将导出一个枚举类型 enum SkyColor{blue="#0000ff", white="#ffffff", black:"#000000"}, 枚举类型的值只能是u8
 * 
 * 例3 |v$age  |
 *     |       |
 *     |20     |
 * 将导出一个变量 let age=20, 变量类型为基础类型
 * 
 * 外键：当导出类型为结构体时， 每个字段还可以以引用其他数据结构中的数据， 配置格式形如:"../../pi/obj/sys.Position#id@id"(路径.结构类型#内部关联键@外部关联键)
 * 其中，内部关联键和外部关联键都可以省略，内部关联键默认为自身索引，外部关联键默认为关联数据的索引
 * 
 * 主键：可以通过在字段名的单元格上添加批注（实际上是给结构体添加注解），来指明该字段为主键， 配置：#[primary=true]
 */

declare var require;
import { decode, Table, readTable, Cell, CellV, Sheet, nextCell, next} from "./xlsx_decoder";
import {Json, baseType} from "../lang/type";
import {unique} from "../util/util";
import {isStr, isNumber, isBool, isBase, typeStr} from "../compile/gendrust";
import { compile, toString } from "../util/tpl";
import { Parser as TplParser } from "../util/tpl_str";
import { cfgMgr } from "../util/cfg";
var pathMode = require("path");

enum CfgSuff{
	TS = "ts",
	RS = "rs"
}

let str;
let structId;
let structHead = "__Anon";
let quoteId;
let quoteHead = "__Quote";
let cfgSuff : CfgSuff = CfgSuff.TS;
let sheetName = "";
let sheetLen = 0;
let filePath = "";
let srcRoot = "";
let rpath = "";
let outCfgStr: Array<string>;
let ownStructs:Array<string>;
let optimizaId = "a";
let optimizaName = "_";
let outCfgImport;
let cfg;


//默认将配置实例转化为ts文件，
export const encodexls2rs = (workBook: Json, path: string, c: Json, sr: string, srcpath: string): Map<string, FeildData> => {
	str = [];
    cfg = {};
    cfg.cfgPath =  parsePath(path + "/xx", c.cfgPath);
	structHead = cfg.structHead || "__Anon";
	cfgSuff = cfg.cfgSuff || CfgSuff.TS;
    filePath = path.replace(".xlsx", "").replace(/\\/g, "/");
    srcpath = srcpath.replace(".xlsx", "")
    srcRoot = sr;
    rpath = genPath(srcpath,srcRoot);
    let arr = rpath.split("/");
    let fileName =  arr[arr.length - 1];
    sheetLen  = workBook.SheetNames.length;
    if (sheetLen > 1) {
        cfg.cfgPath =  parsePath(path + "/xx", c.cfgPath);
    }else{
        cfg.cfgPath =  parsePath(path, c.cfgPath);
    }
	let rsStrs = new Map<string, FeildData>();
	for(let i = 0; i < sheetLen; i++){
		outCfgStr = [];
		ownStructs = [];
		outCfgImport = [];
		structId = 1;
		optimizaId = "a";
		quoteId = 1;
        optimizaName = "_";
        let f = new File();
        f.imports = [];
        let name = sheetName = workBook.SheetNames[i];
		trimSheet(workBook.Sheets[name]);
		let r = decode(workBook.Sheets[name]);
		let feildData = new FeildData();
		feildData.structs = tables2rs(r[1], r[0], name, f);
		for(let i = 1; i < structId; i++){
			ownStructs.push(`${structHead}${i}`);
		}
		var anonImportstr = ownStructs.join(",");
		let imports = unique(f.imports);
		feildData.outCfgStr = unique(outCfgStr);
		feildData.importsrs = toRsImports(imports);
		feildData.importsts = toTsImports(imports);
		feildData.outCfgImports = [];//toCfgImports(outCfgImport);
		
		if(cfgSuff === CfgSuff.TS){
            if(sheetLen > 1){
                feildData.ownImports = `import {${anonImportstr}} from "./${name}.s";`;
            }else {
                feildData.ownImports = `import {${anonImportstr}} from "./${fileName}.s";`;
            }
			
		}else if(cfgSuff === CfgSuff.RS){
			//todo
			console.log("todo");
		}
        
		rsStrs.set(name, feildData);
	}

	return rsStrs;
}

//计算路径
const parsePath = (selfPath: string, dstPath: string): string => {
	let p = pathMode.relative(selfPath, dstPath).replace(/\\/g, "/");
	let pp = p.split("/");
	if(pp[0] && pp[0] === ".."){
		if(pp[1] !== ".."){
			pp[0] = ".";
		}else{
			pp = pp.slice(1, pp.length);
		}
	}
	return pp.join("/")
}

class FeildData{
	outCfgImports: Array<string>;
	importsrs: Array<string> = []; //导入
	importsts: Array<string> = []; //导入
	structs: Array<Array<string>> = [];//结构体定义和实例
	ownImports:string = "";
	outCfgStr: Array<string>; //取外部配置字符串
	defCfg: string = `import {cfgMgr} from "${cfg.cfgPath}"`;
	optimiza: Array<string>;//节省new实例的代码长度
}

const toRsImports = (imports: Array<string>): Array<string> => {
	let is = [];
	for(let i = 0; i < imports.length; i++){
		let lastIndex = imports[i].lastIndexOf("/");
		let path = imports[i].slice(0, lastIndex + 1);
		let name = imports[i].slice(lastIndex + 1, imports[i].length);
		is.push(`#[path=${path}]use ${name}.s;`);
	}
	return is;
}

const toTsImports = (imports: Array<string>): Array<string> => {
	let is = [];
	for(let i = 0; i < imports.length; i++){
		let lastIndex = imports[i].lastIndexOf("/");
		let name = imports[i].slice(lastIndex + 1, imports[i].length);
		is.push(`import * as ${name} from "${imports[i]}.s"`);
	}
	return is;
}

const toCfgImports = (imports: Array<string>): Array<string> => {
	let is = unique(imports);
	for(let i = 0; i < is.length; i++){
		is[i] = `import * as _cfg${i} from "${is[i]}_cfg"`;
	}
	return is;
}

const trimSheet = (sheet: Json) => {
	for(let k in sheet){
		if(k.indexOf("!") < 0 && sheet[k].v && typeof sheet[k].v === "string"){
			sheet[k].v = trim(sheet[k].v);
		}
	}
}

const isTupleType = (type: any): boolean => {
	if(type instanceof TupleType){
		return true;
	}else{
		return false;
	}
}

const isStructType = (type: any): boolean => {
	if(type instanceof StructType){
		return true;
	}else{
		return false;
	}
}

const isQuoteStruct = (type: any): boolean => {
	if(type instanceof QuoteStructType){
		return true;
	}else{
		return false;
	}
}
const isQuoteEnum = (type: any): boolean => {
	if(type instanceof QuoteEnumType){
		return true;
	}else{
		return false;
	}
}

const tables2rs = (sheet: Json, tables: Array<Table>, sheetName: string, f: File): Array<[string, string]> => {
	let str: Array<[string, string]> = [];
	if(tables){
		for(let i = 0; i < tables.length; i++){
			str.push(table2rs(sheet, tables[i], sheetName, f));
		}
	}
	return str;
}

const table2rs = (sheet: Sheet, table: Table, sheetName: string, f: File): [string, string] => {
	const start = getTableStart(table, sheet);
	if(!start){
		return ["", ""];
	}
	const startCell = sheet.data.get(`${start.col}-${start.row}`) as CellV;//表开始第一个单元格的值
    let type, structName, fields;
    table.colHand = start.col - table.start.col + 1;
	table.rowHand = start.row - table.start.row;
	if(startCell.v.indexOf("$") === 0){
        type = "struct";
        structName = startCell.v.slice(1, startCell.v.length);//去掉前两个字符e$符号，为表名
    }else if(startCell.v.indexOf("e$") === 0){
        type = "enum";
		structName = startCell.v.slice(2, startCell.v.length);//去掉第一个$符号，为表名
    }else if(startCell.v === "v$"){
        type = "sample";
    }else if(startCell.v === "f$"){
        type = "formula";
    }

    fields = readTable(sheet, table);//读字段
    if(!fields){
        throw `xlsx解析错误：${structName}表没有字段`;
    }

	let colTypes = readTable(sheet, table);//读每列类型
	if(!colTypes){
		colTypes = [];
	}
	let contents = [], r = readTable(sheet, table);
	while(r){
		contents.push(r);
		r = readTable(sheet, table);//读实例
	}

    const struct = initStruct(fields, colTypes, contents, structName, type, startCell.c, f);
	return toStr(struct);
	
}

const getType = (type: string, index: number, contents: Array<Array<CellV>>, fieldName: string , f: File): FieldType => {
	let t: FieldType;
	if(type && (type.endsWith("]") || type.endsWith("}"))){
		type = type.slice(0, type.length - 1);
	}
	if(!type){
		for(let i = 0; i < contents.length; i++){
			if(contents[i] && contents[i][index]){
				return new BaseType(xlsxType2Rs(contents[i][index].t), index);
			}
		}
		throw "无法确定字段类型！：" + fieldName;
	}else{
		let index1;
		if(type.indexOf("[") === 0){//元组类型
			t = new TupleType();
			t.elems = [];
			t.elems.push(getType(type.slice(1, type.length), index, contents, fieldName, f) as (BaseType | QuoteStructType));
		}else if(type.indexOf("{") === 0){//匿名结构体
			t = new StructType();
			t.name = `${structHead}${structId++}`;
			t.fields = new Map<string, Field>();
			let field = new Field();
			let str = type.slice(1, type.length);
			let arr = str.split(":");
			field.name = trim(arr[0]);
			field.type = getType(trim(arr[1]), index, contents, fieldName, f);
			t.fields.set(field.name, field);
		}else if(index1 = type.indexOf("#") > 0){//引用结构体类型, 例："../../pi/obj/sys.Position#id@id
			let qst = new QuoteStructType();
			t = qst;
			let arr = type.split("#");
			let pointIndex = arr[0].lastIndexOf(".");
			let index1 = arr[0].lastIndexOf("/");
			
			qst.type = arr[0].slice(index1 + 1, arr[0].length);
			qst.index = index;
			if(pointIndex === -1){//引用当前文件的结构体
				qst.path = "./" + sheetName;
				qst.file = sheetName;
				t.type = arr[0].slice(pointIndex + 1, arr[0].length);
			}else{
				qst.path = arr[0].slice(0, pointIndex);
				qst.file = arr[0].slice(index1 + 1, pointIndex);
				t.type = arr[0].slice(pointIndex + 1, arr[0].length);
				f.imports.push(qst.path);
			}
			parseForeignKey(arr[1], qst);//解析外键
			f.quoteStructs.push(qst);
        }else if(type.startsWith("e$")){ //以e$开始的类型为枚举类型
            type = type.slice(2, type.length);
            let qe = new QuoteEnumType();
            t = qe;

			let arr = type.split("#");
			let pointIndex = type.lastIndexOf(".");
			let index1 = type.lastIndexOf("/");
			
            qe.index = index;
            qe.type = arr[0].slice(pointIndex + 1, type.length);
			if(pointIndex === -1){//引用当前文件的结构体
				qe.path = "./" + sheetName;
				qe.file = sheetName;
			}else{
				qe.path = arr[0].slice(0, pointIndex);
				qe.file = arr[0].slice(index1 + 1, pointIndex);
				f.imports.push(qe.path);
            }
        }else{
			t = new BaseType(type, index);
		}
		return t;
	}
}

const xlsxType2Rs= (xlsxType: string): string => {
	if(xlsxType === "b"){
		return "bool";
	}else if(xlsxType === "n"){
		return "f64";
	}else if(xlsxType === "s" || xlsxType === "d"){
		return "str";
	}else{
		throw "excel表，类型错误";
	} 
}

//解析外键,外键规则为"外部关联键@内部关联键"， 内外关联键为空时，后续被处理成实例的索引
const parseForeignKey= (str: string, type: QuoteStructType) => {
	let keys = str.split("@");
	type.foreignKeyIn = keys[1];
	type.foreignKeyOut = keys[0];
}


//返回表的开始（表名以$, e$, v$开始），$表示为结构体， e$为枚举，v$为变量（基础类型或基础类型组成的数组） 
const getTableStart = (t: Table, sheet: Sheet): Cell => {
	let cell = {row:t.start.row, col:t.start.col};
	while(cell){
		let cellContent = sheet.data.get(`${cell.col}-${cell.row}`);
		if(cellContent && cellContent.v && typeof cellContent.v === "string" && (cellContent.v.indexOf("$") === 0 || cellContent.v.indexOf("e$") === 0 || cellContent.v.indexOf("v$") === 0 || cellContent.v.indexOf("f$") === 0)){
			return cell;
		}else{
			cell = nextCell(cell.row, cell.col, t.end.row, t.end.col, t.start.col);
		}
	}
	return null;
}

const initStruct = (fields: Array<CellV>, colTypes: Array<CellV>, contents: Array<Array<CellV>>, name: string, stype: string, c: Array<any>, file: File): Struct=> {
	const struct = new Struct();
	const note = parseNote(c);//结构体注释和注解
	struct.comment = note.comment;
	struct.annotation = note.annotation;
	struct.annotation.set("readonly", "true");


	struct.name = name;
	struct.type = stype;
	struct.objects = contents;

    if(struct.name){
        ownStructs.push(struct.name);
    }
	struct.fields = new Map<string, Field>();
	let preField: Field;
	let type: string;
	for(let i = 0; i < fields.length; i++){
		let type = colTypes[i]?colTypes[i].v:"";
		if(!fields[i] || !fields[i].v || (preField && preField.name === fields[i].v)){ //如果当前单元格为空 或与前一个单元格内容相同， 表示同一字段
			preField.count++;
			let fieldType = preField.type;
			if(type && (type.indexOf("{") === 0 || type.indexOf("[") === 0)){
				throw `无法定义结构体${name}, 因可能存在二维元组， 匿名结构体嵌套， 结构体与元组的相互嵌套！`;
			}else if(fieldType instanceof StructType){
				let f = getField(type, i, contents, file);
				fieldType.fields.set(f.name, f);
			}else if(fieldType instanceof TupleType){
				fieldType.elems.push(getType(type, i, contents, preField.name, file) as (BaseType | QuoteStructType));
			}else if(fieldType instanceof QuoteStructType){
				throw `表${name}中， 引用结构体类型字段不应该有多列！字段名：${preField.name}！`;
			}else if(fieldType instanceof BaseType){
				throw `表${name}中， 基础类型字段不应该有多列！字段名：${preField.name}！`;
			}
		}else if(fields[i]){
			preField && struct.fields.set(preField.name, preField);//否则为新的字段，将前一字段保存在arr中
			preField = new Field();
			preField.name = fields[i].v;
			preField.count = 1;
			//todo comment, anonate
			preField.type = getType(type, i, contents, preField.name, file);
			if(type === "enum" && !(preField.type instanceof BaseType)){
				throw `数据${struct.name}被定义为枚举类型， 其数据的类型只能是基础类型`
			}
			const note = parseNote(fields[i].c);//字段注释和注解
			preField.comment = note.comment;
			preField.annotation = note.annotation;
			if(preField.annotation.get("primary")){
				if(!(preField.type instanceof BaseType)){
					throw "复合类型无法作为主键！:" + preField.name;
				}
				let an = struct.annotation.get("primary");
				if(!an){
					an = preField.name;
				}else{
					an += "-" + preField.name;
				}
				struct.annotation.set("primary", an);
				preField.annotation.delete("primary");
			}
		}else{
			throw "属性定义不符合规则!";
		}
	}
	preField && struct.fields.set(preField.name, preField);
	let qs = file.quoteStructs;
	for(let i = 0; i < qs.length; i++){
		let key = qs[i].foreignKeyIn;
		let f = struct.fields.get(key);
		if(key){
			if(!f){
				throw `属性不存在，不能作为外键, sheet： ${sheetName},property:${key}`;
			}
			qs[i].field = f;
        }
        let name = filePath;
        if(sheetLen == 1){
            name = name.slice(0, name.lastIndexOf("/"));
        }
        let rp = genPath(pathMode.join(`${name}`, qs[i].path).replace(/\\/g, "/"), srcRoot.replace(/\\/g, "/"));
		let p: string = rp + "/" + qs[i].type;
		qs[i].outCfg = quoteHead + quoteId++;
		if(cfgSuff === CfgSuff.TS){
			let foreignKeyOut = qs[i].foreignKeyOut?"#" + qs[i].foreignKeyOut : "";
			outCfgStr.push(`let ${qs[i].outCfg} = cfgMgr.get("${p}${foreignKeyOut}");`);
			if(qs[i].path != "./"){
				outCfgImport.push(qs[i].path);
			}
		}else if(cfgSuff === CfgSuff.RS){
			//todo
		}
		
	}
	file.quoteStructs = [];
	return struct;
}

const parseNote = (c: Array<any>): Note => {
	let note: Note = {};
	if(!c){
		note.comment = [];
		note.annotation = new Map<string, string>();
	}else{
		note.comment = c[0].t.match(/\/\*(.|\n)*?\*\//g);
		let annotations = c[0].t.match(/#\[.*?\]/g);
		note.annotation = new Map<string, string>();
		for(let i = 0; i < annotations.length; i++){
			parseAnnotation(annotations[i], note.annotation );
		}
	}
	return note;
}

const parseAnnotation = (str: string, map: Map<string, string> ) => {
	str = str.slice(2, str.length - 1);
	var arr = str.split(",");
	for(let i = 0; i < arr.length; i++){
		let arr1 = arr[i].split("=");
		map.set(trim(arr1[0]), trim(arr1[1]));
	}
}

//将excel数据转化为rs字符串
const toStr = (struct: Struct): [string, string] => {
	let arr: [string, string] = ["", ""]
	let str = arr[0];
	if(struct.type === "enum"){
		arr[0] += defEnum(struct);
	}else if(struct.type === "sample"){
		arr[0] += rs_consts_tpl_fun(struct);
	}else if(struct.type === "formula"){
		arr[0] += rs_formulas_tpl_fun(struct);
	}else if(struct.fields.size > 0){
		arr[0] += defStructs(struct);//定义结构体
		arr[1] = SetObjects.toString(new SetObjects(struct, sheetLen > 1?sheetName:"", rpath, optimizaName + optimizaId));//生成结构体实例
		optimizaId = increaseWord(optimizaId);
	}
	return arr;
}

//递增字母，最大到z
const increaseWord = (str: string): string=> {
	let code = str.charCodeAt(0) + 1;
	if(code > 122){
		throw "sheet上的表个数大于26！"
	}
	return String.fromCharCode(code);
}


class SetObjects{
	struct: Struct;
	tol: string;
	filePath: string;
	sheetName: string;
	optimizaName: string;

	static tplrs = `
{{let struct = it.struct}}let _{{struct.name}} = [
{{for k, data of struct.objects}}
	{{struct.name}}{
	{{for k, field of struct.fields}}
		{{field.name}}: {{% 字段名称 %}}
		{{if _isStructType(field.type)}} {{% 匿名结构体类型 %}}
		{{let childType = field.type}}
		{{childType.name}}{
			{{for i, fieldc of childType.fields}}{{fieldc.name}}: {{% 匿名结构体成员}}
				{{if _isQuoteStruct(fieldc.type)}} {{fieldc.type.type}}#{{fieldc.type.foreignKey}}, {{% 引用结构体类型 %}}
				{{elseif _isString(fieldc.type.type)}} "{{data[field.start + (i - 0)].v}}", {{% 字符串类型 %}}
				{{elseif _isBool(fieldc.type) || _isNumber(fieldc.type)}} {{data[field.start + (i - 0)].v}}, {{% 非字符串基础类型 %}}
				{{end}} {{% 匿名结构体字段支持基础类型，引用结构体类型 %}} 
			{{end}} },
		{{elseif _isTupleType(field.type)}} {{% 元组类型 %}}
		{{let childType = field.childType}}(
			{{for i, type of childType.elems}}
				{{if _isQuoteStruct(type)}} {{type.type}}#{{type.foreignKey}}, {{% 引用结构体类型 %}}
				{{elseif _isString(type.type)}} "{{data[field.start + (i - 0)].v}}", {{% 字符串类型 %}}
				{{elseif _isBool(type.type) || _isNumber(type.type)}} {{data[field.start + (i - 0)].v}}, {{% 非字符串基础类型 %}}
				{{end}} {{% 元组的元素支持基础类型，引用结构体类型 %}} 
			{{end}} ),
		{{elseif _isString(field.type.type)}} "{{data[field.start].v}}", {{% 字符串类型 %}}
		{{elseif _isBool(field.type.type) || _isNumber(field.type)}} {{data[field.start].v}}, {{% 非字符串基础类型 %}}
		{{end}}
	{{end}} },
{{end}} ]`;
	
static tplts = `
{{let struct = it.struct}}
cfgMgr.set_arr("{{it.filePath}}{{it.sheetName?("/" + it.sheetName):""}}.{{struct.name}}", [
{{let oCount = 0}}
{{let pCount = 0}}
{{for k, data of struct.objects}}
	{{let isIndex = false}}
	{{if oCount > 0}},{{else}}{{:oCount = oCount + 1}}{{end}}{{it.optimizaName}}({{%实例用逗号分隔%}}
	{{let paramCount = 0}}
    {{for k, field of struct.fields}}
        {{if _isQuoteEnum(field.type)}}{{% 引用枚举 %}}
            {{if paramCount > 0}},
            {{end}}{{field.type.type}}.{{data[field.type.index].v}}{{: paramCount = paramCount + 1}}
		{{elseif _isQuoteStruct(field.type)}}{{% 引用结构体类型 %}}
			{{if !field.type.foreignKeyIn && isIndex === false}}
				{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}
			{{elseif field.type.foreignKeyIn === field.name}}
				{{if paramCount > 0}},
				{{end}}{{data[field.type.index].v}}{{: paramCount = paramCount + 1}}
            {{end}}
		{{elseif _isStructType(field.type)}}{{% 匿名结构体类型 %}}
			{{for i, fieldc of field.type.fields}} {{% 匿名结构体成员}}
				{{if _isQuoteStruct(fieldc.type)}}
					{{if !fieldc.type.foreignKeyIn && isIndex === false}}
						{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}
					{{elseif fieldc.type.foreignKeyIn === field.name}}
						{{if paramCount > 0}},
						{{end}}{{data[fieldc.type.index].v}}{{: paramCount = paramCount + 1}}
                    {{end}}
                {{elseif _isString(fieldc.type.type)}}
                    {{if paramCount > 0}},
                    {{end}}\`{{data[fieldc.type.index]?data[fieldc.type.index].v:""}}\`{{: paramCount = paramCount + 1}} {{% 字符串类型 %}}
                {{elseif _isNumber(fieldc.type.type)}}
                    {{if paramCount > 0}},
                    {{end}}{{data[fieldc.type.index]?data[fieldc.type.index].v:0}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
                {{elseif _isBool(fieldc.type.type)}}
                    {{if paramCount > 0}},
                    {{end}}{{data[fieldc.type.index]?data[fieldc.type.index].v: false}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
                {{end}}{{% 匿名结构体字段支持基础类型，引用结构体类型 %}} 
			{{end}}
		{{elseif _isTupleType(field.type)}} {{% 元组类型 %}}
			{{for i, elem of field.type.elems}}
				{{if _isQuoteStruct(elem)}}
					{{if !elem.foreignKeyIn && isIndex === false}}
						{{:isIndex = true}}{{if paramCount > 0}},{{end}}{{pCount}}{{:paramCount++}}
					{{elseif elem.foreignKeyIn === field.name}}
						{{if paramCount > 0}},
						{{end}}{{data[elem.index].v}}{{: paramCount = paramCount + 1}}
					{{end}}
                {{elseif _isString(elem.type)}}
                    {{if paramCount > 0}},
                    {{end}}\`{{data[elem.index]?data[elem.index].v:""}}\`{{: paramCount = paramCount + 1}} {{% 字符串类型 %}}
                {{elseif _isNumber(elem.type)}}
                    {{if paramCount > 0}},
                    {{end}}{{data[elem.index]?data[elem.index].v:0}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
                {{elseif _isBool(elem.type)}}
                    {{if paramCount > 0}},
                    {{end}}{{data[elem.index]?data[elem.index].v: false}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
                {{end}} {{% 元组的元素支持基础类型，引用结构体类型 %}} 
			{{end}}
		{{elseif _isString(field.type.type)}}
			{{if paramCount > 0}},
			{{end}}\`{{data[field.type.index]?data[field.type.index].v:""}}\`{{: paramCount = paramCount + 1}} {{% 字符串类型 %}}
		{{elseif _isNumber(field.type.type)}}
			{{if paramCount > 0}},
            {{end}}{{data[field.type.index]?data[field.type.index].v:0}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
        {{elseif _isBool(field.type.type)}}
			{{if paramCount > 0}},
			{{end}}{{data[field.type.index]?data[field.type.index].v: false}}{{: paramCount = paramCount + 1}}{{% 非字符串基础类型 %}}
		{{end}}
	{{end}})
	{{:pCount++}}
{{end}} ])`;

static tpltsParam = `
{{let struct = it.struct}}
let {{it.optimizaName}} = (
{{let oCount = 0}}
{{let isIndex = false}}
{{for k, field of struct.fields}}
	{{if _isQuoteStruct(field.type)}}
		{{if !field.type.foreignKeyIn && isIndex === false}}
			{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}
		{{elseif field.type.foreignKeyIn === field.name}}
			{{if oCount > 0}},{{end}}o{{field.type.index}}{{:oCount++}}
		{{end}}
	{{elseif _isStructType(field.type)}}
		{{for k1, fieldc of field.type.fields}}
			{{if _isQuoteStruct(fieldc.type)}}
				{{if !fieldc.type.foreignKeyIn && isIndex === false}}
					{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}
				{{elseif fieldc.type.foreignKeyIn === field.name}}
					{{if oCount > 0}},{{end}}o{{fieldc.type.index}}{{:oCount++}}
				{{end}}
			{{else}}{{if oCount > 0}},{{end}}o{{fieldc.type.index}}{{:oCount++}}
			{{end}}
		{{end}}
	{{elseif _isTupleType(field.type)}}
		{{for k1, elem of field.type.elems}}
			{{if _isQuoteStruct(elem)}}
				{{if !elem.foreignKeyIn && isIndex === false}}
					{{:isIndex = true}}{{if oCount > 0}},{{end}}index{{:oCount++}}
				{{elseif elem.foreignKeyIn === field.name}}
					{{if oCount > 0}},{{end}}o{{elem.index}}{{:oCount++}}
				{{end}}
			{{else}}{{if oCount > 0}},{{end}}o{{elem.index}}{{:oCount++}}
			{{end}}
		{{end}}
	{{else}}{{if oCount > 0}},{{end}}o{{field.type.index}}{{:oCount++}} {{%基础类型%}}
	{{end}}	
{{end}})
`;

static tpltsnew = `
{{let struct = it.struct}}:{{struct.name}} => { return new {{struct.name}}(
{{let fieldCount = 0}}
{{for k, field of struct.fields}}
	{{if fieldCount > 0}},
	{{end}}
	{{if _isStructType(field.type)}}new {{field.type.name}}({{%匿名结构体%}}
		{{let cCount = 0}}
		{{for k1, fieldc of field.type.fields}}
			{{if cCount > 0}},{{%new匿名结构体，成员用逗号分隔%}}
			{{end}}
			{{if _isQuoteStruct(fieldc.type)}}
				{{if !field.type.foreignKeyIn}}
					{{fieldc.type.outCfg}}.get(index) as {{fieldc.type.file}}.{{fieldc.type.type}}
				{{elseif field.type.foreignKeyIn === field.name}}
					{{fieldc.type.outCfg}}.get(o{{fieldc.type.index}}) as {{fieldc.type.file}}.{{fieldc.type.type}}
				{{else}}
					{{fieldc.type.outCfg}}.get(o{{fieldc.type.field.type.index}}) as {{fieldc.type.file}}.{{fieldc.type.type}}{{%匿名结构体中的引用结构体类型%}}
				{{end}}
			{{else}}o{{fieldc.type.index}} {{%匿名结构体中的基础类型%}}
			{{end}}
			{{:cCount++}}
		{{end}})
	{{elseif _isTupleType(field.type)}}[{{%元组类型%}}
		{{for k1, elem of field.type.elems}}
			{{if k1 - 0 > 0}},{{%new匿名结构体，成员用逗号分隔%}}
			{{end}}
			{{if _isQuoteStruct(elem)}}
				{{if !elem.foreignKeyIn}}
					{{elem.outCfg}}.get(index) as {{elem.file}}.{{elem.type}}
				{{elseif elem.foreignKeyIn === field.name}}
					{{elem.outCfg}}.get(o{{elem.index}}) as {{elem.file}}.{{elem.type}}
				{{else}}
					{{elem.outCfg}}.get(o{{elem.field.type.index}}) as {{elem.file}}.{{elem.type}}{{%匿名结构体中的引用结构体类型%}}
				{{end}}
			{{else}}o{{elem.index}}
			{{end}}
		{{end}}]
	{{elseif _isQuoteStruct(field.type)}}{{%引用结构体类型%}}
		{{if !field.type.foreignKeyIn}}
			{{field.type.outCfg}}.get(index) as {{field.type.file}}.{{field.type.type}}
		{{elseif field.type.foreignKeyIn === field.name}}
			{{field.type.outCfg}}.get(o{{field.type.index}}) as {{field.type.file}}.{{field.type.type}}
		{{else}}
			{{field.type.outCfg}}.get(o{{field.type.field.type.index}}) as {{field.type.file}}.{{field.type.type}}{{%匿名结构体中的引用结构体类型%}}
		{{end}}
	{{else}}o{{field.type.index}}{{%基础类型%}}
	{{end}}
	{{: fieldCount++}}	
{{end}} );};
`;
	static toFunc = (s: string) => {
		return (new Function("_stringify", "_isBase", "_isString", "_isBool", "_isNumber", "_isQuoteStruct", "_isTupleType", "_isStructType","_relativePath","_isQuoteEnum", "return " + s))(toString, isBase, isStr, isBool, isNumber, isQuoteStruct, isTupleType, isStructType, relativePath, isQuoteEnum);
	}
	static tplRsFunc = SetObjects.toFunc(compile(SetObjects.tplrs, TplParser, null, null, null, null, null,"es6"));
	static tplTsFunc = SetObjects.toFunc(compile(SetObjects.tplts, TplParser, null, null, null, null, null,"es6"));
	static tpltsnewFunc = SetObjects.toFunc(compile(SetObjects.tpltsnew, TplParser, null, null, null, null, null,"es6"));
	static tpltsparamFunc = SetObjects.toFunc(compile(SetObjects.tpltsParam, TplParser, null, null, null, null, null,"es6"));
	constructor(struct: Struct, sheetName: string, filePath: string, optimizaName: string, tol: string=""){
		this.struct = struct;
		this.tol = tol;
		this.sheetName = sheetName;
		this.filePath = filePath;
		this.optimizaName = optimizaName;
	}

	static toString = (objs: SetObjects): string => {
		if(cfgSuff === CfgSuff.TS){
			var str = SetObjects.tpltsparamFunc(null, objs);
			str += SetObjects.tpltsnewFunc(null, objs);
			str += SetObjects.tplTsFunc(null, objs);
			return str;
		}else if(cfgSuff === CfgSuff.RS){
			//todo
			//return SetObjects.tplRsFunc(null, struct, sheetName, filePath, optimizaId);
		}else{
			throw "导出文件类型不支持" + cfgSuff;
		}
	}
}

//定义一个枚举
const defEnum = (struct: Struct, tol: string = ""): string => {
	let str = `
${tol}enum ${struct.name}{`;
	let i = 0;
	for(let v of struct.fields.values()){
		str += v.name;
		if(struct.objects && struct.objects[0] && struct.objects[0][i]){
			str += `=`;
			if(isStr((v.type as BaseType).type)){
				str += `"${struct.objects[0][i].v}",`;
			}else{
				str += `${struct.objects[0][i].v},`;
			}
		}
		i++;
	}
	str += "}";
	return str;
}

//定义一个结构体
const defStructs = (struct: Struct, tol: string = ""): string => {
	let str = "";
	//定义匿名结构体
	struct.fields.forEach((v, k) => {
		let type = v.type;
		if(type instanceof StructType){//匿名结构体，需要被定义
			let s = new DefStruct(type);
			str += "\n" + DefStruct.toString(s); //定义匿名结构体
		}
	});

	let s = new DefStruct(struct);
	str += "\n" + DefStruct.toString(s); //定义结构体
	return str;
}

/**
 * @description  返回定义的函数, 用定义字符串，转成匿名函数的返回函数
 * @example
 */
const toFunc = (s: string) => {
	return (new Function("return " + s))();
}

const getTypeName = (type: FieldType): string => {
	if(type instanceof BaseType){
		return (<BaseType>type).type;
	}else if(type instanceof StructType){
		return (<StructType>type).name;
	}else if(type instanceof TupleType){
		var strs = [];
		for(let i = 0; i < type.elems.length; i++){
			strs.push(getTypeName(type.elems[i]));
		}
		return "(" + strs.join(",") + ")";
	}else if((<any>type) instanceof QuoteStructType || (<any>type) instanceof QuoteEnumType){
		if((<QuoteStructType>type).file === sheetName)
			return (<QuoteStructType>type).type;
		else{
			return (<QuoteStructType>type).file + "::" + (<QuoteStructType>type).type;
		}
	}
}

class DefStruct{
	struct: Struct | StructType;
	tol: string;
	static tpl: string = `
{{let struct = it.struct}}
{{if struct.comment}}
	{{for k, v of struct.comment}}
	{{it.tol}}{{v}} {{% 结构体注释 %}}
	{{end}}
{{end}}
#[db=memory,{{if struct.annotation && struct.annotation.size > 0}}
	{{let i = 0}}
	{{for k, v of struct.annotation}}
		{{if i > 0}},{{end}}
		{{k}}={{v}} {{% 结构体注解 %}}
	{{: i++}}
	{{end}}
{{end}}]
{{it.tol}}struct {{struct.name}}{ {{% 定义结构体 %}}
{{for k, v of struct.fields}}
	{{if v.comment}}
		{{for k1, v1 of v.comment}}
		{{it.tol}}{{v1}} {{% 成员注释 %}}
		{{end}}
	{{end}}
	{{if v.annotation && v.annotation.size > 0}}#[
		{{let i = 0}}
		{{for k1, v1 of v.annotation}}
			{{if i > 0}},{{end}}
			{{k1}}={{v1}} {{% 成员注解 %}}
			{{: i++}}
		{{end}}]
    {{end}}
    {{if _isQuoteEnum(v.type)}}
    #[enum=true]
    {{end}}
	{{it.tol}}{{v.name}}: {{_getTypeName(v.type)}}, {{% 定义成员 %}}
{{end}} }`;

	static toFunc = (s: string) => {
		return (new Function("_stringify","_getTypeName", "_isQuoteEnum",  "return " + s))(toString, getTypeName, isQuoteEnum);
	}
	static tplFunc = DefStruct.toFunc(compile(DefStruct.tpl, TplParser, null, null, null, null, null,"es6"));

	
	
	constructor(struct: Struct | StructType, tol: string = ""){
		this.struct = struct;
		this.tol = tol;
	}

	static toString = (obj: DefStruct): string => {
		return DefStruct.tplFunc(null, obj);
	}
}

interface Note{
	annotation?: Map<string, string>;//注解
	comment?: Array<string>;//注释
}

class Struct{
	type: string;//(sample, enum, struct)
	name: string;//结构名称
	fields: Map<string, Field>;//字段， 类型为struct是需要
	objects: Array<Array<CellV>>;//实例
	comment?: string[];//注释
	annotation?: Map<string, string>;//注解
}

//匿名结构体
class StructType{
	name: string;//结构体名称（名字是生成的）
	fields: Map<string, Field>;//字段
	annotation:  Map<string, string>;//注解
	constructor(){
		this.annotation = new Map<string, string>();
		this.annotation.set("readonly", "true");
	}
}

//引用结构体
class QuoteStructType{
	path: string;//结构体名称（名字是生成的）
	type:string;//类型
	file: string;//所属文件
	foreignKeyIn: string;//外键
	foreignKeyOut: string;//外键
	field: Field;//外键关联字段
	outCfg: string;//外键关联配置的名称（此模块自动命名)
	index: number;
}

//枚举类型
class QuoteEnumType{
	path: string;//枚举名称（名字是生成的）
	type:string;//类型
	file: string;//所属文件
	index: number;
}

//基础类型
class BaseType{
	type: string;//类型
	index: number;//索引
	constructor(type: string, index: number){
		this.type = type;
		this.index = index;
	}
}

//元组
class TupleType{
	elems: Array<BaseType | QuoteStructType>;//元素类型(基础类型或引用结构体)
}

class Field{
	name: string;//字段名称
	type: FieldType;
	annotation?: Map<string, string>;//字段注解
	comment?: string[];//字段注释
	count?: number;
}

class File{
	quoteStructs: Array<QuoteStructType> = []; //引用结构体
	imports?: Array<string>;// 导入路径
}

type FieldType = BaseType | TupleType | StructType | QuoteStructType;//字段类型（可以是基础类型，元组，匿名结构体，引用结构体）

const getField = (str: string, index: number, contents: Array<Array<CellV>>, file: File): Field => {
	let f = new Field();
	let arr = str.split(":");
	if(str.endsWith("}") && str.indexOf(":") < 0){
        arr[0] = trim((str.slice(0, str.length - 1)));
        arr[1] = "}";
    }
	f.name = trim(arr[0]);
	f.type = getType(trim(arr[1]), index, contents, f.name, file);
	return f;
}

//去左右空格;
const trim = (s) => {
	try {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	} catch (error) {
		console.log(s);
	}
}

//从数组中取出对应元素
const getFromArray = (key: string, value: any, array) => {
	
}

const genPath = (path, scrRoot: string): string => {
    let srcs = scrRoot.split("\\");
    path = path.replace(scrRoot, "");
    let paths = path.split("\\");
    return paths.join("/");
}

// 获得指定的路径相对目录的路径
const relativePath = (filePath: string, dir: string): string => {
    var i, len, j;
    filePath
	if (filePath.charCodeAt(0) !== 46)
		return filePath;
	i = 0;
	len = filePath.length;
	j = dir.length - 1;
	if (dir.charCodeAt(j) !== 47) {
		j = dir.lastIndexOf("/");
	}
	while (i < len) {
		if (filePath.charCodeAt(i) !== 46)
			break;
		if (filePath.charCodeAt(i + 1) === 47) {// ./的情况
			i += 2;
			break;
		}
		if (filePath.charCodeAt(i + 1) !== 46 || filePath.charCodeAt(i + 2) !== 47)
			break;
		// ../的情况
		i += 3;
		j = dir.lastIndexOf("/", j - 1);
	}
	if (i > 0)
		filePath = filePath.slice(i);
	if (j < 0)
		return filePath;
	if (j < dir.length - 1)
		dir = dir.slice(0, j + 1);
	return dir + filePath;
};


const rs_consts_tpl: string = `{{let struct = it}}
{{let fields = struct.fields}}
{{let i = 0}}
{{for k, field of fields}}
const {{field.name}}: {{_getTypeName(field.type)}} = {{if _isStr(field.type.type)}}"{{struct.objects[0][i].v}}"{{else}}{{struct.objects[0][i].v}}{{end}};
{{: i++}}
{{end}}
`;
const rs_formulas_tpl: string = `{{let struct = it}}
{{let fields = struct.fields}}
{{let i = 0}}
{{for k, field of fields}}
const {{field.name}}: String = "formula#{{field.type.type}}#{{struct.objects[0][i].v}}";
{{: i++}}
{{end}}
`;



const rs_consts_tpl_fun = (struct: Struct): string => {
	let str = tplFunc.rs_consts_tpl(null, struct);
	return str;
}

const rs_formulas_tpl_fun = (struct: Struct): string => {
	let str = tplFunc.rs_formulas_tpl(null, struct);
	return str;
}

const tplToFunc = (s: string) => {
    return (new Function("_stringify","_getTypeName", "_isQuoteEnum", "_isStr", "return " + s))(toString, getTypeName, isQuoteEnum, isStr);
}


const tplFunc = {
    rs_consts_tpl:tplToFunc(compile(rs_consts_tpl, TplParser, null, null, null, null, null,"es6")),
    rs_formulas_tpl: tplToFunc(compile(rs_formulas_tpl, TplParser, null, null, null, null, null,"es6")),
}
