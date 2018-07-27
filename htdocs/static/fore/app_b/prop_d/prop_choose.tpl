<div maxId="33" style="position:absolute;width:100%;height:100%;" w-class="29 " test="test" w-sid="29">
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let count = Common.getBagPropById(it.sid)}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let choose_box = cfg.choose_box.choose_box}}
    <div w-class="3" w-sid="3">
        <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">
            {"icon":"tips_top"} 
        </widget>
        
        <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">
            {"icon":"tips_bottom"} 
        </widget>
        <widget w-class="6" w-tag="app_a-widget-bg_frame-bg" w-sid="6">
            {"bgName":"bg_frame26"} 
        </widget>
        <widget w-class="9" w-tag="app_a-widget-pic_text-pic_text" w-sid="9">
            {"icon":"cover_title","width":184,"height":33,"align":"center","marginLeft":3,"text":"批量使用","textCfg":"gangCoverTitle","space":0,"fontSize":22,"top":3,"left":0} 
        </widget>
        <div w-class="10" w-sid="10">
            <widget w-class="13" w-tag="app_a-widget-bg_frame-bg" w-sid="13">
                {"bgName":"bg_frame23"} 
            </widget>
            <div w-class="14" w-sid="14">
                {{for i, v of choose_box[it.sid]}}
                <div w-class="25" w-sid="25">
                    
                    {{let p = Pi.sample[v[0]]}}

                    {{if isNaN(p.quality)}}
                    {{let _quality = p.quality[1]}}
                    {{else}}
                    {{let _quality = p.quality}}
                    {{end}}

                    {{let img = Pi.pictures[p.icon]}}
                    <widget w-class="30" w-tag="app_a-widget-prop-base" class="shadow" on-tap='propInfoShow({{v[0]}})'>{"width":80,"height":80,"prop":{{p}},"url":{{img}},"count":{{v[1]}},"name":"","bg":"","bottom":21,"top":26,"right":9} 
                    </widget>
                    <widget w-class="31" w-tag="app_a-widget-chosen-chosen" w-sid="31" on-tap="chooseIndexClick({{i-0+1}})">{"index":{{i-0+1}},"index1":{{it.chooseIndex}} }</widget>
                    
                    <widget w-class="32" w-tag="app_a-widget-img_stitch-stitch" w-sid="32">{"type":2,"width":30,"height":20} 
                    </widget>
                </div>
                {{end}}
            </div>
            {{let _obj = {count:1,step:[1,10],minCount:1,maxCount:count[1].count} }}
            <widget w-class="23" w-tag="app_a-widget-number-number" w-sid="23" ev-selectcount="selectcount">
                {{_obj}}
            </widget>
            <widget w-class="24" on-tap="usePropx({{count[0]}})" w-tag="app_a-widget-btn-rect" w-sid="24">
                {"class":"default","fontsize":24,"color":"#fdedd7;","text":"使  用","width":110,"height":40,"marginLeft":0} 
            </widget>
        </div>
        <widget w-class="11" w-tag="app_a-widget-pic_other-pic_other" w-sid="11">
            {"icon":"pendant"} 
        </widget>
        <widget w-class="12" on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="12">
            {"icon":"close"} 
        </widget>
    </div>
</div>