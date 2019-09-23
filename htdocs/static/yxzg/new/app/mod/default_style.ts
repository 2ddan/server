import { RElement } from '../../pi/gui/r_element';
import { RStyle } from '../../pi/gui/r_style';

/**
 * 项目默认样式配置表
 * * div 一定具有 width, heigth
 * * span 一定具有 fontSzie,fontFamily,fontWeight... etc.
 * * img ...
 */
const DefaultStyle = {
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: 'hansansk',
    color: '#EFE4B1',
    flexWrap: 'wrap',
    letterSpacing: '-2px' 
};

export const initDefaultStyle = () => {
    // 添加默认属性值列表
    for (const k in DefaultStyle) {
        RStyle.addDefaultStyle(k, DefaultStyle[k]);
    }

    // 设置text 节点默认属性列表
    RElement.setDefaultStyleList('span', ['fontSize', 'fontWeight', 'fontFamily', 'color', 'letterSpacing']);

    // 设置div 节点默认属性列表
    RElement.setDefaultStyleList('div', ['flexWrap']);

    // 设置img 节点默认属性列表
    RElement.setDefaultStyleList('img', []);
};