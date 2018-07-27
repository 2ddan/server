{{let arr = [{
    "title": "查看战况",
    "icon": "menu_event",
    "func": "lookSituation",
    "tip_keys": ""
}, {
    "title": "攻城奖励",
    "icon": "menu_award",
    "func": "openReward",
    "tip_keys": ""
}, {
    "title": "排行榜",
    "icon": "pic_ranking",
    "func": "openRank",
    "tip_keys": ""
},{
    "title": "帮 助",
    "icon": "help",
    "func": "openRank",
    "tip_keys": ""
}]}}
<div style="position: absolute;width: 240px">
    {{for i, v of arr}}
    {{if v.icon != 'help'}}
    <app-widget-btn-menu on-tap="{{v.func}}" style="width:80px;height:80px;">
        {"icon":{{v.icon}}, "text":{{v.title}}, "width":80,"height":80,"bottom":0,"fontSize":20,"bg":4,"space":-6,"top":-2}
    </app-widget-btn-menu>
    {{else}}
    <app-widget-btn-menu on-tap="{{v.func}}" style="width:80px;height:80px;top: 80px;right: 0px;">
        {"icon":{{v.icon}}, "text":{{v.title}}, "width":80,"height":80,"bottom":0,"fontSize":20,"bg":4,"space":-6,"top":-2,"position":"absolute"}
    </app-widget-btn-menu>
    {{end}}
    {{end}}
</div>
