# UI配置
frame       组件对象 <br>
frameName   组件名   <br>
frameJson   组件配置 <br>
frameData   组件数据 <br>

## 组件配置：

    frameJson = {

        // 必须 - 名称
        nodeName:    frameName,

        // 必须 - 类型，唯一值： "FRAME"
        nodeType:    "FRAME",

        // 必须 - 宽度  自定义
        width:   0, 

        // 必须 - 高度  自定义
        height:  0,

        // 必须 - 相对父节点  水平定位 （ 可写： right: 0 ）
        left:    0,  

        // 必须 - 相对父节点  垂直定位 （ 可写： bottom: 0 ）
        top:     0,

        // 随意 - 默认绝对 z 定位
        z:       1000,

        // 随意 - 默认相对父节点 z 定位
        z_relat: 0,

        // 必须 - 节点配置列表
        nodes: [
            { },
        ],

        // 必须 - 组件节点树设计
        design: {
            "mask": true,
            "mask2": [ "mask3", "mask4" ]
        },

        // 必须 - 组件样式表，可空  - 去除
        states: {
        },

        // 必须 - 组件子节点数据匹配表，可空
        dataMatch: {   
        }
        
    };

## 组件数据 匹配表

    dataMatch = {
        (节点名称) : (数据在 frameData 下的属性路径)
    };

## 组件数据
    frameData = {
        (属性A) : {
            (属性1) : (数据 A-1)
        }
    }

    数据类型:
        { "imageURL"    : ( string )      } 
        { "bgColor"     : ( string )      }
        { "opacity"     : ( number: 0-1 ) } 
        { "state"       : ( state )       }
        { "text"        : ( string )      } 

        (未完善)
        { "visible"     : ( boolean )     }
    
    state数据类型：
        { "left"        : ( number )      }
        { "top"         : ( number )      }
        { "right"       : ( number )      }
        { "bottom"      : ( number )      }
        { "z_relat"     : ( number )      }
        { "scale"       : ( [number] )    }
        { "rotate"      : ( [number] )    }

## 组件监听 - 去除，代码控制监听的添加和移除
    listen = {
        (节点名称) : { (监听类型) : [ (方法变量), (是否传递给子节点) ] , }
    }
    事件默认会传递 给子节点, 因此数组第二参数可不设置
    当数组第二参数 === false 时，不会传递给子节点

## 模块结构
    uiNode // 入口 
        uiNodeCreator              // 节点初始化
        uiNodeDataCtrl             // 节点数据控制
            # uiNodeRenderCtrl    
            uiNodeStateCtrl        // 节点数据 中 样式数据控制
                # uiNodeRenderCtrl    
            

        uiNodeRenderCtrl           // 节点渲染目标 控制器
            uiNodeRenderCreator        // 节点渲染目标 创建器
            - uiNodeSceneCtrl          // 场景控制器

        uiNodeListenerCtrl         // 节点 事件监听控制器
            uiNodeListener         // 事件响应器

        uiNodeTemplateMgr          // UI 配置管理器

    uiNodeToolFunc     // 方法库

    uiNodeBase         // 内部基础数据结构

    uiNodeEnum         // 内部基础数据
        

# UI 设计
## 相机  (sceneCfg.ts)
    2D 相机   
    配置的相机使得，整个UI坐标系 与 设计界面坐标系 映射关系仅为  ( x, y ) => ( -x, -y )
    减少坐标系转换计算

## 实现界面时  (sceneHelper.ts)
    打开边框辅助
    打开网格辅助

# 待实现
## 父节点渲染变换 对子节点的影响
## 动态填充组件的节点内容
    创建函数的执行循环: 关键数据 控制 数据显示表的使用 控制 UI显示

    PS: 原scene/three模块 内 自定义代码 处理了 渲染树的正常显示(子节点相对父节点定位)
        但 在树生成后 添加子树时 要正常显示，逻辑复杂
        暂时处理 为创建节点数据后 使用父节点定位信息计算 定位，节点不加入父节点渲染树
 
## 初始界面模块
## 公用界面

# 代码模板
## VSCode: 
    File -> Preferences -> User Snippets -> Typescript