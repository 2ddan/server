/**
 * GUI 根上管理层级和界面显示与隐藏
 * * 实现性能优化
 * * 实现与 3D 场景的同屏显示
 */

import { RContainerElement } from '../gui/r_containerelement';
import { RElement } from '../gui/r_element';
import { setOneStyle } from '../gui_virtual/painter';
import { Widget } from '../gui_virtual/widget';

// 界面 层级配置
export interface GroupCfg {
    name:        string;
    visible?:    number;
    container?:  RContainerElement;
    widgets?:    Widget[];
    el?:         RContainerElement; // 组元素
    arr?:        Widget[]; // 组上的组件
    disVisibleHandler?: any;
    visibleCall?: Function;
    disVisibleCall?: Function;
}

// 层级配置
export const GroupsList: GroupCfg[] = [
    { name: 'background'    },
    { name: 'scene'         },
    { name: 'main'          },
    { name: 'guide_scene'   },
    { name: 'secondary'     },
    { name: 'top'           },
    { name: 'login'         },
    
    // 半透明界面---暂停场景更新
    { name: 'scene_ui'      },
    { name: 'card'          },
    { name: 'card_panel'    },
    { name: 'cover'         },
    { name: 'cover_pop'     },
    // 半透明提示
    { name: 'top_tip'       },
    { name: 'guide'         },
    { name: 'pop_tip'       },// 点击穿透
    { name: 'screen'        },
    { name: 'download'      },
    { name: 'connect'       },
    { name: 'offLine'       }
];

// tslint:disable-next-line:no-unnecessary-class
export class RootManager {
    public static lastNoAlphaGroup: string = 'login';
    public static groupMap: Map<string, GroupCfg> = new Map();
    /**
     * 更改指定组的可视性
     */
    public static visibleGroup(name: string, b: boolean) {

        const group = RootManager.findGroup(name);

        if (group !== undefined) {

            if (b === false) {

                group.disVisibleCall();

            } else {

                group.visibleCall();

            }

        }
    }
    /**
     * 添加组配置
     * @param name 组名称
     * @param container 组根节点
     */
    public static addGroup(name: string, container: RElement) {
        const group: GroupCfg = RootManager.findGroup(name);

        if (group) {
            group.container = <RContainerElement>container;
            group.el        = <RContainerElement>container;
            group.name      = name;
            group.widgets   = [];
            group.arr       = group.widgets;
            group.visible   = 0;
            group.disVisibleHandler = undefined;
            group.visibleCall   = () => {
                group.visible = 1;
                setOneStyle(container, 'display', 'flex');
            };
            group.disVisibleCall = () => { 
                group.visible = 0;
                setOneStyle(container, 'display', 'none');
            };

            group.visibleCall();
            RootManager.groupMap.set(name, group);
        } else {
            console.error(`不存在层级配置: ${name}`);
        }
    }
    public static findGroupIndex(groupName: string) {
        let index = -1;
        for (let i = 0, len = GroupsList.length - 1; i <= len; i++) {
            if (GroupsList[i].name === groupName) {
                index = i;
                break;
            }
        }

        return index;
    }

    public static findGroup(groupName: string) {
        let res;
        for (let i = 0, len = GroupsList.length - 1; i <= len; i++) {
            if (GroupsList[i].name === groupName) {
                res = GroupsList[i];
                break;
            }
        }

        return res;
    }

    // tslint:disable-next-line:max-func-body-length
    public static updateGroupVisible(isBasFrameAdd?: boolean) {
        let tempContainer:      RContainerElement, 
            isVisible:          boolean,
            isGetNoAlphaUI:     boolean,
            hasAlpha_Top_Cover: boolean,
            childContainer:     RContainerElement,
            groupCfg:           GroupCfg;

        const startAlphaIndex: number       = RootManager.findGroupIndex(RootManager.lastNoAlphaGroup);
        const startAlphaTipIndex: number    = startAlphaIndex;

        isVisible = false;
        isGetNoAlphaUI = false;
        hasAlpha_Top_Cover  = false;

        // 半透明 - tip
        for (let index = GroupsList.length - 1; index >= startAlphaTipIndex; index--) {
            groupCfg        = GroupsList[index];
            tempContainer   = groupCfg.container;
            isVisible       = tempContainer.childNodes.length > 0;
            RootManager.visibleGroup(groupCfg.name, isVisible);

        }

        // // 半透明 - 界面 打开时，停止场景动画
        // for (let index = startAlphaTipIndex - 1; index >= startAlphaIndex; index--) {
        //     groupCfg        = GroupsList[index];
        //     tempContainer   = groupCfg.container;
            
        //     isVisible       = tempContainer.childNodes.length > 0;

        //     if (hasAlpha_Top_Cover === false) {
        //         hasAlpha_Top_Cover = isVisible;
        //         if (hasAlpha_Top_Cover) {
        //             // RootManager.beforeTipPop();
        //         }
        //     }

        //     RootManager.visibleGroup(groupCfg.name, isVisible);

        // }

        if (hasAlpha_Top_Cover === false) {
            // RootManager.afterTipHide();
        }

        // 不透明界面
        for (let index = startAlphaIndex; index >= 0; index--) {
            groupCfg        = GroupsList[index];
            tempContainer   = groupCfg.container;

            if (!isGetNoAlphaUI) {

                let enableCounter = 0;
                let disenableCounter = 0;

                tempContainer.childNodes.forEach(control => {
                    if (!tempContainer.document.askWidgetEnableCall || tempContainer.document.askWidgetEnableCall(control)) {
                        enableCounter++;
                    } else {
                        disenableCounter++;
                    }
                });
                
                if (enableCounter > 0) {
                    isGetNoAlphaUI  = true;
                    isVisible       = true;
                } else {
                    isVisible       = disenableCounter !== 0;
                }

                RootManager.visibleGroup(groupCfg.name, isVisible);

                // 层内部显示优化
                if (isVisible === true) {
                    let enableCounter = 0;
                    for (let len = tempContainer.childNodes.length - 1; len >= 0; len--) {

                        childContainer = <RContainerElement>(tempContainer.childNodes[len]);

                        if (childContainer) {
                            if (!tempContainer.document.askWidgetEnableCall || tempContainer.document.askWidgetEnableCall(childContainer)) {
                                enableCounter++;    
                            }
    
                            setOneStyle(childContainer, 'display', enableCounter <= 1 ? 'flex' : 'none');
                        }
                    }
                }

            } else {

                isVisible = false;

                RootManager.visibleGroup(groupCfg.name, isVisible);

            }
        }

        // 不透明 - 场景/背景
    }
}