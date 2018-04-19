import { mgr, mgr_data } from "app/scene/scene";
import { data as localDB, updata, get as getDB, listen} from "app/mod/db";
import { getGlobal } from "pi/widget/frame_mgr";

let frame_mgr = getGlobal();

export let forefun = {
    //npc talk callback
    "toNpcCallBack" : (scene,f)=>{
        if (scene.toNpcCallBack && f.sid == localDB.player.role_id) {
            scene.toNpcCallBack();
            scene.toNpcCallBack = undefined;
        }
    },

    "check" : (scene) =>{
        let r = scene.check();
        if (r == 0) {
            scene.isEndFight = 0;
            if(!scene.singleNow)scene.singleNow = scene.now;
        } else if (r > 0 && scene.isEndFight == 0 &&(!scene.over || scene.over(r))) {
            scene.overCallback && scene.overCallback(r, scene);
            scene.isEndFight = scene.now - scene.singleNow;
            scene.singleNow = 0;
            scene.fightMove = false;
            if (r > 2) scene.pause = true;
        }
        return r;
    },

    "sceneTime":(scene)=>{
        // if (scene.name == "fight") {
        //     scene.now = scene.singleNow ? ((new Date()).getTime() - scene.singleNow) : (scene.now ? (scene.now + scene.frameTime) : 0);
        // } else 
        scene.now += scene.frameTime;
    },
    "getPlayerId" : () => {
        return getDB("player.role_id");
    },

    "getFrameTime" : ()=>{
        return frame_mgr.getTime();
    }
}