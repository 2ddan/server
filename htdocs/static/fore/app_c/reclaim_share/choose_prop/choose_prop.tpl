<div style="position:absolute;width:450px;height:540px;left:50%;margin-left:-225px;top:178px;color:white;z-index:4;">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let player = appCfg.player}}
    {{let career_id = player.career_id}}
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:540px;left:0;top:0;">
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
    <widget on-tap="goback" style="position:absolute;right:-30px;top:-26px;" w-tag="app_a-widget-btn_pic-btn_pic">
        {"guide":"returnTo","icon":"close"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div data-desc="奖励列表" scroller="1" style="position: absolute;width: 400px;height:454px;left:50%;margin-left:-200px;z-index:4;top:20px;overflow:hidden;">
        <div style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
            {{let Pi = _get("app/mod/pi").exports.Pi}}
            {{for i,v of it1.curr_prop_list}}
            {{let module = v ? (v.module[v.career_id.indexOf(career_id)][0] ? v.module[v.career_id.indexOf(career_id)][0] : v.module[v.career_id.indexOf(career_id)][0]): ''}}
            {{let img = Pi.pictures[module]}}
            {{let name = checkTypeof(v.name,"Array") ? v.name[v.career_id.indexOf(career_id)] : v.name}}
            <div style="width:400px;height:100px;position:relative;display:flex;align-items:center;margin:0 0 16px 0;">
                <app_a-widget-img_stitch-stitch style="position: absolute;width: 400px;height: 100px;">
                    {"type":2,"height":15,"width":25}
                </app_a-widget-img_stitch-stitch>
                <widget w-tag="app_a-widget-prop-base" style="position:absolute;left:15px;">
                    {"width":76,"height":76,"prop":{{v}} ,"url":{{img}},"count":"none","hidden_name":1,"top":22,"right":6} 
                </widget>

                <widget w-tag="app_a-widget-text-text" style="position:absolute;top:16px;left:104px;">
                    {"text":{{name}},"show":"","space":0,"fontSize":17,"color":"","textCfg":"heroEquip"}
                </widget>

                <app_a-widget-text-text style="position:absolute;top:40px;left:103px;">
                    {"text":{{"评分"+v.grade}},"fontSize":30,"textCfg":"scoring","space":0,"fontSize":18}
                </app_a-widget-text-text>

                <widget w-tag="app_a-widget-text-text" style="position:absolute;top:70px;left:104px;">
                    {"text":{{v.level+"级"}},"show":"","space":2,"fontSize":17,"color":"","textCfg":"heroEquip"} 
                </widget>

                {{let num = it1.choose_return[v.index] ? 1 : 0}}
                <widget on-tap="setChoose('{{v.index}},{{i}}')" w-tag="app_a-widget-chosen-chosen" style="position:absolute;width:32px;height:32px;right:60px;top:40px;">
                    {"index":1,"index1":{{num}}}
                </widget>
            </div>
            {{end}}
        </div>
    </div>

    <app_a-widget-btn-rect style="bottom:16px;position:absolute;left:50%;margin-left:-55px;" on-tap="sureChoose">
        {"text":"确 定","class":"hl","fontsize":20,"width":110,"height":40}
    </app_a-widget-btn-rect>
</div>
    
