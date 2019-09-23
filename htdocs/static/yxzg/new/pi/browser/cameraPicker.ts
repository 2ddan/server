/**
 * 打开照相机
 */
// ============================== 导入
import { base64ToArrayBuffer } from '../util/base64';
import { NativeObject, registerSign, ParamType} from './native';
// ============================== 导出
export class CameraPicker extends NativeObject {
    
    /**
     * 打开相机拍照并保存照片
     * @param param 不需要参数 
     * @param success 返回该图片的url（iOS为压缩后的Base64编码）
     */
    public takePhoto(param: any) {
        this.call('takePhoto', param);
    }
    
    /**
     * 获取当前拍照的图片资源
     * @param param quality为图片压缩质量百分比，传入1～100整型
     * @param success 返回该图片压缩后的base64编码
     * @note 该方法要保证其准确性一定要在takePhoto方法返回success后调用
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
    
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(CameraPicker, {
    takePhoto: [],
    getContent: [{
        name: 'quality',
        type: ParamType.Number
    }]
});