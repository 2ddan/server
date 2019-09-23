/**
 * 小游戏键盘输入
 */
declare var wx, exports;

// 通知键盘监听函数
const keyboardNotify = (notifier: Function, params: string) => {
    if (notifier && notifier instanceof Function) {
        notifier(params);
    }
};

export enum ConfirmType {
    GO = 'go',          // 前往
    DONE = 'done',      // 完成
    NEXT = 'next',      // 下一个
    SEND = 'send',      // 发送
    SEARCH = 'search'   // 搜索
}

export interface KeyboardConfig {
    multiple?: boolean;         // 是否允许多行编辑
    maxLength?: number;         // 最大允许输入长度
    confirmType: ConfirmType;   // 键盘确认键的内容
    confirmHold?: boolean;      // 点击确认键后是否键盘不隐藏
    success?: Function;         // 键盘显示接口调用成功回调
    fail?: Function;            // 键盘显示接口调用失败回调
}

export type ListenFunction = (value: string) => void;

// tslint:disable-next-line:no-unnecessary-class
export class Keyboard {
    // 当前输入监听
    public static onInput: ListenFunction;
    // 输入结果监听
    public static onEnd: ListenFunction;

    private static isShow: boolean = false;

    private static defConfig: any = {
        multiple: false,
        maxLength: 100,
        confirmHold: false
    };

    // 显示键盘
    public static show(config: KeyboardConfig) {
        if (!Keyboard.isShow) {
            config = {
                ...Keyboard.defConfig,
                ...config
            };
            wx.showKeyboard(config);
            Keyboard.bindListener();
        }
    }

    private static inputListener = ({ value }: {value:string}) => {
        keyboardNotify(Keyboard.onInput, value);
    }
    private static resultListener = ({ value }: {value: string}) => {
        keyboardNotify(Keyboard.onEnd, value);
        Keyboard.unbindListener();
    }
    private static bindListener() {
        wx.onKeyboardInput(Keyboard.inputListener);
        wx.onKeyboardConfirm(Keyboard.resultListener);
        wx.onKeyboardComplete(Keyboard.resultListener);
        Keyboard.isShow = true;
    }
    private static unbindListener() {
        wx.offKeyboardInput(Keyboard.inputListener);
        wx.offKeyboardConfirm(Keyboard.resultListener);
        wx.offKeyboardComplete(Keyboard.resultListener);
        Keyboard.isShow = false;
    }
}

// example
// Keyboard.show({confirmType: ConfirmType.DONE})
// Keyboard.onEnd = (value) => {
//     console.log("complete:", value);
// }
// Keyboard.onInput = (value) => {
//     console.log("inputing:", value);
// }

(<any>window).pi_modules["pi/minigame/keyboard"] = { exports };
