{{let firstMenus = it1.menus.children}}
{{let selects = it1.select?it1.select.children: null}}

<div style="width:100%; height:100%;overflow-y:visible;position:absolute;z-index:99;">
    <div w-class="item_box">
        {{for k, v of firstMenus}}
        {{if v.key !== "widget" && v.key !== "zoom"}}
        <div w-class="item" class="hover1" on-down="open(e, '{{v.key}}')">{{v.name || v.key}}</div>
        {{end}}
        {{end}}
    </div>
    {{if selects}}
    <div style="width:100vw; height:100vh;position:absolute;" on-tap="cancel">
        <div w-class="child_box" style="left:{{it1.pos.x}}px;top:{{it1.pos.y}}px">
            {{for k, v of selects}}
            <div w-class="child" class="hover2" on-tap="select(e, '{{v.key}}')">{{v.name || v.key}}</div>
            {{end}}
        </div>
    </div>
    {{end}}
</div>