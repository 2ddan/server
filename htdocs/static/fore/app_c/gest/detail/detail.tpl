<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="7" w-sid="7">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
            </widget>
            <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
            </widget>
            <widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"阵法详情","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>
            <div data-desc="阵法详情" w-class="11">
                <div w-class="12">
                    {{for i,v in it}}
                    {{if i>=0}}          
                    <div style="width:426px;height:82px;margin-top:10px;text-align: left;position:relative">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 100%;height: 100%;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch>   
                        {{if i == "0"}}
                        <widget w-tag="app_a-widget-title-single" style="position:absolute;top:8px;left:50%;transform: translateX(-50%);">
                            {"padding":10,"type":9,"width":124,"text":"激 活","textCfg":"singleTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
                        </widget>
                        {{else}}
                        <div w-class="13">
                            <app_a-widget-pic_text-pic_text>
                                {"icon":"gest_star","text":" ","width":134,"heigt":24}
                            </app_a-widget-pic_text-pic_text>
                            <app_a-widget-star-star style="vertical-align: middle;margin-bottom: -2px;display:inline-block;position: relative;">
                                {"star_light":{{i}},"star_dark":0}
                            </app_a-widget-star-star>
                        </div>
                        {{end}}

                        <div data-desc="属性"  w-class="16">
                            {{for m,n of v.attr}}
                            <div w-class="14">
                                {{it1.attribute_config[n[0]]}}:{{n[1]<1 ? Math.floor(n[1]*100) + "%" : n[1]}}
                            </div>
                            {{end}}
                        </div>
                    </div>  
                    
                    {{end}}
                    {{end}}
                </div>   
            </div>  
        </div>      
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>
