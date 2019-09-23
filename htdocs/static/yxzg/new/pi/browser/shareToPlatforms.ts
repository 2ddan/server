/**
 * 分享
 */
// ============================== 导入
import { NativeObject, ParamType, registerSign } from './native';
// ============================== 导出

export class ShareToPlatforms extends NativeObject {
    
    /**
     * 分享
     * @param 参数
     *    + content:string         参数
     *    + type:ShareType         分享类型
     *    + platform:SharePlatform 分享平台
     */
    public static shareCode(param: any) {
        shareToPlatforms.call('shareContent', param);
    }

    /**
     * 分享链接
     * @param 参数
     *    + webName:string         网站名
     *    + url:string             链接地址
     *    + title:string           分享标题
     *    + content:string         参数
     *    + comment:string         评论
     *    + platform:SharePlatform 分享平台
     */
    public static shareLink(param: any) {
        shareToPlatforms.call('shareLink', param);
    }

    /**
     * 生成截图
     */
    public static makeScreenShot(param:any) {
        shareToPlatforms.call('getScreenShot',param);
    }

    /**
     * 分享截图
     *     + platform:SharePlatform 分享平台
     */
    public static shareScreenShot(param:any) {
        shareToPlatforms.call('shareScreen',param);
    }

}

/**
 * 分享类型枚举
 */
export enum ShareType {
    TYPE_IMG = 1,// 二维码图片
    TYPE_TEXT = 2,// 文本
    TYPE_LINK = 3,// 链接
    TYPE_SCREEN = 4,// 截图
}

/**
 * 分享平台枚举
 */
export enum SharePlatform {
    PLATFORM_DEFAULT = -1,// 默认
    PLATFORM_WEBCHAT = 1,// 微信
    PLATFORM_MOMENTS = 2,// 朋友圈
    PLATFORM_QZONE = 3,// qq空间
    PLATFORM_QQ = 4,// qq
}


// ============================== 本地
/**
 * 底层接口和参数的声明
 */
registerSign(ShareToPlatforms, {
    shareContent: [
        {
            name: 'content',// 要分享的内容
            type: ParamType.String
        },
        {
            name: 'type',// 分享的内容的种类 传 1 ：表示分享图片 传 2 ：表示 分享文本
            type: ParamType.Number
        },
        {
            name: 'platform',// 要分享到的平台：1、微信 2、朋友圈 3、QQ空间 4、QQ 5、所有平台(当你传5的时候！不用写界面、底层会自动弹出界面)
            type: ParamType.Number
        }
    ], shareLink: [
        {
            name: 'webName',// 网站名称
            type: ParamType.String
        },
        {
            name: 'url',// 要分享的url链接
            type: ParamType.String
        },
        {
            name: 'title',// 标题
            type: ParamType.String
        },
        {
            name: 'content',// 内容
            type: ParamType.String
        },
        {
            name: 'comment',// 评论
            type: ParamType.String
        },
        {
            name: 'platform',// 要分享到的平台：1、微信 2、朋友圈 3、QQ空间 4、QQ 5、所有平台(当你传5的时候！不用写界面、底层会自动弹出界面)
            type: ParamType.Number
        }
    ],
    getScreenShot: [],
    shareScreen: [
        {
            name: 'platform',
            type: ParamType.Number
        }
    ]

});

const shareToPlatforms = new ShareToPlatforms();
shareToPlatforms.init();
