
<div style="position:absolute;width:540px;height:900px;left:50%;margin-left:-270px;top:0px;">

    <div style="position:absolute;width:540px;height:90px;text-align:center;top:55px;">
        {{for i, v in it1.guild_upgrade}}
        <div on-tap="getSalary()" style="position:relative;width:90px;height:90px;display:inline-block;color:#ffffff;font-family:mnjsh;margin:0px 10px;font-size:20px;">
            {{if v.level == it1.gangData.gang_level}}
                {{if it1.gangExpandData.gang_salary}}
                <div style="height: 50px;width:60px;position: absolute;">已领取</div>
                {{else}}
                <div>领取</div>
                {{end}}
            {{else}}
            <div>不可领取</div>
            {{end}}
        </div>
        {{end}}
    </div>
    <widget on-tap='goback' w-tag="app_a-widget-btn_pic-btn_pic">{"icon":"close"} 
    </widget>
</div>