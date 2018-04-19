<div style="width:100%;height:100%;">
        <div w-class="login_bg"></div>
        <div w-class="logo"></div>
        <div style="width:525px;height:300px;position:absolute;left:50%;margin-left:-262px;top:447px;" ev-input-text="listenInputText">
            {{if !it1.uid}}
            <widget w-tag="app_a-widget-line-line" style="position:absolute;top:-15px;left:-8px;">
                {"line":"line_7"} 
            </widget>
            <widget w-tag="app_a-widget-btn-rect" on-tap="channel(0)" style="position:absolute;width:96px;height:42px;top:-43px;left:18px;">
                {"class":{{it === 0 ? "select" : "not_select"}},"fontsize":22,"color":{{it === 0 ? "#554137" : "#ad8e7c"}},"text":"登 录","width":96,"height":42,"no_shadow":1} 
            </widget>
            <widget w-tag="app_a-widget-btn-rect" on-tap="channel(1)" style="position:absolute;width:96px;height:42px;top:-43px;left:118px;">
                {"class":{{it === 1 ? "select" : "not_select"}},"fontsize":22,"color":{{it === 1 ? "#554137" : "#ad8e7c"}},"text":"注 册","width":96,"height":42,"no_shadow":1} 
            </widget>
            {{end}}

            {{let db = _get("app/mod/db").exports.data}}
            {{let pi = _get("app/mod/pi").exports.Pi}}
            {{let ptFrom = pi.localStorage.ptFrom?JSON.parse(pi.localStorage.ptFrom):null}}
            {{let visible = (!ptFrom || !ptFrom.hide || !ptFrom.hide.register)}}
            {{let wg = ""}}
            {{if it1.uid}}
                {{if it1.select_area}}
                {{: wg = "app_a-user-select_area"}}
                {{else}}
                {{: wg = "app_a-user-logined"}}
                {{end}}
            {{elseif it === 0}}
            {{: wg = "app_a-user-logining"}}
            {{elseif it === 1}}
            {{: wg = "app_a-user-regist"}}
            {{end}}
            <widget w-tag={{wg}}></widget>
        </div>
        <div w-class="bg_2" style="font-size:14px;line-height:20px;color:#949494;text-align:center;z-index:1">
            <div style="position:absolute;width:540px;height:20px;font-family:mnjsh;left:50%;margin-left:-270px;top:30px;">抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。</div>
            <div style="position:absolute;width:540px;height:20px;font-family:mnjsh;left:50%;margin-left:-270px;top:50px;">适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。</div>
            <div style="position:absolute;width:540px;height:20px;font-family:mnjsh;left:50%;margin-left:-270px;top:70px;">著作权人：成都感触网络科技有限公司 出版单位：成都盈众九州网络科技有限公司</div>
            <div style="position:absolute;width:540px;height:20px;font-family:mnjsh;left:50%;margin-left:-270px;top:90px;">批准文号：新广出审{{"["+2018+"]"}}&nbsp;421号 出版号ISBN：978-7-498-03893-7 文网游备字：</div>
            <div style="position:absolute;width:540px;height:20px;font-family:mnjsh;left:50%;margin-left:-270px;top:110px;">川网文{{"["+2016+"]"}}&nbsp;5476-188号 本网络游戏适合年满16周岁以上的用户使用</div>
        </div>
        <div style="width: 100%;height: 30px;position: absolute;font-family: hanyi;font-size: 30px;color: rgb(255, 255, 255);top: 805px;left: 50%;margin-left: -98px;">123456789暴击+-:/</div>

        <div data-desc="错误提示" id="err" style="width:100%;position:absolute;left:0;top:330px;color:#f5f1df;font-family:mnjsh;font-size:15px;text-align: center;z-index:4;">
        </div>
    </div>