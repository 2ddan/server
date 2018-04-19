
{{if it.text}}
    {{let text = it.text.split('')}}
    <div style="position: absolute;top: 0;left: 0px;width: 40px;height: 49px;font-family:mnjsh">
        <div style="width: 20px;height: 37px;position: absolute;top: 0px;left: 0px;color: rgb(253, 237, 215);text-shadow: rgb(40, 45, 58) 1px 0px 1px, rgb(40, 45, 58) -1px 0px 1px, rgb(40, 45, 58) 0px 1px 1px, rgb(40, 45, 58) 0px -1px 1px;font-size: 16px;line-height: 19px;">{{text[0]}}{{text[1]}}</div>
        <div style="width: 20px;height: 37px;word-wrap: break-word;position: absolute;top: 0px;left: 20px;color: rgb(253, 237, 215);text-shadow: rgb(40, 45, 58) 1px 0px 1px, rgb(40, 45, 58) -1px 0px 1px, rgb(40, 45, 58) 0px 1px 1px, rgb(40, 45, 58) 0px -1px 0px;font-size: 16px;line-height: 19px;">{{text[2]}}{{text[3]}}</div>
    </div>
{{end}}
