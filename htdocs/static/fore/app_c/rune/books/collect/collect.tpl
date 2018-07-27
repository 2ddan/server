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
                {"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"收集总览","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
            </widget>
        </div>
        
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>
            {{let has = it1.rune_data.rune_collect.length || 0}}
            <div data-desc="数量" w-class="16">
                <widget w-tag="app_a-widget-rank-rank_title" style="width:440px;left:5px;top:0;" >
                    {"height":40}
                </widget>
                <app_a-widget-text-text  style="position: relative;z-index: 2;margin-top: 11px;">
                    {"text":{{"符文收集（已获得："+ has +"）"}},"textCfg":"heroEquip","fontSize":20,"space":-2}
                </app_a-widget-text-text>
            </div>
            <div scoller="1" data-desc="属性详情" style="width:425px;height:286px;position: absolute;left:12px;top:60px;overflow:hidden;text-align:left;">
                <div class="shadow7" style="width:110%;height:274px;overflow-x:hidden;overflow-y:auto;font-size:20px;position: absolute;left:0;top:0;z-index:1;line-height: 27px;text-align: justify;">
                    {{for i,v of it1.rune_collect}}
                    <div style="position: relative;margin-top:{{i ? 10 : 0}}px;width: 420px;height:auto;left: 3px;color:{{has >= v.num ? '#51e650' : '#919191'}};">
                        <app_a-widget-img_stitch-stitch style="position: absolute;width: 100%;height:100%;">
                            {"type":2,"height":20,"width":30}
                        </app_a-widget-img_stitch-stitch> 
                        <div style="position:relative;z-index: 2;padding: 10px 15px;">
                            <div style="font-family:mnjsh;color:{{has >= v.num ? '#ffd8a6' : '#919191'}}">收集{{v.num}}个秘籍</div>
                            {{for j,k of v.attr}}
                            {{if it1.attribute_config[k[0]]}}
                            <div style="font-size:17px;">{{it1.attribute_config[k[0]]}}+{{k[1]<1?(k[1]*100+"%"):k[1]}}</div>
                            {{end}}
                            {{end}}
                        </div>
                        
                    </div>
                    {{end}}
                    
                </div>   
            </div>  
        </div>      
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15" >{"icon":"tips_bottom"} </widget>
    </div>
</div>
