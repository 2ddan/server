<div w-class="exp_bg" style="position:absolute;height:4px;background-color:#2b2323;border-top:1px solid #604238;border-bottom:1px solid #604238;">
    {{let db = _get("app/mod/db").exports.data}}
    {{let cfg = _get("app/mod/pi").exports.cfg.player_exp.player_exp}}
    {{let exp = cfg && cfg[db.player.level].exp||db.player.exp}}
    {{let p = db.player.exp/exp*100}}
    <div style="position:absolute;width:{{p}}%;height:100%;left:0;top:0;background-color:#21b43c;z-index:1;"></div>
    <div w-class="exp_fore" style="position:absolute;left:{{p-4}}%;height:5px;z-index:1"></div>
    <div style="position:absolute;width:100%;height:100%;z-index:3;">
        <div style="position:absolute;left:10%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:20%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:30%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:40%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:50%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:60%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:70%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:80%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
        <div style="position:absolute;left:90%;top:0;width:2px;height:100%;background-color:#4c4441;"></div>
    </div>
</div>
