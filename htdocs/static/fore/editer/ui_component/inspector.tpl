{{: it = it || {} }}
{{let wFun = _get("editer/ui_component/inspector").exports }}
<div w-class="data_box" >
    <div w-class="inbox" scroller="1">
        {{if it.data}}
        {{let layoutBox = it.data.base.get("layout") }}
    
        {{if it.data.tagName}}
        {{let flexKeys = ["flexDirection","flexWrap","justifyItems","justifyContent","alignItems","alignContent"] }}
        {{let gridKeys = ["gridTemplateRows","gridTemplateColumns","gridRowGap","gridColumnGap","gridAutoFlow","gridTemplateAreas"] }}
        {{let boxShadowKeys = { "shadow-color": 0,"h-shadow": 1, "v-shadow": 2, "shadow-blur": 3, "shadow-spread": 4, "shadow-inset": 5 } }}
        <div w-class="clazz_box">
            <div w-class="title">常用</div>
            <div w-class="content">
                {{for k,v of it.starArr}}
                {{if flexKeys.indexOf(v) === -1 && gridKeys.indexOf(v) === -1 }}
                {{let keyShow = v.replace(/[A-Z]/g, function (s0) { return "-" + s0.toLowerCase() }) }}
                <div w-class="attr_box">
                    {{let o = it.cssCfg[keyShow]}}
                    <div w-class="attr_key" title={{o&&it.lang==="en"?o.desc_key:keyShow}}>{{(!o||it.lang==="en")?keyShow:o.desc_key}}</div>
    
                    {{let value = (o && o.split && o.split.length && v!=="boxShadow"?it.concatAttr(it.clazz,o.split,o.value_type):it.clazz.get(v)) }}
                    {{:value = value?value.replace(/^\s+/g,""):value }}

                    {{let v_style = it.data.style.map.get(v)}}
                    {{let readOnly = 0 }}
                    {{if v_style}}
                    {{:value = v_style}}
                    {{:readOnly = 1}}
                    {{end}}

                    {{let cb = it.updateKey.bind(it.updateKey,v) }}
                    {{if !o}}
                    {{:cb=null }}
                    {{elseif o.split_arg == 1}}
                    {{:cb = it.splitAttr.bind(it.splitAttr,o.split,it.updateKey)}}
                    {{elseif o.split_arg == "box-shadow"}}
                    {{:cb = it.setBoxShadow.bind(it.setBoxShadow,boxShadowKeys[v]) }}
                    {{:value = it.getBoxShadow(it.clazz.get("boxShadow"))[boxShadowKeys[v]] }}
                    {{end}}
    
                    {{if !o}}
                    <input w-class="attr_value" readonly=true data-key="{{v}}" value={{value}} />
                    {{elseif o.value_type == "Number"}}
                    <tools-number$ w-class="attr_value">{"util":{{o.value_unit||[]}},"value":{{value}},"cb":{{cb}},"readOnly":{{readOnly}} }</tools-number$>
                    {{elseif o.value_type == "Enum"}}
                    <tools-select$ w-class="attr_value">{"showArr":{{it.lang == "en"?o.enum:o.desc_enum}},"arr":{{o.enum}},"select":{{o.enum.indexOf(value)}},"cb":{{cb}},"readOnly":{{readOnly}} }</tools-select$>
                    {{elseif o.value_type == "Color"}}
                    <tools-complex$ w-class="attr_value">{"cb":{{cb}},"value":{{value}},"readOnly":{{readOnly}} }</tools-complex$>
                    {{elseif o.value_type == "Rich"}}
                    <input w-class="attr_value" spellcheck="false" data-key="{{v}}" value={{value}} on-change="changeValue"/>
                    {{elseif o.value_type == "Url"}}
                    <tools-path$ w-class="attr_value">{"cb":{{cb}},"path":{{value}} }</tools-path$>
                    {{else}}
                    <input w-class="attr_value" readonly=true data-key="{{v}}" value={{value}} />
                    {{end}}
    
                    {{if value && !readOnly}}
                    <tools-icon$ w-class="delete" style="color:#742525" on-tap="delete('{{v}}')">{"icon":"&#xf014;"}</tools-icon$>
                    {{end}}

                    <tools-icon$ w-class="no_edite" style="color:#742525">{"icon":{{readOnly?"&#xf05e;":"  "}} }</tools-icon$>
    
                    {{let stard = it.star.indexOf(v)==-1?0:1 }}
                    <tools-icon$ w-class="add_to_star" on-tap="addStar('{{v}}',{{stard}})" style="color:{{stard?'#742525':'#666666'}};">{"icon":{{stard?"&#xf005;":"&#xf006;"}} }</tools-icon$>
                </div>
                {{end}}
                {{end}}
            </div>
            
            <div w-class="title">
                其他<input w-class="search" spellcheck="false" on-change="search(e,'style')" placeholder="搜索" />
            </div>
            <div w-class="content_other">
                {{for i in it.cssCfg}}
                {{let o = it.cssCfg[i]}}
                {{let keyCode = i.replace(/(\-)([a-z])/g, function (s1, s2, s3) { return s3.toUpperCase() }) }}

                {{if it.starArr.indexOf(keyCode)==-1 && (o.split||it.spread.indexOf(i)!=-1) && (!it.searchStyle || i.indexOf(it.searchStyle) != -1 || o.desc_key.indexOf(it.searchStyle) != -1) }}
                <div w-class="attr_box{{it.spread.indexOf(i)!=-1?' spreatbox':''}}">
                    <div w-class="attr_key" {{if o.split && o.split.length}}on-tap="spread('{{i}}')"{{end}} title={{it.lang == "en"?o.desc_key:i}}>
                        {{it.lang == "en"?i:o.desc_key}}{{if o.split && o.split.length}}<tools-icon$ w-class="icon" >{"icon":{{it.spread.indexOf(o.split[0])>-1?'&#xf139;':'&#xf13a;'}}}</tools-icon$>{{end}}
                    </div>
                    {{let value = (o.split && o.split.length?it.concatAttr(it.clazz,o.split,o.value_type):it.clazz.get(i)) }}
    
                    {{let cb = it.updateKey.bind(it.updateKey,keyCode) }}
                    {{if o.split_arg == 1}}
                    {{:cb = it.splitAttr.bind(it.splitAttr,o.split,it.updateKey)}}
                    {{elseif o.split_arg == "box-shadow"}}
                    {{:cb = it.setBoxShadow.bind(it.setBoxShadow,boxShadowKeys[i]) }}
                    {{:value = it.getBoxShadow(it.clazz.get("boxShadow"))[boxShadowKeys[i]] }}
                    {{end}}
                    
                    {{if o.value_type == "Number"}}
                    <tools-number$ w-class="attr_value">{"util":{{o.value_unit||[]}},"value":{{value}},"cb":{{cb}} }</tools-number$>
                    {{elseif o.value_type == "Enum"}}
                    <tools-select$ w-class="attr_value">{"showArr":{{it.lang == "en"?o.enum:o.desc_enum}},"arr":{{o.enum}},"select":{{o.enum.indexOf(value)}},"cb":{{cb}} }</tools-select$>
                    {{elseif o.value_type == "Color"}}
                    <tools-complex$ w-class="attr_value">{"cb":{{cb}},"value":{{value}} }</tools-complex$>
                    {{elseif o.value_type == "Rich"}}
                    <input w-class="attr_value rich_input" spellcheck="false" data-key="{{keyCode}}" value={{value}} on-change="changeValue"/>
                    {{elseif o.value_type == "Url"}}
                    <tools-path$ w-class="attr_value">{"cb":{{cb}},"path":{{value}} }</tools-path$>
                    {{else}}
                    <input w-class="attr_value rich_input" spellcheck="false" readonly=true data-key="{{i}}" value={{value}} />
                    {{end}}
    
                    <tools-icon$ w-class="add_to_star" on-tap="addStar('{{keyCode}}',0)">{"icon":"&#xf006;" }</tools-icon$>
                </div>
                {{end}}
                {{end}}
            </div>
            
            {{if !layoutBox && it.classArr && it.classArr.length}}
            <div w-class="title"> class</div>
            <div w-class="class_box">
                {{for i,o of it.classArr}}
                <div w-class="class_item" on-tap="showClass('{{o}}')" {{if it.showClass == o}}style="background-color:#254496;"{{end}}>
                    {{o}}<tools-icon$ style="color:#ff1818;padding:0 4px;margin-left:4px;" on-tap="deleteClass('{{o}}')">{"icon":"&#xf00d;"}</tools-icon$>
                </div>
                {{end}}
                
                <div w-class="class_view">
                    {{for i,v of it.showClassArr}}
                    <div w-class="class_show_item">{{v}}</div>
                    {{end}}
                </div>
            </div>
            {{end}}

            {{if layoutBox}}
            <div w-class="title">布局</div>
            {{if layoutBox === '"scroll"'}}
            {{let oldClass = it.classArr.indexOf("scroll_box_h") === -1?"scroll_box_v":"scroll_box_h" }}
            {{let cb = it.changeClass.bind(it.changeClass,oldClass)}}
            <div w-class="content">
                <div w-class="attr_box">
                    <div w-class="attr_key">滚动方向</div>
                    <tools-select$ w-class="attr_value">{"showArr":["横向滚动","纵向滚动"],"arr":["scroll_box_h","scroll_box_v"],"select":{{oldClass==="scroll_box_h"?0:1}},"cb":{{cb}} }</tools-select$>
                </div>
            </div>
            {{elseif layoutBox === '"flex"'}}
            <div w-class="content">
                {{for i in it.flexCfg}}
                {{let v = it.flexCfg[i]}}
                {{let cb = it.updateKey.bind(it.updateKey,i) }}

                {{let value = it.clazz.get(i)}}
                {{:value = value?value.replace(/^\s+/g,""):value }}
                {{let v_style = it.data.style.map.get(v)}}
                {{let readOnly = 0 }}
                {{if v_style}}
                {{:value = v_style}}
                {{:readOnly = 1}}
                {{end}}
                <div w-class="attr_box">
                    <div w-class="attr_key">{{it.lang == "en"?i:v.desc}}</div>
                    <tools-select$ w-class="attr_value">{"showArr":{{it.lang=="en"?v.arr:v.arr_desc}},"arr":{{v.arr}},"select":{{value?v.arr.indexOf(value):-1}},"cb":{{cb}},"readOnly":{{readOnly}} }</tools-select$>
                </div>
                {{end}}
            </div>
            {{elseif layoutBox === '"grid"'}}
            <div w-class="content">
                {{for i in it.gridCfg}}
                {{let v = it.gridCfg[i]}}
                {{let cb = it.updateKey.bind(it.updateKey,i) }}

                {{let value = it.clazz.get(i) }}
                {{:value = value?value.replace(/^\s+/g,""):value }}

                {{if v.style }}
                {{:value.replace(/(repeat\()(\d+)(\,)/,function(s0,s1,s2){value = s2}) }}
                {{end}}

                <div w-class="attr_box">
                    <div w-class="attr_key">{{it.lang == "en"?i:v.desc}}</div>
                    {{if v.style ||v.unit }}
                    <tools-number$ w-class="attr_value">{"util":{{v.unit}},"value":{{value}},"cb":{{cb}} }</tools-number$>
                    {{elseif v.arr}}
                    <tools-select$ w-class="attr_value">{"showArr":{{it.lang=="en"?v.arr:v.arr_desc}},"arr":{{v.arr}},"select":{{value?v.arr.indexOf(value):-1}},"cb":{{cb}} }</tools-select$>
                    {{end}}
                </div>
                {{end}}
            </div>
            {{end}}
            {{end}}

            
            <div w-class="title">自定义属性</div>
            <div w-class="content">
                {{let defAttrs = ["sid", "w-tag", "ed_src", "href", "src"] }}
                {{let hideAttrs = ["goto","editer_tree_show","maxId","w-sid","layout"] }}
                {{for m of it.data.base}}
                {{if hideAttrs.indexOf(m[0]) === -1 && m[0].indexOf("on-")===-1 && m[0].indexOf("ev-")===-1 }}
                {{let editable = defAttrs.indexOf(m[0]) < 0 }}
                <div w-class="attr_box">
                    <div w-class="attr_key">{{m[0]}}</div>
                    <pi-ui-input w-class="attr_value" spellcheck="false" readonly={{!editable}} on-change="changeUserAttr(e,'{{m[0]}}')" placeholder="value" title="{{m[1]}}" >{"text":{{JSON.parse(m[1]||null)}},"sign":{{+new Date()}}}</pi-ui-input>

                    {{if editable}}
                    <tools-icon$ w-class="delete" style="color:#742525" on-tap="deleteUserAttr('{{m[0]}}')">{"icon":"&#xf014;"}</tools-icon$>
                    {{end}}
                    
                    <tools-icon$ w-class="no_edite" style="color:#742525">{"icon":{{editable?"  ":"&#xf05e;"}} }</tools-icon$>
                </div>
                {{end}}
                {{end}}
                <div w-class="attr_box" style="padding-bottom:2px;">
                    <pi-ui-input w-class="attr_value" spellcheck="false" on-change="attrKey(e,'key')" placeholder="key" style="left:28px;width:128px;text-indent:4px;">{"sign":{{+new Date()}}}</pi-ui-input>
                    <pi-ui-input w-class="attr_value" spellcheck="false" on-change="attrKey(e,'value')"placeholder="value" style="text-indent:4px;">{"sign":{{+new Date()}}}</pi-ui-input>

                    <tools-icon$ w-class="add_to_star" on-tap="addUserAttr">{"icon":"&#xf067;" }</tools-icon$>
                </div>
            </div>
            
            {{if !layoutBox}}
            <div w-class="title">转变</div>
            <div w-class="content">
                {{let trans = wFun.parseTrans(it.clazz.get("transform")) }}
                <div w-class="attr_box" style="padding-bottom:2px;">
                    <div w-class="attr_key">镜像翻转</div>
                    {{let mirror = ["scale(1,-1)","scale(-1,1)","scale(-1,-1)"] }}
                    {{let value = trans.scale }}
                    
                    {{let cb = wFun.updataTrans.bind(it.updateKey,"scale") }}
                    <tools-select$ w-class="attr_value">{"showArr":["上下翻转","左右翻转","上下左右翻转"],"arr":["scale(1,-1)","scale(-1,1)","scale(-1,-1)"],"select":{{mirror.indexOf(value)}},"cb":{{cb}} }</tools-select$>
                    {{if value}}
                    {{let del = wFun.deleteTrans("scale")}}
                    <tools-icon$ w-class="delete" style="color:#742525" on-tap="deleteTrans('{{del}}')">{"icon":"&#xf014;"}</tools-icon$>
                    {{end}}
                </div>
                <div w-class="attr_box" style="padding-bottom:2px;">
                    <div w-class="attr_key">旋转</div>
                    {{let value = trans.rotateZ }}
                    {{let cb = wFun.updataTrans.bind(it.updateKey,"rotateZ") }}
                    <tools-number$ w-class="attr_value">{"util":["deg"],"value":{{value}},"cb":{{cb}} }</tools-number$>
                    {{if value}}
                    {{let del = wFun.deleteTrans("rotateZ")}}
                    <tools-icon$ w-class="delete" style="color:#742525" on-tap="deleteTrans('{{del}}')">{"icon":"&#xf014;"}</tools-icon$>
                    {{end}}
                </div>
            </div>
            {{end}}
        </div>
        {{end}}

        {{if !layoutBox && it.data.script}}
        <div w-class="clazz_box">
            <div w-class="title">脚本</div>
            <div w-class="content">
                <base-textarea$ >{"text":{{it.data.script}},"cb":{{it.saveScript}} }</base-textarea$>
            </div>
        </div>
        {{end}}

        {{if 0}}
        <div w-class="clazz_box">
            <div w-class="title">跳转</div>
            <div w-class="content">
                <div w-class="attr_box" style="padding-bottom:2px;">
                    {{let goto = it.data.base.get("goto")}}
                    <pi-ui-input w-class="goto_page_input" spellcheck="false" on-change="changeGoto" placeholder="app-test-test" title={{goto||""}} >{"text":{{JSON.parse(goto||null)}},"sign":{{+new Date()}}}</pi-ui-input>
                    {{if goto}}
                    <tools-icon$ w-class="delete" style="color:#742525" on-tap="deleteGoto">{"icon":"&#xf014;"}</tools-icon$>
                    <tools-icon$ w-class="add_to_star" on-tap="gotoPage({{goto}})">{"icon":"&#xf08b;" }</tools-icon$>
                    {{end}}
                </div>
            </div>
        </div>
        {{end}}

        <div style="width:100%;height:200px;" desc="底部边距"></div>

        {{end}}
    </div>
</div>

