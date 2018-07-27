<div style="position:absolute;left:0px;top:0;width:100%;height:100%;z-index: 2;">
    
    <app_b-fight-account_head></app_b-fight-account_head>
    {{if it1.account.extra.source === "robres"}}
    <app_b-fight-account_middle_robres></app_b-fight-account_middle_robres>
    {{elseif it1.account.extra.source === "gang_battle"}}
    <app_b-fight-account_middle_gang></app_b-fight-account_middle_gang>
    {{else}}
    <app_b-fight-account_middle></app_b-fight-account_middle>
    {{end}}
    {{let bottom  = it1.account.outcome === "lose" ? 131 : 60}}
    <div style="width: 100%;height: 100%;position: absolute;z-index: 1;top: 0;bottom: 0;" on-tap="goback">
      <div style="position: absolute;bottom:0;left:0;height:180px;width:100%;">
          <app_a-widget-guide-guide>
            {{"close_account"}}
          </app_a-widget-guide-guide>
      </div>
    </div>
    
    <div style="position: absolute;bottom:{{bottom}}px;font-size:20px;width: 100%;color:#ff4830;text-align:center;left:0;">
      <app-widget-cdTime1 ev-countdownend="timeEnd1" style="display:inline-block;vertical-align: middle;">
        {"cd_time":{{it1.exitStartTime+15*1000+50}},"now_time":{{it1.exitStartTime}},"cd_type":"x" }
      </app-widget-cdTime1>
      <span style="font-family:mnjsh;color:rgb(81, 230, 80);padding-left:5px;">秒后退出</span>  
    </div>
    
    <div style="position: absolute;text-align: center;width: 100%;height: 30px;font-size: 20px;color:{{it1.account.outcome === 'lose'? '#9099ac' : '#a88971'}};font-family:mnjsh;bottom: {{bottom+20}}px;" >
      <u>点击这里退出</u>  
      
    </div>
</div>