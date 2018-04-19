<div style="width:100%; position:absolute;top:30px;bottom:0;overflow:hidden;">
    <div style="width:100%;height:100%; position:absolute;overflow-x:hidden;overflow-y:auto;padding-right:20px;">
        {{if it}} 
        {{for i,v of it}} 
        <div draggable="true" allowDefault="true" style="display:inline-block;position:relative;width:90%;left:5%;text-align:center;margin-top:10px;cursor:-webkit-grab">
            <div style="position:relative;background-color: rgb(15, 15, 26);padding:5px 0">
                <img on-dbltap="dblclick" src="{{v.path}}" draggable="false" tagName={{v.tagName}} srcPath={{v.path}} ed_src={{v.path}} style="display:inline-block;"/>
            </div>
            <div style="width:100%;height:16px;position:relative;color:#D5D5D5;font-size:14px;line-height:16px;margin:5px 0;">{{v.name}}</div>
        </div>
        {{end}} 
        {{end}}
    </div>
</div>