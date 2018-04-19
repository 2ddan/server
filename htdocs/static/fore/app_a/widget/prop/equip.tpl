{{:it = it||_cfg.it }}

<div on-tap="{{if !it.guide}}tap{{end}}" style="width:{{it.width||52}}px;height:{{it.width||52}}px;position: absolute;">
    {{let arr = ["武器","护肩","项链","手镯","戒指","头冠","衣服","护腕","裤子","鞋子"]}}
    <base$ style="width:100%;height:100%">
        {"prop":{{it.prop}},"url":{{it.url||""}},"color":{{it.color||""}},"count":"none","name":"none","width":{{it.width}},"height":{{it.width}},"bg":{{it.bg}},"bottom":{{it.bottom}},"tip_keys":{{it.tip_keys}},"quality":{{it.quality || ''}}}
    </base$>
    {{if it.lock }}
    <div style="width:100%;height:100%;position:absolute;z-index:4;top:0px;">
        <app_a-widget-text-text style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
            {"text":{{arr[it.solt-1]}},"textCfg":"heroEquipRed","fontSize":30}
        </app_a-widget-text-text> 
        <img src="./images/lock_icon.png" w-class="lock_icon" />
        <app_a-widget-text-text style="position:absolute;bottom: -{{it.bottom + 1|| 17}}px;left:50%;margin-left:-31px;">
            {"text":{{it.lock+"级开放"}},"textCfg":"heroEquipGray","fontSize":20}
        </app_a-widget-text-text>
    </div>
    {{elseif !it.url}}
    <div style="width:100%;height:100%;line-height:{{it.width || 52}}px;font-size:18px;color:#ffd8a6;font-family:mnjsh;text-align:center;position: absolute;top: 0px;z-index: 2;pointer-events: none;">
        {{it.quality ? it.text : '未装备'}}
    </div>
    <app_a-widget-text-text style="position:absolute;bottom:0;margin-bottom:-{{it.bottom + 1 || 18}}px;z-index:4;left:25px">
        {"text":{{arr[it.solt-1]}},"textCfg":"heroEquip","fontSize":22}
    </app_a-widget-text-text>

    {{elseif it.prop && (it.level || it.level == 0) }}
        <div style="color: rgb(255, 255, 255);position: absolute;bottom: -{{it.bottom || 16}}px;width: 100%;line-height: 19px;text-align: center;font-size: 20px;font-family: {{it.fontFamily || 'mnjsh'}};z-index: 4;">{{"Lv" + it.level || ''}}</div>
    {{end}}
</div>