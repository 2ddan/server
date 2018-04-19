<div>
    {{let appCfg = _get("app/mod/db").exports.data}}
    {{let chatShow = appCfg.chat.show}}
    {{let cfg = _get("app/mod/pi").exports.cfg}}
    {{let player = appCfg.player}}
    {{let scenename = _get("app/scene/scene").exports.mgr_data.name}}
    {{let talk_base = cfg.talk_base.talk_Base}}
    {{let vip_advantage = cfg.vip_advantage.vip_advantage}}
    {{let chat_color = {"world_chat":["#51e650","世界"],"current_chat":["#fde7ca","当前"],"gang_chat":["#ffea01","公会"], "system":["#ff6600","系统"]} }}
    <div maxId="7" test="test" style="position: absolute;width: 100%;height: 100%;display:{{ chatShow ? 'block' : 'none'}};    pointer-events: none;" w-sid="2">
        <div class="shadow" w-class="3" w-sid="3" on-tap="showChat" style="pointer-events: all;bottom: {{scenename == 'wild' ? 87 : 0}}px;">
            {{let new_chat = it1.all_chat[it1.all_chat.length - 1]}}
            {{if new_chat}}
            <div style="width:96%;position:absolute;left: 12px;font-size:18px;z-index:1;height: 46px;{{if new_chat[1].role_info.name == 'system'}}line-height: 46px;{{end}}">
                {{let color = "#fde7ca"}}
                {{if new_chat[1].role_info.name !== "system"}}
                <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:{{chat_color[new_chat[0]][0]}};font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;">
                    {{chat_color[new_chat[0]][1]}}
                </div>
                
                <div on-tap="seeOther({{new_chat[1].role_info.role_id}})" style="position:relative;color:#60b3ff;display:inline-block;height: 46px;line-height: 46px;" >
                    {{"S"+ new_chat[1].role_info.area + "[" + new_chat[1].role_info.name+ "]"}}
                </div>
                {{let vip_lv = new_chat[1].role_info.vip || 0}}
                {{:color = it1.vip_advantage[vip_lv].chat_color}}
                    {{if vip_lv}}
                    <widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                        {"icon":{{"vip_lv_"+(vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP"+vip_lv}},"top":0,"left":0} 
                    </widget>
                    {{end}}
                {{else}}
                <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:#ff6600;font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;">
                    系统
                </div>
                {{end}}
                
                <div style="position:relative;color:{{new_chat[1].role_info.name !== 'system' ? color : '#ff6600'}};    display:inline-block;width: {{new_chat[1].role_info.name !== 'system' ? '58%' : '89%'}};text-overflow: ellipsis;white-space: nowrap;overflow: hidden;vertical-align: {{new_chat[1].role_info.name !== 'system' ? 'text-top' : 'bottom'}};">{{new_chat[1].chat}}</div>
            </div>
            {{end}}
            
            <widget w-class="4" w-tag="app_a-widget-bg_frame-bg" w-sid="4">{"bgName":"chat_bg"} 
            </widget>
            <widget w-class="5" w-tag="app_a-widget-pic_other-pic_other" w-sid="5">{"icon":"chat_top"} 
            </widget>
            <img w-class="6" src="app_a/widget/btn_pic/images/light_arraw.png" w-sid="6"/>
        </div>
    </div>

    <div maxId="13" test="test" style="position: absolute;width: 100%;height: 100%;display:{{ !chatShow ? 'block' : 'none'}};pointer-events: none;" w-sid="2">
        <div w-class="7" w-sid="7" style="pointer-events: all;bottom: {{scenename == 'wild' ? 86 : 0}}px;">
            <widget w-class="8" w-tag="app_a-widget-bg_frame-bg" w-sid="8">{"bgName":"chat_bg"} 
            </widget>
            <widget w-class="9" w-tag="app_a-widget-pic_other-pic_other" w-sid="9">{"icon":"chat_top"} 
            </widget>
            <img w-class="10" on-tap="showChat" style="z-index: 1;" src="app_b/chat/images/chat_back.png" w-sid="10"/>

            <div style="width: 520px;position: absolute;left: 50%;top: 18px;bottom: 50px;margin-left: -260px;">
                <app-widget-tab-navtab style="position:absolute;width:100%;top:0;bottom:0;left:0px;top: 0;line-height:45px;" ev-change = "changeColumns">
                    {"cur":0,
                    "btn_box":"btnBag",
                    "btn_width":78,
                    "btn_height":36,
                    "left":0,
                    "top":-10,
                    "display":1,
                    "margin":20,
                    "bType":2,
                    "layout":1,
                    "arr":[
                        {"tab":"app_b-chat-chat_list", "btn":{"text":"世 界","type_m":"world_chat","type":"border","fontSize":24}},
                        {"tab":"app_b-chat-chat_list", "btn":{"text":"门 派","type_m":"gang_chat","type":"border","fontSize":24}},
                        {"tab":"app_b-chat-chat_list", "btn":{"text":"当 前","type_m":"current_chat","type":"border","fontSize":24}}
                    ],
                    "type":0}
                </app-widget-tab-navtab>
    
                <div style="width: 444px;height: 294px;position: absolute;left: 84px;overflow: hidden;top: -6px;">
                    <img src="./images/chat_info_bg.png" style="position:absolute;left:0px;top:0px;"/>

                    <div data-desc="otherList" style="width:105%;top:0px;bottom:0px;position:absolute;overflow-x: hidden;overflow-y: auto;">
                        {{if it1.tab_type == "world_chat"}}
                            {{let list = it1.world_list.slice(0)}}
                            {{:list = list.reverse()}}
                            {{for i,v of list}}
                                <div style="width:432px;height:auto;position:relative;line-height: 32px;left: 7px;">
                                    {{if list[i].role_info.role_id == player.role_id}}
                                        <img src="./images/my_chat_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{elseif list[i].role_info.name == "system"}}
                                        <img src="./images/system_chat_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{else}}
                                        <img src="./images/chat_content_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{end}}

                                    {{if list[i].role_info.name !== "system"}}
                                    {{let vip_lv = list[i].role_info.vip || 0}}
                                    {{let color = it1.vip_advantage[vip_lv].chat_color}}
                                    <div style="width:93%;height:32px;position:relative;top: 2px;font-size: 18px;left: 12px;display:inline-block">
                                        
                                        <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:{{chat_color[it1.tab_type][0]}};font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;">
                                            {{chat_color[it1.tab_type][1]}}
                                        </div>
                                        <div on-tap="seeOther({{list[i].role_info.role_id}})"  style="position:relative;color:#60b3ff;display:inline-block;">
                                            {{"S"+ list[i].role_info.area + "[" + list[i].role_info.name+ "]"}}
                                        </div>
                                        
                                        {{if vip_lv}}
                                        <widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                                            {"icon":{{"vip_lv_"+(vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP"+vip_lv}},"top":0,"left":0} 
                                        </widget>
                                        {{end}}
                                    </div>
                                    <div style="width:96%;position:relative;color:{{color}};font-size: 16px;padding-left: 10px;display:inline-block;line-height: 22px;padding-bottom: 12px;">{{list[i].chat}}</div>
                                    {{else}}
                                    
                                    <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:#ff6600;font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;left: 10px;">
                                        系统
                                    </div>
                                    <div style="width:86%;position:relative;display:inline-block;color: #ff6600;font-size: 16px;padding-left: 10px;line-height: 22px;padding-bottom: 8px;padding-top: 5px;">{{list[i].chat}}</div>
                                    {{end}}
                                </div>
                            {{end}}
                        {{elseif it1.tab_type == "gang_chat"}}
                            {{let list = it1.gang_list.slice(0)}}
                            {{:list = list.reverse()}}
                            {{for i,v of list}}
                                {{if i <= talk_base.record_count}}
                                <div style="width:432px;height:auto;position:relative;line-height: 32px;left: 7px;">
                                    {{if list[i].role_info.role_id == player.role_id}}
                                        <img src="./images/my_chat_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{else}}
                                        <img src="./images/chat_content_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{end}}
                                    {{let vip_lv = list[i].role_info.vip || 0}}
                                    {{let color = it1.vip_advantage[vip_lv].chat_color}}
                                    <div style="width:93%;height:32px;position:relative;top: 2px;font-size: 18px;left: 12px;display:inline-block">
                                        {{if list[i].role_info.name !== "system"}}
                                        <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:{{chat_color[it1.tab_type][0]}};font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;">
                                            {{chat_color[it1.tab_type][1]}}
                                        </div>
                                        <div on-tap="seeOther({{list[i].role_info.role_id}})" style="position:relative;color:#60b3ff;display:inline-block;">
                                            {{"S"+ list[i].role_info.area + "[" + list[i].role_info.name+ "]"}}
                                        </div>
                                        {{end}}
                                        
                                        {{if vip_lv}}

                                       <widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                                            {"icon":{{"vip_lv_"+(vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP"+vip_lv}},"top":0,"left":0} 
                                        </widget>
                                        {{end}}
                                    </div>

                                    <div style="width:96%;position:relative;color:{{color}};font-size: 16px;padding-left: 10px;display:inline-block;line-height: 22px;padding-bottom: 12px;">{{list[i].chat}}</div>
                                </div>
                                {{end}}
                            {{end}}
                        {{else}}
                            {{let list = it1.curr_list.slice(0)}}
                            {{:list = list.reverse()}}
                            {{for i,v of list}}
                                {{if i <= talk_base.record_count}}
                                <div style="width:432px;height:auto;position:relative;line-height: 32px;left: 7px;">
                                    {{if list[i].role_info.role_id == player.role_id}}
                                        <img src="./images/my_chat_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{else}}
                                        <img src="./images/chat_content_bg.png" style="position:absolute;left:0px;top:0px;height: 100%;width: 432px;" />
                                    {{end}}
                                    {{let vip_lv = list[i].role_info.vip || 0}}
                                    {{let color = it1.vip_advantage[vip_lv].chat_color}}
                                    <div style="width:93%;height:32px;position:relative;top: 2px;font-size: 18px;left: 12px;display:inline-block">
                                        {{if list[i].role_info.name !== "system"}}
                                        <div style="width:42px;height:20px;position:relative;display:inline-block;margin-right: 7px;background-color:#4d342a;border-radius:5px;color:{{chat_color[it1.tab_type][0]}};font-family:mnjsh;line-height: 20px;text-align: center;border-color: #684833;">
                                            {{chat_color[it1.tab_type][1]}}
                                        </div>
                                        <div on-tap="seeOther({{list[i].role_info.role_id}})" style="position:relative;color:#60b3ff;display:inline-block;" >
                                            {{"S"+ list[i].role_info.area + "[" + list[i].role_info.name+ "]"}}
                                        </div>
                                        {{end}}
                                        {{if vip_lv}}
                                        <widget class="shadow7" style="position:relative;display:inline-block;margin-right: 6px;top: 6px;font-size:14px;color:#fff" w-tag="app_a-widget-pic_text-pic_text">
                                                {"icon":{{"vip_lv_"+(vip_advantage[vip_lv].lv_frame || 1)}},"width":52,"height":25,"align":"center","marginLeft":3,"text":{{"VIP"+vip_lv}},"top":0,"left":0} 
                                            </widget>
                                        {{end}}
                                    </div>

                                    <div style="width:96%;position:relative;color: {{color}};font-size: 16px;padding-left: 10px;display:inline-block;line-height: 22px;padding-bottom: 12px;">{{list[i].chat}}</div>
                                </div>
                                {{end}}
                            {{end}}
                        {{end}}
                    </div>
                </div>
                
            </div>

            <widget w-class="11" on-tap="sendMessage" w-tag="app_a-widget-btn-rect" w-sid="11">{"class":"hl","fontsize":18,"color":"#fdedd7;","text":"发  送","width":84,"height":36} 
            </widget>
            {{if it1.tab_type=="gang_chat" && !appCfg.gang.data.gang_id}}
                <widget disabled="disabled" w-class="12" data-desc="content" ev-input-text="getFocusInput" ev-input-blur="upDataInputValue" w-tag="app_a-widget-input-input" w-sid="12">{"length":60,"placeholder":"当前无门派"}</widget>
            {{else}}
                <widget  w-class="12" data-desc="content" ev-input-text="getFocusInput" ev-input-blur="upDataInputValue" w-tag="app_a-widget-input-input" w-sid="12">{"length":60}</widget>
            {{end}}
        </div>
    </div>
</div>