<div style="position:absolute;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);z-index:3;">
    <div style="position:absolute;width:450px;height:315px;left:50%;margin-left:-225px;top:220px;color:white;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:315px;left:0;top:0;">
            {"bgName":"bg_frame35"} 
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
            {"icon":"tips_top"} 
        </widget>
        <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
            {"icon":"tips_bottom"} 
        </widget>
    
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
            {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"龙魂选择","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
        </widget>
        <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
            {"icon":"close_light"} 
        </widget>
            
        <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
            {"icon":"pendant"} 
        </widget>
    
        <div style="position:absolute;width:443px;height:260px;overflow:hidden;top:30px;left:4px;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:260px;left:50%;transform:translate(-50%);">
                {"bgName":"bg_frame36"} 
            </widget>
            {{if it1.open_type == 1}}
            <div style="position:absolute;width:420px;height:214px;left:50%;margin-left:-210px;top:20px;">
                {{for i, v of it1.bagSoul}}
                {{let prop = it1.Pi.sample[v.sid]}}
                {{let url = it1.Pi.pictures[prop.icon]}}
                <div on-tap="selectThisSoul({{i}})" style="position:relative;width:70px;height:70px;margin:0 17px 45px 17px;display:inline-block;">
                    <div style="position:absolute;width:70px;height:70px;">
                        <widget w-tag="app_a-widget-prop-base">
                            {"width":70,"height":70,"prop":{{prop}} ,"url":{{url}},"count":{{v.count}},"bg":1} 
                        </widget>
                    </div>
                </div>
                {{end}}
            </div>
            {{elseif it1.open_type == 2}}
            <div style="position:absolute;width:420px;height:214px;left:50%;margin-left:-210px;top:20px;">
                {{for i, v of it1.soul_id}}
                {{let prop = it1.Pi.sample[v]}}
                {{let url = it1.Pi.pictures[prop.icon]}}
                <div on-tap="selectTargetSoul({{v}})" style="position:relative;width:70px;height:70px;margin:0 17px 45px 17px;display:inline-block;">
                    <div style="position:absolute;width:70px;height:70px;">
                        <widget w-tag="app_a-widget-prop-base">
                            {"width":70,"height":70,"prop":{{prop}} ,"url":{{url}},"count":"none","bg":1} 
                        </widget>
                    </div>
                </div>
                {{end}}
            </div>
            {{end}}
        </div>
    </div>
</div>