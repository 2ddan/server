{{:it = it||_cfg.it}}
<div>
    {{if it.num == 1}}
    <img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" src="./images/rank_1.png" />
    {{elseif it.num == 2}}
    <img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" src="./images/rank_2.png" />
    {{elseif it.num == 3}}
    <img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" src="./images/rank_3.png" />
    {{else}}
    <span class="shadow" style="color:rgb(174,140,100);font-size: 18px;font-family:mnjsh">{{it.num}}</span>
    {{end}}
</div> 