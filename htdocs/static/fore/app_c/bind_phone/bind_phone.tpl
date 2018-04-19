
<div data-desc={{it1.act_name}} style="position:absolute;width: 100%;top:0;bottom:0;z-index:2;">
	<div w-class="bindphone_bg"></div>
	<img style="position:absolute;top:2px;left:0px;width:100%;" src="../images/fest_title.png" />
    <div style="position:absolute;top:25px;left:50%;transform:translateX(-50%);">{"text":"绑定手机即可领取","textCfg":"festTitle","fontSize":20}</div>

    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let appCfg = _get("app/mod/db").exports.data}}
	{{let special_reward =_get("cfg/c/special_reward").exports.special_reward}}

    <div style="position:absolute;z-index:4;top:81px;width:100%;height:95px;text-align:center;">
        {{for i, v of special_reward.phone}}
			{{let prop = Pi.sample[v[0]]}}
            <div style="position:relative;display:inline-block;width:63px;height:63px;margin: 10px 5px;" on-tap="propInfoShow({{prop.sid}})">
                {"prop":{{prop}},"count":{{v[1]}},"url":{{Pi.pictures[prop.icon]}} }
            </div>
        {{end}}
	</div>

	{{let _phoneNum = appCfg.player.phone}}
	<div style="position: absolute;top:197px;left: 0px;width: 100%;height: 160px;">
		{{if !_phoneNum}}
		<input w-class="text_input" id="input1" autocomplete="off" type="text" on-tap="getClick(1)" value="请输入您的手机号" maxlength="11" style="top:12px;"/>
		<input w-class="text_input" id="input2" autocomplete="off" type="text" on-tap="getClick(2)" value="请输入您的验证码" style="top:70px;"/>

		<app-widget-btn-vein style="height:40px;width:92px;font-size:17px;right:59px;top:12px;" on-tap={{if it1.onOff}}setTime{{end}}>{"text":{{it1.time}} }</app-widget-btn-vein>
		{{end}}

		{{if _phoneNum}}
		<div style="width: 100%;height:50px;line-height:50px;font-size:24px;color:#efaf55;position:absolute;top: 24px;text-align: center;">已经成功绑定手机</div>
		<div style="width: 100%;height:50px;line-height:50px;font-size:24px;color:#ffffff;position:absolute;top: 89px;text-align: center;">{{_phoneNum}}</div>
		{{else}}
        <app-widget-btn-inset style="font-size:26px;top:160px;left:50%;margin-left:-55px;width:110px;height:40px;" on-tap="sureClick">{"class":3,"text":"确定"}</app-widget-btn-inset>
		{{end}}
	</div>
</div>