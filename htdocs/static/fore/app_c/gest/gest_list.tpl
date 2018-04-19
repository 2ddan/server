
{{let lv = it[1]}}
{{let soul_id = it[0]}}
{{let full_lv = 6}}
{{let s = lv < 0?0:lv}}
<div style="height:223px;width:471px;margin-top:10px;position:relative;margin-left:6px;background:url(./image/gest_list_bg.png) no-repeat center">
    
    <div style="height: 223px; width:240px;position:absolute;padding: 25px 7px;box-sizing: border-box;line-height: 20px;overflow:hidden;">
        <div style="position: relative;height: 150px;width: 100%; top:20px;left:20px">
            <div style="position: absolute;width:100%;text-align:center;top:50%;transform:translateY(-50%)">

            {{for j,k of it1.gest_attribute[soul_id][lv==full_lv?lv-1:lv]["need_gest"]}}
            {{let prop = it1.Pi.sample[ k[0]] }}
            {{let url = it1.Pi.pictures[prop.icon]}}
            {{let n =  prop.name}}
                <div on-tap="gotoGetWay({{k[0]}})" style="display:inline-block; text-align:center;color:#c8c8c9;margin:5px 6px;position:relative;width:55px;height:75px">
                    <app_a-widget-prop-base style="width:58px;height:58px;position:relative;display:inline-block">
                        {"prop":{{prop}},"url":{{url}},"width":55,"height":55,"count":"none","hidden_name":1}
                    </app_a-widget-prop-base>
                    <img src="./image/gest_list_bg2.png" alt="" style="position:absolute;top:-10px;left:-12px;width:20px;height:90px;z-index:4" />
                    <div style="position:absolute;top:-6px;left:-10px;z-index:5;width:18px;height:60px;font-size:15px;font-family: mnjsh;color: #f3eba9;line-height:15px;text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;">{{n}}</div>
                    <div style="position:absolute;top:31px;right:4px;font-size:14px;z-index:2;color:#ffffff;text-shadow: #26040a 1px 0px 0px, #26040a 0px 1px 0px, #26040a -1px 0px 0px, #26040a 0px -1px 0px;line-height: 18px;height:18px;text-align:right;">
                        {{if lv<full_lv}}
                        {{let has = it1.gestNumInBag[soul_id]["bagGest"][k[0]]}}
                        <span style="color:{{has < k[1]? '#f00':''}}">{{has}}</span>/{{k[1]}}
                        {{end}}
                    </div>
                </div>
            {{end}}
            </div>
        </div>                                     
    </div>
    <div style="position:absolute;width:3px;height:176px;top:20px;left:50%;margin-left:20px;background:url(./image/gest_list_bg3.png)"></div>
    <div style="position:relative;color:#6b6c73;float:right;width:50%;height:223px;line-height: 22px;display:inline-block;">
        <app_a-widget-btn_pic-btn_pic on-tap="gestDetail({{soul_id}})" style="width:27px;height:25px;position:absolute;top:5px;right:15px">{"icon":"look_info"}</app_a-widget-btn_pic-btn_pic>
        
        <div style="position:absolute;top:26px;left:65px;color:#d6aa72;font-family: mnjsh;">
            <app_a-widget-pic_other-pic_other></app_a-widget-pic_other-pic_other>
            <span style="width:90px;font-size:18px;display:inline-block;text-align:center">{{it1.gest_attribute[soul_id].name}}</span>
            <app_a-widget-pic_other-pic_other></app_a-widget-pic_other-pic_other>
        </div>

        <app_a-widget-pic_text-pic_text style="position:absolute;top:55px;left:58px;">
                {"icon":"gest_star","text":" ","width":134,"height":27}
        </app_a-widget-pic_text-pic_text>
        <app_b-widget-star-star style="position:absolute;top:59px;left:65px;display:inline-block;vertical-align: middle;">
            {"star_light":{{s}},"star_dark":{{full_lv-s}}}
        </app_b-widget-star-star>

        <div style="position:absolute;top:100px;left:35px;height:70px;width:87%;font-size:16px;color:#51e80f;">
                {{for a,b of it1.gest_attribute[soul_id][lv<0?0:lv]["attr"]}}
                {{if !(b[0] == "damage_multiple" || b[0] == "un_damage_multiple" || b[0] == "pvp_damage_multiple" || b[0] == "pvp_un_damage_multiple")}}
                <div class="shadow" style="margin:0 auto;display:inline-block;width:50%;">
                    {{it1.attribute_config[b[0]]}}+{{b[1]}}
                </div>
                {{else}}
                <div class="shadow" style="margin:0 auto;width:100%;">
                    {{it1.attribute_config[b[0]]}}+{{b[1]<1?Math.floor(b[1]*100)+"%":b[1]}}
                </div>
                {{end}}
                {{end}}
        </div>

        <div style="position:absolute;right:54px;top:156px;">
            {{if lv == full_lv}}
            <div class="shadow" style="width:124px;height:40px;line-height: 40px;position:relative;font-size:20px;color:#ffd8a6;text-align:center">
                <div style="font-family:mnjsh;color:#ffd8a6">已达到最高星</div>
            </div>
            {{elseif it1.gestNumInBag[soul_id]['needRed']}}
            <div class="shadow" style="height:40px;line-height:40px;position:relative;font-size:20px;text-align: center;">
                <div style="font-family:mnjsh;color:#eb875b">缺少主要心法</div>

            </div>

            {{elseif JSON.stringify(it1.isCanUp(soul_id)) !== "{}" }}
                <app_a-widget-btn-rect on-tap="openFastExchange({{soul_id}})"  style="line-height:24px;position: relative;left:0">
                    {"text":"快速兑换","class":"default","fontsize":"24","width":116,"height":45,"tip_keys":[{{"role.gest."+soul_id}}]}
                </app_a-widget-btn-rect>
                {{let limit = it1.gest_attribute[soul_id][lv]["player_level"]}}
                {{if limit>it1.player.level}}
                <div class="shadow3" style="font-family: mnjsh;text-align:center;font-size:18px;color:#f00;margin-bottom: -17px;">
                    {{limit}}<span style="margin-left:2px">级开启</span>
                </div>
                {{end}}
            {{else}}
            {{let bol = it1.player.level < it1.gest_attribute[soul_id][lv]["player_level"] ? 1 : 0}}
            <app_a-widget-btn-rect on-tap="gestStarUp({{soul_id}},{{lv}})" style="line-height:24px;position:relative;left:0">
                {"text":{{lv < 0 ?"激  活":"升  星"}},"class":{{bol ? "disabled":"hl"}},"fontsize":"24","width":116,"height":45,"tip_keys":[{{"role.gest."+it1.matrixQuality+"."+soul_id}}],"show_anim":1}
            </app_a-widget-btn-rect> 
            {{if bol}}
            <div class="shadow3" style="font-family: mnjsh;text-align:center;font-size:18px;color:#f00;margin-bottom: -17px;">
                    {{it1.gest_attribute[soul_id][lv]["player_level"]}}<span style="margin-left:2px">级开启</span>
            </div>
            {{end}}
            {{end}}
        </div>
    </div>
</div>
