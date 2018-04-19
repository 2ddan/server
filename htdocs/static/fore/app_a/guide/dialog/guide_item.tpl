{{let main = it.dialog.left === "major"?"left": "right"}}
<div style="position: absolute;top: 0px;{{if main == 'left'}}left: 10px;right:0px;{{else}}left:0px;right: 10px;{{end}}bottom: 0px;">
    <div class="hero_hand_box scale_8" style="position: absolute;{{if main == 'left'}}left: 5px;{{else}}right: -25px;{{end}}top: -10px;">
        <div class="player_head_img" style="top:-3px;left: -2px;pointer-events: none;">
            {{let t = it.dialog.chat[0] == "player"?('playerhead'+player.sex):it.dialog.chat[0]}}
            {{let img = app.pictures[t]}}
            <div class="role_head_bg" style="background-image: url({{img}});top: 0px;left: 0px;"></div>
            <div class="y2_role_head_bg"></div>
        </div>
    </div>
    <div style="position: absolute;{{if main == 'left'}}left: 80px;right: 0px;{{else}}left: 0px;right: 80px;{{end}}top: 0px;bottom:0px;">
        <div style="position: absolute;{{if main == 'left'}}left: 18px;right: 0px;{{else}}left: 0px;right: 18px;{{end}}top:0px;bottom:0px;">
            <div class="y2_black_red_bg" style="background:black;"></div>
        </div>
        {{let name = it.dialog.chat[1] == "player"?player.name:it.dialog.chat[1]}}
        <div style="white-space: nowrap;position: absolute;top: 5px;{{if main == 'left'}}left: 30px;text-align: left;{{else}}right: 30px;text-align: right;{{end}}{{if it.dialog.chat[0] == 'player'}}color: #fff71d;{{else}}color: #ff9703;{{end}}width: 120px;font-size: 22px;">{{name}}</div>
        <div{{if it.first_text}} first_text{{end}} style="position: absolute;top: 45px;{{if main == 'left'}}left: 30px;right: 18px;{{else}}left: 18px;right: 30px;{{end}}bottom:12px;color: #f3d3a6;font-size: 20px;">{{it.first_text || it.dialog.chat[2]}}</div>
    </div>
</div>