{{:it=it||{} }}
<div style="position:absolute;z-index:1;width:100%;height:100%;">
    <div class="popups_bg {{it.type?'':'popbagBG'}}">
       <div style="position:relative;width:{{it.type?'350px':'255px'}};margin:0 auto;">
        <i on-tap="colse" class="popups_close"></i>
        <app_b-widget-min_title>{title:{{it.title||0}},textType:{{it.textType||0}},titleWidth:{{it.titleWidth}}}</app_b-widget-min_title>
        <div class="popups_top {{it.type?'':'bottom'}}"></div>
    </div>
    </div>
</div>