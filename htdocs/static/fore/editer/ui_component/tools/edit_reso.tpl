<div w-class="cover_box">
    <div w-class="cover_bg" on-tap="goback"></div>
    <div w-class="add_box">
        <input w-class="width" on-change="valueChange(e,'r_width')" type="text" placeholder="width" />
        <input w-class="height" on-change="valueChange(e,'r_height')" type="text" placeholder="height" />
        <input w-class="name" on-change="valueChange(e,'r_name')" type="text" placeholder="name" />

        <div w-class="add" on-tap="add">添加</div>
        <div w-class="delect">
            <div w-class="help">右键删除</div>
            {{for i,v of it}}
                {{if v[1] && v[2]}}
                <div w-class="names" on-contextmenu="del({{i}})">{{v[0]}}</div>
                {{end}}
            {{end}}
        </div>

    </div>
</div>