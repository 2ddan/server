{{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
<div style="position:absolute;top:0px;width:420px;bottom:0;left:50%;margin-left:-210px;">
	<div style="position:absolute;width:380px;left:50%;margin-left:-190px;top:85px;bottom:150px;z-index:1;background-color:rgba(0,0,0,.9);" on-tap="gobackEquipinfo">
        {{let equip = friend_battle.equip_set[it1.equipType]}}
        {{for i,v of equip}}
            <div style="width:100%;height:25px;font-size:16px;color:#fff;position:relative;text-align:center;line-height:25px">{{v}}</div>
        {{end}}

        <app-widget-btn-inset style="width:88px;height:38px;position:absolute;bottom: 35px;left: 55px;" on-tap='chage({"cmd":"0-{{equip.slot}}"})'>
            {"class":2,"text":"卸下"}
        </app-widget-btn-inset>
        <app-widget-btn-inset style="width:88px;height:38px;position:absolute;bottom: 35px;right: 55px;" on-tap='lookEquips({{it1.equipType}})'>
            {"class":2,"text":"更换"}
        </app-widget-btn-inset>
    </div>
</div>