<div style="position:absolute;left:0;top:0;width:100%;z-index:2;bottom:0px;">
    <app-scene-base-scene>{"name":"rebel","newscene":{{it1.map_cfg["rebel"]}}}</app-scene-base-scene>
	<div style="position:absolute;width:420px;height:646px;left:50%;margin-left:-210px;top:0px;">
        <app_c-rebel_army-progress-progress style="left:18px;top:34px;">
            {"text":"全区击杀奖励","type":1,"now":{{it1.total_kill_monster_num}},"aim":{{it1.kill_monster_num[it1.killNumBoxID]}},"is_over":{{it1.killNumBoxID}} }
        </app_c-rebel_army-progress-progress>

        <app_c-rebel_army-progress-progress style="left:18px;top:88px;">
            {"text":"个人输出奖励","type":2,"now":{{it1.total_damage}},"aim":{{it1.kill_monster_damage[it1.damageAwardLevel][it1.damageBoxID]}},"is_over":{{it1.damageBoxID}} }
        </app_c-rebel_army-progress-progress>

        <div class="shadow" w-class="random_award_bg" on-tap="getRandomBoxAward" style="top:144px;left:18px">
            {{if it1.box_num}}
                
            {{end}}
            <div style="position:absolute;width:56px;height:18px;font-size:12px;line-height:18px;color:#f5f5f5;bottom:3px;text-align:center;font-family: mnjsh;">随机宝箱</div>
            <span style="position:absolute;top:0px;left:0px;font-size:12px;font-family: mnjsh;color:#f5f5f5;width:95%;text-align:right;top: 30px;">{{it1.box_num}}</span>
        </div>

        <div style="width:35px;height:35px;line-height:33px;position:absolute;right: 30px;top: 15px;">
            <app_c-widget-diamond-diamond  on-tap="openRank()">
                {"text":"输出排行"}
            </app_c-widget-diamond-diamond>
        </div>

        <div class="exit" style="right:15px;top:85px;" on-tap="exit"></div>
        
        <app_b-magic-skill style="position:absolute;right:0;bottom:120px;"></app_b-magic-skill>

    </div>
</div>