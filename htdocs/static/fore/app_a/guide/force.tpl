<div class="guide_force" style="position:absolute;top:0;left:0;width:1px;height:1px;" onselectstart="return false">
    {{let root = _get("pi/ui/root").exports}}
    {{let b = (it && (it.x || it.y || it.w || it.h))}}
    {{let __d = b?it:{x:0,y:0,w:0,h:0,show:{} } }}
    {{: __d.gw = root.getWidth()}}
    {{: __d.gh = root.getHeight()}}
    <app_a-guide-force-cover style="display:{{b?'block':'none'}};">{{__d}}</app_a-guide-force-cover>

    {{if !b}}
    <div style="position: absolute;top:0px;left:0px;width:{{it?root.getWidth():0}}px;height:{{it?root.getHeight():0}}px;">
        <div style="position:absolute;top:60%;width:100%;text-align:center;color:#fff;font-family:mnjsh;font-size:30px;opacity:0.7">引导中，请稍后……</div>        
    </div>
    {{end}}
</div>
