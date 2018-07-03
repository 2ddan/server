<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
    <div w-class="3" w-sid="3" style="margin-top: -236px;">
        <div w-class="7" w-sid="7">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            <widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
            </widget>
            <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
            </widget>
            <widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"属性总览","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10" style="height:382px;">
                {"bgName":"bg_frame26"} 
            </widget>
            
            <div scoller="1" data-desc="属性详情" style="width:425px;height:328px;position: absolute;left:12px;top:20px;overflow:hidden;text-align:left;">
                <div class="shadow7" style="width:110%;height:328px;overflow-x:hidden;overflow-y:auto;color:#51e650;font-size:17px;position: absolute;left:0;top:0;z-index:1;line-height: 27px;text-align: justify;">
                    {{for i,v of it}}
                    <div style="position: relative;margin:10px 0;width: 420px;height:auto;left: 3px;">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 100%;height:100%;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch> 
                        <div style="position:relative;z-index: 2;padding: 10px 15px;">
                            <div style="font-size:20px;font-family:mnjsh;color:#ffd8a6">{{v.name}}</div>
                            {{if v.add_exp}}
                            <div>经验收益+{{v.add_exp*100}}%</div>
                            {{end}}
    
                            {{if v.attr[0] !== "undefined"}}
                            <div>{{it1.attribute_config[v.attr[0]]}}+{{v.attr[1]<1?(v.attr[1]*100+"%"):v.attr[1]}}</div>
                            {{end}}
    
                            {{if v.buff_id}}
                            <div>{{it1.buff[v.buff_id].desc}}</div>
                            {{end}}
                        </div>
                        
                    </div>
                    {{end}}
                    
                </div>   
            </div>  
        </div>      
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15" style="top:390px;">{"icon":"tips_bottom"} </widget>
    </div>
</div>
