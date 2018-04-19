<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%">
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='goback' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"快速兑换","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>

        <div w-class="s3" class="shadow7" style="top:46px;">
            <widget  w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"little_tips_bg","text":"升星还差以下心法","width":189,"height":24,"top":2} 
            </widget>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>
        <div w-class="s13" >
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg">
                {"bgName":"bg_frame23"} 
            </widget>
        </div>
        <div w-class="s20" class="shadow6">
            {{for i,v in it}}
            {{let prop = it1.Pi.sample[i] }}
            {{let url = it1.Pi.pictures[prop.icon]}}
            {{let name =  prop.name}}
            <div on-tap='showPropInfo({{i}})' style="position:relative;display:inline-block;margin:0 3px;margin-top: 20px;height:76px;width:76px;">
                {{let bol = prop.type !== "equip" ? 1 : 0}}
                <app_a-widget-prop-base >
                    {"prop":{{prop}},"url":{{url}},"width":76,"height":76,"count":{{v}},"name":"none","bg":1}
                </app_a-widget-prop-base>

                <app_a-widget-text-text data-desc="名字" style="display:inline-block;pointer-events:none;position: relative;z-index: 2;vertical-align: top;margin-top: -4px;">
                    {"text":{{name}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                </app_a-widget-text-text>
            </div>
            
            {{end}}
        </div>
        <div w-class="s4">
            <div w-class="s5" class="shadow8">
                兑换需要
                <app_a-widget-coin-coin style="position:relative;display:inline-block;margin-left:3px;color:#6fff18;font-family:'黑体'">
                    {"icon":"gest_coin","text":[{{it1.changeCost}}]}
                </app_a-widget-coin-coin>
            </div>         
            <widget on-tap="fastExchange" w-class="s16" w-tag="app_a-widget-btn-rect" >
                {"class":"default","fontsize":24,"color":"","text":"补 足","width":116,"height":45} 
            </widget>
    
            {{if it1.diamondCost>0}}
            <div w-class="s6">
                <span>补足</span>
                {{let url = it1.Pi.pictures[it1.Pi.sample[100002].icon]}}
                <img style="width:20px;width: 18px;vertical-align: middle;margin-top: -3px;" src={{url}}/>          
                <span style="color:{{it1.player.diamond<it1.diamondCost?'#eb2c2d':''}};margin-left:3px;">{{it1.diamondCost}}</div>
            </div> 
            {{end}}
        </div>
        

        <widget w-class="s19" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>