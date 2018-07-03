<span>
{{if it.cdInfo}}
{{let show = it.cdInfo.date +"天 " + it.cdInfo.hour +"时 " + it.cdInfo.minute +"分 " + it.cdInfo.second + "秒 " }}
{{show}}
<imgtext$>{"textCfg":{"text":{{show}}, "font":"20px 宋体", "color":"#636363"}}</imgtext$>
{{end}}
</span>