import { Widget } from "../../widget/widget";
import { Client, connect } from "../../net/mqtt_c";
import { create } from "../../net/rpc";
import { Error, OK_S, OK } from "../../net/rpc_r";
import { StructMgr, Struct, Func } from "../../struct/struct_mgr";
import { allWrite, getAllReadNext } from "../../struct/util";
import * as Player from "./player";
import { BinBuffer } from "../../util/bin";
import { encodeDiffs } from "../../util/rsync";
import { Json } from "../../lang/type";

let rpc;
let demo;
/**
 * @description 导出组件Widget类
 * @example
 */
export class RPCDemo extends Widget {
	rpc
	firstPaint(): void {
		let client = connect("ws://iot.eclipse.org:80/ws/mqtt");
		runService(client);	
		rpc = create(client, (<any>self).rpcMgr);
		demo = this;
		this.props = {r: "", name:"chuanyanaaaaaaaaa"};
	}

	setName(){
		let name = (<any>this.tree).children[1].link.value || "";
		let req = new Player.setName();
		req.id = 1;
		req.name = name;
		req.addMeta((<any>self).rpcMgr);
		rpcFunc(req, OK, (ret: Struct)=>{
			this.props.name=name;
			console.log("设置名字成功！");
		});
	}

	getName(){
		let req = new Player.getName();
		req.id = 1;
		req.addMeta((<any>self).rpcMgr);
		rpcFunc(req, OK_S, (ret: Struct)=>{
			this.props.r += `
			${(<OK_S>ret).value}
			`;
			this.paint();
			console.log((<OK_S>ret).value);
		});
	}
}

const rpcFunc = (req:Struct, respClass:Function, callback:Func) => {
	rpc(req, (r:Struct) =>{
		if(!respClass || r instanceof respClass){
			return callback(r);
		}else if(r instanceof Error){
			console.log("RPCError:" + r.info);
		}else{
			console.log("RPCError:" + "返回类型" + r.constructor.name + "与" + respClass.name + "类型不匹配！")
		}
	});
}

const runService = (client: Client) => {
	let count = 0;
	client.setCompressTap(64);//超过64字节就压缩(可以不设置，默认就是超过64字节压缩)
	client.setTag("$resp/examples/testrpc/player.getName", "isRsync", 1);//需要比较差异
	client.setTag("$resp/examples/testrpc/player.getName", "compressMode", 1);//lz4压缩

	client.subscribe("$req/" + "examples/testrpc/player.getName");
	client.subscribe("$req/" + "examples/testrpc/player.setName");
	client.onMessage((topic: string, payload: Uint8Array) => {
		if(topic === "$req/examples/testrpc/player.getName"){
			getName(payload, client);
		}else if(topic === "$req/examples/testrpc/player.setName"){
			setName(payload, client);
		}
	});
}

let serverName = "chuanyanaaaaaaaaa";
const getName = (payload, client) =>{
	let bb = new BinBuffer(payload);
	let rid = bb.readU32();
	let req = bb.read(getAllReadNext((<any>self).rpcMgr)) as Player.getName;
	console.log("收到请求，" + req.constructor.name + ", 玩家id：" + req.id);
	let resp = new OK_S();
	resp.addMeta((<any>self).rpcMgr);
	resp.value = serverName;

	let bb1 = new BinBuffer();
	bb1.writeU32(rid as number)
	bb1.writeCt(resp, allWrite);
	client.publish("$resp/" + (<any>req.constructor)._$info.name, bb1.getBuffer() , () => {});
}

const setName = (payload, client) =>{
	let bb = new BinBuffer(payload);
	let rid = bb.readU32();
	let req = bb.read(getAllReadNext((<any>self).rpcMgr)) as Player.setName;
	console.log("收到请求，" + req.constructor.name + ", 玩家id：" + req.id);
	serverName = req.name;
	let resp = new OK();
	resp.addMeta((<any>self).rpcMgr);

	let bb1 = new BinBuffer();
	bb1.writeU32(rid as number)
	bb1.writeCt(resp, allWrite);
	client.publish("$resp/" + (<any>req.constructor)._$info.name, bb1.getBuffer() , () => {});
}
