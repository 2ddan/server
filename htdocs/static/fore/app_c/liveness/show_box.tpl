{{let Pi = _get("app/mod/pi").exports.Pi}}
{{let liveness_box = _get("cfg/c/liveness_box").exports.liveness_box}}


<div style="position:absolute;left:50%;top:0;width:100%;z-index:2;bottom:0;overflow:hidden;background-color:rgba(0,0,0,.3);color:#FFF;margin-left:-50%;text-shadow: 1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000;">
    <div style="width:455px;height:684px;top: 320px;position:relative;margin:0 auto">
        <widget w-class="78" w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:455px;height:195px">
            {"bgName":"bg_frame38"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:185px;left:-28px;width:505px">
            {"icon":"tips_bottom"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:-18px;left:-23px;width:497px">
            {"icon":"tips_top"}
        </widget>
        <widget w-class="78" w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;top:7px;left:-14px">
            {"icon":"pendant"}
        </widget>
        <widget w-tag="app_a-widget-pic_text-pic_text" style="position: absolute;left: 50%;transform: translate(-50%);top: -22px;width:181px;height:31px;font-family: mnjsh;font-size: 20px;">
            {"icon":"cover_title","width":181,"height":31,"textCfg":"gangCoverTitle","text":"箱子奖励","fontSize":22} 
        </widget>         
        <div on-tap="cancel" class="popups_close"></div>
        <div style="position:relative;width:100%;top:40px;left:3px;box-sizing: border-box;text-align: left;">
            <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;top:5px;width:448px;height:132px">
                {"bgName":"bg_frame23"}
            </widget>
            <div  style="width:100%;height:100px;position:absolute;top:23px;z-index:1;text-align: center;">
                {{for i, v of liveness_box[it].award}}
                {{let id  = ( v[0]=="money"?100001:v[0]=="diamond"?100002:v[0])}}
                {{if v[1]}}
                {{let prop = Pi.sample[v[0]]}}
                {{let url = Pi.pictures[prop.icon]}}
                    <div style="position:relative;width:70px;height:76px;display:inline-block;margin: 0 10px;">
                        <app_a-widget-prop-base style="position: relative;display:inline-block;width: 70px;height: 70px"  on-tap='showPropInfo("{{id}}")'>
                            {"prop":{{prop}},"url":{{url}},"count":{{v[1]}}}
                        </app_a-widget-prop-base>
                        
                    </div>
                {{end}}
                {{end}}
            </div>
        </div>
    </div>
</div>