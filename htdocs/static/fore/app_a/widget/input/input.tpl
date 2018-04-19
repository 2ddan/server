{{:it = it||_cfg.it}}

<input on-input="onInput" on-blur="onBlur" on-focus="onFocus" class="put" type="{{it.type||'text'}}" maxlength="{{it.length}}" placeholder="{{it.placeholder?it.placeholder:''}}" value="{{it.text?it.text:''}}" />