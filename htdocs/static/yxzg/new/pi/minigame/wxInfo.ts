declare var wx, exports

// 生命周期
export const getLaunchOption = (): any => {
    return wx.getLaunchOptionsSync();
};

export const exitMiniGame = (success?: Function, fail?: Function, complete?: Function) => {
    wx.exitMiniPnrogram({ success, fail, complete });
};

window.close = exitMiniGame;

export const offHide = (cb: Function) => {
    wx.offHide(cb);
};

export const offShow = (cb: Function) => {
    wx.offShow(cb);
};

export const onHide = (cb: Function) => {
    wx.onHide(cb);
};

/**
 * cb的参数和getLaunchOption的返回值相同
 */
export const onShow = (cb: Function) => {
    wx.onShow(cb);
};
// 生命周期 end

// 加速度
enum AcceleInterval {
    GAME = "game",      // 适用于更新游戏的回调频率，在 20ms/次 左右
    UI = "ui",          // 适用于更新 UI 的回调频率，在 60ms/次 左右
    NORMAL = "normal"   // 普通的回调频率，在 200ms/次 左右，默认值
}

/**
 * 开始监听加速度数据变化
 * chang的三个参数分别是X,Y,Z三轴的数据
 */
export const startAccelerometer = (chang: Function, interval?: AcceleInterval) => {
    if (!chang) return;
    wx.onAccelerometerChange(res => {
        chang(res.x, res.y, res.z);
    });
    wx.startAccelerometer({
        interval: interval || AcceleInterval.NORMAL
    });
}

export const stopAccelerometer = (success?: Function, fail?: Function) => {
    wx.stopAccelerometer({ success, fail });
};
// 加速度 end

interface BatCallback {
    (
        level: string,     // 电量值，1-100
        isCharging: boolean
    )
}

// 获取手机系统信息
export const getSystemInfoSync = () => wx.getSystemInfoSync();

// 获取电池信息
export const getBatteryInfo = (cb: BatCallback, errCb?: Function) => {
    wx.getBatteryInfo({
        success: res => cb(res.level, res.isCharging),
        fail: errCb
    });
};

export const memWarning = (cb: Function) => {
    if (!cb) return;
    wx.onMemoryWarning(cb);
};

enum VibrateType {
    LONG = "long",
    SHORT = "short"
}

export const vibrate = (type: VibrateType) => {
    if (type === VibrateType.LONG) {
        wx.vibrateLong({});
    } else {
        wx.vibrateShort({});
    }
};

export const getUserInfo = (callback: Function, errCallback: Function, withCredentials?: boolean) => {
    wx.getUserInfo({
        withCredentials: withCredentials,
        success(res) {
            callback(res);
        },
        fail(err) {
            errCallback(err);
        }
    });
};

enum BtnType {
    TEXT = "text",
    IMAGE = "image"
}
enum TextAlign {
    left = "left",
    center = "center",
    right = "right"
}
interface BtnStyle {
    left: number,
    top: number,
    width: number,
    height: number,
    backgroundColor?: string,
    borderColor?: string,
    borderWidth?: number,
    borderRadius?: number,
    textAlign?: TextAlign,
    fontSize?: number,
    lineHeight?: number
}
/**
 * 请求用户授权获取用户信息
 * @param type      按钮类型，文字或图片
 * @param ctx       按钮内容，如果是文字类型的按钮，此处为显示的文字，如果是图片类型的按钮，此处为图片URL
 * @param style     按钮样式
 * @param success   允许授权的回调，其参数为用户基本信息
 * @param fail      用户不允许授权的回调，无参数
 */
interface BtnParams {
    type: BtnType,
    style: BtnStyle,
    image?: string,
    text?: string
}
export const userInfoAuthBtn = (type: BtnType, ctx: string, style: BtnStyle, success: Function, fail: Function): WXNativeBtn => {
    const param: BtnParams = { type, style };
    if (type === BtnType.IMAGE) {
        param.image = ctx;
    } else {
        param.text = ctx;
    }
    return wx.createUserInfoButton(param);
};

/**
 * 请求获取用户地理位置授权
 * @param success   用户授权回调
 * @param fail      用户拒绝授权回调
 */
export const requestLocationAuth = (success: Function, fail: Function) => {
    wx.authorize({
        scope: "scope.userLocation",
        success,
        fail
    });
};

interface BannerAdStyle {
    left: number,
    top: number,
    width: number,
    height: number
}
/**
 * 创建banner广告
 * @param adId  广告id
 * @param style 广告显示样式
 */
