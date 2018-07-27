<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" style="height:560px;margin-top: -280px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"赠送水晶","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        <div style="width:100%;position:absolute;left:0;top:0px;bottom:6px">
            
            <div style="width: 450px;position: relative; top: 26px;left: 45px;height: 515px;">
                <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                    {"bgName":"bg_frame26"} 
                </widget>
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="left: 11px;top: 19px;height:428px;width:428px;opacity:0.85">
                    {"bgName":"bg_frame32"} 
                </widget>

                <div  style="position: absolute;width: 414px;height: 400px;left: 18px;top:34px;overflow: hidden;z-index: 2;">
                    <div style="position: relative; width: 110%; height: 400px;overflow-x: hidden;overflow-y: auto;">
                        {{let data = it1.giveInfo }}
                        {{let fixed = it1.getFixed()}}
                        {{let num = 0}}
                        {{if data }}
                
                        {{for k, v of data}}
                        {{if v[0] != it1.player.role_id}}
                        <div style="position: relative; width: 414px; height: 122px;margin-bottom:12px;">
                            <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 122px;z-index:0;left: 0;">
                                {"type":2,"height":20,"width":30}
                            </app_a-widget-img_stitch-stitch>
                            {{let name = it1.checkTypeof(v[2],"Array") ? it1.Common.fromCharCode(v[2]) : v[2]}}
                            <widget style="position: absolute;left: 130px;top: 29px;" w-tag="app_a-widget-text-text">
                                {"text":{{"S"+it1.player.area +" "+ name}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
                            </widget>

                            {{let imgX = it1.Pi.pictures['playerhead'+(v[4] || 700001)]}}
                            <widget style=" position: absolute;left: 20px;top: 17px; width: 97px;height: 97px;" w-tag="app_a-widget-head-friend" on-tap="seeOther({{v[0]}})">
                                {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
                            </widget>
                
                            <span class="shadow" style=" position: absolute;color: #FCE6C9;font-family: mnjsh;font-size: 18px;left: 130px; top: 84px;">战力:{{it1.Common.numberCarry(v[3],1000000)}}</span>
                
                            <span class="shadow" style="position: absolute;color: #FCE6C9;font-family: mnjsh;font-size: 18px;left: 130px;top: 63px;">水晶:{{it1.Common.numberCarry(Math.ceil(v[1]/it1.robres_battle.battle+fixed),10000)}}</span>
                
                            <widget w-tag="app_a-widget-btn-rect" on-tap="giveSelect({{v[0]}},'{{name}}',{{k}})" style="position: absolute;right: 13px;top: 45px;">
                                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"赠  送","width":116,"height":45} 
                            </widget>
                        </div>
                        {{:num++}}
                        {{end}}
                        {{end}}

                        {{end}}
                
                
                        {{if !data || !num}}
                
                        <div style="font-family:mnjsh;font-size:26px;color:#f00;text-align:center;line-height: 322px;width: 414px;">暂无可赠送对象</div>
                
                
                        {{end}}
                    </div>
                </div>
                <div  class="shadow7" style=" position: absolute;bottom:15px;left:155px;font-size:18px;color:#ffd8a6;line-height: 26px;height: 29px;white-space: nowrap;padding-left: 7px;">
                    {{let count = it1.robres_base.give_count - it1.info.give_count}}
                    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;top:0;left:0;opacity: 0.9;">
                        {"icon":"resource_bar","width":143,"height":27,"align":"center","marginLeft":0,"text":" ","textCfg":"","space":0,"fontSize":12} 
                    </widget>
                    <span style="position:relative;top:0;left:0;">剩余赠送次数: <span style="color:{{!count ? '#f00' : ''}}">{{count}}</span></span>  
                </div>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                    {"icon":"tips_bottom"} 
                </widget>
            </div>
        </div>
    </div>
</div>



