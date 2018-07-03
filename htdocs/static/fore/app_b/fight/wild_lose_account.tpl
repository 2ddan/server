<div style="position:absolute;left:0px;top:0;width:100%;height:100%;">
    
    <div style="position: relative;width: 540px;height: 211px;left:50%;margin-left:-270px;top:100px;">
        <div style="width:100%;height:35px;position:relative"></div>
        <div w-class="lose_title"></div>
    </div>
    <div style="height:auto;position:relative;width:519px;left:50%;margin-left:-260px;top: 105px;padding-bottom: 24px;padding-top:14px;">
      <img style="position:absolute;top:0;left:0;z-index:1;" src="./images/lose_top.png"/>
      <img style="position:absolute;bottom:0;left:0;z-index:1;" src="./images/lose_bottom.png"/>
      <div style="position:relative;top:9px;left:0;z-index:2;">
        <widget style="position:absolute;top:6px;left:50%;transform:translateX(-50%)" w-tag="app_a-widget-title-single" >
            {"padding":10,"type":14,"text":"我要变强","textCfg":"changeStrong","fontSize":20,"space":-2,"color":"#b27d5c","wear":0} 
        </widget>
        <div class="shadow8" style="font-size:18px;font-family:mnjsh;color:#e6c8a1;text-align:center;padding-top: 42px;padding-bottom: 10px;">通过以下途径提升战斗力</div>
        <div style="position:relative;margin:0 auto;width:390px;height:auto;min-height:117px;">
            {{for i, v in it1.config_stronger}}
            {{if !v.fun_key || it1.fun_id >= it1.function_open[v.fun_key].id}}
            <app-widget-btn-menu on-tap='wildMenu("{{v.goto}}")' style="position:relative;margin:0 1px">
                {"icon":{{v.icon}},"text":{{v.name}},"width":95,"height":95,"bottom":6,"fontSize":20 ,"bg":5,"imgWidth":90,"space":{{v.name.length>2?-6:-4}}}
            </app-widget-btn-menu>
            {{end}}
            {{end}}
        </div>
      </div>
    </div>




    <div style="width: 100%;height: 100%;position: absolute;z-index: 1;top: 0;bottom: 0;" on-tap="closeLoseAccount"></div>
    <div style="position: absolute;bottom:131px;font-size:20px;width: 100%;color:#ff4830;text-align:center;left:0;">
      <app-widget-cdTime1 ev-countdownend="closeLoseAccount" style="display:inline-block;vertical-align: middle;">
        {"cd_time":{{it1.exitStartTime+15*1000}},"now_time":{{it1.exitStartTime}},"cd_type":"x" }
      </app-widget-cdTime1>
      <span style="font-family:mnjsh;color:rgb(81, 230, 80);padding-left:5px;">秒后退出</span>  
    </div>
    
    <div style="position: absolute;text-align: center;width: 100%;height: 30px;font-size: 20px;color:#9099ac;font-family:mnjsh;bottom: 151px;" >
      <u>点击这里退出</u>  
      
    </div>
</div>