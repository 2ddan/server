<div style="position:absolute;color:#fff;text-align: left;font-size: 22px;left: 15px;top: 120px;width: 80%;">
    {{if it1}}
    {{let player_exp = _get("app/mod/pi").exports.cfg.player_exp.player_exp}}
    {{let nextExp = player_exp[it1.level].exp || it1.exp}}
    Lv{{it1.level}}
    <widget w-tag="app_a-widget-bar-bar2" style="position: relative;top:5px;">
        {{let progress = Math.ceil(it1.exp/nextExp*100)}}
        {"progress":{{progress}},"text":{{progress + "%"}},"lineHeight":14,"fontSize":18,"width":264} 
    </widget>
    {{end}}
</div>