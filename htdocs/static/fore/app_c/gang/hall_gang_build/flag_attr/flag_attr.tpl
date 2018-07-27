<div style="position:absolute;width:450px;height:330px;left:50%;margin-left:-225px;top:230px;color:white;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:330px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>
    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"旗帜属性","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
    </widget>
    <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
        {"icon":"close_light"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div style="position:absolute;width:443px;height:240px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:240px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
        </widget>
        <div style="position:absolute;width:420px;height:214px;left:50%;margin-left:-210px;top:20px;font-size: 20px;">
            {{if it1.guild_upgrade[it1.gangData.gang_level + 1]}}
            <div style="position:absolute;width:140px;height:120px;top:26px;left: 40px;">
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:#ffffff;font-size: 22px;">当前属性</div>
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:#ffb675;">{{it1.gangData.gang_level}}级属性</div>
                {{let attr = it1.guild_upgrade[it1.gangData.gang_level].attr}}
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:rgb(81, 230, 80);">{{it1.attribute_config[attr[0]]}}: +{{attr[1] < 1 ? (attr[1] * 100 + '%') : attr[1]}}</div>
            </div>

            <app_a-widget-btn_pic-btn_pic style="position:absolute;top:50px;left:200px;">
                {"icon":"light_arraw","width":40}
            </app_a-widget-btn_pic-btn_pic>

            <div style="position:absolute;width:140px;height:120px;top:26px;right: 40px;">
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:#ffffff;font-size: 22px;">下级属性</div>
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:#ffb675;">{{it1.gangData.gang_level + 1}}级属性</div>
                {{let attr_next = it1.guild_upgrade[it1.gangData.gang_level + 1].attr}}
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:rgb(81, 230, 80)">{{it1.attribute_config[attr_next[0]]}}: +{{attr_next[1] < 1 ? (attr_next[1] * 100 + '%') : attr_next[1]}}</div>
            </div>
            {{else}}
            <div style="position:absolute;width:140px;height:120px;top:26px;left: 50%;margin-left: -70px;">
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:#ffffff;font-size: 22px;">旗帜已升至最高级</div>
                {{let attr_next = it1.guild_upgrade[it1.gangData.gang_level].attr}}
                <div style="position:relative;width:140px;height:40px;text-align:center;line-height:40px;color:rgb(81, 230, 80)">{{it1.attribute_config[attr_next[0]]}}: +{{attr_next[1] < 1 ? (attr_next[1] * 100 + '%') : attr_next[1]}}</div>
            </div>
            {{end}}
        </div>
    </div>
    <div style="position: absolute;text-align:left;width:260px;height: 23px;bottom: 22px;color:#ffd8a6;left: 50%;margin-left: -130px;">
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top: 0;width: 200px;left: 0;font-family: mnjsh;">
            {"icon":"little_tips_bg","text":"在门派中永久享受旗帜属性加成","width":260,"height":23,"top":2} 
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
            {"icon":"remind"} 
        </widget>
    </div>
</div>