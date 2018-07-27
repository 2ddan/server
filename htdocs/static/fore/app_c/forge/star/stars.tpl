<div maxId="27" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2" w-sid="2" w-sid="2">
    {{let friend_battle = _get("app/mod/db").exports.data.friend_battle}}
    {{let lgPlace = [ [[40,28],[85,212],[207,71],[360,150],[244,239]],
        [[68,39],[26,149],[154,229],[246,132],[374,64]],
        [[39,216],[107,87],[250,51],[361,127],[223,218]]]}}
    {{let linePlace = [ [[200,151,-7,76],[185,158,83,132],[175,135,230,26],[155,215,253,141]],
        [[140,116,4,113],[165,213,41,31],[155,205,150,133],[160,119,260,150]],
        [[150,172,22,116],[165,87,120,-12],[155,115,260,215],[160,190,240,147]]]}}
    {{let attrPlace = [ [[70,85],[265,67],[52,247],[203,340],[292,230]],
        [[25,118],[203,10],[230,215],[108,155],[117,320]],
        [[270,20],[70,25],[35,291],[180,320],[190,152]]]}}
    <div w-class="3" w-sid="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4" w-sid="4">
            {"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" w-sid="5">
            {"icon":"tips_top"} 
        </widget>
        
        <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6" w-sid="6">
            {"icon":"tips_bottom"} 
        </widget>
        <widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" w-sid="7" w-sid="7">
            {"icon":"cover_title","width":184,"height":33,"align":"center","marginLeft":3,"text":"星宿加成","textCfg":"gangCoverTitle","space":0,"fontSize":21.87,"top":4,"left":0} 
        </widget>
        <widget w-class="8"  w-tag="app_a-widget-pic_other-pic_other" w-sid="8" w-sid="8">
            {"icon":"pendant"} 
        </widget>
        <widget w-class="9"  w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" w-sid="9" on-tap="goback(e,1)">
            {"icon":"close"} 
        </widget>
        <div w-class="10" w-sid="10" w-sid="10">
            <widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">{"bgName":"bg_frame30"} 
            </widget>
            <widget w-class="14" data-desc="node_path_1" on-tap="arrowChange('1')" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="14">{"icon":"light_arraw"} 
            </widget>
            <widget w-class="15" data-desc="node_path_2" on-tap="arrowChange('2')" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="15">{"icon":"light_arraw"} 
            </widget>
            <div w-class="16" w-sid="16">
                <div data-desc="_repeat" w-class="17" w-sid="17">
                    {{for i, v in it1.stars}}
                        {{let type = i-0 > it1.soltIndex  ? "disabled" : (it1.starsIndex == i-0 ? "hl" : "default")}}
                        {{let color =  it1.starsIndex == i-0 ? "#fde7ca" : "#a3a3a3"}}
                        <widget class="shadow" w-class="21" on-tap="selectStars({{i-0}})" w-tag="app_a-widget-btn-ling" w-sid="21">
                            {"class":{{type}},"fontsize":22.58,"color":"#fde7ca","text":{{v.name}},"width":78,"height":78} 
                        </widget>
                    {{end}}
                    
                </div>
            </div>
        </div>
        <div w-class="11" w-sid="11" w-sid="11">
            <img w-class="18" src="app_c/forge/images/soul_bg.png" w-sid="18"/>

            {{let lineN = it1.starsIndex - 0 <= 3 ? it1.starsIndex - 0 : ( it1.starsIndex - 0 > 12 ? it1.starsIndex - 0 - 12 : ( it1.starsIndex - 0 > 9 ? it1.starsIndex - 0 - 9 : ( it1.starsIndex - 0 > 6 ? it1.starsIndex - 0 - 6 : it1.starsIndex - 0 - 3)))}}
            <img w-class="19" src="app_c/forge/images/soul_line_{{lineN - 0}}.png" w-sid="19"/>
            {{let inindex = (it1.starsIndex-1)*5 + 1}}
            {{for i,v in friend_battle.soul_achieve[it1.starsIndex-1][1]}}
                {{if i!=="erl_type"}}
                <div on-tap="{{if inindex==it1.stars_index}}activeStar({{it1.stars_index}}){{end}}" style="width:56px;height:56px;position:absolute;left:{{lgPlace[lineN-1][i][0]}}px;top:{{lgPlace[lineN-1][i][1]}}px;z-index:1">
                    {{if friend_battle.soul_achieve[it1.starsIndex-1][1][i]}}
                        <div w-class="lights" style="width:100%;height:100%"></div>
                    {{end}}
                    {{if it1.soltIndex == it1.starsIndex && inindex == it1.stars_index}}
                    
                        <div w-class="soul_select" style="left: 2px;top: 1px;"></div>
                        <div class="breatheAnim" style="left: -20px;top: -20px;position:absolute"></div>
                    {{end}}
                </div>

                {{if i != 4}}
                    {{if friend_battle.soul_achieve[it1.starsIndex-1][1][i-0] && friend_battle.soul_achieve[it1.starsIndex-1][1][i-0+1]}}
                    <div w-class="light_line" style="width: {{linePlace[lineN-1][i][0]}}px;top: {{linePlace[lineN-1][i][1]}}px;left: {{linePlace[lineN-1][i][2]}}px;transform: rotate({{linePlace[lineN-1][i][3]}}deg);"></div>
                    {{end}}
                {{end}}
                
                {{let color = friend_battle.soul_achieve[it1.starsIndex-1][1][i] ? "#40e420" : "#919191"}}
                <div w-class="stars_attr_bg" style="width:auto;position:absolute;top: {{attrPlace[lineN-1][i][0]}}px;left: {{attrPlace[lineN-1][i][1]}}px;font-size:16px;line-height:27px;text-align:center;">
                    {{for k, z in it1.stars[it1.starsIndex][inindex].attr}}
                        <div style="color:{{color}};padding: 0 10px;">{{it1.attriCfg[k]}}+{{parseInt(z) == z ? z : (Math.floor((z-0) * 100) + "%")}}
                        </div>
                    {{end}}
                    {{if color == "#919191"}}
                    <div style="width:100%;height:28px;position:absolute;top:25px;line-height:28px;color:#ffd8a6;font-size:18px;z-index:1;">
                        <widget w-tag="app_a-widget-coin-coin">
                            {"icon":"weapon_coin","width":28,"height":28,"left":3,"text":[{{it1.stars[it1.starsIndex][inindex].sour}}]} 
                        </widget>
                    </div>
                    {{end}}
                </div>
                {{:inindex++}}
                {{end}}
            {{end}}

            <widget w-class="20" w-tag="app_a-widget-pic_text-pic_text" w-sid="20">{"icon":"resource_bar","width":142,"height":28,"align":"center","marginLeft":"-31px","text":"拥有起灵","textCfg":"","space":0,"fontSize":16,"top":0,"left":0} 
            </widget>
            <div style="width:19%;height:28px;position:absolute;bottom:20px;line-height:28px;color:rgb(255, 216, 166);font-size:16px;z-index:1;left: 265px;">
                <widget w-tag="app_a-widget-coin-coin"  style="position: absolute;left: -100px;">
                    {"icon":"weapon_coin","width":28,"height":28,"left":3,"text":[" "]} 
                </widget>
                <span style="vertical-align:super;">{{it1.soul}}</span>
            </div>
            <widget on-tap="attrAdd" w-class="26" w-tag="app_a-widget-btn-sq" w-sid="26">{"class":"hl","fontsize":16,"color":"#fdedd7;","text":"属性加成","width":49,"height":49,"textCfg":"gangCoverTitle","space":2}
            </widget>
        </div>
    </div>
</div>