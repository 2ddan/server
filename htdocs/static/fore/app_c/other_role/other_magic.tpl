<div  style="position:absolute;top:0;left:0;width:100%;z-index:4">
    {{let magic = it1.role.treasure_info}}
		
    <widget w-class="22" w-tag="app_a-widget-pic_text-pic_text">
        {"icon":"name_bg_2","width":184,"height":32,"text":{{ magic.treasure[1] + "阶神兵"}}} 
    </widget>
    


    <div  w-class="24">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:430px;height:120px;left:0;top:0;z-index:1">
            {"bgName":"bg_frame31"} 
        </widget>
        <div style="position:relative;line-height: 30px;top: 15px;font-size: 18px;z-index:2">
            {{if JSON.stringify(it1.magicAttr) !== "{}"}}
            {{for n,h in it1.magicAttr}}
            
			{{if n!== "attr_rate"}}
			<div w-class="25">{{it1.attribute_config[n]+"+"+(h<1?Math.floor(h*100)+"%":h)}}</div>
			{{else}}
			<div w-class="25" style="color:rgb(3, 254, 3)">{{"全属性"+"+"+(h<1?Math.floor(h*100)+"%":h)}}</div>			
            {{end}}
            {{end}}
            {{else}}
            神兵暂无数据
            {{end}}
        </div>  
    </div>
</div>
