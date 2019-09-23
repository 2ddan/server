/**
 * RPC， 远程方法调用
 * 采用 mqtt上定义的每会话的$req和$resp主题，来发送请求和接受响应
 */

// ============================== 导入
import { Func, Struct, StructMgr } from "../struct/struct_mgr";
import { writeBon, read} from "../struct/util";
import { BonBuffer, SerializeType } from '../util/bon';
import { Client } from "./mqtt_c";

/**
 * 创建一个RPC函数
 * @example
 */
export const create = (client: Client, mgr: StructMgr) : Rpc => {
	const mqttRpc = new MqttRpc(client, mgr);
	client.onMessage((topic, payload: Uint8Array) => {
		if(topic === "$r"){
			let bb = new BonBuffer(payload, 0, payload.length);
            let rid = bb.readU32();//消息开始表示此次请求的id
            let timeout = bb.readU8();
			if(mqttRpc.wait[rid]){
				mqttRpc.wait[rid](read(bb, mgr));
				delete mqttRpc.wait[rid];
			}
		}
	});
	return (name: string, req: SerializeType, callback:Func, timeout: number) => {
		mqttRpc.call(name, req, callback, timeout);
	}
}

class MqttRpc {
	rid = 1;
	wait = {};
	client: Client;
	mgr: StructMgr;
	constructor(client: Client, mgr: StructMgr){
		this.client = client;
		this.mgr = mgr;
	};

	//远程调用
	call(name: string, req: SerializeType, callback: Func, timeout: number){
		let bb = new BonBuffer();
		this.wait[this.rid] = callback;
        bb.writeU32(this.rid++);
        bb.writeU8(timeout);
        this.rid >= 0xffffffff && (this.rid = 1);
        if (req === null || req === undefined){
            bb.writeNil();
        }else if (req instanceof Struct) {
            writeBon(req, bb);
        }else{
            req.bonEncode(bb);
        }
		this.client.publish(name, bb.getBuffer(),0,true);
	}
}

export interface Rpc {
	(name: string, req: SerializeType, callback:Func, timeout: number): void;
}
