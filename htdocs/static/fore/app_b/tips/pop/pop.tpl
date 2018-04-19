<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%" w-sid="2">
    <div w-class="3" w-sid="3">
        <div w-class="7" w-sid="7">
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
            </widget>
            {{if it.btn_name[1]}}
            <widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
            </widget>
            {{end}}
            <widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
            </widget>
        </div>
        <div w-class="9" w-sid="9">
            <widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10">
                {"bgName":"bg_frame26"} 
            </widget>
            <widget w-class="11" w-tag="app_a-widget-bg_frame-bg" w-sid="11">
                {"bgName":"bg_frame23"} 
            </widget>
        </div>
        <div w-class="16">
            {{if it.to_time}}
            <span ev-countdownend="timeEnd" style="display:inline-block;margin-top:20px;color:#fff;text-align:center;line-height:30px;">
                <app-widget-cdtime style="display:inline-block;">
                    {cd_time:{{it.to_time}},cd_not_zerofill:true}
                </app-widget-cdtime>
            </span>
            {{end}}
            <pi-ui-html style="display:inline-block">{{it.title}}</pi-ui-html>
        </div>
        {{if it.status}}
        <div on-tap="status"  style="position: absolute;top: 174px;left: 50%;transform: translateX(-50%);">
           
            <widget w-tag="app_a-widget-chosen-chosen" style="position:relative; display: inline-block;">
                {"index":1,"index1":{{it.remind}},"width":18,"height":18}
            </widget>
            <app-widget-text-text style="vertical-align: middle;margin-left: 24px;margin-top: -7px;">
                {"textCfg":"confirm_tips","text":"不再提示"}
            </app-widget-text-text>
        </div>
        {{end}}   

        <div w-class="12" w-sid="12">
            
            {{if it.btn_name[1]}}
            <widget on-tap='cancel'  w-class="13" w-tag="app_a-widget-btn-rect">
                {"class":"default","fontsize":24,"color":"","text":{{it.btn_name[1]}},"width":116,"height":45} 
            </widget>
            {{end}}
            {{if it.btn_name[0]}}
            <div w-class="14" style="{{if !it.btn_name[1]}}right:185px;{{end}}">
                <widget  on-tap="ok" w-tag="app_a-widget-btn-rect" >
                    {"class":"hl","fontsize":24,"color":"#fdedd7;","text":{{it.btn_name[0]}},"width":116,"height":45} 
                </widget>
                {{if it.icon}}
                    {{for k,v in it.icon}}
                    <div class={{k}} style="position:absolute;left:90px;top:10px;white-space:nowrap;">
                         <span style="margin-left:30px;color:#fff;">{{v}}</span>
                    </div>
                    {{end}}
                {{end}}
            </div>
            {{end}}
        </div>
        <widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15">{"icon":"tips_bottom"} 
        </widget>
    </div>
</div>