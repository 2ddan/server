<div maxId="97" style="position:absolute;width:100%;height:100%;z-index:2"  test="test" w-sid="2">
    {{let player = _get("app/mod/db").exports.data.player}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let Common_m = _get("app_b/mod/common").exports.Common_m}} 
    {{let Pi = _get("app/mod/pi").exports.Pi}}
	{{let root = _get("pi/ui/root").exports}}
    
    <widget w-tag="app_b-widget-title-title" style="position: absolute;left: 0px;top: 0px;z-index: 2;width: 540px;height: 116px;">
        {"text":"公 会","coin":["money","diamond"],"left":33,"top":16,"width":540,"r":[["money",0],["dimond",0]],"type":"","width":{{root.getWidth()}} } 
    </widget>
    <div class="line_6" style="position: absolute; top: 96px; left:50%;margin-left:-270px;width:540px;z-index: 2;"></div>
    <div style="width:540px;position:absolute;left:50%;top:110px;bottom:83px;margin-left:-270px;">
		
		<widget w-class="78" w-tag="app_a-widget-bg_frame-bg" w-sid="78">
            {"bgName":"bg_frame21"} 
        </widget>
        <div w-class="79" w-sid="79">
            <div  scroller="1" w-class="80" w-sid="80">
                {{for i, v of it1.gang_list}}
                {{if i!="erl_type"}}
                <div w-class="81" w-sid="81">
                    <widget w-class="82" w-tag="app_a-widget-bg_frame-bg" w-sid="82">
                        {"bgName":"bg_frame19"} 
                    </widget>
                    <div w-class="10" w-sid="10">
                        {{let img = Pi.pictures[it1.guild_upgrade[v.gang_level].icon_id]}}                        
                        <img w-class="74" src="app_a/widget/prop/images/equip_level_bg.png" w-sid="74"/>
                        <img w-class="75" src={{img}} w-sid="75"/>
                        <span w-class="76" w-sid="76">{{"Lv"+v.gang_level}}</span>
                    </div>
                    <widget w-class="92" w-tag="app_a-widget-line-line" w-sid="92">
                        {"line":"line_9"} 
                    </widget>
                    <div style="width:314px;height:114px;position:absolute;left:125px;top: 19px;color: #ffd8a6;">
                        <div w-class="20" w-sid="20">
                            <widget w-class="19" w-tag="app_a-widget-pic_other-pic_other" w-sid="19"></widget>
                            <widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18"></widget>
                            <span w-class="21" w-sid="21">{{Common.fromCharCode(v.gang_name)}}</span>
                        </div>
                        <div w-class="27" w-sid="27">
                            <span w-class="28" w-sid="28">会 长</span>
                            <span w-class="29" w-sid="29">{{Common.fromCharCode(v.leader_info.name)}}</span>
                            <widget w-class="31" w-tag="app_a-widget-text-text" w-sid="31">
                                {"text":{{"VIP"+v.leader_info.vip}},"show":"","space":0,"fontSize":14,"lineHeight":20,"color":"","textCfg":"gangVip"} 
                            </widget>
                        </div>
                        <div w-class="52" w-sid="52">
                            <span w-class="53" w-sid="53">成员数</span>
                            <span w-class="54" w-sid="54">{{v.gang_count+"/"+it1.guild_upgrade[v.gang_level].max_person}}</span>
                        </div>
                        <div w-class="56" w-sid="56">
                            <span w-class="57" w-sid="57">宣 言</span>
                            <div w-class="58" w-sid="58">
                                {{Common.fromCharCode(v.gang_bulletin)}} 
                            </div>
                        </div>
                        {{if !v.is_apply}}
                        <widget on-tap='applyGangClick("{{v.gang_id+","+v.index}}")' w-class="60" w-tag="app_a-widget-btn-rect" w-sid="60">
                            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"申 请","width":116,"height":45} 
                        </widget>
                        {{elseif v.gang_count - 0 == it1.guild_upgrade[v.gang_level].max_person-0}}
                        <widget w-class="60" w-tag="app_a-widget-btn-rect" w-sid="60">
                            {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"满 员","width":116,"height":45} 
                        </widget>
                        {{else}}
                        <img  w-class="63" src="app_a/widget/pic_text/images/text_invite.png" w-sid="63"/>
                        {{end}}
                    
                    </div>
                </div>
                {{end}}
                {{end}}
            </div>

        </div>

        <div style="position:absolute;top:720px;left:25px;width:490px;">
            <widget on-tap='gotoFindClick' w-class="61" w-tag="app_a-widget-btn-rect" w-sid="61">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"搜索公会","width":116,"height":45} 
            </widget>
            <widget on-tap='gotoCreateClick' w-class="62" w-tag="app_a-widget-btn-rect" w-sid="62">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"创建公会","width":116,"height":45} 
            </widget>
        </div>
	</div>
</div>