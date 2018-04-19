{{let appCfg = _get("app/mod/db").exports.data}}
{{let player = appCfg.player}}
{{let img_length = appCfg.magic.img_length}}
<div {{if img_length >= 2.5}}class="opacityAnim3"{{end}} style="width:93px;height:374px;position:absolute;top:257px;left:50%;margin-left:70px;">

    <div class="topToBottomShow" style="width:93px;height:374px;opacity:1;position:absolute;left:0px;top:0px;overflow:hidden">
        <img src="./images/magic_release_bg.png" />
    </div>
    <img class="scaleLargeToM" src="./images/{{player.career_id}}.png" style="position: absolute;left: 5px;right: 0px;margin: 0 auto;top: 50px;transform: scale(1);opacity:1;" />
</div> 