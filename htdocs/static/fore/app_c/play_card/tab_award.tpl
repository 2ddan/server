<div w-class="36">
    <div w-class="38">
        我的积分:<span style="color:#35e04d;position: relative;">{{it1.cardData.score}}</span>
    </div>
    {{let Pi = _get("app/mod/pi").exports.Pi}}
    {{let Common = _get("app/mod/common").exports.Common}}
    {{let activity_wanfa = _get("cfg/c/activity_special").exports.activity_wanfa}}

    {{let _list = activity_wanfa[102].award_limit}}
    {{let _award = activity_wanfa[102].award}}
    <div w-class="39">
        <div scroller="1" style="box-sizing:border-box;width:105%;overflow-y: auto; overflow-x: hidden;height:100%;">
            {{for i,v of _list}}
                {{if it1.cardData.score>=v && !it1.cardData.score_once_award[i] }}
                    <app_c-play_card-tab_award_frame>{"award":{{_award[i][0]}},"num":1,"need":{{v}},"have":{{it1.cardData.score}},"i":{{i}} }</app_c-play_card-tab_award_frame>
                {{end}}
            {{end}}
            {{for i,v of _list}}
                {{if it1.cardData.score < v && !it1.cardData.score_once_award[i] }}
                    <app_c-play_card-tab_award_frame>{"award":{{_award[i]}},"num":2,"need":{{v}},"have":{{it1.cardData.score}},"i":{{i}} }</app_c-play_card-tab_award_frame>
                {{end}}
            {{end}}
            {{for i,v of _list}}
                {{if it1.cardData.score_once_award[i] }}
                    <app_c-play_card-tab_award_frame>{"award":{{_award[i]}},"num":3,"need":{{v}},"have":{{it1.cardData.score}},"i":{{i}} }</app_c-play_card-tab_award_frame>
                {{end}}
            {{end}}
        </div>
    </div>
    
</div>