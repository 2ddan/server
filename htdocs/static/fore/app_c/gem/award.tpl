<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2">
    {{let Pi = _get("app/mod/pi").exports.Pi}}  
    {{let Common = _get("app/mod/common").exports.Common}} 
    {{let activity_wanfa = _get("cfg/c/activity_special").exports.activity_wanfa}}      
    <div w-class="30">
        <div w-class="34">
            <widget w-class="32" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="33" w-tag="app_a-widget-btn_pic-btn_pic">{"icon":"close"} 
            </widget>
            <widget w-class="31" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="29" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"积分奖励","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
            
        </div>
        <widget w-class="35" w-tag="app_a-widget-pic_other-pic_other">{"icon":"tips_bottom"} 
        </widget>
        <div w-class="36">
            <widget w-class="37" w-tag="app_a-widget-bg_frame-bg">
                {"bgName":"bg_frame26"} 
            </widget>
            <div w-class="38">
                我的积分:<span style="color:#35e04d;position: relative;">{{Math.ceil(it1.gemData.score)}}</span>
            </div>
            {{let _list = it1.gem_get_score_award.award_limit}}
            {{let _award = it1.gem_get_score_award.award}}
            <div w-class="39">
                <div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:100%;">
                    {{for i,v of _list}} 
                    {{if it1.gemData.score>=v && !it1.gemData.score_once_award[i] }}
                    <app_c-gem-frame_a>
                        {"award":{{_award[i]}},"num":1,"need":{{v}},"have":{{it1.gemData.score}},"i":{{i}} } 
                    </app_c--gem-frame_a>
                    {{end}} 
                    {{end}}  
                    {{for i,v of _list}} 
                    {{if it1.gemData.score < v && !it1.gemData.score_once_award[i] }} 
                    <app_c-gem-frame_a>
                        {"award":{{_award[i]}},"num":2,"need":{{v}},"have":{{it1.gemData.score}},"i":{{i}} }
                    </app_c--gem-frame_a>
                    {{end}} 
                    {{end}} 
                    {{for i,v of _list}} 
                    {{if it1.gemData.score_once_award[i] }}
                        <app_c-gem-frame_a>
                            {"award":{{_award[i]}},"num":3,"need":{{v}},"have":{{it1.gemData.score}},"i":{{i}} }
                         </app_c--gem-frame_a>
                    {{end}} 
                    {{end}}
                </div>
            </div>
            
        </div>
    </div>
</div>