<div ev-anim_complete="animBack" style="height: 54px;width: 420px;position:absolute;top: 385px;left:70px;">
    <div style="position: absolute;right:95px;top:45px;height: 38px; line-height: 38px; font-size: 33px;color:{{it.oldPower < it.newPower?'rgb(183,255,59)':'rgb(255, 108, 0)'}};text-shadow: 3px 3px 1px rgba(0,0,0,.4);font-family: mnjsh;">{{if it.oldPower < it.newPower}}+{{it.newPower - it.oldPower}}{{else}}{{it.newPower - it.oldPower}}{{end}}
    </div>
    <div class="fight_power_bg powerNumAnim" style="position: absolute;right: 0px; top: 22px;color: rgb(253,206,132);z-index: 11;font-size: 20px;padding: 1px;text-shadow: 1px 2px 1px rgba(0,0,0,.5)">
        <num_scroll$ style="width:210px;margin-left: 135px;letter-spacing:2px;margin-top: 51px;font-size: 31px;font-family: mnjsh;">{"oldPower":{{it.oldPower}},"newPower":{{it.newPower}}}</num_scroll$>
    </div>
</div>