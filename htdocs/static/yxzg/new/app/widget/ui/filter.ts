/*
 * 图像滤镜
 * 支持多种滤镜，可以连续滤镜处理，包括 灰度-色相饱和度亮度-亮度对比度-腐蚀-锐化-高斯模糊
 * props = {img:./1.png, path:_path, arr:[[gray], [hsl, 180?, 1?, 1?], 
 * [brightnessContrast, 0.5, 0?], [corrode, 3?], [sharp, 3?], [gaussBlur, 3?]]}
 * 如果arr不存在或长度为0, 表示使用标准图像
 */

// ============================== 导入
import { Json } from '../../../pi/lang/type';
import { ResTab } from '../../../pi/util/res_mgr';
import { Widget } from '../../../pi/gui_virtual/widget';
import { getImgFilterKey, RES_TYPE_IMGFILTER } from '../../../pi/util/canvas';

// ============================== 导出

/**
 * @description 导出组件Widget类
 * @example
 */
export class Filter extends Widget {
	/**
	 * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
	 * @example
	 */
    public setProps(props: Json): void {
        this.props = { url: "" };
        const filter = filters[props.filter];
        const keys = { img: props.url, path: "", arr: [] };

        if (filter) {
            this.props.url = keys.img;
            return
            if (filter.h || filter.s || filter.v) {
                keys.arr.push(["hsv", filter.h, filter.s, filter.v])
            }
            if (filter.bn || filter.co) {
                keys.arr.push(["brightContrast", filter.bn, filter.co])
            }

            const key = getImgFilterKey(keys);
            let tab = this.resTab;
            if (!tab) {
                this.resTab = tab = new ResTab();
            }
            const res = tab.get(key);
            if (res) {
                this.props.url = res.link;
            } else {
                tab.load(key, RES_TYPE_IMGFILTER, keys, tab, (res) => {
                    this.props.url = res.link;
                    this.paint();
                });
            }
        } else {
            this.props.url = keys.img;
        }
    }
}

// ============================== 本地

const filters = {
    disabled: {
        h: 0,
        s: -99,
        v: 0
    },
    gray: {
        h: 0,
        s: -99,
        v: 0
    },
    gray1: {
        h: 0,
        s: -60,
        v: -20
    },
    purple: {
        h: 152,
        s: -20,
        v: -18
    },
    darkGray: {
        h: 0,
        s: -99,
        v: -60
    },
    layerHang: {
        h: 12,
        s: 0,
        v: -31,
        bn: 0,
        co: 60
    },
    flag1: {
        h: 40,
        s: 0,
        v: 0
    },
    flag3: {
        h: -115,
        s: 25,
        v: 0,
        bn: 30,
        co: 20
    },
    flag4: {
        h: -113,
        s: 0,
        v: 0
    },
    btngray: {
        h: 0,
        s: -99,
        v: 0
    },
    btncyan: {
        h: 160,
        s: 0,
        v: 0
    },
    btnlight: {
        h: 0,
        s: 60,
        v: 0,
        bn: 80,
        co: 40
    },
    corner_0: {
        h: 142,
        s: 13,
        v: 0
    },
    corner_1: {
        h: 142,
        s: 13,
        v: 0
    },
    corner_2: {
        h: -135,
        s: 0,
        v: 0
    },
    corner_4: {
        h: 93,
        s: 20,
        v: 0
    },
    prop_0: {
        h: -160,
        s: -35,
        v: -39
    },
    prop_1: {
        h: -80,
        s: 0,
        v: 0
    },
    prop_3: {
        h: 66,
        s: 0,
        v: 0
    },
    prop_4: {
        h: -158,
        s: 75,
        v: 20
    },
    prop_5: {
        h: 158,
        s: 42,
        v: 0
    },
    buzhenLock: {
        h: 0,
        s: 0,
        v: -61
    },
    layerCbg: {
        h: 0,
        s: 0,
        v: -60
    },
    layerCbgGray: {
        h: 0,
        s: -99,
        v: -40
    },
    loginGray: {
        h: 0,
        s: -80,
        v: 0
    },
    login2: {
        h: 120,
        s: -80,
        v: 0
    },
    login3: {
        h: 0,
        s: -66,
        v: 0
    },
    buzhenState2: {
        h: 180,
        s: 0,
        v: 0
    },
    buzhenState3: {
        h: 108,
        s: -39,
        v: -10
    },
    buzhenState4: {
        h: 42,
        s: -70,
        v: -20
    },
    jimou_up: {
        h: 108,
        s: -39,
        v: -10
    },
    juntuan: {
        h: 0,
        s: -53,
        v: -28
    },
    country2: {
        h: -70,
        s: 0,
        v: 0
    },
    country3: {
        h: -160,
        s: 0,
        v: 0
    },
    mapYellow: {
        h: -160,
        s: 0,
        v: 0
    },
    mapRed: {
        h: 160,
        s: 0,
        v: 0
    },
    propbg1: {
        h: 92,
        s: 17,
        v: -37
    },
    propbg2: {
        h: -159,
        s: -5,
        v: -27
    },
    propbg3: {
        h: -45,
        s: -5,
        v: -27
    },
    propbg4: {
        h: -31,
        s: -5,
        v: -27
    },
    propbg5: {
        h: -17,
        s: -5,
        v: -27
    },
    lingtGray: {
        h: 0,
        s: -99,
        v: -20
    },
    arm1: {
        h: -150,
        s: -55,
        v: 20
    },
    redpoint: {
        h: 84,
        s: -19,
        v: -20
    }
}

// ============================== 立即执行
