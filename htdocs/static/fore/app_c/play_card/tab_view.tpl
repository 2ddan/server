<div data-desc="奖励预览" w-class="36">
    {{let Pi = _get("app/mod/pi").exports.Pi}}        
    <img w-class="60" src="./images/bg_2.png"/>  
    <div style="position: absolute;top: 41px;left: 160px;">
        <widget w-class="61" w-tag="app_a-widget-pic_other-pic_other" >
            {"icon":"other_1"} 
        </widget>
        <widget w-class="62" w-tag="app_a-widget-text-text" >
            {"text":"可能获得数字","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
        </widget>
        <widget w-class="61" w-tag="app_a-widget-pic_other-pic_other" >
            {"icon":"other_1"} 
        </widget>
    </div>
    <div style="position: absolute;top: 83px;left:-1px;width:100%">
        <img style="position: absolute;top: 0;left: 4px;" src="./images/num_bg.png"/>
        <div style="position:relative;top:13px;height:54px;line-height:60px;text-align: center;">
            {{for i, v of it1.cardList}}
            {{if v.length == 2}}
                {{if v[0] == "+" || v[0]=="numadd"}}
                {{: v[0] = "+"}}
                {{elseif v[0] == "x" || v[0]=="nummul"}}
                {{: v[0] = "x"}}
                {{end}}
                <widget style="vertical-align:middle;;margin:0 10px;" w-tag="app_a-widget-text-text" >
                    {"text":{{v[0]+v[1]}},"textCfg":"powerNum","space":0,"fontSize":51} 
                </widget>
            {{end}}
            {{end}}
        </div>
    </div>
    <div style="position: absolute;top: 232px;left:20px;width:450px;height:390px;">
        <app_a-widget-img_stitch-stitch style="position: absolute;width: 450px;height: 390px;z-index:0;left: 0;">
            {"type":2,"height":20,"width":30}
        </app_a-widget-img_stitch-stitch>
        <widget w-class="63" w-tag="app_a-widget-title-single" >
            {"padding":10,"type":9,"width":124,"text":"可能获得物品","textCfg":"singleTitle","fontSize":20,"space":-3,"color":"#b27d5c","wear":0} 
        </widget>
        <div w-class="64">
            {{for i, v of it1.cardList}}
                {{if v.length != 2}}
                {{let prop = Pi.sample[v[0]]}}
                {{let url = Pi.pictures[prop.icon]}}
                <widget w-class="65" w-tag="app_a-widget-prop-base" on-tap="showPropInfo({{v[0]}})">
                    {"width":84,"height":84,"prop":{{prop}},"url":{{url}},"count":"none","bg":1,"name":{{prop.name}}} 
                </widget>
                {{end}}
            {{end}}
            
        </div>
    </div>
</div>