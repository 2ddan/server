<div data-desc="面板横幅标题" style="position:absolute;height:40px;width:100%;padding:0 13px;box-sizing:border-box">
    {{for i,v of it.text}}
    <app_b-widget-rank-rank_title style="margin-right:{{i<it.len-1 ?'60px':'0'}}">{"text":{{v}},"width":{{it.width}} }</app_b-widget-rank-rank_title>
    {{end}}
</div> 