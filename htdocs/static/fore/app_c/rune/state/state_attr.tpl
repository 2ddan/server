<div maxId="61" test="test" style="position: absolute;width: 100%;height: 100%;z-index:2" w-sid="2">
	<div w-class="3" w-sid="3" style="margin-top: -236px;">
		<div w-class="7" w-sid="7">
			<widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"tips_top"} 
			</widget>
			<widget on-tap='cancel' w-class="6" w-tag="app_a-widget-btn_pic-btn_pic" w-sid="6">{"icon":"close"} 
			</widget>
			<widget w-class="4" w-tag="app_a-widget-pic_other-pic_other" w-sid="4">{"icon":"pendant"} 
			</widget>
			<widget w-class="1" w-tag="app_a-widget-pic_text-pic_text" w-sid="1">
				{"icon":"cover_title","width":180,"height":27,"marginLeft":0,"text":"属性总览","textCfg":"gangCoverTitle","space":0,"fontSize":22} 
			</widget>
		</div>
		<widget w-tag="app_a-widget-title-single" style="position:absolute;top: 45px;left: 218px;z-index: 1;" >
			{"padding":5,"type":9,"width":124,"text":"修行属性","fontSize":20,"space":-2,"color":"#ffd8a6","wear":1} 
		</widget>
		<div w-class="9" w-sid="9">
			<widget w-class="10" w-tag="app_a-widget-bg_frame-bg" w-sid="10" style="height:382px;">
				{"bgName":"bg_frame26"} 
			</widget>
			
			<div scoller="1" data-desc="属性详情" style="width:425px;height:291px;position: absolute;left:12px;top:50px;overflow:hidden;text-align:left;">
				<widget  w-tag="app_a-widget-bg_frame-bg" style="width:100%;height:100%;">
					{"bgName":"bg_frame32"} 
				</widget>
				<div style="width:110%;height:270px;overflow-x:hidden;overflow-y:auto;color:#51e650;font-size:17px;position: absolute;left:0;top:0;z-index:1;line-height: 28px;padding: 10px 0 0 15px;">
					{{let state = it1.rune_data.rune_state}}
					{{let attr = it1.rune_state[state[0]][state[1]].attr}}

					{{if attr}}
					{{for j,k of attr}}
					<div>{{it1.attribute_config[k[0]]+"+"+(k[1]<1?Math.floor(k[1]*100)+"%":k[1])}}</div>
					{{end}}
					{{end}}

					{{for i,v in it1.rune_state[state[0]]}}
					{{if v.id <= state[1]}}
						{{if v.buff_id}}
						<div>{{it1.buff[v.buff_id]}}</div>
						{{end}} 
					{{else}}
						{{if it1.rune_state[state[0]-1]}}
							{{let buff = it1.rune_state[state[0]-1][i]}}
							{{if buff && buff.buff_id}}
							<div>{{it1.buff[buff.buff_id]}}</div>
							{{end}}
						{{else}}
						{{if v.buff_id}}
						<div style="color:#919191">{{it1.buff[v.buff_id]}}</div>
						{{end}} 
						{{end}}
					{{end}}
					{{end}}
				</div>   
			</div>  
		</div>      
		<widget w-class="15" w-tag="app_a-widget-pic_other-pic_other" w-sid="15" style="top:390px;">{"icon":"tips_bottom"} </widget>
	</div>
</div>
