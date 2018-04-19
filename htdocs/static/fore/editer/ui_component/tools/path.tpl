<div style="position:absolute;background-color:#212125;width:130px;height: 24px;">
    <input on-focus="focus" on-change="change" spellcheck="false" title="{{it.url}}" style="width:106px;height:22px;position:absolute;text-indent:4px;font-size:14px;outline:none;border:none;background:#3c3c3f;color:#D5D5D5;" type="text" value="{{it.url||""}}" />
    <div on-tap="edit" style="font-family:'icon';display:inline-block;width:24px;height:24px;line-height:24px;position:absolute;left:106px;top:0;text-align:center;color:{{it.view?'#c9c0c0':'#515158'}}">&#xf018;</div>
</div>