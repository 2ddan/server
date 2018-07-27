<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
    <div w-class="s8" style="height: 463px;margin-top: -231px;">
        <div w-class="s12" >
            <widget w-class="s10" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="s11" w-tag="app_a-widget-btn_pic-btn_pic" >{"icon":"close"} 
            </widget>
            <widget w-class="s9" w-tag="app_a-widget-pic_other-pic_other" >{"icon":"pendant"} 
            </widget>
            <widget w-class="s17" w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"成就奖励","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        <widget w-class="s14" w-tag="app_a-widget-bg_frame-bg" style="opacity: 0.95;width: 450px;position: relative; top:25px;left: 45px;height: 420px;">
            {"bgName":"bg_frame26"} 
        </widget>
        <div data-desc="奖励列表" style="position:absolute;width:450px;height:382px;left:50%;margin-left:-225px;top:45px;overflow:hidden;">
            <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
                <app-widget-step style="width: 100%;height:100%">
                    {"widget":"app_c-robres-achieve-frame","arr":{{it1.mySort()}},"initCount":5,"addCount":3 }
                </app-widget-step>
            </div>
        </div>
        <widget  w-tag="app_a-widget-pic_other-pic_other" style="position: absolute;left: -4.7%;bottom: -8px;width: 109%;">
            {"icon":"tips_bottom"} 
        </widget>
    </div>
</div>