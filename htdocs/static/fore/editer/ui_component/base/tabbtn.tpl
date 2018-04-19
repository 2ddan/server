{{:it = it || {"cfg":{"clazz":"", "text":"1"} } }}

<div on-tap="tap" w-class="{{if it.select}}select{{else}}other{{end}}">
    {{it.cfg.text}}
</div>

