{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let wild = appCfg.wild}}

{{let function_open = cfg.function_open.function_open}}
{{let menus = cfg.menu_parent.menu_parent || []}}
<div style="position:absolute;text-align:center;width:100%;height:94px;">
    <div style="width:100%;height:94px;position:absolute;bottom:0px;">
        <div w-class="parent_bg_left" style="position:absolute;left:0px;bottom:0px;"></div>
        <div w-class="parent_bg_right" style="position:absolute;right:0px;bottom:0px;"></div>
        <div w-class="parent_bg_middle" style="width:auto;position:absolute;left:69px;right:69px;bottom:0px;background-repeat:repeat-x;"></div>
    </div>
    <div style="position: absolute;left:-5px;bottom: 2px;height: 75px;width: 100%;text-align: center;">
        {{for i,v of menus}}
        {{let id = function_open[v.key] ? function_open[v.key].id : -2}}
        <div on-tap={{'gotoMenu("'+v.interface+'")'}} style="position:relative;display:inline-block;margin: 0px 0px;bottom:5px">
            {{let bol = it1.fun_open_id < id}}
            <app-widget-btn-menu style="opacity:{{v.stage_id>wild.wild_max_mission?0.5:1}}">
                {"guide":{{bol ? "" : v.icon}},"icon":{{v.icon}},"text":{{v.name}},"width":80,"height":80,"bottom":0,"fontSize":20,"tip_keys":{{v.tips}} }
            </app-widget-btn-menu>
            {{if bol}}
                <div style="height:20px;line-height:20px;width:100%;background-image:url(app_b/tips/image/err_bg.png);background-size:100% 100%;background-repeat:no-repeat;text-align:center;position: absolute;left: 50%;top:57%;transform: translate(-50%,-50%);color:#fff;font-size: 16px;z-index: 2;font-family: mnjsh;">
                    未激活
                </div>
            {{end}}           
        </div>
        {{end}}
	</div>
</div>