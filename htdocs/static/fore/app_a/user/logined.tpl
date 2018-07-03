<div style="position:absolute;left:50%;top:164px;margin-left:-200px;width:400px;height:150px;">
    {{let area = 0}}
    {{if it1.country.areas}}
        {{: area = it1.country.areas[it1.country.defaulteServer]}}
    {{end}}

    <div w-class="name_bg" style="color:#ffd8a6;font-size:24px;font-family:mnjsh;" on-tap="openSelectArea">  
        <div style="height:59px;line-height:59px;text-align:center;position:absolute;width:80px;left:70px;">{{area.index}}服</div>
        <div style="height:59px;line-height:59px;text-align:center;position:absolute;width:160px;left:50%;margin-left:-80px;">{{area.name}}</div>
        <div style="height:59px;position:absolute;width:80px;right:70px;">
            <app_a-widget-pic_other-pic_other style="position:absolute;width:44px;height:28px;position:absolute;top:18px;">
                {"icon":"drop_down"}
            </app_a-widget-pic_other-pic_other>
        </div>
    </div>
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let bol = Pi.debug}}
    {{if bol}}
    <div w-class="create" on-tap="logOut" style="top:85px;left:80px;">
        <div style="position:absolute;width:100%;height:50px;line-height:50px;text-align:center;color:#ffd8a6;top:4px;font-family:mnjsh;font-size:24px;">切换账号</div>
    </div>
    {{end}}
    <div w-class="create" on-tap="goIntoGame" style="top:85px;left:{{bol ? '310px' : '50%'}};">
        <div style="position:absolute;width:100%;height:50px;line-height:50px;text-align:center;color:#ffd8a6;top:4px;font-family:mnjsh;font-size:24px;">进入游戏</div>
    </div>
</div>