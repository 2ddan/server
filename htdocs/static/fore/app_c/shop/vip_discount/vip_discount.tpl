<div maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:5" w-sid="2">
    {{let list = it1.mergeVipDiscount()}}
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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"VIP折扣","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
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
                {{let textCfg = ["vipDiscountGold","vipDiscountGray","vipDiscountYellow","livenessList"]}}
                {{for i, v of list}}            
                <div class="shadow7" style="font-size:18px;position:relative;padding: 0 20px;color:#f3d6af">
                    <widget w-tag="app_a-widget-text-text" style="vertical-align:middle;">
                        {"text":{{"VIP" + v[0] + (v[1] ? "-VIP"+v[1] : "") + ":"}},"space":-2,"fontSize":22,"lineHeight":22,"textCfg":{{textCfg[i]}}} 
                    </widget>
                    <span style="margin-left: 6px;">商店购买享{{v[2]%10 ? v[2] : v[2]/10}}折</span> 
                </div>
                {{end}}
            </div>
        
        </div>
        <widget w-class="18" w-tag="app_a-widget-pic_other-pic_other" w-sid="18">
            {"icon":"tips_bottom"} 
        </widget>
    </div>
</div>