{{let b = (it == "gest_bag") ? true : false}}
<div style="position:absolute;top:0;left:0;z-index:2;width:100%;height:100%;">
    {{let t = b?"心法背包":"心法兑换"}}
    <app_b-widget-title-title style="z-index:2;top:0;left:0">
         {"text":{{t}},"coin":["money","diamond",150001],"top":"7","left":"19","type":"gest_coin" }
    </app_b-widget-title-title>
    <div style="width:100%;position:absolute;height:720px;left:50%;top:100px;margin-left:-273px;overflow:hidden;z-index:2">
        <div style="position:absolute;top:3px;left:30px;z-index:3">
            {{let arr = ["紫色","橙色"]}} 
            {{for i,v of arr}} 
                {{let quality = i-0+4}}
                <app-widget-tab-tab_btn style="display:inline-block;width:96px;height:41px;margin-left:2px" on-tap='tabChange({{quality}})'>
                    {"cfg":{"text":{{v}}},"select":{{it1.gestQuality==quality?1:0}}}
                </app-widget-tab-tab_btn>
            {{end}}
        </div>
        <div class="line_6" style="position: absolute; top: 33px; z-index: 4;left: 0;width: 545px;"></div>			
        <widget w-tag="app_a-widget-bg_frame-bg" style="position:absolute;width:492px;height:655px;top:48px;left:27px">
            {"bgName":"bg_frame21"} 
        </widget>
        <div scroller="1" style="box-sizing:border-box;width:105%;height:635px;overflow-y: auto; overflow-x: hidden;margin-top: 50px;margin-left:30px;padding-top:15px">
            {{let q = it1.gestQuality}}
            {{let list = b ? it1.myGest : it1.gest_shop}}
            {{let n = ''}}
            {{for i,v in list}}
            {{:n = b ? v : it1.Pi.sample[v.sid]}}
            {{if n && n.quality == q}}
            <div style="height: 127px;position: relative;width:447px;margin-bottom:10px;left:20px">
                <widget w-tag="app_a-widget-bg_frame-bg" style="width:447px;height:126px">
                    {"bgName":"bg_frame19"}
                </widget>
                <div style="position:absolute;left:16px;top:15px;width:76px;height:76px;">
                    <app-widget-prop-base_prop-base_prop style="width:76px;height:76px;">
                        {"prop":{"quality":{{q}} },"url":{{it1.Pi.pictures[n.icon]}} }
                    </app-widget-prop-base_prop-base_prop>
                    <div style="position: absolute;right: 5px;bottom: 2px;z-index:2;color:#efcb9d;font-size:17px;font-weight:600;">{{b?v.count:''}}</div>
                    {{if !b}}
                    {{let _b = it1.isExchange(i)}}
                    <div style="padding-left: 19px;font-size:12px;position:absolute;bottom:-17px;left:50%;transform: translateX(-50%);color:#fff;text-shadow: #000 1px 0px 0px, #000 0px 1px 0px, #000 -1px 0px 0px, #000 0px -1px 0px;">
                        {{let count=v["price"][1]}}
                        <app_a-widget-coin-coin style="left: -20px;bottom:-8px;position: absolute;font-size: 15px;width: 100px;color:{{_b ? '#efcb9d': '#f00'}}">{"icon":"gest_coin","text":[{{count}}],"color": "#efcb9d","left":7}</app_a-widget-coin-coin>
                    </div>

                    {{end}}
                </div>

                <div style="width:194px;text-align: justify;position: absolute;left:110px;top:10px;">
                    <app-widget-text-text style="margin-left: -3px;vertical-align: middle;">
                        {"textCfg":"gestShop","text":"{{n.name }}","fontSize":22}
                    </app-widget-text-text>
                    <div style="color:#fff;font-size:14px;height:51px;overflow:hidden;margin-top:10px;color:#efcb9d;">{{n.describe}}</div>
                </div>
                
                <app_a-widget-btn-rect on-tap="exchange({{b}},{{v.sid}})"  style="line-height:24px;position:absolute;right:15px;bottom:45px;">
                    {"text":{{b?"分 解":"兑 换"}},"class":{{b?"default": it1.isExchange(i) ? "default" : "disabled"}},"fontsize":"24","width":116,"height":45}
                </app_a-widget-btn-rect>
                {{if b}}
                <div style="position:absolute;top:13px;font-size:15px;left:215px;color:#efcb9d;text-shadow: #333 1px 0px 0px, #333 0px 1px 0px, #333 -1px 0px 0px, #333 0px -1px 0px;">
                    （拥有:&nbsp;&nbsp;{{v.count}}）
                </div>
                {{end}}
            </div>
            {{end}} 
            {{end}}
        </div>
    </div>
</div>