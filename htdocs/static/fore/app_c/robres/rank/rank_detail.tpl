<div  style="position: absolute;width: 414px;height: 352px;left: 18px;top:56px;overflow: hidden;z-index: 2;">
    <div style="position: relative; width: 110%; height: 352px;overflow-x: hidden;overflow-y: auto;">
        {{let data = it1.rank.dominate_forage_rank_detail }}
        {{if data && data[0]}}

        {{for k, v of data[1]}}
        {{let rank = k-0+1}}
        <div style="position: relative; width: 414px; height: 122px;margin-bottom:12px;">
            <app_a-widget-img_stitch-stitch style="position: absolute;width: 414px;height: 122px;z-index:0;left: 0;">
                {"type":2,"height":20,"width":30}
            </app_a-widget-img_stitch-stitch>
            {{let name = it1.checkTypeof(v[2][1],"Array") ? it1.Common.fromCharCode(v[2][1]) : v[2][1]}}
            <widget style="position: absolute;left: 195px;top: 29px;" w-tag="app_a-widget-text-text">
                {"text":{{"S"+v[1][1] +" "+ name}},"show":"","space":0,"fontSize":18,"lineHeight":20,"color":"","textCfg":"heroEquip"} 
            </widget>

            {{if rank <= 3}}
            <widget  w-tag="app_a-widget-rank-rank_num" style=" position: absolute;left: 41px;top: 62px;">
                {"num":{{rank}} }
            </widget>
            {{else}}
            <div class="shadow1" style="width: 83px;height: 20px;font-size: 35px;text-align: center;color: rgb(174, 140, 100);position: absolute;left: 0px;top: 57px;line-height: 20px;font-family:mnjsh">{{rank}}</div>
            {{end}}

            <widget style="position: absolute;left: 82px;top: 2px;" w-tag="app_a-widget-line-line" >{"line":"line_9"} </widget>

            {{let imgX = it1.Pi.pictures['playerhead'+(v[7][1] || v[8][1])]}}
            <widget style=" position: absolute;left: 93px;top: 17px; width: 97px;height: 97px;" w-tag="app_a-widget-head-friend" on-tap="seeOther({{v[0][1]}})">
                {"url":{{imgX}},"top":23.5,"level":0,"width":107,"height":108}    
            </widget>

            <span class="shadow" style=" position: absolute;color: #FCE6C9;font-family: mnjsh;font-size: 18px;left: 195px; top: 84px;">战力:{{it1.Common.numberCarry(v[5][1],1000000)}}</span>

            <span class="shadow" style="position: absolute;color: #FCE6C9;font-family: mnjsh;font-size: 18px;left: 195px;top: 63px;">水晶:{{it1.Common.numberCarry(v[12][1],1000000)}}</span>

            {{if v[0][1] == it1.player.role_id}}
            <app_a-widget-pic_other-pic_other style="position: absolute;left:0px;width: 414px;height:122px;">{"icon":"my_rank_bg"}</app_a-widget-pic_other-pic_other>
            
            {{else}}
            <widget w-tag="app_a-widget-btn-rect" on-tap="fightRank({{JSON.stringify(v)}})" style="position: absolute;right: 9px;top: 45px;">
                {"class":"default","fontsize":22,"color":"#fdedd7;","text":"掠  夺","width":90,"height":36} 
            </widget>
            {{end}}

            
        </div>
        {{end}}


        {{else}}

        <div style="font-family:mnjsh;font-size:26px;color:#f00;text-align:center;line-height: 322px;width: 414px;">暂无排名信息</div>


        {{end}}
    </div>
</div>