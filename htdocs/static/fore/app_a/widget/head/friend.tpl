{{:it = it||_cfg.it }}
{{let w = it.width || 80}}
{{let h = it.height || 80}}

<div>


    <img style="width:92%;height:92%;position:absolute;left:4%;top:4%;pointer-events:none;" src='./images/new_player_head.png' />
        
    {{% 图标}}
    {{if it.url.search(/^\app\w{0,2}\S+(?=.png)/) < 0}}
    <div style="transform:rotateZ(45deg);width:87%;height:87%;position:absolute;">
        <div style="width:56%;height:56%;pointer-events:none;overflow:hidden;margin:22% 21%;">
            <img style="width:142%;transform:rotateZ(-45deg);pointer-events:none;margin:-22%;" src={{it.url}} />
        </div>
    </div>
    {{else}}
    <app-widget-image-quality style="width:83%;height:83%;position:absolute;left:4%;top:-1%;pointer-events:none;" >
        {"url":{{it.url}} }
    </app-widget-image-quality>
    {{end}}

    {{% 等级}}
    <img style="position:absolute;left:3%;top:4%;pointer-events:none;width:28%;" src={{it.level?"./images/head_level.png":""}}/>
    <span style="position:absolute;left:-1%;top:{{it.top || 21.5}}%;margin-top:-9px;pointer-events:none;width:35%;text-align:center;font-size:12px;color:{{it.color || '#ffffff'}}">{{it.level||""}}</span>


</div>