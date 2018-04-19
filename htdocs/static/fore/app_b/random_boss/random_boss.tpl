{{let root = _get("pi/ui/root").exports}}
{{let bol = it1 && it1.opening && it1.wildOpenBox}}
<div style="position:absolute;left:0;top:0;width:100%;height:{{root.getHeight()}}px;pointer-events: {{bol ?'all' : 'none'}};">   
    {{if it1 && it1.boss}}
    <div w-class="wild_boss_red" style="animation: opacityAnim 2s infinite;width:100%;height:100%;"> </div>
    <div w-class="wild_boss_pic" style="animation: random_boss_title 6s forwards;width:422px;height:173px;top:260px;left:50%;margin-left:-211px;pointer-events: none;z-index:2;opacity:1;"></div>
    {{end}}


    {{if bol}}
    <app_b-random_boss-open_box></app_b-random_boss-open_box>
    {{end}}
</div>