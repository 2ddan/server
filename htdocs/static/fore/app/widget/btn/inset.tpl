{{% 必须：指定tpl的宽高 }}

{{% 可选: class: [ 0, 1, 2, 3], [普通蓝色按钮, 普通洋红按钮, 高亮按钮, 导航栏选中按钮]}}

<div style="position:absolute;width:110px;height:40px;">
    <app-widget-btn-vein style="width:100%;height:100%;">{"text":{{it.text || ''}},"class":{{it.class||0}},"tip_keys":{{it.tip_keys||[]}},"guide":{{it.guide||''}},"isGray":{{it.isGray || 0}},"BGcolor":{{it.BGcolor||"#374062"}} }</app-widget-btn-vein>
</div>