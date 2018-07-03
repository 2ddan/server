<div on-tap="goback" maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2">
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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"人数加成","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div w-class="8" w-sid="8">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>

            <div w-class="12" class="shadow7">
                <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
                    {"bgName":"bg_frame23"} 
                </widget> 
                <div  style="position:relative;">
                    <span w-class="13">挑战人数</span>
                    <span w-class="14">人数加成</span>
                </div>
                <div style="overflow:hidden;width:100%;height:100%;">
                    <div style="overflow-x: hidden;overflow-y: auto;width:105%;height:200px;">
                        {{for i, v in it}}          
                        <div  style="position:relative;width:452px;">
                            <span w-class="13">{{i}}</span>
                            <span w-class="14">{{it1[v[0][0]]}}+{{v[0][1] < 1 ? v[0][1]*100+"%" : v[0][1]}}</span>
                        </div>
                        {{end}}
                    </div>
                </div>
            </div>
        
        </div>
        <widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
        </widget>
    </div>
</div>