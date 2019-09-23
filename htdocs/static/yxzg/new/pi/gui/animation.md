# Animation
* 动画配置
    * 目标元素
    * 目标属性
        * transform: 
            * translateX
                * [ [percent,value...] ...]
            * translateY
                * [ [percent,value...] ...]
            * scaleX
                * [ [percent,value...] ...]
            * scaleY
                * [ [percent,value...] ...]
            * scale
                * [ [percent,value...] ...]
            * rotate
                * [ [percent,value...] ...]
        * opacity
            * [ [percent,value...] ...]
        * rgba
            * [ [percent,value...] ...]
        * cellId
            * [ [percent,value...] ...]
        * cellIdCfg
            * [ [percent,value...] ...]
        * cellIdSmooth
            * [ [percent,value...] ...]
    * 参考属性
        * attributes: <key:value>
    * 动画过程函数 - js 控制
        * (动画进度) => 属性值
    * 帧率控制
    * 开始时间
    * 延时时间
    * 持续时间
    * 结束状态
    * 循环次数
    * 循环模式
    * 是否反向动画
* 动画管理
    * 启动
    * 停止
    * 暂停计算
    * 继续计算
    * 暂停渲染
    * 继续渲染
    * 状态监听
* tpl层可设置
    * 给目标节点设置动画唯一标识
    * 给目标节点设置动画配置
* 代码层可控制 - widget 内控制 widget 自身所属节点, 不可跨widget
    * 通过接口查询 指定动画ID的节点
    * 通过接口设置 指定动画ID的节点 的动画数据
    * 通过接口控制 指定动画ID的节点 的动画状态