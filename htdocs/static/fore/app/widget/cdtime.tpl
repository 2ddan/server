{{if it.by_hour}}
    {{let h = it.cdInfo.hour * 1 + it.cdInfo.date * 24 }}
    {{let a = it.cdInfo.date = 0}}
    {{: a = it.cdInfo.hour = h < 10 ? "0" + h : h }}
{{elseif it.by_minute}}
    {{let m = it.cdInfo.minute * 1 + it.cdInfo.hour * 60 + it.cdInfo.date * 24 * 60 }}
    {{let a = it.cdInfo.date = 0}}
    {{: a = it.cdInfo.hour = 0}}
    {{: a = it.cdInfo.minute = m < 10 ? "0" + m : m }}
{{elseif it.by_second}}
    {{let s = it.cdInfo.second * 1 + it.cdInfo.minute * 60 + it.cdInfo.hour * 60 * 60 + it.cdInfo.date * 24 * 60 *60 }}
    {{let a = it.cdInfo.date = 0}}
    {{: a = it.cdInfo.hour = 0}}
    {{: a = it.cdInfo.minute = 0}}
    {{: a = it.cdInfo.second = s < 10 ? "0" + s : s }}
{{end}}
<div>{{it.cdInfo.date != 0? it.cdInfo.date+'天  ':''}}{{it.cdInfo.hour != 0?it.cdInfo.hour+':':''}}{{it.cdInfo.minute != 0?it.cdInfo.minute+':':'00:'}}{{it.cdInfo.second}}</div>