<div maxId="27" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2" >
    <div w-class="3" w-sid="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4" >
            {"bgName":"bg_frame26"} 
        </widget>
        <div style="position:relative;z-index:2">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5" >
                {"icon":"tips_top"} 
            </widget>
            <widget w-class="6" w-tag="app_a-widget-pic_other-pic_other" w-sid="6" >
                {"icon":"tips_bottom"} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-pic_text-pic_text" w-sid="7" w-sid="7">
                {"icon":"cover_title","width":184,"height":33,"align":"center","marginLeft":3,"text":"星阵图谱","textCfg":"gangCoverTitle","space":0,"fontSize":21.87,"top":4,"left":0} 
            </widget>
            <widget w-class="8"  w-tag="app_a-widget-pic_other-pic_other" w-sid="8" >
                {"icon":"pendant"} 
            </widget>
            <widget w-class="9"  w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9" on-tap="goback">
                {"icon":"close"} 
            </widget>
        </div>
       
    
        <div w-class="11" w-sid="11" >
            <img w-class="18" src="app_c/forge/images/soul_bg.png" w-sid="18"/>
            
            <widget w-class="10"  w-tag="app_a-widget-line-line" w-sid="9">
                {"line":"line_11"} 
            </widget>
            {{let levelArr = [ [-20,16],[-17,35],[-8,-21],[-20,16],[-10,48],[-20,16],[-20,16],[-20,16] ]}}
            {{let len = it1.tactical_record.length}}
            {{let i = 0}}
            <div  w-class="19">
                <img src="../images/star.png" style="position:absolute;top:0;left:0;"/>
                {{while i < len}}
                {{let c = it1.tactical_record[i] ? "lights" : (it1.tactical_record[i-1] && !it1.tactical_record[i] ? "soul_select" : ( !i ? "soul_select" :"" ) ) }}
                {{if i  && ( it1.tactical_record[len-1] || i+1 < it1.star_up_index)}}
                    <div w-class="light_line line_{{i-1}}"></div>
                {{end}}
                <div  w-class="stone stone_{{i}}">

                    <app_a-widget-text-text data-desc="等级" style="position:absolute;top:{{levelArr[i][0]}}px;left:{{levelArr[i][1]}}px;">
                        {"text":{{ it1.tactical_record[i] + "级"}},"textCfg":"heroEquip","fontSize":18,"space":-2}
                    </app_a-widget-text-text>

                    {{if c== "lights"}}
                        <div w-class="lights" style="width:100%;height:100%"></div>
                    {{end}}
                    {{if i+1 == it1.star_up_index }}
                        <div w-class="soul_select" style="left: 4px;top: 4px;"></div>
                        <div class="breatheAnim" style="left: -17px;top: -17px;position:absolute"></div>
                    {{end}}
                    {{let color = c=="lights" ? "#40e420" : "#919191"}}
                    <div w-class="stars_attr_bg" style="width:auto;position:absolute;top: 52px;{{if i ==len-1}}right: -30px;{{else}}left: -11px;{{end}}font-size:16px;line-height:27px;text-align:center;">
                        <div style="color:{{color}};padding: 0 10px;white-space: nowrap;">
                            {{let obj = it1.instance_star_arr[i+1][it1.tactical_record[i]]}}
                            {{let key = Object.keys(obj)[1]}}
                            {{it1.attr[key]}}+{{obj[key]}}
                        </div> 
                    </div>
                </div>
                {{:i++}}
                {{end}}
            </div>
        </div>
        <div style="position: absolute;width:100%;bottom: 24px; left:0;">
            {{let cost = it1.instance_star_arr[it1.star_up_index][it1.tactical_record[it1.star_up_index-1]].cost_star}}
            {{if cost}}
                <widget on-tap="up({{it1.star_up_index}})" w-tag="app_a-widget-btn-rect" style="position: absolute;left: 50%;bottom: 15px; margin-left: -58px;">
                    {"class":{{cost > it1.instance_star ? "disabled" : "hl"  }},"fontsize":24,"color":"","text":"提 升","width":116,"height":45,"tip_keys":["explore.instance.star"]} 
                </widget>
                <div w-class="20">
                    <app_a-widget-star-star style="display:inline-block;vertical-align: middle;">{"star_light":1,"star_dark":0 }</app_a-widget-star-star>
                    <span style="color:{{cost > it1.instance_star ? '#f00' : ''}};">{{it1.instance_star}}</span>/{{cost}}
                </div>
            {{else}}
                <widget  w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;bottom:0;left:50%;margin-left:-47px;">
                    {"icon":"max_level","width":94,"height":60}
                </widget>
            {{end}}
            <widget w-class="21" class="shadow7" w-tag="app_a-widget-btn-ling" on-tap="openSelect" >
                {"class":"default","fontsize":20,"color":"#49312E","text":"    未满    三星","width":77,"height":77,"color":"#fde7ca"} 
            </widget>
        </div>
    </div>
</div>