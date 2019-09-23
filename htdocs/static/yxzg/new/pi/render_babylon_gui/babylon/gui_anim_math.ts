/**
 * 
 */// tslint:disable-next-line:no-reference
/// <reference path="../babylon/babylon.d.ts"/>
const bezierFuncMap: Map<string, Function> = new Map();

// 四点确定
const bezierPath = (t: number, p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2) => {
    const cX = (p1.x - p0.x) * 3 ,
        bX = (p2.x - p1.x) * 3 - cX,
        aX = p3.x - p0.x - cX - bX;
            
    const cY = (p1.y - p0.y) * 3 ,
        bY = (p2.y - p1.y) * 3  - cY,
        aY = p3.y - p0.y - cY - bY;
            
    const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
    const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
            
    return [x, y];
};

// tslint:disable-next-line:no-unnecessary-class
export class AnimMath {
    public static getBezierFunc(args: number[]) {
        const name = args.join('-');

        let func: Function, resKey: number;

        func = bezierFuncMap.get(name);

        if (func === undefined) {
            const start = { x: 0, y: 0 };
            const end = { x: 1, y: 1 };

            const tempArr: Vector2[] = [];
            const tempCount = args.length / 2;

            for (let i = 0; i <= tempCount; i++) {
                tempArr[i] = {
                    x: args[i * 2],
                    y: args[i * 2 + 1]
                };
            }

            if (args.length % 2 === 1) {
                resKey = args[args.length - 1] === 0 ? 0 : 1;
            } else {
                resKey = 1;
            }

            func = (x: number) => { 
                return bezierPath(x, start, tempArr[0], tempArr[1], end)[resKey];
            };
        }

        return func;
    }
    /**
     * 
     * @param x :
     */
    public static line(x: number) {
        return x;
    }
    /**
     * 2 次 函数 0-1， 分三段
     *  +----------------------------------+
     *  |                                  |
     *  |            XXXXX                 |
     *  |         XX       XX              |
     *  |      XX           XX             |
     *  |     XX             XX            |
     *  |    XX               XX           |
     *  |     +-------+        XX +------+ |
     *  |             +-------+ XX         |
     *  |                        XX        |
     *  |                         XX       |
     *  |                          XX      |
     *  |                            XX    |
     *  |                             XX   |
     *  |                                  |
     *  +----------------------------------+
     * @param x :
     */
    public static power2_1_3_down_0(x: number) {
        return Math.pow(x, 2) * (-9) + x * 6;
    }
    /**
     *                  +-+*
     *                ++  |**
     *              ++    | **
     *            ++      |  *
     *          ++        |  **
     *        ++          |   **
     *      ++            |    *
     *    ++              |    **
     *   +                |     *
     *  ++-----------------------+
     *        +-----+     +------+
     * @param x :
     */
    public static back1(x: number) {
        return (x < 3 / 4 ? (x * 4 / 3) : (1 - x) * 4);
    }
    /**
     * 
     * @param x :
     */
    public static roundTipAnim(x: number) {
        return (x < 0.3
            ? x * 10 / 3
            : (x < 0.7
                ? 1
                : (x - 1) * (-10) / 3
            )
        );
    }
    /**
     * 
     * @param x :
     */
    public static sin_2PI(x: number) {
        return Math.sin(Math.PI * x * 2);
    }
    /**
     * 
     * @param x :
     */
    public static sin_PI(x: number) {
        return Math.sin(Math.PI * x);
    }
}