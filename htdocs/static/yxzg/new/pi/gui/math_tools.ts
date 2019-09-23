/**
 * 动画运行的数学方法
 * * tpl 中使用自定义函数方法:
 *      需要在 对应 widget create 中注册对应函数方法
 */

// tslint:disable-next-line:no-unnecessary-class
export class MathTools {
    /**
     * 数学工具函数库
     */
    private static MathMap: Map<string, (x: number) => number> = new Map();
    /**
     * 初始化 数学工具函数库
     */
    // tslint:disable-next-line:function-name
    public static Init() {
        MathTools.MathMap.set('linear', MathTools.linear);
        MathTools.MathMap.set('sin', MathTools.sin);
    }
    /**
     * y=x 的线性函数
     * @param x 自变量
     */
    public static linear(x: number) {
        return x;
    }
    /**
     * y=sin(x) 的正弦函数
     * @param x 自变量
     */
    public static sin(x: number) {
        return Math.sin(x);
    }
    /**
     * 注册 数学函数
     * @param fname 函数名称
     * @param f 函数方程
     */
    public static register(fname: string, f: (x: number) => number) {
        MathTools.MathMap.set(fname, f);
    }
    /**
     * 使用 数学函数
     * @param fname 函数名称
     * @param x 自变量
     */
    public static mathCall(fname: string, x: number) {
        const f = MathTools.MathMap.get(fname) || MathTools.MathMap.get('linear');

        return f(x);
    }
}