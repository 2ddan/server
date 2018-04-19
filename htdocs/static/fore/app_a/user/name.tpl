{{let root = _get("pi/ui/root").exports}}
{{let playerList = _get("cfg/a/select_role").exports.playerList}}
<div style="position:absolute;left:0;top:0;width:{{root.getWidth()}}px;height:{{root.getHeight()}}px;background-color:#000;font-family:mnjsh;font-size:24px;z-index:2;">
    <div style="position:absolute;left:0;top:0;width:100%;height:100%;" on-down="down" on-move="move">
        <app-scene-base-scene style="visibility:visible">
            {"name":"loginscene","newscene":"sce_xzjs01"}
        </app-scene-base-scene> 
    </div>
    <div w-class="select_bg">
        <div on-tap="setJob(1)" style="position:absolute;width:80px;height:80px;left:50px;top:50px;">
            {{if it1.career_id == playerList[1].career_id}}
            <div w-class="selected"></div>
            <div w-class="icon_1_select"></div>
            {{else}}
            <div w-class="icon_1"></div>
            {{end}}
        </div>
        <div on-tap="setJob(2)" style="position:absolute;width:80px;height:80px;left:80px;top:{{it1.career_id == playerList[2].career_id ? 147 : 164}}px;">
            {{if it1.career_id == playerList[2].career_id}}
            <div w-class="selected"></div>
            <div w-class="icon_2_select"></div>
            {{else}}
            <div w-class="icon_2"></div>
            {{end}}
        </div>
        <div on-tap="setJob(3)" style="position:absolute;width:80px;height:80px;left:50px;top:260px;">
            {{if it1.career_id == playerList[3].career_id}}
            <div w-class="selected"></div>
            <div w-class="icon_3_select"></div>
            {{else}}
            <div w-class="icon_3" style="height:80px;"></div>
            {{end}}
        </div>
    </div>
    {{let arr = [{"name":"刺客、突进","desc":"疾风般的施展致命一击, 让敌人无从遁形"},{"name":"坦克、战士","desc":"攻守兼备, 拥有强大的输出和防御能力"}]}}
    <div style="position:absolute;width:146px;height:170px;top:170px;right:10px;padding-top:98px;">
        <div w-class="name_{{it1.index}}" style="left:0px;top:0px;"></div>
        <app_a-widget-pic_other-pic_other style="position:absolute;top:85px;left:-10px;">
            {"icon":"line"}
        </app_a-widget-pic_other-pic_other>
        <div w-class="desc_bg" style="margin-bottom: 8px;line-height:28px;">
            <app_a-widget-pic_other-pic_other style="position:absolute;top:-5px;left:0px;">
                {"icon":"fire"}
            </app_a-widget-pic_other-pic_other>
            <div>{{playerList[it1.index].desc[0]}}</div>
        </div>
        <div w-class="desc_bg" style="height:auto;text-align: justify;">
            <app_a-widget-pic_other-pic_other style="position:absolute;top:-8px;left:0px;">
                {"icon":"fire"}
            </app_a-widget-pic_other-pic_other>
            <div>{{playerList[it1.index].desc[1]}}</div>
        </div>
    </div>

    <div w-class="name_bg" style="bottom: 152px;">
        <app_a-user-error_tip>{"err":{{it1.err.name}}}</app_a-user-error_tip>
        <app-widget-input style="left:50%;margin-left:-110px;top:6px;position:absolute;width:220px;height:42px;text-align:center;color:#ffd8a6;font-size:24px;border:none;font-family:mnjsh;background-color: transparent;padding:0px;" ev-input-text="listenName">{sign:{{Date.now()}}, text:{{it1.rolename}}, id:"rolename", placeholder:"角色名"}</app-widget-input>
        <div on-tap="randomName" style="position:absolute;width:70px;height:48px;left:362px;top:3px;text-align:center;">
            <app_a-widget-btn_pic-btn_pic>
                {"icon":"random"}
            </app_a-widget-btn_pic-btn_pic>
        </div>
    </div>


    <div w-class="create" on-tap="goIntoNameGame" style="bottom: 65px;">
        <div style="position:absolute;width:100%;height:50px;line-height:50px;text-align:center;color:#ffd8a6;top:4px;">进入游戏</div>
    </div>
</div>