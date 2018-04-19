<div style="position: absolute;top:0;left:0;width:100%;height:100%;">
    {{let root = _get("pi/ui/root").exports}}
    <div first_dialog  style="position: absolute;top: 60%;left: 0px;height: 186px;width: 100%">
        <div style="position: absolute;left: 0px;width: 100%;bottom: 0px;background-color: rgba(0,0,0,.8);top:43px;">
            <div class="{{it.dialog.chat[0]}} {{it.dialog.chat[0] == 'npc_shangcheng' ? ' base_mirror_r':''}}" style="bottom: 0px;{{if it.dialog.chat[0] == 'npc_shangcheng'}}width:282px;height:315px;left:-7px;{{else}};width:300px;height:306px;left: -33px;{{end}}background-size: contain;"></div>
            <div w-class="guide_name_bg" style="top: -38px;left: 190px;"></div>
            <div style="text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;position: absolute;top: -12px;left: 220px;font-size: 24px;color: #e1cb9c;">{{it.dialog.chat[1]}}</div>
            <div first_text style="position: absolute;top: 40px;left:220px;right:30px;color: #f7ebd5;font-size: 22px;">{{it.first_text?it.first_text:''}}</div>
        </div>
    </div>
</div>
