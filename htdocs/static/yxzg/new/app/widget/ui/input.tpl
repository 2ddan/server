<div style="min-width:40px;min-height:20px;">
    <input on-keydown="keydown" on-input="onInput" on-blur="onBlur" type="text" on-focus="onFocus" on-change="onChange"
        readonly={{it.readOnly}} placeholder="{{it.placeholder||''}}" value="{{(it.text + '') ||''}}"
        style="position:absolute;font-family:kaiti;font-size:{{it.fontSize||16}}px;width:100%;height:100%;left:7px;top:1px;padding:0;justify-content:{{it.textAlign=='left'?'flex-start':(it.textAlign=='right'?'flex-end':'center')}};border:none;outline:none;color:{{it.color||'#fff'}}" />
</div>