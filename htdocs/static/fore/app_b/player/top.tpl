{{let common = _get("app/mod/common").exports.Common}}

{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let menu_top = cfg.menu_top.menu_top || []}}
{{let player = appCfg.player}}
<div style="position:absolute;top:0;left:0;width:100%;height:80px;">
    <div style="height:109px;position:absolute;left:0px;width:100%;">
        <div w-class="player_top_left" style="position:absolute;left:0px;top:0px;"></div>
        <div w-class="player_top_middle" style="position:absolute;left:89px;right:0px;top:0px;background-repeat:repeat-x"></div>
        <div w-class="player_top_right" style="position:absolute;right:0px;top:0px;"></div>
        <div w-class="player_bottom_left" style="position:absolute;left:0px;top:38px;"></div>
        <div w-class="head_bg" style="left:0px;top:0px;"></div>
        <div w-class="player_top_namebg" style="left: 81px;top: 36px;"></div>
        <div w-class="wild_name_bg" style="left: 102px;top: 72px;"></div>
    </div>

    <div class="shadow" style="top: 43px;width: 134px;left: 110px;height: 20px;line-height:20px;color:#fde7ca;font-size:18px;position: absolute;font-family: mnjsh;">
        {{player.name}}
    </div>

    {{let num = 0}}
    {{let util = ''}}
    {{let po = common.numberCarry(parseInt(player.power || 0),1000000)}}
    {{if po}}
        {{: num = parseFloat(po)}}
        {{if checkTypeof(po,'String')}}
            {{: util = po.replace(num,"")}}
        {{end}}
    {{end}}
    <div style="width:110px;height:20px;position:absolute;left: 140px;top: 77px;">
        <app-widget-text-text style="position: relative;display:inline-block;">{"text":"{{num}}","textCfg":"powerNum","fontSize":22,"space":-1}</app-widget-text-text>
        {{if util}}
            <app-widget-text-text style="position: relative;display:inline-block;top: -1px;">{"text":"{{util}}","textCfg":"powerNum"}</app-widget-text-text>
        {{end}}
    </div>
    <div w-class="fight_icon" style="position:absolute;top: 60px;left: 83px;"></div>

    <div w-class="vip_bg" style="top: 7px;left: 55px;" on-tap="gotoVip">
        <app-widget-text-text style="left: 31px;top: 3px;z-index: 2;position:absolute;">{"text":"VIP","textCfg":"vip","fontSize":20}</app-widget-text-text>
        <app-widget-text-text style="left: 67px;top: 3px;z-index: 2;position:absolute;">{"text":"{{player.vip}}","textCfg":"vip","fontSize":20}</app-widget-text-text>
    </div> 

    {{let img = player.head}}
    {{if !img || img.indexOf("undefined") >= 0}}
    {{: img = Pi.pictures['playerhead'+player.career_id]}}
    {{end}}
    <div style="width:93px;height:108px;position:absolute;top:0px;left:0px;" on-tap="showDetail">
        <app_a-widget-guide-guide>
            {{"open_head"}}
        </app_a-widget-guide-guide>
        <div w-class="player_head_bg" style="position:absolute;top:0px;left:0px;top: 0px;left: -10px;">
        </div>
        <div class="shadow" w-class="player_head_level" style="position:absolute;top:0px;left:0px;top: 5px;left: 0px;color: #b5e8ff;font-family: mnjsh;line-height: 31px;text-align: center;z-index: 1;">{{player.level}}</div>
        <img src="{{img}}" style="position:absolute;top: 6px;left: -4px;"/>
    </div>
</div>
