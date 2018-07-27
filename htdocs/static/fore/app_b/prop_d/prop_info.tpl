
<div on-tap="cancel" style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;color:#FFF;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
	<div w-class="{{it[2] ? 'task' : 'nomal'}}" style="width:284px;height:auto;position:absolute">
        {{let appCfg = _get("app/mod/db").exports.data}}
        {{let Util = _get("app/mod/util").exports.Util}}
        {{let player = appCfg.player}}
        {{let Pi = _get("app/mod/pi").exports.Pi}}
        {{let cfg = _get("app/mod/pi").exports.cfg}}
        {{let Common = _get("app/mod/common").exports.Common}}
        {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
        <app_a-widget-img_stitch-stitch style="position: absolute;left: 0px;width: 284px;height: 100%;">{"type":1,"height":15,"width":15}</app_a-widget-img_stitch-stitch> 
        <widget style="position: absolute;top:-25px;right: -15px;z-index:1" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"}</widget>

        {{let prop = Pi.sample[it[0]]}}
        {{let img = Pi.pictures[prop.icon]}}
        <div style="position: relative;width: 100%;height: 68px;margin-top: 10px;">

            <app_a-widget-prop-base style="position: absolute;left: 12px;top: 0px;">{"width":68,"height":68,"prop":{{prop}} ,"url":{{img}},"count":"none","name":"none","bg":0} 
            </app_a-widget-prop-base>

            <app_a-widget-text-text style="position: absolute;left: 85px;top: 5px">{"text":{{prop.name}},"show":"","space":0,"fontSize":22,"lineHeight":20,"color":"","textCfg":"heroEquip"}
            </app_a-widget-text-text>
            {{if it[0] != 100003}}
            <span class="shadow" style="position: absolute;left: 85px;top: 33px;color: #ffd8a6;font-size: 18px;white-space: nowrap;">拥有：{{Common.numberCarry(it[1],10000)}}</span>
            {{end}}
        </div>
        <div style="position: relative;width: 282px;height: 81px;margin-bottom: 5px;">
            <app_a-widget-line-line style="left: 8px;top: 2px;width: 95%;height: 2%">{"line":"line_8"} 
            </app_a-widget-line-line>
            <div class="shadow" style="width:92%;height:auto;position:relative;font-size:16px;color:#fde7ca;line-height:22px;top: 11px;padding: 0 13px;">
                {{prop.describe}}
            </div>
        </div>
        {{if it[3] && (prop.type !== "rune" || !!Common.getBagPropById(it[0]))}}
        <app_a-widget-btn-rect on-tap='gotoFun("{{it[3].gotoFun}}")' style="position:relative;left: 88px;top: -10px;">
			{"text":{{it[3].btn_name}},"class":"hl","fontSize":24,"width":116,"height":45}
		</app_a-widget-btn-rect>
        {{end}}
    </div>
</div>