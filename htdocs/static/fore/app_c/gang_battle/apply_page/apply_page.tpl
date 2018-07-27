<div style="position:absolute;width:450px;height:230px;left:50%;margin-left:-225px;top:230px;color:white;">
    <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:450px;height:230px;left:0;top:0;">
        {"bgName":"bg_frame35"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;top:-20px;">
        {"icon":"tips_top"} 
    </widget>
    <widget w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;left:-37px;bottom:-20px;">
        {"icon":"tips_bottom"} 
    </widget>

    <widget w-tag="app_a-widget-pic_text-pic_text" style="position:absolute;left: 50%;transform: translate(-50%);top:-22px;">
        {"icon":"cover_title","width":181,"height":31,"align":"center","marginLeft":3,"text":"门派战报名","textCfg":"singleTitle","space":-2,"fontSize":22,"top":0,"left":0} 
    </widget>
    
    <widget style="position:absolute;right:-21px;top:-24px;" w-tag="app_a-widget-btn_pic-btn_pic" on-tap="goback">
        {"icon":"close_light"} 
    </widget>
        
    <widget style="position:absolute;left:-14px;top:7px;z-index:3;" w-tag="app_a-widget-pic_other-pic_other">
        {"icon":"pendant"} 
    </widget>

    <div style="position:absolute;width:443px;height:120px;overflow:hidden;top:30px;left:4px;">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:470px;height:120px;left:50%;transform:translate(-50%);">
            {"bgName":"bg_frame36"} 
		</widget>
		<div style="font-family: mnjsh;font-size: 20px;color: red;height: 40px;line-height: 20px;text-align: center;width:350px;left: 50%;margin-left: -175px;position: absolute;top:36px;">
			<div style="height: 20px;">报名时间:周一(00:00)到周二(10:00)</div>
			<div style="height: 20px;">门主和副门主可以报名</div>
		</div>
    </div>
	
	{{if it1.type == 1}}
	<app_a-widget-btn-rect style="position:absolute;left:60px;bottom: 16px" on-tap="goback">
        {"text":"考虑一下","class":"default","fontsize":24,"width":116,"height":45}
	</app_a-widget-btn-rect>
	<app_a-widget-btn-rect style="position:absolute;right:60px;bottom: 16px" on-tap="enroll">
        {"text":"报 名","class":"hl","fontsize":24,"width":116,"height":45}
	</app_a-widget-btn-rect>
    {{elseif it1.type == 2}}
	<app_a-widget-btn-rect style="position:absolute;left:50%;margin-left:-58px;bottom: 16px" on-tap="goback">
        {"text":"权限不足","class":"disabled","fontsize":24,"width":116,"height":45}
	</app_a-widget-btn-rect>
    {{elseif it1.type == 3}}
    <app_a-widget-btn-rect style="position:absolute;left:50%;margin-left:-58px;bottom: 16px" on-tap="goback">
        {"text":"报名结束","class":"disabled","fontsize":24,"width":116,"height":45}
	</app_a-widget-btn-rect>
    {{end}}
</div>