
<div  style="position:absolute;top:0;left:0;width:100%">
    <img w-class="21" src="./images/bg_pet.png"/>
    {{let info = it1.role.pet.pet_info}}

    <widget w-class="22" w-tag="app_a-widget-pic_text-pic_text">
        {"icon":"name_bg_2","width":184,"height":32,"text":{{it1.pet_module[it1.pet_upgrade[it1.role.pet.pet_info[0]].module].name}}} 
    </widget>
    
    
    


    
    <div  w-class="27">
        <widget w-class="26" w-tag="app_a-widget-title-single">
            {"padding":10,"type":9,"width":124,"text":{{info[0] + "阶"+ info[1] +"星"}},"fontSize":20,"color":"#b27d5c","wear":0} 
        </widget>
        <widget w-class="28" w-tag="app_a-widget-star-star">
            {"star_light":{{info[1]}},"star_dark":{{10-info[1]}},"margin":3} 
        </widget>
    </div>
    <div  w-class="24">
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:430px;height:120px;left:0;top:0;z-index:1">
            {"bgName":"bg_frame31"} 
        </widget>
        <div style="position:relative;line-height: 30px;top: 15px;font-size: 18px;z-index:2;color:#fff">
            {{if info.length}}
            {{for n,h in it1.petAttr}}
                <div w-class="25">{{it1.attribute_config[n]+"+"+(h<1?Math.floor(h*100)+"%":h)}}</div>
            {{end}}
            {{else}}
            灵宠暂无数据
            {{end}}
        </div>  
    </div>
</div>
