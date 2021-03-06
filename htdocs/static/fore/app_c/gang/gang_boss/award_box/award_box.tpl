<div style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:2">
    <app_b-widget-title-title>
        {"text":"门派宝箱","coin":["money","diamond"],"top":"16","left":22}
    </app_b-widget-title-title>
    <div style="width:540px;height:100%;position:absolute;top:0;left:50%;margin-left:-270px;">
        <app_a-widget-line-line style="position:absolute;top:95px;left:2px;">
            {"line":"line_7"}
        </app_a-widget-line-line>
        
        <app_a-widget-bg_frame-bg style="position:absolute;top:110px;left:24px;width:492px;height:670px">
            {"bgName":"bg_frame21"}
        </app_a-widget-bg_frame-bg>

        <div data-desc="宝箱列表" style="position:absolute;width:484px;height:660px;left:23px;top:106px;z-index:2;padding:6px 6px 0;overflow:hidden">
            <div scroller="1" style="box-sizing:border-box;width:108%;height:660px;overflow-y: auto; overflow-x: hidden;">
                {{for i, v of it1.gangBoss.boss_award_info[it1.index]}}
                    <div w-class="box_item">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 110px;height: 130px;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch>
                        {{if v[1]}}
                            {{let id = (v[0][0] == "money") ? 100001 : v[0][0]}}
                            {{let prop = it1.Pi.sample[id]}}
                            {{let icon = prop.module ? prop.module[prop.career_id.indexOf(it1.career_id)][0] : prop.icon}}
                            {{let url = it1.Pi.pictures[icon]}}
                            {{let name = it1.checkTypeof(prop.name,"Array") ? prop.name[prop.career_id.indexOf(it1.career_id)] : prop.name}}
                            <widget w-tag="app_a-widget-prop-base" on-tap="propInfoShow({{id}})" style="left: 50%;margin-left:-40px;position:absolute;color: #ffffff;top: 14px;">
                                {"width":80,"height":80,"prop":{{prop}} ,"url":{{url}},"count":{{v[0][1]}},"name":"none"} 
                            </widget>
                            {{if v[1] == 1}}
                            <app_a-widget-btn-rect style="top:77px;position:absolute;left: 50%;margin-left: -45px;">
                                {"text":"已领取","class":"disabled","fontsize":20,"width":90,"height":34}
                            </app_a-widget-btn-rect>
                            {{else}}
                            <span style="width:110px;height:30px;line-height:30px;color:#fde7ca;font-size:20px;text-align:center;font-family:mnjsh;position: absolute;display: inline-block;top: 89px;z-index: 3;">{{v[1]}}</span>
                            {{end}}
                        {{else}}
                            <app_a-widget-box-box on-tap='openBox({{i}})' style="left: 50%;margin-left:-40px;top: 9px;">
                                {"type":3,"width":80,"height":80}
                            </app_a-widget-box-box>
                            <span style="width:110px;height:30px;line-height:30px;color:#fde7ca;font-size:20px;text-align:center;font-family:mnjsh;position: absolute;display: inline-block;top: 89px;z-index: 3;">{{(i + 1) + "号宝箱"}}</span>
                        {{end}}
                    </div>
                {{end}}
            </div>
        </div>
    </div>
    <app_a-widget-btn-rect on-tap='lookAward' style="top:800px;position:absolute;left: 50%;margin-left: -58px;">
        {"text":"预 览","class":"hl","fontsize":22,"width":116,"height":45}
    </app_a-widget-btn-rect>
</div>   