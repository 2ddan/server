{{let Common_m = _get("app_b/mod/common").exports.Common_m}}
{{let appCfg = _get("app/mod/db").exports.data}}
{{let Pi = _get("app/mod/pi").exports.Pi}}

<div style="position: absolute;width: 100%;height: 100%;z-index:2">
    {{let root = _get("pi/ui/root").exports}}
    <app_b-widget-title-title>
        {"text":"荒野降魔","coin":["money","diamond"],"left":10,"top":10,"width":540,"r":[["money",0],["dimond",0],["dimond",0]],"type":"","width":{{root.getWidth()}}}
    </app_b-widget-title-title>

    <div  style="position:absolute;top:85px;left:50%;width:540px;height:785px;z-index: 2;margin-left: -270px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height: 666px;left:50%;margin-left:-246px;top:49px;">
            {"bgName":"bg_frame21"} 
        </widget>
    
        <widget w-tag="app_a-widget-line-line" style="position:absolute;top:34px;left:0px;">
            {"line":"line_7"} 
        </widget>
        {{:console.log(1111111,it1)}}
        <app-widget-tab-navtab data-desc="tab内容">
            {"cur":0,
            "btn_box":"btnBag",            
            "margin":4,
            "left":22,
            "top":0,
            "arr":[
                {"tab":"app_c-publicboss-boss-info","btn":{"text":"首领列表","type":"border","type_m":"info"}},
                {"tab":"app_c-publicboss-award-award","btn":{"text":"归属奖励","type":"border","type_m":"award"}}
            ],
            "type":0 }
        </app-widget-tab-navtab>
    </div>
</div>