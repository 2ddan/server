{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let cfg = _get("app/mod/pi").exports.cfg}}
{{let tower_welfare=cfg.tower_welfare.tower_welfare}}
{{let tower_aword=tower_welfare[it1.box_id].award}}
<div style="position:absolute;left:50%;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;background-color:rgba(0,0,0,.5);color:#FFF;margin-left:-50%;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
	<div style="width:455px;height:684px;top: 275px;position:relative;margin:0 auto">
        
        <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:455px;height:230px">
            {"bgName":"bg_frame38"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:210px;left:-28px;width:505px">
            {"icon":"tips_bottom"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:-18px;left:-23px;width:497px">
            {"icon":"tips_top"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:7px;left:-14px">
            {"icon":"pendant"}
        </widget>
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;transform: translate(-50%);top: -22px;width:181px;height:31px;font-family: mnjsh;font-size: 20px;">
            {"icon":"cover_title","width":181,"height":31,"textCfg":"gangCoverTitle","text":"预览奖励","fontSize":22} 
        </widget>            
       		
        <widget on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic" style="top:-26px;right: -22px" >
            {"icon":"close"} 
        </widget>

        <div style="position:absolute;top:25px;left:50%;margin-left:-100px;width:210px;height:23px;font-family:mnjsh;font-size:16px;letter-spacing:1px;color:#ffd8a6">
            <widget  w-tag="app_a-widget-pic_text-pic_text">
                {"icon":"little_tips_bg","text":"通过{{it1.specificNum[0]}}层即可获得奖励","width":189,"height":24,"top":2} 
            </widget>
            <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                {"icon":"remind"} 
            </widget>
        </div>

        <div style="position:absolute;top:60px;left:3px;width:450px;height:132px">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:448px;height:132px">
                {"bgName":"bg_frame23"}
            </widget>
            <div  style="width:100%;height:100px;position:absolute;top:23px;z-index:1;text-align: center;">
                {{for i,v of tower_aword}}
                {{let id  = ( v[0]=="money"?100001:v[0]=="diamond"?100002:v[0])}}
                    {{let prop = Pi.sample[id]}}
                    {{let url = Pi.pictures[prop.icon]}}
                    <div style="position:relative;width:70px;height:76px;display:inline-block;margin: 0 10px;">
                        <app_a-widget-prop-base on-tap='showPropInfo("{{id}}")' style="position: relative;display:inline-block;width: 70px;height: 70px">
                            {"prop":{{prop}},"url":{{url}},"count":{{v[1]}}}
                        </app_a-widget-prop-base>
                        <div style="position:absolute;top:75px;left:-10px;background:url(../images/attr_bg4.png);width:94px;height:23px"></div>
                        
                    </div>
                {{end}}
            </div>
            
        </div>


		
	</div>
</div>