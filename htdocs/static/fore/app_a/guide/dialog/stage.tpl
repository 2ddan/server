<div style="position: absolute;top:0;left:0;width:100%;height:100%;">
    <div class="new_line1" style="bottom: 535px;z-index: 1;"></div>
    <div style="bottom:60px;height: 480px;position: absolute;left: 0px;right: 0px;background-color: rgba(0,0,0,.5);"></div>
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let count = 0}}
    {{for i,v of it.dialog}}
    {{: i=parseInt(i)}}
    {{if i>=((it.index-2)<0?0:(it.index-2)) && i<it.index+1}}
    {{let player = _get("app/mod/db").exports.data.player}}
    {{if count == 0}}
    {{let bot = 390}}
    {{elseif count == 1}}
    {{let bot = 240}}
    {{elseif count == 2}}
    {{let bot = 90}}
    {{end}}
    <div style="position: absolute;bottom: {{bot}}px;{{if !(i%2)}}left: 0px;{{else}}right: 0px;{{end}}height: 130px;width: 500px;">
        <div style="position: absolute;top: 0px;{{if !(i%2)}}left: 10px;right:0px;{{else}}left:0px;right: 10px;{{end}}bottom: 0px;">
            <div class="hero_hand_box scale_8" style="position: absolute;{{if !(i%2)}}left: 5px;{{else}}right: -25px;{{end}}top: -10px;">
                <div class="player_head_img" style="top:-3px;left: -2px;pointer-events: none;">
                    {{let t = v.chat[0] == "player"?('playerhead'+player.sex):v.chat[0]}}
                    {{let img = app.pictures[t]}}
                    <div class="role_head_bg" style="background-image: url({{img}});top: 0px;left: 0px;"></div>
                    <div class="y2_role_head_bg"></div>
                </div>
            </div>
            <div style="position: absolute;{{if !(i%2)}}left: 80px;right: 0px;{{else}}left: 0px;right: 80px;{{end}}top: 0px;bottom:0px;">
                <div style="position: absolute;{{if !(i%2)}}left: 18px;right: 0px;{{else}}left: 0px;right: 18px;{{end}}top:0px;bottom:0px;">
                    <div class="y2_black_red_bg" style="background:black;"></div>
                </div>
                {{let name = v.chat[1] == "player"?player.name:v.chat[1]}}
                <div style="position: absolute;top: 5px;{{if !(i%2)}}left: 30px;text-align: left;{{else}}right: 30px;text-align: right;{{end}}{{if v.chat[0] == 'player'}}color: #fff71d;{{else}}color: #ff9703;{{end}}width: 120px;font-size: 22px;white-space: nowrap;">{{name}}</div>
                <div style="position: absolute;top: 45px;{{if !(i%2)}}left: 30px;right: 18px;{{else}}left: 18px;right: 30px;{{end}}bottom:12px;color: #f3d3a6;font-size: 20px;">{{v.chat[2]}}</div>
            </div>
        </div>
    </div>
    {{let count = count+1}}
    {{end}}
    {{end}}
</div>