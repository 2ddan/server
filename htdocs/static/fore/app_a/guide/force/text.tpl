    {{let lr = (it.x+it.w/2) >= it.gw/2}}
    {{let tb = (it.y+it.h/2) >= it.gh/2}}
    {{let d = ""}}
    {{if tb}}
    {{:d=lr?'txt_t_l':'txt_t_r'}}
    {{else}}
    {{:d=lr?'txt_b_r':'txt_b_l'}}
    {{end}}
    
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let fun_id = appCfg.open_fun && (appCfg.open_fun.id-0+1)}}  
    
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{if it.show.name == "function_open" || it.show.name == "fun_open_active"}}
        {{let function_open = cfg.function_guid.function_guid[fun_id]}}
        {{:it.show.text = function_open && function_open.guide_text}}
    {{end}}

    {{let top = it.y-50}}
    {{if !tb}}
    {{:top = 400}}
    {{elseif it.show.name == "fun_open_active"}}
    {{:top = 695}}
    {{end}}
<div style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events: none;">
    {{if it.show.text}}
    <div data-desc="文字内容" style="z-index: 4;position: absolute;width:236px;top:{{top}}px;left:170px">
        <div style="position: absolute;height: 69px;display: inline-block;z-index: 3;{{if lr}}right:0px;{{end}}{{if tb}}bottom:0px;{{end}}">
            <app_a-widget-pic_text-pic_text style="position: absolute;top:0;left:0;">
                {"icon":"text_bg_3","text":" ","width":235,"height":69}
            </app_a-widget-pic_text-pic_text>
            <div style="font-size:18px;color:#ffd8a6;font-family:mnjsh;line-height:20px;position: relative;line-height: 21px;height:60;width: 180px;z-index: 2;padding: 4px 0px 0px 46px;">{{it.show.text || ''}}</div>
            <img style="position:absolute;bottom: -9px;left: -78px;z-index: 2;" src="../images/girl.png"/>            
        </div>
    </div>
    {{end}}
</div>