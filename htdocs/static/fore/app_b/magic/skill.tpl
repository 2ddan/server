<div style="width:122px;height:150px;{{if it1.fun_id < it1.function_open['magic_activate'].id}}display:none{{end}}">

    {{if it1 &&  it1.fun_id >= it1.function_open['magic_activate'].id}}
        

    <div style="width:122px;height:150px;position:absolute;top:0px;" on-tap="release">
        {{let r = it1 && it1.magic_atrr ?it1.magic_atrr.skill_energy / it1.magic_atrr.max_energy:0}}
        
        {{let scaleNum = 0}}
        {{if r == 1 }}
       
        <div w-class="max_water" style="left:2px;right:0px;margin:0 auto;top: 49px;z-index:1;"></div>
        <div style="width:170px;height:170px;position: absolute;top: -19px;left: -23.5px;z-index: 1;transform: scale(0.8);overflow:hidden">
            <div class="treasure_full" style="position: absolute;"></div>
        </div>
        
        {{else}}
        {{:scaleNum = Math.sqrt(0.25 -Math.pow(Math.abs(0.5-r),2)) * 2 }}
        {{%% :console.log("skill.tpl能量更新+++++",r,scaleNum)}}
        <div style="width:65px;height:auto;position:absolute;left:2px;right:0px;margin:0 auto;bottom: 35px;z-index:1;">
            <div style="width:65px;height:{{r * 64}}px;position:relative;overflow:hidden;">
                <div w-class="max_water" style="bottom:0px"></div>
            </div>
            <div w-class="water_vein" style="top:-3px;width:{{scaleNum * 62}}px;left:0px;right:0px;margin:0 auto"></div>
        </div>
        {{end}}

        <div w-class="wild_treasure_bg1" style="left:0px;right:0px;margin:0 auto;"></div>        
        <div w-class="fg_glass" style="left:2px;right:0px;margin:0 auto;top: 49px;z-index:2;">
            <app_a-widget-guide-guide>
                {{"magic_release"}}
            </app_a-widget-guide-guide>
        </div>

        {{let type = it1.magic_id && it1.isAutoRelease ? "autoUse" : "autoUseGray"}}
        <div on-tap="autoRelease" w-class='{{type}}'  style="position:absolute;bottom:0px;"> 
            <app_a-widget-guide-guide>
                {{"magic_auto"}}
            </app_a-widget-guide-guide>
        </div>
    </div>
    {{end}}
</div>
