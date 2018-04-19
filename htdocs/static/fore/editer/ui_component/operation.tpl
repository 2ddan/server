{{: it = it || {} }}
<div style="position: absolute;width: 100%;height: 100%;outline-color:#178BCA" tabindex="1" on-keydown="keyMove">
	<div id="bungees" style="position: absolute;left:{{it.boxWidth}}px;top:{{it.boxWidth}}px;width:{{it.width}}px;height:{{it.height}}px;">
		{{if it.open_widget}}
		<widget w-tag={{it.open_widget}}></widget>
		{{end}}

		{{if it.grid}}
		<div w-class="grid_box" style="width:{{it.grid.w}}px;height:{{it.grid.h}}px;left:{{it.grid.x}}px;top:{{it.grid.y}}px;grid-template-row:{{it.grid.row}};grid-template-columns:{{it.grid.columns}};grid-row-gap:{{it.grid.rowGap}};grid-column-gap:{{it.grid.columnGap}};">
			{{let count = it.grid.itemCount }}
			{{while count>0 }}
			<div w-class="grid_item"></div>
			{{:count--}}
			{{end}}
		</div>
		{{end}}

		{{if it.dragEnter}}
		<div w-class="drag_enter_box">
			<div style="position:absolute;width:100%;top:0;left:0;background-color:rgba(0,0,0,0.7);height:{{it.dragEnter.top}}px;"></div>
			<div style="position:absolute;width:100%;bottom:0;left:0;background-color:rgba(0,0,0,0.7);top:{{it.dragEnter.top+it.dragEnter.height}}px;"></div>
			<div style="position:absolute;left:0;background-color:rgba(0,0,0,0.7);top:{{it.dragEnter.top}}px;height:{{it.dragEnter.height}}px;width:{{it.dragEnter.left}}px;"></div>
			<div style="position:absolute;right:0;background-color:rgba(0,0,0,0.7);top:{{it.dragEnter.top}}px;height:{{it.dragEnter.height}}px;left:{{it.dragEnter.left+it.dragEnter.width}}px;"></div>
		</div>
		{{end}}
	</div>
	<div w-class="ruler_top" on-mousedown="rulerDown(e,'h')"></div>
	<div w-class="ruler_left" on-mousedown="rulerDown(e,'v')"></div>

	{{if it.onMove}}
	<div w-class="move_rect {{it.cursor||''}}" on-mousemove="mousemove" on-mouseup="mouseup"></div>
	{{end}}

	{{if it.showLines}}
	{{for i,o of it.lines ||[]}}
	<div w-class="line_{{o[1]}}" on-mousedown="moveLine(e,'{{i}}')" on-mouseup="deleteLine(e,'{{i}}')" style="{{o[1]==='h'?'top':'left'}}:{{o[0]-2}}px;">
		<div w-class="num_px_{{o[1]}}">{{o[0]-20}}</div>
		<div w-class="num_pre_{{o[1]}}">{{Math.round((o[0]-20)*100/(o[1]==='h'?it.height:it.width))}}%</div>
	</div>
	{{end}}
	{{end}}
</div>
