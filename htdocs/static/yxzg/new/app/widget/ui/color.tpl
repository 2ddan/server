{{let colorArr = ['#ccafa2','#8efe28','#66cefe','#e95bef','#fc9a36','#fb332b']}}
{{if it.isGray}}
<span style="color:#ccc;">{{it.text}}</span>
{{else}}
<span style="color:{{colorArr[it.quality||0]}}">{{it.text}}</span>
{{end}}