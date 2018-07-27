<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;">
    {{let Common = _get("app/mod/common").exports.Common }}        
    <div w-class="s8" >
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"获取次数","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        <div style="width: 450px;height: auto;position: absolute; top: 26px;left: 45px;padding-bottom: 33px;padding-top: 27px;">
            <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;">
                {"bgName":"bg_frame26"} 
            </widget>
           
            <div w-class="s20" class="shadow6" style="top:0;height:auto;position:relative;padding: 13px 0 20px;">
                <widget w-class="s15" w-tag="app_a-widget-bg_frame-bg" style="top:0;height:100%;">
                    {"bgName":"bg_frame23"} 
                </widget>
                {{let bol = it1.max - it1.buy_count}}
                <div data-desc="购买次数" style="font-size:18px;position:relative;padding: 0 20px;">
                    <span style="color:#51e650">使用元宝购买次数(<span style="color:{{bol>0?'#51e650':'#f00'}}">{{bol>0?bol:0}}</span>/{{it1.max}})</span>
                    <widget w-class="13" w-tag="app_a-widget-btn-rect" on-tap="buyCount({{bol>0}})">
                        {"class":{{bol>0 ? "default" :"disabled"}},"fontsize":24,"color":"#fdedd7;","text":{{bol>0 ? "购 买" : "已购完"}},"width":116,"height":45} 
                    </widget>
                </div>
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
                {{end}}
            </div>
                
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -20px;width: 109%;">
                {"icon":"tips_bottom"} 
            </widget>
        </div>
    </div>
</div>