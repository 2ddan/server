<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2">
    {{let Common = _get("app/mod/common").exports.Common }}        
    <div w-class="3" w-sid="3">
        <div w-class="4" w-sid="4">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
                {"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="9" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="9">
                {"icon":"close"} 
            </widget>
            <widget w-class="7" w-tag="app_a-widget-pic_other-pic_other" w-sid="7">
                {"icon":"pendant"} 
            </widget>
            <widget w-class="6" w-tag="app_a-widget-pic_text-pic_text" w-sid="6">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"获取次数","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div w-class="8" w-sid="8">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>

            <div w-class="12" >
                <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
                    {"bgName":"bg_frame23"} 
                </widget> 
                {{let arr = it1.task()}} 
                {{if arr.length}}           
                    {{for i, v of arr}}
                    {{let task = v.task}}    
                    {{let params = Common.numberCarry(parseInt(task.params),10000)}}            
                    <div style="font-size:18px;position:relative;padding: 0 20px;">
                        <span style="color:{{v.value[0] ? '#51e650' : '#ffd8a6'}}">{{task.descript.replace(/#/,parseInt(params))}}({{Common.numberCarry(parseInt(v.value[1]),10000)+"/"+params}})</span>
                        {{if v.value[0]}}
                            <widget w-class="13" w-tag="app_a-widget-btn-rect" on-tap="getAward({{JSON.stringify(task)}})">
                                {"class":"hl","fontsize":24,"color":"#fdedd7;","text":"领 取","width":116,"height":45,"show_anim":1} 
                            </widget>
                        {{else}}
                            <widget w-class="13" w-tag="app_a-widget-btn-rect" >
                                {"class":"disabled","fontsize":24,"color":"#fdedd7;","text":"未达成","width":116,"height":45} 
                            </widget>
                        {{end}}
                    </div>
                    {{end}}
                {{else}}
                <div style="color:#f00;font-family:mnjsh;line-height:118px;">您已领取完所有奖励</div>
                {{end}}
            </div>
        
        </div>
        <widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
        </widget>
    </div>
</div>