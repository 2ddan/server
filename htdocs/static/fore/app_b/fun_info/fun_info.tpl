<div style="position: absolute;width: 100%;height: 100%;">
    <div style="top: 0px;bottom: 0px;left: 0px;right: 0px;margin: auto;position: absolute;width: {{it.width}}px;height: {{it.hieght}}px;">
        <app_a-widget-img_stitch-stitch style="position: absolute;left: 0px;width: 100%;height: 100%;">
            {"type":1,"height":15,"width":15}
        </app_a-widget-img_stitch-stitch>
        <widget on-tap="goback" w-tag="app_a-widget-btn_pic-btn_pic" style="z-index: 1;position: absolute;right: -24px;top: -24px;">
            {"icon":"close"} 
        </widget>
        <div style="position: absolute;top: 10px;left: 10px;right: 10px;bottom: 10px;margin: auto;">
            <pi-ui-html style="display:inline-block;">{{it.text}}</pi-ui-html>
        </div>

    </div>

</div>