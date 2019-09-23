/**
 * 初始化项目前 - 获取一些设备-环境相关数据
 * * 平台兼容处理
 */
// tslint:disable-next-line:no-unnecessary-class
export class BeforeInitTools {
    public static Weixin_Mobile_Bangs_Size: number = 0;
    public static Design_Width: number  = 960;
    public static Design_Height: number = 540;
    private static isWeiXinGame: boolean;
    // tslint:disable-next-line:function-name
    public static Init() {
        if ((<any>window).pi_modules && (<any>window).pi_modules['pi_bridge/wxInfo']) {
            this.Weixin_Mobile_Bangs_Size = (<any>window).pi_modules['pi_bridge/wxInfo'].exports.getNotchInfo().notchHeight || 0;
        }
    }
    public static isWeiXinMiniGame() {
        const _window  = <any>window;

        if (this.isWeiXinGame === undefined) {
            if (_window.pi_modules && _window.pi_modules.load && _window.pi_modules.load && _window.pi_modules.load.exports.isWXMinigame && _window.pi_modules.load.exports.isWXMinigame()) {
                this.isWeiXinGame = true;
            } else {
                this.isWeiXinGame = false;
            }
        }

        return this.isWeiXinGame;
    }
}