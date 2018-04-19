{{let root = _get("pi/ui/root").exports}}
<div style="position:absolute;width:100%;">
    {{if it}}
    <div style="position:absolute;left:0;top:0;width:{{root.getWidth()}}px;height:{{root.getHeight()}}px;z-index:1;">
        <widget w-tag={{it}}></widget>
    </div>
    <div on-tap="goback" style="position:absolute;right:10px;top:35px;width:100px;height:46px;text-align:center;line-height:46px;background-color:rgba(255,255,255,.7);z-index:3;">关闭</div>
    {{end}}
    <div ev-menu="setMainWidget" style="position:absolute;left:0;top:0;height:{{root.getHeight()}}px;z-index:2;">
        
    </div>
    
</div>

