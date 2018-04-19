<div w-class="bg_3" style="height:320px;font-size:24px;">
    <app_a-user-error_tip>{"err":{{it1.err.regist}}}</app_a-user-error_tip>

    <div w-class="name_bg" style="top:20px;">  
        <app-widget-input style="left:50%;margin-left:-150px;top:6px;position:absolute;width:300px;height:42px;text-align:center;color:#ffd8a6;border:none;font-size:24px;font-family:mnjsh;background-color: transparent;padding:0;">{sign:{{Date.now()}}, text:{{it1.username}}, id:"username", placeholder:"用 户 名"}</app-widget-input>
    </div>
    <div w-class="name_bg" style="top:90px;">  
        <app-widget-input style="left:50%;margin-left:-150px;top:6px;position:absolute;width:300px;height:42px;text-align:center;color:#ffd8a6;border:none;font-size:24px;font-family:mnjsh;background-color: transparent;padding:0;">{sign:{{Date.now()}}, text:{{it1.password}}, id:"password",type:"password", placeholder:"密 码"}</app-widget-input>
    </div>
    <div w-class="name_bg" style="top:160px;">  
        <app-widget-input style="left:50%;margin-left:-150px;top:6px;position:absolute;width:300px;height:42px;text-align:center;color:#ffd8a6;border:none;font-size:24px;font-family:mnjsh;background-color: transparent;padding:0;">{sign:{{Date.now()}}, text:{{it1.repassword}}, id:"repassword",type:"password", placeholder:"密 码"}</app-widget-input>
    </div>

    <div w-class="create" on-tap="registuser" style="top:235px;">
        <div style="position:absolute;width:100%;height:50px;line-height:50px;text-align:center;color:#ffd8a6;top:4px;font-family:mnjsh;">立即注册</div>
    </div>

</div>