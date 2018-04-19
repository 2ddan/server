<div class="attr_bg">
    <div style="padding:5px {{!it.pad?'0':'0'}};padding-bottom:0;">
        <div style="width:100%;position:relative;box-sizing:border-box;padding-left:10px;">
            <div w-class="f-left">
                <app_b-widget-equip-equip style="margin-right:-15px;">
                    {"prop":{{it.prop}},
                    "url":{{it.url}},
                    "solt":{{it.prop.slot}},
                    "UID":{{it.UID}} }
                </app_b-widget-equip-equip>
            </div>
            <div w-class="f-left" style="width:{{it.width?it.width:'auto'}};text-align:left;vertical-align:top;">
            
            {{%====================基础属性===============}}
                {{for k, v of it.prop.base_attr}}
                    <div style="white-space:nowrap;color:rgb(232, 223, 178);">
                    <span style="font-size:{{it.fontSize?it.fontSize:12}}px;margin-right:5px;">{{it.cfgAttr[v[0]]}}</span>
                    <span style="font-size:{{it.fontSize?it.fontSize:12}}px;">{{v[1]}}</span>
                    </div>
                {{end}}
            {{%====================附加属性===============}}
                {{for j, i of it.prop.addition_attr}}
                    <div style="white-space:nowrap;color:#FF0;">
                    <span style="font-size:{{it.fontSize?it.fontSize:12}}px;margin-right:5px;">{{it.cfgAttr[i[0]]}}</span>
                    <span style="font-size:{{it.fontSize?it.fontSize:12}}px;">{{i[1]}}</span>
                    </div>
                {{end}}
            </div>
            <div w-class="content-center">
                <div style="padding-right:20px;">
                    <app_b-widget-scoring-scoring style="display:block;margin-right:-11px;margin-left:auto;">{"num":{{it.prop.grade}},"type":1,"fontSize":14}</app_b-widget-scoring-scoring>
                    {{if it.wear}}
                    <div class="wear" style="margin-right:-11px;margin-left:auto;"></div>
                    {{else}}
                    <app-widget-btn-button on-tap="change({'cmd':'{{it.prop.index+1}}-{{it.prop.slot}}'})" style="color:#FFF;font-size:16px;position:relative;margin-right:0;margin-left:auto;">{"text":"change","type":"img"}</app-widget-btn-button>
                    {{end}}
                </div>
            </div>
            <div w-class="clear"></div>
        </div>
    </div>
</div>