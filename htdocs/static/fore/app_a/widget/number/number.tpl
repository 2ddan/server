{{:it = it||_cfg.it}}
{{let isGary = (it.maxCount && it.maxCount === 1) ? true : false }}
<div style="width:100%;height:54px;">
    <app_a-widget-btn-sq on-down='down({{-(it.step&&it.step[1]?it.step[1]:10)}}, e)' on-up='up' w-class="num_text">
        {"class": "default","fontsize": 14,"text": "-{{it.step&&it.step[1]?it.step[1]:10}}","width": 38,"height": 38}
    </app_a-widget-btn-sq>
    
    <app_a-widget-btn-sq on-down='down({{-(it.step&&it.step[0]?it.step[0]:1)}}, e)' on-up='up' w-class="num_text">
        {"class": "default","fontsize": 14,"text": "-{{it.step&&it.step[0]?it.step[0]:1}}","width": 38,"height": 38}
    </app_a-widget-btn-sq>

    <div style="background-image: url(app_a/widget/pic_text/images/resource_bar.png);font-size: 19px;width:136px;height:37px;position: relative;margin:0 6px;display: inline-block;text-align: center;background-size: 100% 100%;top:3px">
        <input readonly="readonly" w-class="input_box" num_name="input" value="{{it.count}}" />
    </div>
    <app_a-widget-btn-sq on-down='down({{+(it.step&&it.step[0]?it.step[0]:1)}}, e)' on-up='up' w-class="num_text">
        {"class": "default","fontsize": 14,"text": "+{{it.step&&it.step[0]?it.step[0]:1}}","width": 38,"height": 38}
    </app_a-widget-btn-sq>
    
    <app_a-widget-btn-sq on-down='down({{+(it.step&&it.step[1]?it.step[1]:10)}}, e)' on-up='up' w-class="num_text">
        {"class": "default","fontsize": 14,"text": "+{{it.step&&it.step[1]?it.step[1]:10}}","width": 38,"height": 38}
    </app_a-widget-btn-sq>
</div>