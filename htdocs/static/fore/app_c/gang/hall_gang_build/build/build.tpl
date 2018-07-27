<div maxId="20" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
        <div w-class="3" w-sid="3">
            <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" style="top: -25px;">{"icon":"tips_top"} 
            </widget>
            
            <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6">{"icon":"tips_bottom"} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7" style="z-index:1">{"icon":"pendant"} 
            </widget>
            <widget w-class="8" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="8" style="z-index: 1;">
                {"icon":"close"} 
            </widget>
    
            <widget w-class="10" w-tag="app_a-widget-pic_text-pic_text" w-sid="10" style="top: -29px;">{"icon":"cover_title","width":187,"height":33,"align":"center","marginLeft":3,"text":"建筑升级","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":4,"left":0} 
            </widget>
            {{let build_level = it1.gangExpandData.build_level_info}}
            {{let arr = [it1.gangData.gang_level, build_level[0], build_level[1]]}}
            {{let result = it.canBuildUp()}}
            {{let title = ['门派旗帜', '藏经阁', '藏宝阁']}}
            <div w-class="13" class="scroll_box_v" layout="scroll" w-sid="13" style="position: absolute;width: 461px;height: 562px;left: -8px;top: 22px;color: rgb(255, 255, 255);">
                {{for i,v in arr}}
                    {{let bool = (it1.gangData.post == 1) && result[i]}}
                    <div class="shadow" style="width:464px;height:170px;position:relative;margin-bottom:18px">
                        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:464px;height:170px">
                            {"bgName":"bg_frame23"}
                        </widget>
                        <app_a-widget-text-text style="position:absolute;top: 15px;left: 0px;right:0px;margin:auto;">
                            {"text":{{v + "级" + title[i]}},"textCfg":"heroEquip","fontSize":26}
                        </app_a-widget-text-text>
                        {{let obj = {} }}
                        {{if i == 0}}
                        {{:obj = it1.guild_upgrade[v]}}
                        {{else}}
                        {{:obj = it1.guild_build[i][v]}}
                        {{end}}
                        <div style="position: absolute;width: 450px;height: 39px;top: 50px;left:18;display: flex;justify-content: space-evenly;left: 10px;">
                            {{if obj.guild_money}}
                            <div style="width: 90px;height: 39px;line-height: 39px;color: #ffd8a6;font-size: 18px;text-align:center;z-index: 2;font-family: mnjsh;position: relative;">资金消耗:</div>
                            {{let progress = ((it1.gangExpandData.gang_money / obj.guild_money) * 100).toFixed(0) - 0}}
                            <app_a-widget-bar-bar2 style="position: relative;width: 210px;height: 18px;top:10px;">
                                {"progress":{{progress}},"text":{{it1.gangExpandData.gang_money + "/" + obj.guild_money}},"lineHeight":18,"fontSize":14,"split":[]} 
                            </app_a-widget-bar-bar2>
                            <app_a-widget-btn-rect on-tap='buildUp({{i}})' style="position:relative;">
                                {"text":"升 级","class":{{bool ? "hl" : "disabled"}},"fontsize":24,"width":110,"height":39}
                            </app_a-widget-btn-rect>
                            {{else}}
                            <div style="position:absolute;width:420px;height:40px;text-align:center;line-height:40px;color:#51e650;top: 50%;margin-top: -20px;left: 50%;margin-left: -120px;font-size: 24px;">已升至最高级</div>
                            {{end}}
                        </div>
                        
                        {{if i == 0}}
                        <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;top: 106px;left: 0px;">
                            {"line":"line_1"} 
                        </widget>
                        <div style="position: absolute;height: 25px;line-height: 25px;color: #ffd8a6;font-size: 16px;top:114px;left:27px;">1、决定门派等级(门派人员上限、门派旗帜属性)</div>
                        <div style="position: absolute;height: 25px;line-height: 25px;color: #ffd8a6;font-size: 16px;top:138px;left:27px;">2、决定其它建筑可升等级</div>
                        {{elseif i == 1}}
                        <div style="position: absolute;height: 25px;line-height: 25px;font-size: 16px;top:96px;color: {{bool ? '#51e650' : '#ff3048'}};left:27px;">升级要求:门派旗帜到达{{obj.flag_level}}级</div>
                        <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;top: 126px;left: 0px;">
                            {"line":"line_1"} 
                        </widget>
                        <div style="position: absolute;height: 25px;line-height: 25px;color: #ffd8a6;font-size: 16px;top:133px;left:27px;">1、增加藏经阁可习得技能上限</div>
                        {{elseif i == 2}}
                        <divc style="position: absolute;height: 25px;line-height: 25px;font-size: 16px;top:96px;color: {{bool ? '#51e650' : '#ff3048'}};left:27px;">升级要求:门派旗帜到达{{obj.flag_level}}级</div>
                        <widget w-tag="app_a-widget-line-line" style="position: absolute;width: 100%;top: 126px;left: 0px;">
                            {"line":"line_1"} 
                        </widget>
                        <div style="position: absolute;height: 25px;line-height: 25px;color: #ffd8a6;font-size: 16px;top:133px;left:27px;">1、增加藏阁售卖的道具种类</div>
                        {{end}}
                    </div>
                {{end}}
            </div>
        </div>
    </div>