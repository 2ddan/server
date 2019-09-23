{{:it1  = it1 || {} }}
{{:it   = it || {} }}
<div style="display:flex;">
    {{for i, v in it.innerhtml }}
        {{if v.dType === 'text'}}

            {{let divstyle = ''}}
            {{for i1, v1 in it1.divStyles }}
            {{if v[v1] }}
            {{:divstyle = divstyle + v1 + ':' + v[v1] + ';'}}
            {{end}}
            {{end}}

            {{let txtstyle = ''}}
            {{for i2, v2 in it1.textStyles }}
            {{if v[v2] }}
            {{:txtstyle = txtstyle + v2 + ':' + v[v2] + ';'}}
            {{end}}
            {{end}}

            <div on-tap="{{v['on-tap']}}" style="flex-direction: row;{{divstyle}}width:auto;">
                <span style="{{txtstyle}}">{{v['text']}}</span>
            </div>
        {{else }}

            {{let imgstyle = ''}}
            {{for i1, v1 in it1.imgStyles }}
            {{if v[v1] }}
            {{:imgstyle = imgstyle + v1 + ':' + v[v1] + ';'}}
            {{end}}
            {{end}}

            <img src="{{v['src']}}" style="{{imgstyle}}" />
        {{end }}
    {{end }}
</div>