<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
    {{let Util = _get("app/mod/util").exports.Util}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let publicboss_base = cfg.publicboss_base.publicboss_base}}
    {{let appCfg = _get("app/mod/db").exports.data}}    
    {{let chatShow = appCfg.chat.show}}

    <app-scene-base-scene>{"name":"public_boss","newscene":{{it1.map}}}</app-scene-base-scene>
    <app_b-chat-chat></app_b-chat-chat>
    <app_b-magic-skill style="position:absolute;right:0;bottom:110px;display:{{ chatShow ? 'block' : 'none'}}"></app_b-magic-skill>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 114px;right: 50%;margin-right: -267px;">
        {"icon":"equip_level_bg","width":108,"height":24,"align":"center","marginLeft":3,"text":" ","textCfg":"","space":0,"fontSize":18,"top":0,"left":0} 
    </widget>
    {{if it1.fight_time >= Util.serverTime()}}
    <app-widget-cdtime ev-countdownend="exitFight(1)" style="position: absolute;top: 115px;font-size: 16px;width: 108px;right: 50%;margin-right: -270px;text-align:center;color:#78f300;">{cd_time:{{it1.fight_time}},"now_time":{{Util.serverTime()}} }</app-widget-cdtime>
    {{end}}
    
    <div style="width:130px;height:50px;position:absolute;left:50%;margin-left:-252px;top: 50%;margin-top: -442px;" on-tap="showRankInfo"></div>

    <div style="position: absolute;right: 50%;top: 20px;width: 90px;height: 94px;margin-right: -260px;" on-tap="gobackfight(1)">
        <app_a-widget-btn_pic-btn_pic style="right:0;">
            {"icon":"exit"}
        </app_a-widget-btn_pic-btn_pic>
        <app_a-widget-text-text style="position: absolute;bottom:8px;left:19px;">
            {"text":"退出","textCfg":"menu_main","fontSize":22}
        </app_a-widget-text-text>
    </div>
</div>