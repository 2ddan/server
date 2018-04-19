{{:it = it || _cfg.it }}

<textarea on-input="onInput" on-blur="onBlur" on-focus="onFocus" class="put" style="top:0px;color:{{it.color || 'white'}}" type="{{it.type}}" maxlength="{{it.length}}" placeholder="{{it.placeholder?it.placeholder:''}}" value="{{it.text?it.text:''}}"></textarea>