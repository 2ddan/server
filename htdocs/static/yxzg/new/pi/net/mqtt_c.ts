/*
* mqtt模块， 用于消息发布和订阅
* mqtt消息协议：
	压缩方式：（0：不压缩， 1：lz4压缩， 2: zstd压缩）-- 占2位
	是否差异比较：（0：否， 1：是）-- 占1位
	版本号：-- 占5位，------------------------以上总共1字节
	原始数据大小：仅在发布数据为压缩数据时需要，  类型为PInt, PInt类型参考./util/bon.ts
	剩余部分：消息内容
*/
import { baseType, Json } from '../lang/type';
import { BonBuffer } from '../util/bon';
import { decodeDiffs, encodeDiffs, RSync } from '../util/rsync';
import { Message, MqttClient } from './mqtt';

/**
 * mqtt客户端
 * @example
 */
export class Client {
    public mc: MqttClient;
    public lastMsg = new Map<string, Uint8Array>();// 需要使用差异比较进行数据同步的主题，每次发布时，应该保存最后发布的数据
    // 可以为主题设置0个或多个tag，其中"compressMode"，"isRsync"为内置tag，用于配置主题数据的压缩模式，是否使用差异比较进行数据同步
    public tags = new Map<string, Map<string, baseType>>();
    public rsync: RSync;
    public compressTap: number;// 压缩阀值， 当数据大小超过compressTap， 将会使用tag中配置的压缩方式进行压缩
    private listeners = [];
    constructor(host: string, port: number, clientId: string, compressTap?: number, option?: Json) {
        const c = new MqttClient(host, port, clientId);
        const scope = this;
        const onmessage = (message: any) => {
            scope.onMessageArrived(message);
        };
        c.onMessageArrived = onmessage;
        option = option ? option : {};
        c.connect(option);
        this.mc = c;
        this.rsync = new RSync(32);
        this.compressTap = compressTap || 64;
    }

    // 重连
    public reconnect() {
        this.mc.reconnect();
    }

    // 设置tag
    public setTag(topic: string, key: string, value: baseType) {
        let tag = this.tags.get(topic);
        if (!tag) {
            tag = new Map<string, baseType>();
            this.tags.set(topic, tag);
        }
        tag.set(key, value);
    }

    // 设置压缩阀值
    public setCompressTap(value: number) {
        this.compressTap = value;
    }

    /**
	 * @description 发布消息
	 */
    public publish(topic: string, message: Uint8Array, qos = 0, retained = false) {
        const messageHeadBb = new BonBuffer();
        let tag = this.tags.get(topic), isRsync, compressMode, originalSize;
        if (tag) {
            isRsync = tag.get('isRsync');
            compressMode = tag.get('compressMode');
        } else {
            isRsync = 0;// 默认不进行差异比较
            compressMode = 1;// 默认lz4压缩
        }

        // 如果需要进行差异比较，将发布数据改为差异数据
        // if(isRsync){
        // 	let last = this.lastMsg.get(topic);
        // 	this.lastMsg.set(topic, message);
        // 	if(!last){
        // 		isRsync = 0;
        // 	}else{
        // 		let bb1 = new BonBuffer()
        // 		encodeDiffs(this.rsync.diff(message, this.rsync.checksum(last)), bb1);
        // 		message = bb1.getBuffer();
        // 	}	
        // }

        // //如果数据大于压缩阀值，对其进行压缩 
        // if(message.length > this.compressTap){
        // 	originalSize = message.length;
        // 	if(compressMode === CompressMode.LZ4){
        // 		message = lz4.compress(message);
        // 	}else if(compressMode === CompressMode.ZSTD){
        // 		//todo
        // 	}else if(compressMode === CompressMode.NONE){
        // 		compressMode = 0;
        // 	}else{
        // 		throw "压缩方式不支持， mode：" + compressMode;
        // 	}	
        // }else{
        compressMode = 0;
        // }

        const first = (isRsync << 2) + compressMode;
        messageHeadBb.writeU8(first);
        originalSize && messageHeadBb.writePInt(originalSize);

        const messageHead = messageHeadBb.getBuffer();
        const u8 = new Uint8Array(messageHead.length + message.length);
        u8.set(messageHead);
        u8.set(message, messageHead.length);
        this.mc.publish(topic, u8, qos, retained);
    }

    /**
	 * @description 订阅消息
	 */
    public subscribe(filter: string, subscribeOptions?: Json) {
        if (!subscribeOptions) {
            subscribeOptions = { qos: 0 };
        } else if (!subscribeOptions.qos) {
            subscribeOptions.qos = 0;
        }
        this.mc.subscribe(filter, subscribeOptions);
    }

    /**
	 * @description 退订
	 */
    public unsubscribe(filter: string, subscribeOptions?: Json) {
        this.mc.unsubscribe(filter, subscribeOptions);
    }

    /**
	 * @description 关闭连接
	 */
    public disconnect() {
        this.mc.disconnect();
    }

    public setOnConnectionLost(f: Function) {
        this.mc.onConnectionLost = f;
    }

    /**
	 * @description 事件
	 */
    public onMessage(cb: (topic: string, payload: Uint8Array) => void) {
        this.listeners.push(cb);
    }

    public onMessageArrived(message: Message) {
        try {
            let payload = message.payloadBytes;
            const c = (payload[0] >> 6 & 3);// 压缩方式（0：不压缩，1：lz4压缩, 2:zstd压缩）
            const r = (payload[0] >> 5 & 1);// 是否为差异部分
            payload = new Uint8Array(payload.buffer, payload.byteOffset + 1);
            if (c) {
                const view = new DataView(payload.buffer.slice(payload.byteOffset, payload.byteOffset + 4));
                const len = view.getUint32(0, true);
                payload = new Uint8Array(payload.buffer, payload.byteOffset + 4);
                if (c === 1) {
                    // payload = lz4.decompress(payload, len);
                } else if (c === 2) {
                    // todo
                } else {
                    throw new Error('压缩方式不支持，mode：' + c);
                }
			}
			
            const topic = message.destinationName;
            for (let i = 0; i < this.listeners.length; i++) {
                this.listeners[i](topic, payload);
            }
        } catch (error) {
            // mqtt会捕获并消耗掉该异常，并移除websokect的监听函数，导致无法收到后续消息却难以找到找到线索，因此此处将错误信息打印出来
            console.log(error);
            throw error;
        }

    }
}

// 压缩模式
enum CompressMode {
    NONE = 0,
    LZ4 = 1,
    ZSTD = 2
}
