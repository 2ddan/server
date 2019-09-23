import { RDocument } from './r_document';

/**
 * 事件触发时的限制器
 */
export class REventLimiter {
    private readonly document: RDocument;
    /**
     * 限制时间
     */
    private forbidEventTime: number = 0;
    /**
     * 限制范围
     * [left, top, wdith, height]
     */
    private allowEventRect: [number, number, number, number] = [0, 0, 0, 0];
    constructor(doc: RDocument) {
        this.document = doc;
    }
    /**
     * 检查事件是否在允许范围
     * @param x 事件坐标
     * @param y 事件坐标
     */
    public checkLimit(x: number, y: number) {
        if (this.allowEventRect[2] === 0
            || this.allowEventRect[3] === 0
        ) {
            return true;
        } else {
            return (this.allowEventRect[0] < x && x < this.allowEventRect[0] + this.allowEventRect[2] && this.allowEventRect[1] < y && y < this.allowEventRect[1] + this.allowEventRect[3]);
        }
    }
    /**
     * 指定范围(左上角x1y1, 右下角x2y2)外，禁止鼠标和触控事件，直到超时时间
     * @param timeOut 延时时间
     * @param rect 矩形坐标
     */
    public setForbid(timeOut: number, rect: [number, number, number, number]) {
        this.forbidEventTime = timeOut ? Date.now() + timeOut : 0;
        if (rect) {
            this.allowEventRect[0] = this.document.viewOption.left + rect[0];
            this.allowEventRect[1] = this.document.viewOption.top  + rect[1];
            this.allowEventRect[2] = rect[2];
            this.allowEventRect[3] = rect[3];
        } else {
            this.allowEventRect[0] = this.allowEventRect[1] = this.allowEventRect[2] = this.allowEventRect[3] = 0;
        }
    }
    /**
     * 检查事件是否被限制响应
     * @param x 事件点 坐标
     * @param y 事件点 坐标
     */
    public checkForbid(x: number, y: number) {
        let res: boolean = false;

        if (this.forbidEventTime > 0) {
            if (Date.now() < this.forbidEventTime) {
                res = true;
            } else {
                this.forbidEventTime = 0;
            }
        }

        if (res || !this.checkLimit(x, y)) {
            res = true;
        }

        return res;
    }
}