
<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    <div w-class="s22">
        <div w-class="s23">
            <widget w-class="s24" w-tag="app_a-widget-pic_other-pic_other">
                {"icon":"tips_top_1"} 
            </widget>
            <widget w-class="s25" w-tag="app_a-widget-btn_pic-btn_pic" on-tap='goback'>
                {"icon":"close"} 
            </widget>
            <widget w-class="s26" w-tag="app_a-widget-pic_other-pic_other">
                {"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"未满三星的副本","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
       
        <div w-class="s27">
            <div class="shadow7" style="position: absolute; top: 22px;left: 38px;font-size: 18px;z-index: 2;color: rgb(255, 216, 166);font-family: mnjsh;">
                <widget  w-tag="app_a-widget-pic_text-pic_text">
                    {"icon":"little_tips_bg","text":"点击可直接跳至对应副本","width":232,"height":24,"top":2} 
                </widget>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
            <widget w-class="s28" w-tag="app_a-widget-bg_frame-bg" >
                {"bgName":"bg_frame26"} 
            </widget>
            <div  w-class="s30" >
                <widget w-class="s31" w-tag="app_a-widget-bg_frame-bg" >
                    {"bgName":"bg_frame32"} 
                </widget>
               
                <div  w-class="s32">
                    {{let len = it1.selectArr.length}}
                    {{if len}}
                        {{for i, v of it1.selectArr}}
                        <widget w-class="s33" w-tag="app_a-widget-btn-rect" on-tap="selectThis({{v}})" style="{{if i == len -1}}margin-bottom: 0; {{end}}">
                            {"class":"default","fontsize":24,"color":"#fdedd7;","text":{{it1.instance_drop[v][0].chapter_name}},"width":238,"height":52} 
                        </widget>
                        {{end}}
                    {{else}}
                     <div class="shadow6" style="font-size:20px;font-family:mnjsh;color:#fff;"> 恭喜您已三星通关所有关卡</div> 
                    {{end}}
                </div>
            </div>
            
        </div>
        <widget w-class="s29" w-tag="app_a-widget-pic_other-pic_other" >
            {"icon":"tips_bottom"} 
        </widget>
    </div>
</div>

    