export const createBannerAd = (adId: string, style: BannerAdStyle) => {
    return wx.createBannerAd({
        adUnitId: adId,
        style: style
    });
};

/**
 * 创建视频广告
 * @param id 广告id
 */
export const createVideoAd = (id: string) => {
    return wx.createRewardedVideoAd({
        adUnitId: id
    });
};

const PayConfig = {
    isTestEnv: true,
    offerId: "1450019399",
    ratio: 10
};

export const midasPay = (rmb: number, success?: Function, fail?: Function) => {
    wx.requestMidasPayment({
        mode: "game",
        env: PayConfig.isTestEnv ? 1 : 0,
        offerId: PayConfig.offerId,
        currencyType: "CNY",
        platform: "android",
        buyQuantity: rmb * PayConfig.ratio,
        zoneId: "1",
        success,
        fail
    });
};
interface WXNativeBtn {
    type: BtnType,
    text?: string,      // 当type为BtnType.TEXT时有效，其值为按钮显示的文本内容
    image?: string,     // 当type为BtnType.IMAGE时有效，其值为按钮显示图片的url
    style: BtnStyle,
    show: Function,     // 显示按钮
    hide: Function,     // 隐藏按钮
    destroy: Function,  // 销毁按钮
    onTap: Function,    // 绑定按钮点击事件，参数为点击回调
    offTap: Function    // 解除绑定按钮点击事件，参数为要解除绑定的点击回调
}
/**
 * 创建反馈意见按钮，用户点击该按钮可进入微信小游戏自带的反馈界面
 * @param type  按钮类型，文字型或者图片型
 * @param ctx   按钮上的内容，如果是图片按钮，此处填写图片URL，如果是文字类型，填写文本内容
 * @param style 按钮样式
 */
export const createFeedbackBtn = (type: BtnType, ctx: string, style: BtnStyle): WXNativeBtn => {
    const param: BtnParams = { type, style };
    if (type === BtnType.IMAGE) {
        param.image = ctx;
    } else {
        param.text = ctx;
    }
    return wx.createFeedbackButton(param);
};

interface shareMessage {
    query?: string,
    title?: string,
    imageUrl?: string
}
export const shareAppMessage = (info: object, title?: string, imageUrl?: string, imageUrlId?: string) => {
    const param: shareMessage = {};
    let query: string = '';
    if (typeof info === typeof {}) {
        Object.keys(info).forEach((key) => {
            if (query === '') {
                query += `${key}=${info[key]}`;
            } else {
                query += `&${key}=${info[key]}`;
            }
        });
    } else {
        console.error('shareAppMessage: info must be an object');
    }
    query && (param.query = query);
    title && (param.title = title);
    imageUrl && (param.imageUrl = imageUrl);
    imageUrlId && (param.imageUrl = imageUrlId);
    wx.shareAppMessage(param);
};

/**
 * 获取刘海屏信息
 */
interface notchInfo {
    width: number,
    height: number,
    notchHeight: number
}
export const getNotchInfo = () => {
    const info: notchInfo = {
        width: undefined,
        height: undefined,
        notchHeight: undefined
    };
    const ii = getSystemInfoSync();
    info.width = ii.screenWidth;
    info.height = ii.screenHeight;
    if (/iphone/i.test(ii.model)) {
        // iPhone 刘海高度固定为34，状态栏固定为44
        // https://www.jianshu.com/p/9a7d637baf58
        info.notchHeight = (ii.statusBarHeight > 20) ? 34 : 0;
    } else {
        // Android还没有具体的数据，暂定大于等于40为刘海屏，并且认为所有高度都是刘海高度
        info.notchHeight = ii.statusBarHeight >= 40 ? ii.statusBarHeight : 0;
    }
    console.log(ii.model);
    return info;
};

/**
 * 加载字体
 * @param fontPath 字体文件所在路径
 */
export const loadFont = (fontPath: string): string => {
    return wx.loadFont(fontPath);
};

/**
 * 微信登录
 * @param cb    登录成功回调    cb(code)
 * @param errCb 登录失败回调    errCb(err)
 */
export const login = (cb?: Function, errCb?: Function) => {
    wx.login({
        success (res) {
            if (res.code) {
                cb(res.code);
            } else {
                errCb(res);
            }
        },
        fail: errCb
    });
};

// 加快触发GC
export const triggerGC = () => {
    wx.triggerGC();
};

(<any>window).pi_modules["pi/minigame/wxInfo"] = { exports };
