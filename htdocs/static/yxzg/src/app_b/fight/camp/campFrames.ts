/**
 * @desc 营地相关的页面JSON
 */
import { getFont } from "../../../app/scene/uiNodeBase";
import { Z_ORDERS } from "../../../app/scene/uiNode";

export class CampFrames {
    /**营地界面 */
    static getCampFrameJson() {
        return {
            nodeName: 'CampFrame', nodeType: 'FRAME', uiClass: 'CampFrame',
            width: 0, height: 0,
            left: 0, top: 0, z_relat: Z_ORDERS.POP,
            nodes: [
                // 背景
                { 
                    nodeName: 'BG', nodeType: 'COLOR',
                    width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: 0.6, bgColor: '#000000', 
                },
                    // 三角阴影背景图
                    {
                        nodeName: 'bgTriangle', nodeType: 'IMAGE',imageURL: 'camp/triangle.png',
                        width: 128, height: 540, top: 0, left: 320, z_relat: 8
                    },
                    // 长方形阴影背景
                    {
                        nodeName: 'bgRectangle', nodeType: 'COLOR',
                        width: 512, height: 540, right: 0, top: 0,
                        z_relat:8, opacity: 0.4, bgColor: '#000000'
                    },
                    // 关闭按钮
                    { 
                        nodeName: 'btnClose', nodeType: 'IMAGE', imageURL: 'icon/close_normal.png',
                        width: 32, height: 32, right: 50, top: 20, z_relat: 10
                    },
                // 人物
                {
                    nodeName: 'campRole', nodeType: 'IMAGE', imageURL: 'camp/camp_role.png',
                    width: 433, height: 512, left: 0, top: 28, z_relat: 3050
                },
                // '冒险者营地'图片文字
                {
                    nodeName: 'textMxzyd', nodeType: 'IMAGE', imageURL: 'camp/text_mxzyd.png',
                    width: 176, height: 37, left: 600, top: 80, z_relat: 3050
                },
                // 营地描述
                {
                    nodeName: 'textCampDes', nodeType: 'TEXT', text: '英勇的冒险家,欢迎来到冒险者营地。您打算做什么？' , isCommon: false,
                    left: 700, top: 150,  width: 350, font: getFont(20), font_space: -2, color: '#ffffff', align: 'center', border_width: 1, border_color: '#ffffff', z_relat: 3050

                },
                // 休息按钮
                { 
                    nodeName: 'btnRest', nodeType: 'IMAGE', imageURL: 'camp/btn_rest.png',
                    width: 188, height: 88, left: 500, top: 344, z_relat: 3050
                },      
                    // '休息'文字
                    // { 
                    //     nodeName: 'textRest', nodeType: 'TEXT', text: '休息', isCommon: false,
                    //     left: 90, top: 20, width: 50, font: getFont(20), font_space: -2,color: '#000000', align: 'center', border_width: 1, border_color: '#000000', z_relat: 3050
                    // },
                    // 休息描述
                    { 
                        nodeName: 'textRestDes', nodeType: 'TEXT', text: '',
                        left: 90, top: 100, width: 200, font: getFont(14), font_space: -2,color: '#ffffff', align: 'center', border_width: 1, border_color: '#ffffff', isCommon: false, z_relat: 3050
                    },
                // 锻造按钮
                {
                    nodeName: 'btnForging', nodeType: 'IMAGE', imageURL: 'camp/btn_forge.png',
                    width: 188, height: 88, left: 690, top: 344, z_relat: 3050
                },
                        // '锻造'文字
                        // { 
                        //     nodeName: 'textForge', nodeType: 'TEXT', text: '锻造', isCommon: false,
                        //     left: 90, top: 20, width: 50, font: getFont(20), font_space: -2,color: '#000000', align: 'center', border_width: 1, border_color: '#000000', z_relat: 3050
                        // }
            ],
            design: {
                BG: ['btnClose', 'bgTriangle','bgRectangle'],
                campRole: true,
                btnRest: ['textRestDes'],
                btnForging: true,
                textMxzyd: true,
                textCampDes: true

            },
            dataMatch: {
                textRestDes: 'textRestDes'
            },

        }
    }
    /**锻造卡牌列表界面 */
    static getForgeCardListFrameJson() {
        return {
            nodeName: 'forgeFrame', nodeType: 'FRAME', uiClass: 'forgeFrame',
            width: 0, height: 0,
            left: 0, top: 0, z_relat: Z_ORDERS.POP,
            nodes: [
                // 背景
                { 
                    nodeName: 'BG', nodeType: 'COLOR',
                    width: 960, height: 540, left: 0, top: 0, z_relat: 0, opacity: 0.8, bgColor: '#000000', 
                },
                // 锻造提示文字
                { 
                    nodeName: 'textForgeTip', nodeType: 'TEXT', text: '选择一张牌升级', isCommon: false,
                    left: 450, top: 520, width: 200, font: getFont(16), font_space: -2,color: '#ffffff', align: 'center', border_width: 1, border_color: '#ffffff', z_relat: 10 
                },
                // 取消按钮
                {
                    nodeName: 'btnFCLCancel', nodeType: 'IMAGE', imageURL: 'icon/btn.png',
                    width: 70, height: 50, left: 20, top: 400, z_relat: 10
                }
            ],
            design: {
                BG: true,
                textForgeTip: true,
                btnFCLCancel: true
            },
            dataMatch: {}
        }
    }
}
