{{% 字体配置在同目录textCfg下添加，若引用配置，传入textCfg的key值。如需做一些调整，如改变字体大小、间距，可传入需要改变的key:value重载}}
{{:it = it||_cfg.it}}

{{let getCfg = _get("app_a/widget/text/textcfg").exports.getCfg}}

{{let overload = {} }}
{{if it.text}}
{{:overload.text = it.text }}
{{end}}

{{if it.space && !it.show }}
{{:overload.space = it.space }}
{{end}}

{{if it.fontSize}}
{{:overload.fontSize = it.fontSize }}
{{end}}

{{if it.fontFamily}}
{{:overload.fontFamily = it.fontFamily }}
{{end}}

{{if it.lineHeight}}
{{:overload.lineHeight = it.lineHeight }}
{{end}}

{{if it.color}}
{{:overload.color = it.color }}
{{end}}

{{if it.shadow}}
{{:overload.shadow = it.shadow }}
{{end}}

{{let textCfg = getCfg(it.textCfg,overload)}}
<pi-ui-imgtext>
    {"textCfg":{{textCfg}},"show":"{{it.show||it.text}}","space":{{it.space||0}} }
</pi-ui-imgtext>