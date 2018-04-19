<div maxId="23" style="position:absolute;width:100%;height:100%;z-index:2" w-class="2" w-sid="2">
    <app_b-widget-title-title w-class="3" w-sid="3">
        {"text":"心法副本","coin":["money","diamond"],"left":5,"top":10,"r":[["money",0],["dimond",0],["dimond",0]],"type":""} 
    </app_b-widget-title-title>

    <div w-class="4" w-sid="4">
        <app_a-widget-bg_frame-bg w-class="9" w-sid="9">
            {"bgName":"bg_frame21"} 
        </app_a-widget-bg_frame-bg>
        <app_a-widget-line-line w-class="6" w-sid="6">
            {"line":"line_7"} 
        </app_a-widget-line-line>
        <img w-class="19" src="app_c/gest/image/gest_fb_bg2.png" w-sid="19"/>

        <div w-class="5" w-sid="5">
            <app_a-widget-title-single w-class="13" w-sid="13">
                {"padding":20,"type":"11","width":"138","text":"奖励信息","textCfg":"singleTitle","fontSize":"20","space":"-2","color":"#b27d5c","wear":"0","class":"0"}
            </app_a-widget-title-single>
            <app_a-widget-btn-rect on-tap='inherit(5)' w-class="14" w-sid="14">
                {"class":{{it1.player.diamond<it1.gest_base.five_price ?"disabled":"hl"}},"fontsize":24,"color":"#fdedd7;","text":"传承五次","width":"116","height":"45","marginLeft":"0","tip_keys":["explore.gest.inherit.5"]}
            </app_a-widget-btn-rect>
            <app_a-widget-coin-coin w-class="22" w-sid="22" style="color:#{{it1.player.diamond<it1.gest_base.five_price?'e02322':'f0f0f0'}}">
                {"icon":"diamond","width":"25","height":"21","left":"3","text":[{{it1.gest_base.five_price}}] } 
            </app_a-widget-coin-coin>

            <app_a-widget-btn-rect on-tap='inherit(1)' w-class="20" w-sid="20">
                {"class":{{it1.player.diamond<it1.gest_base.one_price ?"disabled":"default"}},"fontsize":24,"color":"#fdedd7;","text":"传承一次","width":"116","height":"45","marginLeft":"0","tip_keys":["explore.gest.inherit.1"]} 
            </app_a-widget-btn-rect>
            <app_a-widget-line-line w-class="18" w-sid="18">
                {"line":"line_10"} 
            </app_a-widget-line-line>
            {{let num = it1.gest_base.day_count-it1.gest_count[0]}}
            {{if num > 0}}
            <span w-class="21" w-sid="21">
                今日免费次数:
                <span style="color:#51e80f;padding-left: 8px;">{{num > 0 ? num : 0}}</span>
            </span>
            {{else}}
                <app_a-widget-coin-coin w-class="22" w-sid="22" style="left:55px;color:#{{it1.player.diamond<it1.gest_base.one_price?'e02322':'f0f0f0'}}">
                    {"icon":"diamond","width":"25","height":"21","left":"3","text":[{{it1.gest_base.one_price}}] } 
                </app_a-widget-coin-coin>
            {{end}}
        </div>
    </div>
</div>