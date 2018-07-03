/**
 * 选择框的逻辑处理
 */
import { Widget } from '../../../widget/widget';
import { notify } from '../../../widget/event';
import { popNew } from '../../../ui/root';


export class Checkbox extends Widget {
    constructor() {
        super();
    }
    /**
     * 显示成功提示
     */
    public showSuccess(event: any) {
        popNew("components-message-message", { type: "success", content: "成功提示的文案" })
    }
    /**
     * 显示警告提示
     */
    public showWarn(event: any) {
        popNew("components-message-message", { type: "warn", content: "消息提示的文案" })
    }
    /**
     * 显示通知提示
     */
    public showNotice(event: any) {
        popNew("components-message-message", { type: "notice", content: "警告提示的文案" })
    }
    /**
     * 显示错误提示
     */
    public showError(event: any) {
        popNew("components-message-message", { type: "error", content: "错误提示的文案" })
    }
    /**
     * 显示文本居中的错误提示
     */
    public showNoticeAtCenter(event: any) {
        popNew("components-message-message", { type: "error", content: "错误提示的文案", center: true })
    }

    /**
     * 显示消息弹框
     */
    public showBoxAsAlert(event: any) {
        popNew("components-message-messagebox", { type: "alert", title: "消息提示弹框", content: "错误提示的文案" }, () => {
            popNew("components-message-message", { type: "notice", content: "消息提示弹框--确定" })
        })
    }
    /**
     * 显示确认消息弹框
     */
    public showBoxAsConfirm(event: any) {
        popNew("components-message-messagebox", { type: "confirm", title: "确认消息弹框", content: "错误提示的文案" }, () => {
            popNew("components-message-message", { type: "notice", content: "确认消息弹框--确定" })
        }, () => {
            popNew("components-message-message", { type: "notice", content: "确认消息弹框--取消" })
        })
    }
    /**
     * 显示输入消息确认弹框
     */
    public showBoxAsPrompt(event: any) {
        popNew("components-message-messagebox", { type: "prompt", title: "提交内容弹框", content: "错误提示的文案" }, (r) => {
            popNew("components-message-message", { type: "notice", content: "提交内容弹框--确定--" + r })
        }, () => {
            popNew("components-message-message", { type: "notice", content: "提交内容弹框--取消" })
        })
    }

    /**
     * 显示通知
     */
    public showNotification() {
        popNew("components-message-notification", { title: "提示", content: "自动关闭提交内容弹框" })
    }
    /**
     * 显示需要关闭的通知
     */
    public showNotificationAndClose() {
        popNew("components-message-notification", { title: "提示", content: "手动关闭提交内容弹框", manuallyClose: true })
    }
}
