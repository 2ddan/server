{{let root = _get("pi/ui/root").exports}}
<div style="position:absolute;left:0;top:0;width:{{root.getWidth()}}px;height:900px;pointer-events: none;">   
    {{let wild = _get("app/mod/db").exports.data.wild}}
    {{let curMission = it1.wild_mission[wild.wild_history]}}
    {{let mission = curMission.guard_name.split(",")}}
    {{let stringNum = mission[1].split("-")}}
    {{let missName = {
      "大漠遗址":"damo","断壁残垣":"duanbi","敦煌洞窟":"dunhuang","旱地绿洲":"handi","枯木古堡":"gumu","骷髅地宫":"kulou","暖冬春雪":"nuanxue","三尺冰川":"sanchi","青青草原":"qingqing","山涧水榭":"shujian","兽人雪窟":"shouren","沼泽湿地":"zaoze"  
    } }}
    {{let minn1 = mission[0]}}
    <div {{if it1.change_map_length >= 1.5}}class="opacityAnim2"{{end}} w-class="change_map_bg " style="width:{{it1.change_map_width * 459}}px;top: 50%;left: 0px;top: 50%;right: 0px;margin: 0 auto;margin-top: -190px;">
        {{if it1.change_map_width>0}}
        <div w-class="map_tips_left" style="position:absolute;left:0px;top:-15px"></div>
        <div w-class="map_tips_left" style="position:absolute;right:0px;transform:scale(-1,1);top:-15px"></div>
        {{end}}

        {{if it1.change_map_width >= 0.5}}
        <app_a-widget-title-single class="opacityAnim1" style="position: absolute;top: 35px;left: 0;right: 0;margin: 0 auto;width: 145px;">
            {"padding":2,"type":10,"width":50,"text":{{minn1}},"fontSize":36,"color":"#763e36","wear":1,"class":1}
        </app_a-widget-title-single>
        
        <div class="opacityAnim1" style="width:100%;height:35px;text-align:center;margin-top:75px;font-size:34px;color:#763e36;font-family:mnjsh;">
            {{mission[1]}}
        </div>
        {{end}}
    </div>
</div>
        