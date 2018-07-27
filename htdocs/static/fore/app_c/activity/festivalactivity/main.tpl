{{let tab = {"recharge":0,"task":1,"sale":2,"exchange":3} }}
{{let currAct = it1.func.getActByIndex(it1.actIndex)[tab[it.btn.type_m]]}}

{{let list = it1.sort(it1.fa_actlist[currAct.id])}}

<div data-desc="奖励列表" style="position:absolute;width:492px;height:440px;left:50%;margin-left:-246px;top:57px;overflow:hidden;">
    <div scroller="1" style="position:absolute;width:105%;height:100%;overflow-y: auto;overflow-x: hidden;">
        <app-widget-step style="width: 100%;height:100%">
            {"widget":"app_c-activity-festivalactivity-{{it.btn.type_m}}-frame_{{it.btn.type_m}}","arr":{{list}},"initCount":5,"addCount":4 }
        </app-widget-step>
    </div>
</div>

    
