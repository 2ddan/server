{{let root = _get("pi/ui/root").exports}}
{{let bol = it1 && it1.opening && it1.wildOpenBox}}
<div style="position:absolute;left:0;top:0;width:100%;height:{{root.getHeight()}}px;pointer-events: {{bol ?'all' : 'none'}};">   
    {{if bol}}
    <app_b-random_boss-open_box></app_b-random_boss-open_box>
    {{end}}
</div>