{{:it = it||_cfg.it}}
<div>
    {{%左边}}
    <div style="position: absolute;height: 100%;width: {{it.width}}px;">
        
        <img style="position: absolute;left: 0px;top: 0px;z-index:1" src="app_a/widget/img_stitch/images/bg_{{it.type}}_left_1.png" />

        <img style="position: absolute;left: 0px;bottom: 0px;z-index:1" src="app_a/widget/img_stitch/images/bg_{{it.type}}_left_2.png" />

        <div style="position: absolute;left: 0px;top: {{it.height-5}}px;bottom: {{it.height-5}}px;">
            <img style="position: absolute;left: 0px;top: 0px;height: 101%;width: {{it.width}}px;" src="app_a/widget/img_stitch/images/bg_{{it.type}}_left_middle.png" />
        </div>
    </div>

    {{%右边}}
    <div style="position: absolute;width: {{it.width}}px;height: 100%;top: 0px;right: 1px;">
        <img style="position: absolute;top: 0px;right: 0px;z-index:1" src="app_a/widget/img_stitch/images/bg_{{it.type}}_right_1.png" />

        <img style="position: absolute;right: 0px;bottom: 0px;z-index:1" src="app_a/widget/img_stitch/images/bg_{{it.type}}_right_2.png" />

        <div style="position: absolute;top: {{it.height-5}}px;bottom: {{it.height-5}}px;" >
            <img style="position: absolute;top: 0px;height: 101%;width:{{it.width}}px;bottom: 0px;" src="app_a/widget/img_stitch/images/bg_{{it.type}}_right_middle.png" />
        </div>
    </div>
    {{%顶部}}
    <div style="position: absolute;left: {{it.width-1}}px;top: 0px;right: {{it.width-1}}px;height: {{it.height + 1}}px;">
        <img style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;" src="app_a/widget/img_stitch/images/bg_{{it.type}}_top_middle.png" />
    </div>
    {{%底部}}
    <div style="position: absolute;left: {{it.width-1}}px;bottom: 0px;right: {{it.width-1}}px;height: {{it.height + 1}}px;">
        <img style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;" src="app_a/widget/img_stitch/images/bg_{{it.type}}_bottom_middle.png" />
    </div>
    {{%中间}}
    <div style="position: absolute;left: {{it.width-10}}px;top: {{it.height-10}}px;right: {{it.width-10}}px;bottom: {{it.height-10}}px;">
        <img style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;" src="app_a/widget/img_stitch/images/bg_{{it.type}}_middle.png" />
    </div>

</div>