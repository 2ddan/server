
<div on-tap="cancel" style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;color:#FFF;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
    <div style="width:284px;height:auto;position:absolute; top: 50%;transform:translate(-50%,-50%);left: 50%">
        <app_a-widget-img_stitch-stitch style="position: absolute;left: 0px;width: 284px;height: 100%;">{"type":1,"height":15,"width":15}</app_a-widget-img_stitch-stitch>
            
        <widget style="position: absolute;top:-25px;right: -15px;z-index:1" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"}</widget>

        {{let prop = it1.buffCfg[it.id]}}
        {{let img = it1.Pi.pictures[prop.icon]}}
        <div style="position: relative;width: 100%;height: 68px;margin-top: 10px;">

            <app_a-widget-prop-base style="position: absolute;left: 12px;top: 0px;">
                {"width":68,"height":68,"prop":{"quality":4} ,"url":{{img}},"count":"none","name":"none","bg":0} 
            </app_a-widget-prop-base>

            <app_a-widget-text-text style="position: absolute;left: 85px;top: 5px">
                {"text":{{prop.name}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"}
            </app_a-widget-text-text>
            <span class="shadow" style="position: absolute;left: 85px;top: 33px;color: #ffd8a6;font-size: 18px;">
                类型：{{prop.type}}
            </span>
        </div>
        <div class="shadow" style="position: relative;width: 282px;height: auto;padding-bottom: 35px;">
            <app_a-widget-line-line style="left: 8px;top: 2px;width: 95%;height: 2%">{"line":"line_8"} </app_a-widget-line-line>
            <div  style="width:92%;height:auto;position:relative;font-size:16px;color:#fde7ca;line-height:22px;top: 11px;padding: 0 13px;">
                效果描述：{{prop.desc}}
            </div>
            {{if it.limit}}
            <div style="position:relative;left:20px;top:20px;width:230px;height: 23px;font-family:mnjsh;color:#ffd8a6;">
                <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 230px;left: 0;">
                    {"icon":"little_tips_bg","text":{{it.limit}},"width":230,"height":23,"top":2,"align":"left","marginLeft":18} 
                </widget>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
            {{end}}
        </div>

       
    </div>
</div>