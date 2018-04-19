<div onselectstart="return false" style="position:absolute; top:0px; left:0px; height:100%; width:100%; z-index:5;">
    {{let scenename = _get("app/scene/scene").exports.mgr_data.name}} 
    {{let Util = _get("app/mod/util").exports.Util}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let chatShow = appCfg.chat.show}}
    {{let root = _get("pi/ui/root").exports}}    
    <app-scene-base-scene>
        {"name":"fight","newscene":{{it1.scene.fightData.cfg.scene}},"type":{{it1.scene.fightData.type}} }
    </app-scene-base-scene>
    <app_b-magic-skill style="position:absolute;right:0;bottom:110px;display:{{ chatShow ? 'block' : 'none'}}"></app_b-magic-skill>
    <div style="position:absolute;right:6px;top:7px;width: 90px;height: 94px;" on-tap='goback_tips("{{it1.scene.fightData.type}}")'>
        <app_a-widget-btn_pic-btn_pic style="right:0;">
            {"icon":"exit"}
        </app_a-widget-btn_pic-btn_pic>
        <app_a-widget-text-text style="position: absolute;bottom:8px;left:19px;">
            {"text":"退出","textCfg":"menu_main","fontSize":22}
        </app_a-widget-text-text>
    </div>
    <app_b-chat-chat></app_b-chat-chat>
    {{if it1.scene.fightData.type == "tower" || it1.scene.fightData.type == "exp_mission"}}
        {{let text = it1.scene.fightData.type == "tower" ? "第"+it1.scene.fightData.floor_point+"层" : "第"+it1.scene.fightData.index+"波"}}
        <app_a-widget-pic_text-pic_text style="position:absolute;left:-14px;">
            {"icon":"now_attr_bg","width":200,"height":48,"align":"center","marginLeft":3,"text":{{text}},"textCfg":"menu_main","space":0,"fontSize":20,"top":12,"left":0}
        </app_a-widget-pic_text-pic_text>
        <div style="position:absolute;width:139px;height:65px;top:54px;left:13px;">
            <app_a-widget-pic_text-pic_text style="position:absolute">
                {"icon":"fight_time_bg","width":139,"height":65,"align":"center","marginLeft":3,"text":"倒计时","textCfg":"lingBtn","space":0,"fontSize":18,"top":10,"left":0}
            </app_a-widget-pic_text-pic_text>
            {{if it1.scene.fightData.time >= Util.serverTime()}}
            <app-widget-cdtime ev-countdownend="timeEnd" style="position: absolute;top:35px;font-size: 16px;width: 100%;left: 0px;text-align:center;color:#78f300;">{cd_time:{{it1.scene.fightData.time}},"now_time":{{Util.serverTime()}} }</app-widget-cdtime>
            {{end}}
        </div>
        {{if it1.scene.fightData.type == "exp_mission"}}
        <app_b-player-exp style="left:0;bottom:0;width:{{root.getWidth()}}px;"></app_b-player-exp>
        <app_c-exp_fb-exp_bar style="left:0;top:100px;width:{{root.getWidth()}}px;"></app_c-exp_fb-exp_bar>
        {{end}}
    {{end}}
    {{%=======战斗时长,星星==========}}
    {{if it1.scene.fightData.star}}
    <app_b-fb_star-fb_star>
        {"type":{{it1.scene.fightData.type}} }
    </app_b-fb_star-fb_star>
    {{end}}
</div>