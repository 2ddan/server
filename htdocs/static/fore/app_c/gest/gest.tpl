<div style="position:absolute;top:0;left:0;right:0;bottom:0;z-index:2;">
    <app_b-widget-title-title style="top:0;z-index:9;">
    {"text":"阵 法","coin":["money","diamond",150001],"left":35,"top":12,"type":"gest_coin"}
    </app_b-widget-title-title>
    <div  style="position:absolute;top:100px;width:100%;height:auto;left:50%;margin-left:-273px;bottom: 140px;">        
        <div style="position:absolute;top:5px;left:30px;z-index:3">
            {{let arr = ["初级","中级","高级"]}} 
            {{for i,v of arr}} 
                {{let quality = i-0+4}}
                <app-widget-tab-tab_btn style="display:inline-block;width:96px;height:41px;margin-left:2px" on-tap='tabChangeGset({{quality}})'>
                    {"cfg":{"text":{{v}}},"select":{{it1.matrixQuality==quality?1:0}},"tip_keys":[{{"role.gest."+quality}}]}
                </app-widget-tab-tab_btn>
            {{end}}
        </div>
        
        <div class="line_6" style="position: absolute; top: 33px; z-index: 4;left: 0;width: 545px;"></div>	
        <div class="bg_1" style="position:absolute;width:492px;height:auto;top:48px;left:27px;bottom: 0px;"></div>

        <div style="position:absolute;height:auto;overflow:hidden;width:490px;top:48px;left:30px;bottom: 10px;">
            {{%=========阵法==========}}
            <app-widget-step style="position: absolute;width:105%;height: inherit;top:0px;bottom:0;left:0;line-height:18px;">
                {"widget":"app_c-gest-gest_list","arr":{{it1.selectGest(it1.gest_info).sort(it1.mySort)}},"initCount":4,"addCount":4,"orientation":2 }
            </app-widget-step>
        </div>        
    </div>

    <app_a-widget-btn-sq on-tap="seeAttr" style="top:96px;position:absolute;right:35px;">
        {"text":"  属 性   详 情 ","class":"hl","fontsize":16}
    </app_a-widget-btn-sq>

    <div style="position:absolute;z-index:2;width:100%;bottom:35px;height:90px;">
        
        <div style="text-align:center">
            
            {{let arr=[{"text":"心法背包","tap":"openGest('gest_bag')","icon":"pic_common_bag"},{"text":"心法兑换","tap":"openGest('gest_exchange')","icon":"menu_gestDh_icon"},{"text":"心法副本","tap":"gotoGestFb()","icon":"menu_gestFb_icon"}] }}
            {{for i,v in arr}}
           
            <app-widget-btn-menu on-tap='{{v.tap}}' style="position:relative;display:inline-block;margin-right:20px;width:80px;height:80px">
                {"icon":{{v.icon}},"text":{{v.text}},"bottom":-5,"fontSize":20,"width":80,"height":80,"space":-6}
            </app-widget-btn-menu>
            {{end}}
        </div>
    </div>
</div>
