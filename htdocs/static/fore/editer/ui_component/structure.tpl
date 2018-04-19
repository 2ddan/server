{{: it= it || _cfg.it}}

{{let uiClass = it.center_container}}
{{let dataClass = it.right_container}}

{{let asideClass = it.aside_container}}

<div style="z-index: 0;position: absolute;width: 100%;height: 100%;background-color: rgb(27, 27, 41);"  on-mousemove="resizeMove">
    <div w-class="menu">
        <menu$></menu$>
    </div>
    <div w-class="aside_bar">
        <tools-icon$ class="hover_align" w-class="aside_icon" title="资源" on-tap="aside('resource')" {{if it.layout.aside == "resource"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf0f6;"}</tools-icon$>
        <tools-icon$ class="hover_align" w-class="aside_icon" title="布局" on-tap="aside('layout')" {{if it.layout.aside == "layout"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf0ce;"}</tools-icon$>
        <tools-icon$ class="hover_align" w-class="aside_icon" title="组件" on-tap="aside('widget')" {{if it.layout.aside == "widget"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf12e;"}</tools-icon$>
        <tools-icon$ class="hover_align" w-class="aside_icon" title="语法" on-tap="aside('sytree')" {{if it.layout.aside == "sytree"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf0e8;"}</tools-icon$>
        <tools-icon$ class="hover_align" w-class="aside_icon" title="样式" on-tap="aside('css_sheet')" {{if it.layout.aside == "css_sheet"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf0d0;"}</tools-icon$>
        <tools-icon$ class="{{it.layout.aside == 'anim'?'anim':'hover_anim'}}" w-class="aside_icon" title="样式" on-tap="aside('anim')" {{if it.layout.aside == "anim"}}style="color:#C9C0C0;"{{end}}>{"icon":"&#xf110;"}</tools-icon$>
    </div>
    <div w-class="st_box">
        {{if it.layout.aside}}
       
        <div w-class="aside_tab" style="width:calc(15% + {{it.layout.panl[0]}}px);">
            <div w-class="resize_box_hor">
                {{for k in asideClass}}
                <widget w-tag={{asideClass[k].name}} style="z-index:{{it.layout.aside==k?'4':'1'}};visibility:{{it.layout.aside==k?'visible':'hidden'}};">{{asideClass[k].param}}</widget>
                {{end}}
            </div>
            <div w-class="resize_hor" on-mousedown="resizeStar(e,'panl',0)" on-mouseup="resizeEnd">
                <div w-class="resize_hor_bg"></div>
            </div>
        </div>
        {{end}}
        <div w-class="ui_tab" style="width:calc({{it.layout.aside?'65%':'80%'}} + {{it.layout.aside?it.layout.panl[1]:it.layout.panl[0]+it.layout.panl[1]}}px);">
            <div w-class="resize_box_hor">
                <div w-class="ui_tab_title">
                    <div w-class="ui_title_box" on-dbltap="newTab">
                        {{for i,v of it.tabs.arr}}
                        <div w-class="ui_title_child {{i==it.tabs.index?'active':''}}" title="{{v.path}}" on-tap="changeTab({{+i}})">
                            <div w-class="ui_title_close" class="{{i==it.tabs.index?'deltab_visible':'hover_deltab'}}" on-tap="closeTab(e,{{+i}})">&#xf00d;</div>
                            {{v.title}}
                        </div>
                        {{end}}
                    </div>
                    <div w-class="ui_title_right">
                        <tools-resolution$ style="top:2px;width:150px;z-index:5;display:inline-block;position:relative">{"cb":{{it.changeReso}} }</tools-resolution$>
                    </div>
                </div>
                <div w-class="ui_tab_tool">
                    <div w-class="ui_tool_text" style="color:{{it.light=='view'?'#C9C0C0':'#515158'}};"><tools-icon$ w-class="ui_tool_icon">{"icon":"&#xf108;"}</tools-icon$>设计</div>
                    <div w-class="ui_tool_right">
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="源码" style="vertical-align:top;font-size:14px;width:60px;color:{{it.layout.showCode?'#C9C0C0;':'#515158'}}" on-tap="showCode({{it.layout.showCode}})" >{"icon":"源码 &#xf121;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="左对齐" on-tap="align('left')">{"icon":"&#xf036;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="水平居中" on-tap="align('h_center')">{"icon":"&#xf037;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="右对齐" on-tap="align('right')">{"icon":"&#xf038;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="上对齐" style="transform:rotateZ(-90deg)" on-tap="align('top')">{"icon":"&#xf038;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="垂直居中" style="transform:rotateZ(90deg)" on-tap="align('v_center')">{"icon":"&#xf037;"}</tools-icon$>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="下对齐" style="transform:rotateZ(90deg)" on-tap="align('bottom')">{"icon":"&#xf038;"}</tools-icon$>
                        <div w-class="slice_line"></div>
                        <tools-icon$ class="hover_align" w-class="ui_tool_icon" title="属性中英文切换" on-tap="switchLang">{"icon":"&#xf02d;"}</tools-icon$>
                        
                    </div>
                    
                </div>
                <div w-class="ui_panl" style="width:calc({{it.layout.showCode?'55%':'100%'}} + {{it.layout.ui[0] - 1}}px);">
                    <div style="position: absolute;width:calc(100% + 20px);height:calc(100% + 20px);overflow:scroll;transform:scale({{it.zoom}});transform-origin:0 0;">
                        {{if uiClass}}
                        {{for k, v of uiClass}}
                        <div style="position: absolute;width:{{40+parseInt(it.curReso[1])}}px;height:{{40+parseInt(it.curReso[2])}}px;">
                            <widget w-tag={{v.name}}>{"boxWidth":20,"width":{{it.curReso[1]}}, "height":{{it.curReso[2]}} }</widget>
                        </div>
                        {{end}}
                        {{end}}
                        <widget w-tag="select$">{"boxWidth":20,"width":{{it.curReso[1]}}, "height":{{it.curReso[2]}} }</widget>
                    </div>
                </div>
                {{if it.layout.showCode}}
                <div w-class="resize_hor" on-mousedown="resizeStar(e,'ui',0)" on-mouseup="resizeEnd" style="top:60px;bottom:0;right:calc(45% + {{it.layout.ui[1]-6}}px);">
                    <div w-class="resize_hor_bg"></div>
                </div>
                <div w-class="ui_code" style="width:calc(45% + {{it.layout.ui[1]}}px);">
                    <widget w-tag="code$">{"text":"121"}</widget>
                </div>
                {{end}}
            </div>
            <div w-class="resize_hor" on-mousedown="resizeStar(e,'panl',1)" on-mouseup="resizeEnd">
                <div w-class="resize_hor_bg"></div>
            </div>
        </div>
        <div w-class="data_tab" style="width:calc(20% + {{it.layout.panl[2]}}px);">
            <div style="width: 100%; height: 100%;background-color:rgb(36, 36, 49);text-align:center;position:absolute;">
                {{for k, v of dataClass}}
                    <div w-class="{{k==it.datatab?'select':'other'}}" on-tap="changeDataTab({{k}})">
                        {{v.title}}
                    </div>
                    <widget w-tag="{{v.name}}" w-class="{{k==it.datatab?'tabshow':'tabhidden'}}"></widget>
                {{end}}
            </div>
        </div>
    </div>
</div>
