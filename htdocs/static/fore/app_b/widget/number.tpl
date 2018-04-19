<div style="width:100%;height:54px;">
    <app-widget-btn-button on-down='down({{-(it.step&&it.step[1]?it.step[1]:10)}}, e)' on-up='up' w-class="num_text">
        {"text":"-{{it.step&&it.step[1]?it.step[1]:10}}"}
    </app-widget-btn-button>

    <app-widget-btn-button on-down='down({{-(it.step&&it.step[0]?it.step[0]:1)}}, e)' on-up='up' w-class="num_text">
        {"text":"-{{it.step&&it.step[0]?it.step[0]:1}}"}
    </app-widget-btn-button>

    <input readonly="readonly" w-class="input_box" num_name="input" value="{{it.count}}"/>

    <app-widget-btn-button on-down='down({{+(it.step&&it.step[0]?it.step[0]:1)}}, e)' on-up='up' w-class="num_text">
        {"text":"+{{it.step&&it.step[0]?it.step[0]:1}}"}
    </app-widget-btn-button>

    <app-widget-btn-button on-down='down({{+(it.step&&it.step[1]?it.step[1]:10)}}, e)' on-up='up' w-class="num_text">
        {"e":{{it.e?it.e:{} }},"guide":"{{it.guide10}}","text":"+{{it.step&&it.step[1]?it.step[1]:10}}"}
    </app-widget-btn-button>
</div>
