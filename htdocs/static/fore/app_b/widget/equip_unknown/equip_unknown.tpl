<div on-tap='cancel' maxId="34" test="test" style="position: absolute;width: 100%;height: 100%;z-index:10" w-sid="2">
    {{let career_id = it1.player.career_id}}
    <div w-class="3" w-sid="3">
       
        <app_a-widget-img_stitch-stitch w-class="4" w-sid="4">
            {"type":1,"height":15,"width":15}
        </app_a-widget-img_stitch-stitch>
        
        <widget w-class="21" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="21">
            {"icon":"close"} 
        </widget>
        {{let prop = it1.Pi.sample[it1.id]}}
        {{let icon = prop.module[prop.career_id.indexOf(career_id)][0]}}
        {{let url =  it1.Pi.pictures[icon]}}
        {{let n = prop.name[prop.career_id.indexOf(career_id)]}}
        <div style="position:relative;z-index:2;height: 100%;box-sizing: border-box;">
            <div  w-class="10" w-sid="10" style="margin-top:13px;">
                我的装备
                <widget w-class="11" w-tag="app_a-widget-line-line" w-sid="11">
                    {"line":"line_8"} 
                </widget>
            </div>
            <div w-class="5" w-sid="5">
                {{let prop = it1.mine}}
                {{if prop}}
                {{let icon = prop.module[prop.career_id.indexOf(career_id)][0]}}
                {{let url =  it1.Pi.pictures[icon]}}
                {{let n = prop.name[prop.career_id.indexOf(career_id)]}}
                <app_a-widget-prop-base  style="position:absolute;top: 12px;left: 12px;">
                    {"prop":{{prop}},"url":{{url}},"width":74,"height":74,"count":"none","name":"none","bg":0}
                </app_a-widget-prop-base>
                <div  w-class="6" w-sid="6">

                    <div  w-class="10" w-sid="10" style="margin-top:7px;;color:#51e650;padding:0">
                        {{n}} <span style="padding-left:6px;">{{prop.level + "级"}}</span>
                    </div>
                    <div w-class="7" w-sid="7" style="background-repeat:no-repeat;background-size: auto;background-position: 0 0;margin-top: -10px;">
                        <app_a-widget-text-text style="vertical-align:middle;white-space: nowrap;position:relative;top: 3px;">
                            {"text":{{"评分(" + prop.grade + ")"}},"textCfg":"scoring","fontSize":20,space:-3}
                        </app_a-widget-text-text>
                    </div>
                </div>
                {{else}}
                <div w-class="8">此部位暂无装备</div>  
                {{end}}
                
            </div>

            <div data-desc="分割线" style="position:relative;left: 0;top: 0;width: 100%; height: 2px;">
                <widget style="left: 0;top: 0;width: 100%; height: 2px;" w-tag="app_a-widget-line-line">
                    {"line":"line_8"} 
                </widget>
            </div>
            

            <div w-class="5" w-sid="5">
                <app_a-widget-prop-base  style="position:absolute;top: 12px;left: 12px;">
                    {"prop":{{prop}},"url":{{url}},"width":74,"height":74,"count":"none","name":"none","bg":0}
                </app_a-widget-prop-base>
                <div  w-class="6" w-sid="6">
    
                    <app_a-widget-text-text style="vertical-align: middle;margin-top: 7px;">
                    {"textCfg":"heroEquip","fontSize":22,"text":{{n + " "+ prop.level[1] + "级"}} }
                    </app_a-widget-text-text>
    
                    <div w-class="7" w-sid="7" >
                        <app_a-widget-text-text style="vertical-align:middle;white-space: nowrap;position:relative;top: 3px;">
                            {"text":"{{'评分???(' + it1.grade[0]+'-'+it1.grade[1]+')'}}","textCfg":"scoring","fontSize":20,space:-3}
                        </app_a-widget-text-text>
                    </div>
    
                </div>
                
            </div>
            
            <div  w-class="10" w-sid="10" style="margin-top:5px;">
                基础属性
                <widget w-class="11" w-tag="app_a-widget-line-line" w-sid="11">
                    {"line":"line_8"} 
                </widget>
            </div>
            <div  w-class="12" w-sid="12">
                {{it1.attr.base[0][0]}}&nbsp;+???&nbsp;({{it1.attr.base[0][1]}})
            </div>
            <div  w-class="10" w-sid="10">
                附加属性
                <widget w-class="11" w-tag="app_a-widget-line-line" w-sid="11">
                    {"line":"line_8"} 
                </widget>
            </div>
            <div  w-class="12" w-sid="12" style="color:#51e650;">
                {{for i,v of it1.attr.add}}
                <div>{{ v[0] }}&nbsp;+???&nbsp;({{ v[1] }})</div>
                {{end}}
            </div>
    
            <div class="shadow6" w-class="20">
                <widget  w-tag="app_a-widget-pic_text-pic_text">
                    {"icon":"little_tips_bg","text":"拥有后自动鉴定装备属性","width":230,"height":24,"top":2} 
                </widget>
                <widget  w-tag="app_a-widget-pic_other-pic_other" style="position:absolute;width:21px;top:1px;left:-6px;">
                    {"icon":"remind"} 
                </widget>
            </div>
        </div>
        
    </div>
</div>

    