<div on-tap="{{if !it.guide}}tap{{end}}">
        <div style="width:100%;height:100%;position:absolute;pointer-events:none;">
            {{let arr = ["武器","护肩","项链","手镯","戒指","头冠","护腕","衣服","裤子","鞋子"]}}            
            {{if it.prop}}
            <div w-class="equip_select_bg" style="visibility:{{it.select ? 'visible':'hidden'}};position:absolute;left:-6px;top:-6px;width:75px;height:75px;"></div>
            <app-widget-prop-base_prop-base_prop style="width:100%;height:100%">
                {"prop":{{it.prop}},"url":{{it.url}},"color":"{{it.color?it.color:""}}","level":{{it.level || it.level == 0 ? it.level : (it.prop.level?it.prop.level : 1)}}}
            </app-widget-prop-base_prop-base_prop>
            {{else}}
            <div class="box_square_min" style="width: 52px;height: 52px;left: 0px;top:0px;">
                <app-widget-image-quality style="width:100%;height:100%;position:absolute;left:0;top:0;pointer-events: none;z-index:2;" >
                    {"url":"app/widget/prop/base_prop/images/goods_boer.png","isGray":1 }
                </app-widget-image-quality>
                <app-widget-image-quality style="width:100%;height:100%;position:absolute;left:0;top:0;pointer-events: none;z-index:2;" >
                    {"url":"app/widget/prop/base_prop/images/quality_3.png","isGray":1 }
                </app-widget-image-quality>
                {{if !it.lock}}
                <img src="app/widget/prop/base_prop/images/add_icon.png" style="width:26px;height:26px;position:absolute;top:50%;margin-top:-14px;left:50%;margin-left:-14px;z-index:3"/>
                {{end}}
            </div>
            {{if !it.lock && it.type == "equip"}}
            <div w-class="font_equip">
                <app-widget-text-text> 
                    {"text":{{arr[it.solt-1]}},"textCfg":"heroEquip"}
                </app-widget-text-text>
            </div>
            {{end}}
            {{end}}
            {{if it.tip_keys && it.tip_keys.length}}
            <app-widget-tip-tip style="right:3px;top:5px;">{"tip_keys":{{it.tip_keys}} }</app-widget-tip-tip>
            {{end}}
            {{if it.attr}}
                <div w-class="font_attr" style="font-size:12px;color:#3affc5;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
                    {{"+"+it.attr}}
                </div>
            {{end}}
            {{if it.lock}}
            <div w-class="font_equip" style="bottom:50%;margin-bottom:-11px;">
                <app-widget-text-text> 
                    {"text":{{arr[it.solt-1]}},"textCfg":"heroEquipGray"}
                </app-widget-text-text>
            </div>
            <img src="app/widget/prop/base_prop/images/lock_icon.png" style="width:11px;height:14px;position:absolute;top:5px;left:5px;z-index:3"/>
            <div w-class="font_equip">
                <app-widget-text-text> 
                    {"text":{{it.lock+"级开放"}},"textCfg":"heroEquipRed"}
                </app-widget-text-text>
            </div>
            {{end}}
        </div>
    </div>