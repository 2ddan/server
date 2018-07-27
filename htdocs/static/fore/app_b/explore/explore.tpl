{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let menus = cfg.menu_explore.menu_explore || []}}
{{let isOpen = _get("app_c/robres/robres").exports.isOpen}}
{{let isOpen1 = _get("app_c/endless_boss/endless_boss").exports.isOpen}}

<div style="width:100%;height:100%;position:absolute;z-index:2;"> 
    <div w-class="bg"></div>
	<widget w-class="4" w-tag="app_b-widget-title-title" w-sid="4">
		{"text":"探 索","coin":["money","diamond"],"left":35,"top":20,"r":[["money",0],["dimond",0],["dimond",0]],"type":""} 
    </widget>

    <div style="width:100%;position:absolute;height:100%;left:0;top:0;overflow:hidden;">
        {{let position = [[98,162],[386,223],[570,385],[303,480],[145,190],[200,0],[686,76],[368,193]]}}
        {{for i,v of menus}}
        <div on-tap="gotoExplores('{{v.interface}}')" style="font-family:mnjsh;position:absolute;top:{{position[i][0]}}px;left:{{position[i][1]}}px;display:{{it.function_open[v.fun_key].id > it.open_fun_id ? 'none':'inline-block'}};width:57px;height:120px;">
            <app_a-widget-guide-guide>
                {{v.fun_key}}
            </app_a-widget-guide-guide>
            
            <widget w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"fun_name_bg","width":57,"height":120,"text":""}
            </widget>
            <div class="center_h" style="font-size:18px;width:15px;top:60px;transform:translateY(-50%);color:#583730">{{v.name}}</div>
            {{if v.tips}}
            <app-widget-tip-tip style="right:2px;top:2px;">
                {"tip_keys":{{v.tips}}}
            </app-widget-tip-tip>
            {{end}}
            {{if v.interface == "gotoRobres" || v.interface == "gotoEndlessBoss"}}
            {{let _isOpen = v.interface == "gotoRobres" ? isOpen : isOpen1}}
                {{if _isOpen()}}
                <app_a-widget-pic_text-pic_text style="position:absolute;top:113px;">
                    {"icon":"open","width":68,"height":25,"text":" "} 
                </app_a-widget-pic_text-pic_text>
                {{else}}
                <app_a-widget-pic_text-pic_text style="position:absolute;top:113px;left: 3px;">
                    {"icon":"not_open","width":55,"height":24,"text":" "} 
                </app_a-widget-pic_text-pic_text>
                {{end}}
            {{end}}
            <app_a-widget-btn_sound-btn_sound></app_a-widget-btn_sound-btn_sound>
        </div>
        {{end}}
    </div>
    <div class="btn_back" style="z-index:3;right:5px;bottom:10px;" on-tap="goback"></div>
</div>