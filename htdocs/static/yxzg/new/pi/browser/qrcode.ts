/**
 * 二维码扫描
 */
// ============================== 导入
import { NativeObject, registerSign } from './native';
// ============================== 导出

export class QRCode extends NativeObject {
    
    /**
     * 调用二维码扫描器
     * @param param {success: info(string)}
     */
    public scan(param: any) {
        this.call('scan', param);
    }
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(QRCode, {
    scan: []
});
