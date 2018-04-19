<div style="position:absolute;overflow-x:hidden;width:100%;height:100%;z-index:2;background-color:rgb(27, 27, 41);">
    <div style="position: relative;width: 100%;height: 30px;background-color: rgb(36, 36, 49);text-align:center;line-height:27px;color:#b4b4b7;font-size: 14px;overflow:hidden;">
		全局样式<input type="text" spellcheck="false" placeholder="" on-change="searchRes" style="font-family:'icon';background:rgb(24, 23, 34);color:rgb(119, 119, 119);height:24px;text-indent:4px;border:none;margin-left:10px;width:100px;"/>
    </div>
    
    <div style="width:100%; position:absolute;top:30px;bottom:0;overflow:hidden;">
        <div style="width:100%;height:100%; position:absolute;overflow-x:hidden;overflow-y:auto;padding-right:20px;">
            {{for v of it.sheets}}
            <div style="width:calc(100% - 20px);position:relative;left:10px;text-align:center;margin-top:10px;overflow:hidden;">
                <div on-dbltap="addClass('{{v[0]}}')" style="position:relative;background-color: rgb(15, 15, 26);padding:5px 0;{{if v[1].get('height')==='100%'}}height:100px;{{end}}">
                    <div class="{{v[0]}}" style="position:relative;display:inline-block;{{if !v[1].get('background')&&!v[1].get('background-color')&&!v[1].get('background-image')}}background-color:rgba(200,200,200,.5);{{end}}{{if !v[1].get('width')}}width:100px;{{end}}{{if !v[1].get('height')}}height:100px;{{end}}"></div>
                </div>
                <div style="width:100%;height:16px;position:relative;color:#D5D5D5;font-size:14px;line-height:16px;margin:5px 0;">{{v[0]}}</div>
            </div>
            {{end}}
        </div>
    </div>
</div>