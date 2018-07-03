<div style="height:auto;position:relative;width:519px;left:50%;margin-left:-260px;top: 85px;padding-bottom: 24px;padding-top:14px;">
    {{let checkTypeof = _get("app/mod/db").exports.checkTypeof}}
    {{let Pi = it1.Pi}}
    {{let career_id = it1.player.career_id}}
    {{let img = it1.account.outcome === "win" ? "win" : "lose"}}
    <img style="position:absolute;top:0;left:0;z-index:1;" src="./images/{{img}}_top.png"/>
    <img style="position:absolute;bottom:0;left:0;z-index:1;" src="./images/{{img}}_bottom.png"/>
    <div style="position:relative;top:9px;left:0;z-index:2;font-family:mnjsh;font-size:22px;color:#f3d6af;">
        <div style="height:auto;width:100%;position:relative;text-align: center;">
            <div class="shadow13" style="padding: 6px 0 20px;line-height: 34px;">
                {{if it1.account.outcome === "win"}}
                <div>你战胜了<span style="color:#ff4800">{{"["}}玩家名字{{"]"}}</span></div>
                <div>成功打掉敌方{{"["}}左城门{{"]"}}<span style="color:#ff4800">400血量</span></div>
                {{else}}
                <div>你在战斗中战败于<span style="color:#ff4800">{{"["}}玩家名字{{"]"}}</span></div>
                <div>损耗地方{{"["}}左城门{{"]"}}<span style="color:#ff4800">40血量</span></div>
                {{end}}
            </div>
            <widget w-tag="app_a-widget-line-line" style="position:absolute;bottom:0px;left:20px;width:479px;height:4px;">
                {"line":"line_10"}
            </widget>
        </div>
        
        <div style="position:relative;top:0;left:0;width:100%;height:100%;height: 215px;">
            <widget style="position:absolute;top:20px;left:50%;transform:translateX(-50%)" w-tag="app_a-widget-title-single" >
                {"padding":10,"type":10,"text":"战斗奖励","textCfg":"singleTitle","fontSize":22,"space":-2,"color":"#b27d5c","wear":0} 
            </widget>
            <div style="width:406px;height: 100px;text-align: left;position:relative;top:85px;left:47.5%;margin-left:-203px;">
                <div class="shadow13" style="position:absolute;top:0px;left:75px;width:250px;line-height: 40px;">
                    <div>门派贡献:<span style="color:#12ff00">65464</span></div>
                    <div>个人战绩:<span style="color:#12ff00">999</span></div>
                </div>
                <div style="width:130px;height:55px;color:#554137;font-size:16px;position:absolute;top:18px;left:250px;">
                    <app_a-widget-pic_text-pic_text style="position:absolute;">
                        {"icon":"account_gang","width":130,"height":55,"text":" "} 
                    </app_a-widget-pic_text-pic_text>
                    <div style="position:absolute;top:17px;left:0px;text-align: center;width:100%;transform: rotate(-5deg)">建设收益+15%</div>
                </div>
            </div>
        </div>
    </div>
</div>