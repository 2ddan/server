<div style="position:absolute;width:450px;height:508px;left:50%;margin-left:-225px;top:160px;color:white;">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let player_exp = _get("app/mod/pi").exports.cfg.player_exp.player_exp}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let nextExp = player_exp[player.level].exp || player.exp}}
    {{let common = _get("app/mod/common").exports.Common}}
    {{let area = _get("cfg/a/area").exports.area}}
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let mission = _get("app/mod/db").exports.data.wild.wild_max_mission}}
    {{let vip_advantage = _get("app/mod/pi").exports.cfg.vip_advantage.vip_advantage}}

    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:508px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"角色信息","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
    </widget>
    <widget style="position:absolute;right:-21px;top:-24px;width:55px;height:59px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap={{'goback("app_b-player-detail")'}}>
        {"guide":"returnTo","icon":"close"} 
    </widget>
        
    

    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    {{let img = Pi.pictures['playerhead'+(player.head || player.career_id)]}}
    <div style="position:absolute;width:443px;height:180px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:180px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
        </widget>
        <div style="width:107px;height:108px;position:absolute;top:22px;left:80px;">
            <div w-class="player_head_bg" style="position:absolute;top:0px;left:0px;top: 0px;left: -10px;"></div>
            <div class="shadow" w-class="player_head_level" style="position:absolute;top:0px;left:0px;top: 5px;left: 0px;color: #b5e8ff;font-family: mnjsh;line-height: 31px;text-align: center;z-index: 1;">{{player.level}}</div>
            <img src="{{img}}" style="position:absolute;top: 5px;left: -2px;"/>
        </div>

        <div style="position:absolute;height:30px;line-height:30px;left:183px;top:43px;">
            <div style="display:inline-block;height:30px;line-height:30px;left:183px;top:43px;font-family:mnjsh;color:#f3d6af;">{{player.name}}</div>
            {{if player.vip}}
            <widget class="shadow7" style="position:relative;display:inline-block;top: 6px;margin-left: 5px;;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":{{"vip_lv_"+(vip_advantage[player.vip].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP"+player.vip}},"top":0,"left":0} 
            </widget>
            {{end}}
        </div>
        <div w-class="wild_name_bg" style="left: 180px;top: 80px;">
            {{let num = 0}}
            {{let util = ''}}
            {{let po = common.numberCarry(parseInt(player.power || 0),1000000)}}
            {{if po}}
                {{: num = parseFloat(po)}}
                {{if checkTypeof(po,'String')}}
                    {{: util = po.replace(num,"")}}
                {{end}}
            {{end}}
            <div style="width:110px;height:20px;position:absolute;left:50px;top:6px;">
                <app-widget-text-text style="position: relative;display:inline-block;">{"text":"{{num}}","textCfg":"powerNum","fontSize":22,"space":-1}</app-widget-text-text>
                {{if util}}
                    <app-widget-text-text style="position: relative;display:inline-block;top: -1px;">{"text":"{{util}}","textCfg":"powerNum"}</app-widget-text-text>
                {{end}}
            </div>
        </div>
        <div w-class="fight_icon" style="position:absolute;top:70px;left:170px;"></div>

        {{let progress = (player.exp / nextExp) * 100}}
        {{let text = player.exp + "/" + nextExp}}
        <widget w-tag="app_a-widget-bar-bar3" style="position:absolute;width:270px;height:18px;top:135px;left:100px;">
            {"progress":{{progress}},"text":{{text}},"lineHeight":14,"fontSize":14,"width":270,"height":18} 
        </widget>
        <widget style="position:absolute;left:73px;top:127px;z-index:2;" w-tag="app_a-widget-pic_other-pic_other">
            {"icon":"exp"} 
        </widget>
    </div>

    <widget w-tag="app_a-widget-title-single" style="position:absolute;width:100px;height:25px;left:50%;transform:translate(-50%);top:230px;">
        {"padding":5,"type":9,"width":124,"text":"账号信息","textCfg":"singleTitle","fontSize":20,"space":-2,"wear":1}
    </widget>

    <div style="position:absolute;width:436px;height:88px;left:50%;transform:translate(-50%);top:260px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:436px;height:88px;">
            {"bgName":"bg_frame37"} 
        </widget>
        <ul style="position:absolute;width:400px;left:18px;font-family:mnjsh;color:#b27d5c;">
            <li style="list-style:none;float:left;width:190px;height:30px;line-height:30px;">ID：{{player.role_id}}</li>
            <li style="list-style:none;float:left;width:190px;height:30px;line-height:30px;">服务器：{{area[player.area].name}}</li>
            <li style="list-style:none;float:left;width:190px;height:30px;line-height:30px;">门派：{{appCfg.gang.data.gang_name || "无"}}</li>
            <li style="list-style:none;float:left;width:190px;height:30px;line-height:30px;">钱包：{{player.rmb}}元</li>
        </ul>
    </div>

    {{let words = ["关闭音乐", "关闭音效", "关闭特效", "关闭震屏", "隐藏其他玩家","自动挑战首领"]}}
    {{let fun = ["bgMusic", "btnMusic", "effect", "shake", "fighter", "autoFightBoss"]}}
    {{let arr = [1, 1, 1, 1, 1, 1]}}
    <div style="position:absolute;width:390px;height:150px;top:355px;left:60px;">
        {{for i, v of arr}}
            {{let num = (Pi.localStorage[fun[i]] || 0) - 0}}
            {{if (i < 5) || (mission > 3)}}
            <div style="position:relative;width:190px;margin-top:5px;height:34px;display:inline-block;">
                <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left:0px;">
                    {"icon":"text_bg_1","width":128,"height":34,"align":"center","marginLeft":3,"text":" ","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
                </widget>
                <widget w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;">
                    {"index":1,"index1":{{num}}}
                </widget>
                <div style="position:absolute;left:40px;height:34px;width:120px;line-height:34px;font-family:mnjsh;color:#f3d6af;font-size:18px;">{{words[i]}}</div>
                <div style="position:absolute;width:160px;height:34px;left:0;top:0;" on-tap="stateChange({{i}})">
                    {{if i == 5}}
                    <app_a-widget-guide-guide>
                        {{"auto_reclaim_down"}}
                    </app_a-widget-guide-guide>
                    {{end}}
                </div>
            </div>
            {{end}}
        {{end}}
    </div>
</div>
