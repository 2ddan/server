
<div style="position:absolute;width:450px;height:424px;left:50%;margin-left:-225px;top:230px;color:white;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:424px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"一键回收","textCfg":"singleTitle","space":0,"fontSize":22,"top":0,"left":0} 
    </widget>
    <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
        {"icon":"close_light"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div style="position:absolute;width:444px;height:256px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:256px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
        </widget>
        {{let text = it1.index ? '灵宠' : '时装'}}
        <div style="position:absolute;width:444px;height:24px;line-height:24px;text-align:center;top:10px;font-family:mnjsh;color:#ffd8a6;">只会回收多余的{{text}}碎片</div>
        <div style="position:absolute;width:444px;height:24px;line-height:24px;text-align:center;top:34px;font-family:mnjsh;color:#ffd8a6;">{{text}}代币可在时装商店购买其他的{{text}}</div>
        <div style="position:absolute;width:420px;height:178px;left:50%;margin-left:-210px;top:70px;">
            {{for i, v of it.fragList}}
            {{let prop = it1.Pi.sample[v[0]]}}
            {{let url = it1.Pi.pictures[prop.icon]}}
            <div style="position:relative;width:70px;height:70px;margin:0 17px 17px 17px;display:inline-block;">
                <div style="position:absolute;width:70px;height:70px;">
                    <widget w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{prop.id || prop.sid}})">
                        {"width":70,"height":70,"prop":{{prop}} ,"url":{{url}},"count":{{v[1]}},"bg":1} 
                    </widget>
                </div>
            </div>
            {{end}}
        </div>
    </div>
    {{let id = it1.index ? it1.pet_coin_id : it1.clothes_coin_id}}
    {{let p = it1.Pi.sample[id]}}
    {{let img = it1.Pi.pictures[p.icon]}}               
    <div style="position:relative;width:444px;height:40px;top:306px;line-height:40px;display:flex;justify-content:center;font-family:mnjsh;color:#ffd8a6;font-size:20px;" on-tap='showPropInfo("{{id}}")'>回收可获得:
        <img src={{img}} style="width:40px"/>
        X{{it.coin}}
    </div>

    <app_a-widget-btn-rect style="top:0px;position:absolute;left:50%;margin-left:-58px;top:360px;" on-tap='recovery'>
        {"text":"回 收","class":"hl","fontsize":24,"width":116,"height":45}
    </app_a-widget-btn-rect>
</div>