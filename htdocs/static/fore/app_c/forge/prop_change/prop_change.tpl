<div style="position:absolute;width:450px;height:440px;left:50%;margin-left:-225px;top:220px;color:white;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:440px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"龙魂转换","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
    </widget>
    <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
        {"icon":"close_light"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div style="position:absolute;width:443px;height:196px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:196px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
        </widget>

        <div style="width:98px;height:98px;position:absolute;left:78px;top:30px;color:#ffeee2;font-family:mnjsh;" on-tap="propInfoShow({{it1.this_materials[0]}})">
            {{let prop_1 = it1.Pi.sample[it1.this_materials[0]]}}
            {{let url_1 = it1.Pi.pictures[prop_1.icon]}}
            <app_a-widget-prop-base style="z-index:2;position:absolute;">
                {"prop":{{prop_1}},"url":{{url_1}},"width":98,"height":98,"count":"none"}
            </app_a-widget-prop-base>
            <app_a-widget-pic_text-pic_text style="position:absolute;top:120px;left:50%;margin-left:-65px;">
                {"icon":"gest_star","text":{{'当前拥有:' + it1.this_materials[1]}},"width":130,"height":24 }
            </app_a-widget-pic_text-pic_text>
        </div>

        <app_a-widget-btn_pic-btn_pic style="position:absolute;top:40px;left:50%;margin-left:-22px;">
            {"icon":"light_arraw"}
        </app_a-widget-btn_pic-btn_pic>

        <div style="width:98px;height:98px;position:absolute;right:78px;top:30px;color:#ffeee2;font-family:mnjsh;" on-tap="propInfoShow({{it1.target_materials[0]}})">
                {{let prop_2 = it1.Pi.sample[it1.target_materials[0]]}}
                {{let url_2 = it1.Pi.pictures[prop_2.icon]}}
            <app_a-widget-prop-base style="z-index:2;position:absolute;">
                {"prop":{{prop_2}},"url":{{url_2}},"width":98,"height":98,"count":{{it1.change_ratio ? it1.change_ratio : "none"}}}
            </app_a-widget-prop-base>
            <app_a-widget-pic_text-pic_text style="position:absolute;top:120px;left:50%;margin-left:-65px;">
                {"icon":"gest_star","text":{{'当前拥有:' + it1.target_materials[1]}},"width":130,"height":24 }
            </app_a-widget-pic_text-pic_text>            
        </div>
    </div>

    <div style="position:absolute;width:354px;height:52px;left:50%;margin-left:-177px;top:290px;">
        <app_a-widget-btn-sq style="position:absolute;left:0px;" on-tap="add({{-10}})">
            {"text":" -10 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
        <app_a-widget-btn-sq style="position:absolute;left:60px;" on-tap="add({{-1}})">
            {"text":"  -1 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
        <app_a-widget-pic_text-pic_text style="position:absolute;left:50%;margin-left:-55px;top:6px;">
            {"icon":"resource_bar","width":110,"height":37,"align":"center","marginLeft":3,"space":0,"fontSize":12,"text":{{it1.change_num}} }
        </app_a-widget-pic_text-pic_text>
        <app_a-widget-btn-sq style="position:absolute;right:60px;" on-tap="add({{1}})">
            {"text":"  +1 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
        <app_a-widget-btn-sq style="position:absolute;right:0px;" on-tap="add({{10}})">
            {"text":" +10 ","class":"hl","fontsize":18}
        </app_a-widget-btn-sq>
    </div>
    <div style="position:absolute;font-size:16px;height:39px;width:110px;text-align:center;color:#ffd8a6;top:354px;left:50%;margin-left:-55px;">
        <app_a-widget-btn-rect style="top:0px;position:absolute;" on-tap="convert">
            {"text":"转 换","class":"hl","fontsize":20,"width":110,"height":39}
        </app_a-widget-btn-rect>
    </div>
</div>