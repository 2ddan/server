<div style="position:relative;width:137px;height:185px;display:inline-block;margin:10px 12px 0;">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let career_id = it1.player.career_id}}
    <widget w-tag="app_a-widget-img_stitch-stitch" style="position:absolute;width:137px;height:185px;left:0px;top:0px;">
        {"type":2,"height":20,"width":30}
    </widget>
    <widget  w-tag="app_a-widget-bg_frame-bg" style="width: 139px;height: 187px;left: -1px;top: -1px;z-index: 1;">
        {"bgName":"bg_frame52"} 
    </widget>

    {{let prop = it1.Pi.sample[ it.prop[0] ]}}
    {{let icon = prop.module ? prop.module[prop.career_id.indexOf(career_id)][0] : prop.icon}}
    {{let url = it1.Pi.pictures[icon]}}
    <widget w-tag="app_a-widget-prop-base" class="shadow" style="position:absolute;width:82px;height:82px;left:25px;top:20px;color:#fff;" on-tap="showPropInfo({{it.prop[0]}})">
        {"width":82,"height":82,"prop":{{prop}} ,"url":{{url}},"count": {{it.prop[1]}},"name":{{prop.name}},"top":24,"right":9,"bg":1}
    </widget>
  
    {{let has = prop.type == "rune" && (it1.rune.indexOf(it.prop[0])!==-1 || it1.getCount(it.prop[0]))}}
    {{if has}}
    <widget data-desc="已拥有" w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:5px;left:38px;z-index:3;">
        {"icon":"text_has","width":80,"height":61}
    </widget>
    {{end}}
    
    {{let bol = it.cost[1]>it1.score_num}}
    <div style="top:128px;position:absolute;left:21px;z-index:2;" on-tap="buyBook({{bol?0: it.id}})">
        <app_a-widget-btn-rect style="top:0;position:absolute;left:0;" >
            {"text":" ","class":{{bol? "disabled":"hl"}},"fontsize":20,"width":89,"height":36}
        </app_a-widget-btn-rect>
        <widget class="shadow4" w-tag="app_a-widget-coin-coin" style="position: absolute;top: 5px;left: 14px;z-index: 2;white-space: nowrap;color:{{bol ?'#f00':'#fff'}}">
            {"icon":{{it.cost[0]}},"width":23,"height":23,"left":1,"text":[{{it.cost[1]}}],"color":"#FFD7A8"} 
        </widget>
    </div>
    
</div>