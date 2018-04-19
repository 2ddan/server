 
<div style="position:absolute;left:50%;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;background-color:rgba(0,0,0,.5);color:#FFF;margin-left:-50%;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
	<div style="width:455px;height:684px;top: 113px;position:relative;margin:0 auto">
		{{let appCfg = _get("app/mod/db").exports.data}}
        {{let player = appCfg.player}}
        {{let Pi = _get("app/mod/pi").exports.Pi}}
        {{let cfg = _get("app/mod/pi").exports.cfg}}
        {{let Common = _get("app/mod/common").exports.Common}}
        {{let Common_m = _get("app_b/mod/common").exports.Common_m}}
        
        {{let tower_welfare = cfg.tower_welfare.tower_welfare}}
        <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px">
            {"bgName":"bg_frame38"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:675px;left:-28px;width:505px">
            {"icon":"tips_bottom"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:-18px;left:-23px;width:497px">
            {"icon":"tips_top"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:7px;left:-14px">
            {"icon":"pendant"}
        </widget>
		<div style="position: absolute;width:455px;height:684px;z-index:1;">
            <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;transform: translate(-50%);top: -22px;width:181px;height:31px;font-family: mnjsh;font-size: 20px;">
                {"icon":"cover_title","width":181,"height":31,"textCfg":"gangCoverTitle","text":"奖励详情","fontSize":22} 
            </widget>
            
            <widget on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic" style="top:-26px;right: -22px" >
                {"icon":"close"} 
            </widget>

			<div style="position: absolute;width: 455px;top: 30px;overflow: hidden;bottom: 15px;left: 0px;">
				<div scroller="1" style="position: absolute;width: 480px;height: 100%;overflow-x: hidden;overflow-y: auto;z-index: 2;">
                    {{for i in tower_welfare}}
                    
                    <div style="position:relative;width:422px;height:126px;margin-left:16px;margin-bottom:10px;">
                        <widget w-tag="app_a-widget-bg_frame-bg" style="width:422px;height:126px">
                            {"bgName":"bg_frame19"}
                        </widget>
                        <div class="shdaow" style="font-size:22px;color:#ffd8a6;position:relative;display:inline-block;height: 22px;line-height: 22px;top: 53px;left:20px;font-family:mnjsh">{{"通关"+tower_welfare[i].floor_limit+"层"}}</div>
                        <div style="width:290px;height:105px;position:absolute;right:0px;top:15px;overflow:hidden">
                            <div style="width:100%;white-space:nowrap;overflow-y:hidden;overflow-x:auto;height:105px">
                                {{for h,m of tower_welfare[i].award}}
                                {{let id  = ( m[0]=="money"?100001:m[0]=="diamond"?100002:m[0])}}
                                    {{let prop = Pi.sample[id]}}
                                    {{let url = Pi.pictures[prop.icon]}}

                                    <div style="position: relative;display:inline-block;width: 70px;height: 70px;margin: 0 10px;text-align:center;">
                                        <app_a-widget-prop-base on-tap='showPropInfo("{{id}}")' style="position: relative;display:inline-block;width: 70px;height: 70px">
                                            {"prop":{{prop}},"url":{{url}},"count":{{m[1]}}}
                                        </app_a-widget-prop-base>
                                        <div style="position:absolute;top:75px;left:-10px;width:94px;height:23px;background:url(../images/attr_bg4.png) no-repeat center"></div>
                                    </div>
                                {{end}}
                            </div>
                        </div>
                    </div>
                    {{end}}
                </div>
			</div>

		</div>
	</div>
</div>