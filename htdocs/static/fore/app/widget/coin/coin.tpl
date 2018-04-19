<div style="text-shadow: 1px 0px 0px rgb(8,8,8), -1px 0px 0px rgb(8,8,8), 0px 1px 0px rgb(8,8,8), 0px -1px 0px rgb(8,8,8);
">  
    {{if isNaN(it.icon)}}
    <div class="{{it.icon}}" style="position: relative;height:{{it && it.height ? it.height : 18}}px;width: {{it && it.width ? it.width : 24}}px;background-size: contain;background-position: left center;background-repeat: no-repeat;display: inline-block;vertical-align: middle;"></div>
    {{else}}
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    
    <img style="width:{{it.width || 25}}px;vertical-align:middle;margin-top:-3px;margin-right:4px;" src="{{Pi.pictures[Pi.sample[it.icon].icon]}}"/>
    {{end}}
    <span style="position: relative;display: inline-block;vertical-align: middle;left:{{it && it.left ? it.left : 0}}px;vertical-align: middle;" w-class="text_player_coin_num">{{it.text || 0}}</span>
</div>