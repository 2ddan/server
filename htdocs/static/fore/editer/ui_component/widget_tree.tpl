{{: it = it || {} }}
<div style="position: absolute;width: 100%;top:0;bottom: 0;background-color:rgb(27, 27, 41);">
	<div style="position: absolute;width: 100%;height: 30px;background-color: rgb(36, 36, 49);text-align:center;line-height:27px;color:#b4b4b7;font-size: 14px;">
		组件<input type="text" spellcheck="false" placeholder="" on-change="searchWidget" style="font-family:'icon';background:rgb(24, 23, 34);color:rgb(119, 119, 119);height:24px;text-indent:4px;border:none;margin-left:10px;width:100px;"/>
	</div>
	<div style="position: absolute; width:100%;top:30px;bottom:55%;overflow:hidden;">
		<div style="position: absolute; width:calc(100% + 20px);height:100%;overflow-x:hidden;overflow-y: auto;">
			<base-treememu$ style="width:100%;position:absolute;left:-16px;" ev-tm-select="select">{{it.searchTree||it.tree}}</base-treememu$>
		</div>
	</div>
	<div style="position: absolute;width:100%;top:45%; bottom:0px;">
		<div style="position: absolute;width: 100%;height: 30px;background-color: rgb(36, 36, 49);text-align:center;line-height:30px;color:#b4b4b7;font-size: 14px;">预览</div>
		{{if it.showWidget}}
		<show_widget$>{{it.showWidget}}</show_widget$>
		{{else}}
		<div></div>
		{{end}}
	</div>
</div>