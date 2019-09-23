/**
 * 图片导入（本地、相机）
 */
// ============================== 导入
import { base64ToArrayBuffer } from '../util/base64';
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出
export class ImagePicker extends NativeObject {
    /**
     * 从本地选择图片
     * @param param 参数
     * @param success 返回选择图片的url（iOS返回base64编码）
     */
    public selectFromLocal(param: any) {
        this.call('chooseImage', param);
    }

    /**
     * 获取当前选择的图片资源
     * @param param {success: ArrayBuffer}
     * @note 保证方法的准确性，需要在selectFromLocal方法成功回调后调用
     */
    public getContent(param: any) {
        const old = param.success;
        if (old) {
            param.success = base64 => {
                const buffer = base64ToArrayBuffer(base64);
                old(buffer);
            };
        }
        this.call('getContent', param);
    }

    /**
     * 获取当前选择图片的AHASH
     * @param param {success: string}
     * @note 保证方法的准确性，需要在selectFromLocal方法成功回调后调用
     */
    public getAHash(param: any) {
        this.call('getAHash', param);
    }
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(ImagePicker, {
    chooseImage: [
        {
            name: 'useCamera',// 是否使用相机----(传1表示 “是”，其它任何值都表示 “否”)
            type: ParamType.Number
        },
        {
            name: 'single',// 是否只选择一张照片(单选)----(传1表示 “是”，其它任何值都表示 “否”)
            type: ParamType.Number
        },
        {
            name: 'max',// 可以选择多张的情况下最大可以选择的张数
            type: ParamType.Number
        }
    ],
    getContent: [{
        name: 'quality',
        type: ParamType.Number
    }],
    getAHash: []
});