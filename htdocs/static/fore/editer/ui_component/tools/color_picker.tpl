<div style="width:100%;height:100%;" on-mousemove="colorMove" on-mouseup="colorUp">
    <div on-tap="goback" style="width:100%;height:100%;position:absolute;"></div>
    <div w-class="pick_box" style="{{it.style}}">
        <div w-class="color_box" class="color_picker_bg" style="background-color:rgba({{it.BGColor.r}},{{it.BGColor.g}},{{it.BGColor.b}},{{it.BGColor.a}})" on-mousedown="colorDown(e,'color')">
            <div w-class="color_point" data-flag="1" style="left:{{it.hsva.s * 2}}px;top:{{200-it.hsva.v * 2}}px;"></div>
        </div>
        <div w-class="bar">
            <div w-class="perview" on-tap="pickOk">
                <div style="width:100%;height:100%;background-color:rgba({{it.rgba.r}},{{it.rgba.g}},{{it.rgba.b}},{{it.rgba.a}})"></div>
            </div>
            <div w-class="hue_bar" on-mousedown="colorDown(e,'hue')">
                <div w-class="hue_point" data-flag="1" style="left:{{it.hsva.h/360*130}}px"></div>
            </div>
            <div w-class="opacity_bar" on-mousedown="colorDown(e,'alpha')"  >
                <div w-class="opacity_point" data-flag="1" style="left:{{it.hsva.a*130}}px"></div>
            </div>
        </div>
        <div w-class="value_box">
            {{if it.type === 0}}
            <div w-class="value_hex">
                <span w-class="hex_span">HEX:</span>
                <pi-ui-input w-class="hex_input" spellcheck="false" on-change="changeHex">{"text":{{it.hex}},"sign":{{it.sign}} }</pi-ui-input>
            </div>
            {{else}}
            <div w-class="value_rgba">
                {{for k in it.rgba}}
                <span w-class="rgba_span">{{k.toUpperCase()}}:</span>
                <pi-ui-input w-class="rgba_input" spellcheck="false" data-rgba="{{k}}" on-change="changeRgba">{"text":{{it.rgba[k]}},"sign":{{it.sign}} }</pi-ui-input>
                {{end}}
            </div>
            {{end}}

            <div w-class="change_type" on-tap="changeType">
                <span w-class="top"></span>
                <span w-class="bot"></span>
            </div>
        </div>

        <div w-class="history">
            {{for k,v of it.history}}
            <div w-class="his_pick" on-tap="chooseHis({{k}})" on-contextmenu="openMenu({{k}})" style="background-color:rgba({{v.r}},{{v.g}},{{v.b}},{{v.a}})"></div>
            {{end}}
            <div w-class="add" on-tap="addHis"></div>
        </div>
    </div>
</div>