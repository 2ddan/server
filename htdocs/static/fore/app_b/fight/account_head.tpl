
<div style="position: relative;width: 540px;height: 211px;left:50%;margin-left:-270px;top:100px;">
    <div style="width:100%;height:35px;position:relative">
        {{if it1.account.outcome === "win" && it1.account.extra.star != undefined}}            
        {{let winStar = it1.account.extra.star}}
        {{if winStar != "none"}}
        {{let i = 0}}
        {{while i< 3}}
            {{if i < winStar}}
            <div w-class="star rotate_star{{i}}"></div>
            {{else}}
            <div w-class="star dark rotate_star{{i}}"></div>        
            {{end}}
            {{: i = i+1}}
        {{end}}
        {{end}}    
        {{end}}    
    </div>
    <div w-class="{{if it1.account.outcome === 'lose'}}lose_title{{else}}win_title{{end}}"></div>
</div>