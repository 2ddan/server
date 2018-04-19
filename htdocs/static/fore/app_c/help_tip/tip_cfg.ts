/*global pi,forelet,app */

export const helpTips = {
	"playCard":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;每次翻牌将花费一定元宝。<br/><br/>2.&nbsp;&nbsp;牌面分为数字和物品。<br/><br/>3.&nbsp;&nbsp;翻到数字，则在下方倍数处+或*该数字使得倍数翻倍。<br/><br/>4.&nbsp;&nbsp;翻到物品，则可获得的物品数量将会乘以下方倍数。同时初始化下方倍数。<br/><br/>5.&nbsp;&nbsp;玩家点击重置，可开启新的一局翻翻乐。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、如何获得幸运值或积分</span><br/><br/>1.&nbsp;&nbsp;翻到物品，可获得一定幸运值，当幸运值满后，下局将开启福利局。福利局中数字和物品将会成倍增长。<br/><br/>2.&nbsp;&nbsp;翻到物品，可获得一定积分，在活动开启期间，积分越高，活动结束后获得的奖品越好。"]
	},"gem":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;每局可获得7个初始宝石，玩家可将其填入宝石孔中，连成直线以可获得直线两头的物品。<br/><br/>2.&nbsp;&nbsp;在中间区域会有分散的小宝石，若玩家用宝石将该区域围住，则可获得该区域中的宝石。<br/><br/>3.&nbsp;&nbsp;宝石用完后，需重置才可开启新的宝石迷阵，重置将会花费一定元宝。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、如何获得积分</span><br/><br/>1.&nbsp;&nbsp;获得物品时，可获得一定积分，在活动开启期间，积分越高，活动结束后获得的奖品越好。"]
	},"team":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、组队</span><br/><br/>1.&nbsp;&nbsp;玩家创建队伍后，自动成为队长。<br/><br/>2.&nbsp;&nbsp;点击队伍中的“+”可邀请同门派成员参与组队。<br/><br/>3.&nbsp;&nbsp;点击队伍下方“一键组队”可迅速组齐队员。<br/><br/>4.&nbsp;&nbsp;队长点击队员头像，可对队员进行踢出队员等操作。<br/><br/>5.&nbsp;&nbsp;所有队员均可在任务开启前，购买增益，增加输出。购买的增益可使全队人员获得加成。<br/><br/>6.&nbsp;&nbsp;每人只可购买一次增益，总共可购买5层增益。<br/><br/>7.&nbsp;&nbsp;全部队员点击“准备”按键后，队长方可开启任务。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、战斗结算条件</span><br/><br/>1.&nbsp;&nbsp;玩家在规定时间内成功挑战完所有怪物，则结算战斗。<br/><br/>2.&nbsp;&nbsp;规定时间结束，则结算战斗。<br/><br/>3.&nbsp;&nbsp;所有队员同时阵亡，则结算战斗。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>三、获得积分</span><br/><br/>1.&nbsp;&nbsp;玩家成功击杀怪物后，可使全队队员获得积分。达到一定积分可于商城购买低价商品。"]
	},"arena":{
		"color":"#fff",
		"fontSize":"20px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<br/>1.竞技场的。<br/>2.需所有玩家点击“准备”后，方可开启任务。<br/>3.&nbsp;"]
	},"act":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、星级评定</span><br/><br/>1.&nbsp;&nbsp;三星：未有伙伴死亡。<br/><br/>2.&nbsp;&nbsp;二星：只有一位伙伴死亡。<br/><br/>3.&nbsp;&nbsp;一星：多位伙伴死亡。"]
	},"instance":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、进入限制</span><br/><br/>1.&nbsp;&nbsp;通轮回副本，可开启九幽幻境相应章节的进入权。<br/><br/>2.&nbsp;&nbsp;具体限制，可在九幽幻境章节下方查询。"]
	},"towermirror":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;每轮挑战分为10回合。玩家成功挑战10回合后，则视为通关本次挑战。通关后玩家则可以通过“重置”重新开始一轮挑战。<br/><br/>2.&nbsp;&nbsp;若玩家在中途挑战失败，则可以通过“重置”重新开始一轮挑战。<br/><br/>3.&nbsp;&nbsp;每回合，玩家可点击“刷新”来匹配适合的对手。<br/><br/>3.&nbsp;&nbsp;根据匹配到的战斗力不同，玩家获得的奖励也不同。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、积分</span><br/><br/>1.&nbsp;&nbsp;玩家每回合挑战成功将会获得100积分。挑战失败获得50积分。<br/><br/>2.&nbsp;&nbsp;获得足够积分后，可在商城中低价购买商品。<br/><br/>3.&nbsp;&nbsp;积分每周日24点清零。"]
	},"tower":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;玩家可通过挑战来达到更高的楼层。<br/><br/>2.&nbsp;&nbsp;若玩家在挑战中途死亡，可选择复活，继续挑战。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、扫荡</span><br/><br/>1.&nbsp;&nbsp;玩家挑战层数≥10层可扫荡楼层获得奖励。<br/><br/>2.&nbsp;&nbsp;扫荡只可扫荡10的整数倍楼层，即45层只会扫荡至40层，玩家将会获得1-40层所有奖励。<br/><br/>3.&nbsp;&nbsp;玩家每天将会有一次免费扫荡次数。"]
	},"worldboss":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;玩家挑战世界boss失败后，将会有一定的复活时间限制。<br/><br/>2.&nbsp;&nbsp;玩家可选择花费元宝，直接复活。也可等复活时间到后，再次进入挑战世界boss。<br/><br/>3.&nbsp;&nbsp;对世界boss造成最后一击的玩家，将获得击杀奖励。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、排名</span><br/><br/>1.&nbsp;&nbsp;根据玩家总输出和单次输出进行排名。<br/><br/>2.&nbsp;&nbsp;排名奖励将于每日24点，通过邮件发放。<br/><br/><span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>三、幸运一击</span><br/><br/>1.&nbsp;&nbsp;每次将随机选取三名玩家获得幸运一击奖励。"]
	},"gest":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、规则</span><br/><br/>1.&nbsp;&nbsp;玩家可通过“心法奇遇”挑战boss获得心法。也可通过“心法传承”直接获得传承心法。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、阵法</span><br/><br/>1.&nbsp;&nbsp;玩家可通过消耗心法来激活、升星阵法。<br/><br/>1.&nbsp;&nbsp;阵法将为玩家提供大量属性加成，建议玩家优先激活阵法。"]
	},"guild":{
		"color":"#fff",
		"fontSize":"14px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size: 18px;font-weight:normal;'>一、创建门派</span><br>1.&nbsp;&nbsp;玩家35级后，可创建门派或加入他人的门派。<br>2.&nbsp;&nbsp;玩家创建门派将花费一定元宝。<br><br><span style='color:rgb(255, 108, 0);font-size:18px;font-weight:normal;'>二、加入门派</span><br>1.&nbsp;&nbsp;玩家35级可加入门派，点击搜索可申请加入他人建立的门派。<br>2.&nbsp;&nbsp;玩家需等待门派管理同意后，方可成为该门派的成员。<br><br><span style='color:rgb(255, 108, 0);font-size:18px;font-weight:normal;'>三、升级门派</span><br>1.&nbsp;&nbsp;门派成员成功击杀门派副本中的怪物后，将会获得一定门派升级经验。<br>2.&nbsp;&nbsp;门派成员每日完成的活跃度，将按照比例转换为门派升级经验。<br>3.&nbsp;&nbsp;门派成员每日完成的活跃度，将同算入门派活跃度中。<br><br><span style='color:rgb(255, 108, 0);font-size:18px;font-weight:normal;'>四、管理门派成员</span><br>1.&nbsp;&nbsp;成员可在“议事大殿”查看门派信息，成员列表，申请列表等。<br>2.&nbsp;&nbsp;门主可在“申请列表”中同意他人入派申请。<br>3.&nbsp;&nbsp;门主可在“成员列表”中对进行踢出成员、修改成员职位等操作。<br>4.&nbsp;&nbsp;只有门主可以解散门派。"]
	},"guildBoss":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、如何召唤门派boss</span><br/><br/>1.&nbsp;&nbsp;门派每日活跃度达到召唤条件，即可召唤对应的门派boss。<br/><br/>2.&nbsp;&nbsp;只有门派管理可进行召唤门派boss。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、如何获得门派活跃度</span><br/><br/>1.&nbsp;&nbsp;门派成员完成日常中的活跃度任务是，将同时算入门派活跃度中。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>三、门派boss奖励</span><br/><br/>1.&nbsp;&nbsp;只有成功击杀门派boss后，才可获得奖励。奖励将通过邮件发放。"]
	},"guildWar":{
		"color":"#fff",
		"fontSize":"16px",
		"fontFamily":"kaiti_bold",
		"fontWeight":"normal",
		"content":["<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>一、门派战准备阶段</span><br/><br/>1.&nbsp;&nbsp;每周一至每周五为帮派战报名时间。<br/><br/>2.&nbsp;&nbsp;只有门派管理可进行门派战报名。<br/><br/>3.&nbsp;&nbsp;每周六20:00将会进行门派匹配，门派成员可在门派战界面查看对手。<br/><br/>4.&nbsp;&nbsp;每周日20：00-20:20为门派战时间。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>二、门派战玩法</span><br/><br/>1.&nbsp;&nbsp;门派战中分为4个战场，双方门派通过占领战场增加获得战场积分。<br/><br/>2.&nbsp;&nbsp;成功击杀对方门派成员，也将获得一定积分。<br/><br/>3.&nbsp;&nbsp;在战场内，将会随机刷新加成道具，合理利用道具将会有更好的战绩。<br/><br/>4.&nbsp;&nbsp;在工会战期间，将会有随机挑选某各战场开启多倍积分，多倍积分的战场中所获得积分均会翻倍。<br/><br/>5.&nbsp;&nbsp;公会战时间结束后，积分高的门派获得胜利。","<span style='color:rgb(255, 108, 0);font-size:20px;font-weight:normal;'>三、门派战奖励</span><br/><br/>1.&nbsp;&nbsp;门派战的奖励将在门派战结束后，通过邮件发放。"]
	}
};
