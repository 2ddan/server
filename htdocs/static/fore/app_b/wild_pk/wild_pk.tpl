<div style="width:208px;height:221px;color:#ffd8a6;font-size:20px;">
    {{if it1 && it1.state}}
    <div data-desc="展开状态" style="position: absolute;top:0px;left:0px;width:177px;height:221px;">
        <widget w-tag="app_a-widget-bg_frame-bg">
            {"bgName":"bg_frame57"} 
        </widget>
        <div style="position: relative;">
            <div style="font-family:mnjsh;line-height: 27px;padding-left:10px;padding-top:10px;">玩家名字</div>
            <widget w-tag="app_a-widget-line-line" style="position:absolute;top:37px;left:0px;">
                {"line":"line_19"} 
            </widget>
            <div data-desc="玩家列表" scoller="1" style="width:100%;height:124px;overflow: hidden;position: absolute;font-size:16px;top: 42px;padding-bottom: 3px;">
                <div style=" width:110%;height:124px; overflow-x:hidden;overflow-y:auto;position: absolute;left:0;top:0;z-index:1;line-height: 40px;">
                    {{for i,v of it1.role_list}}
                    <div style="width:172px;position: relative;" on-tap="gotoFight({{v.mapId}})">
                        <span style="padding-left:10px;color:{{i==0 ? '#ff4800' : '#ffd8a6'}}">{{v.name}}(380万)</span>
                        <app_a-widget-pic_other-pic_other style="position:absolute;width:28px;height:25px;position:absolute;top:6px;right:5px;">
                            {"icon":{{i==0 ? "pk_red" : "pk_other"}}}
                        </app_a-widget-pic_other-pic_other>
                        <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:0px;">
                            {"line":"line_20"} 
                        </widget>
                    </div>
                    {{end}}
                </div>
            </div>
        </div>
        <div data-desc="罪恶值" style="font-family:mnjsh;position: absolute;top: 166px;left: 0px;width: 100%;line-height: 40px;">
            <span style="padding-left: 10px;">罪恶值:15</span>
            <app_b-wild_pk-type-type on-tap="changeType" style="display: inline-block;margin-left: 10px;vertical-align: middle;">
                {"text":"和","type":1}
            </app_b-wild_pk-type-type>
        </div>
        <app_a-widget-pic_other-pic_other style="position:absolute;bottom: 3px;left:0px;right:0px;margin:0 auto;">
            {"icon":"pk_bottom"}
        </app_a-widget-pic_other-pic_other>
    </div>
    {{end}}
    <div on-tap='changeState' data-desc="关闭状态" style="position: absolute;top:36px;left:{{it1 && it1.state ? 173 : 0}}px;width:31px;height:161px;">
        <widget w-tag="app_a-widget-bg_frame-bg">
            {"bgName":"bg_frame58"} 
        </widget>
        <widget w-tag="app_a-widget-btn_pic-btn_pic" style="top: 20px;left: 6px;{{if !(it1 && it1.state)}}transform:rotate(-180deg){{end}}">{"icon":"arrow_2"}</widget>
        <div class="shadow8" style="font-size:18px;font-family:mnjsh;position: absolute;width: 10px;top: 50px;left: 3px;">附近玩家</div>
        <app_a-widget-pic_other-pic_other style="position:absolute;width:20px;height:30px;position:absolute;top: 120px;left: 3px;">
            {"icon":"ex_icon"}
        </app_a-widget-pic_other-pic_other>
    </div>
</div>