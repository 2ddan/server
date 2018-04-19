import { Widget, factory } from "pi/widget/widget";
import { data as localDB, updata } from "app/mod/db";
import { mgr, mgr_data } from "app/scene/scene";
import { Common } from "app/mod/common";
import { Fight_common } from "fight/a/fore/fight_common";
import { playerName } from "cfg/a/player_name";
import { initAnimFinishCB } from "app/scene/base/scene";
import { Music } from "app/mod/music";
import { playerList } from "cfg/a/select_role";
import { errTip } from "./user";

//场景特效
const sceneEff = {
    "1000": {
        "effect": "eff_scexzjs01",
        "id": 1000
    },
    "1001": {
        "effect": "eff_scexzjs02",
        "id": 1001
    }
}

let eff = {},
    offsetX,
    isRotate = false, //模型是否可以旋转
    canChange = false, //角色切换 [当角色处于待机状态时才能切换其它模型]
    //记录当前场景里的模型是哪个职业
    moduleId = 1;

export class Regist extends Widget {
    //书写名字
    listenName(data) {
        resetName(data);
    }
    //随机名字
    randomName() {
        updata("user.rolename", playerName());
    }
    //选择性别
    setJob(index) {
        if (canChange) {
            if (localDB.user.career_id != playerList[index].career_id) {
                updata("user.career_id", playerList[index].career_id);
                updata("user.sex", playerList[index].sex);
                updata("user.index", index);
                changeModule(index);
            }
        }
    }
    firstPaint() {
        creatModule();
    }
    /**
	 * @description 从dom树上移除前调用，一般在渲染循环内调用
	 * @example
	 */
	detach(): void {
        mgr.remove(sceneEff[1000]);
        mgr.remove(sceneEff[1001]);
        eff = null;
    }
    down(e: any) {
		if (isRotate) {
            offsetX = 0;
            e.startX = e.x;
            rotating(e, playerList[`${moduleId}`]);
        }	
	}
	move(e: any) {
		if (isRotate) {
            rotating(e, playerList[`${moduleId}`]);
        }	
	}
}

//验证玩家输入姓名
const resetName = function (_new) {
    let str = Common.calculate(10, _new.text);
    if (str != _new.text) {
        updata("user.rolename", str);
        //updata("user.err.name", "名字不能超过10个字节");
        errTip(`名字不能超过10个字节`);
    } else if (/[^0-9A-Za-z\u4e00-\u9fa5]/g.exec(_new.text)) {
        let s = _new.text.replace(/[^0-9A-Za-z\u4e00-\u9fa5]/g, "");
        updata("user.rolename", s);
        //updata("user.err.name", "名字不能包含特殊符号");
        errTip(`名字不能包含特殊符号`);
    } else {
        updata("user.rolename", _new.text);
        updata("user.err.name", "");
    }
};


/**
 * 创建模型
 */
const creatModule = function () {
    updata("user.rolename", playerName());
    //设置相机位置
    let cam = mgr_data.camera["loginscene"];
    mgr.setPos(cam, [0, -1, 0]);
    mgr.modify(cam);
    //初次进入场景创建男模型
    playerList[`${moduleId}`].playAnim = Fight_common.playAnim(playerList[`${moduleId}`].act[0], moduleId, true)
    mgr.create(playerList[`${moduleId}`], "fighter");

    eff[`${moduleId}01`]  = {
        "effect": playerList[`${moduleId}`].effect,
        "id": `${moduleId}01`,
        "isOnce": true
    }
    mgr.create(eff[`${moduleId}01`], "effect");
    //创建武器特效
    initAnimFinishCB(finishCb);
    //场景特效
    mgr.create(sceneEff[1000], "effect");
    mgr.create(sceneEff[1001], "effect");
    Music.roleSound(playerList[`${moduleId}`].role_speak);
    Music.skillSound(playerList[`${moduleId}`].weapon_speak);
};

const changeModule = function (index) {
    isRotate = false;
    canChange = false;
    //删除特效前一个模型的特效(当不限制玩家快速切换时用)
    mgr.remove(eff[`${moduleId}01`]);
    mgr.remove(playerList[`${moduleId}`]);
    playerList[`${moduleId}`].playAnim = Fight_common.playAnim(playerList[`${moduleId}`].act[0], moduleId, true);
    playerList[`${moduleId}`].rotate = [0, 0, 0];
    delete playerList[`${moduleId}`]._show;

    Music.roleSound(playerList[`${index}`].role_speak);
    Music.skillSound(playerList[`${index}`].weapon_speak);
    moduleId = index;

    eff[`${index}01`] = {
        "effect": playerList[`${index}`].effect,
        "id": `${index}01`,
        "isOnce": true
    };

    playerList[`${index}`].playAnim = Fight_common.playAnim(playerList[`${index}`].act[0], index, true)
    mgr.create(playerList[`${index}`], "fighter");
    mgr.create(eff[`${index}01`], "effect");
}

/**
 * 绑定特效 动作完毕回调
 */
const finishCb = function (id) {
    // console.log(id,"------------")
    if (!eff) {
        return;
    }
    if (id == 101 || id == 201 || id == 301) {
        mgr.remove(eff[id]);
        delete eff[id];
        return;
    }
    //更换任务状态
    isRotate = true;
    canChange = true;
    playerList[`${id}`].playAnim = Fight_common.playAnim(playerList[`${id}`].act[1], id, false)
    mgr.modify(playerList[`${id}`]);
}

/**
 * 人物旋转
 */
const rotating = (e: any, data: any) => {
    if (Math.abs(e.x - offsetX) < 0.1) {
        return;
    }
    data.rotate[1] += (Math.PI * ((offsetX || e.startX) - e.x))/180;
    offsetX = e.x;
    mgr.modify(data);
}
