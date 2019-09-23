/**
 * 语言设置
 */
// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出
export class LocalLanguageMgr extends NativeObject {
    /**
     * 获取当前APP使用的语言
     * @param param 
     */
    public getAppLan(param:any) {
        this.call('getAppLanguage',param);
    }

    /**
     * 设置当前APP使用的语言
     * @param param 
     */
    public setAppLan(param:any) {
        this.call('setAppLanguage',param);
    }

    /**
     * 获取手机系统的语言
     * @param param 
     */
    public getSysLan(param:any) {
        this.call('getSystemLanguage',param);
    }
}

/**
 * 本地语言类型枚举
 *   + zh_Hans：简体中文
 *   + zh_Hant：繁体中文
 */
export enum appLanguageList {
    zh_Hans = 2,
    zh_Hant = 3,
}

// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(LocalLanguageMgr, {
    getAppLanguage: [],
    setAppLanguage: [
        {
            param:'language',
            type:ParamType.Number
        }
    ],
    getSystemLanguage:[]
});

