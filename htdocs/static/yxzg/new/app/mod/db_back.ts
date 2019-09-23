/***
 * 获取全数据，以及分发数据
 ***/
// ========================== 导入
//pi
import { ajax } from 'pi/lang/mod'
import { set as task } from 'pi/util/task_mgr'
//mod
import { Pi, setLog, globalReceive, globalSend } from 'app/mod/pi'
import { data as localDB, updata } from 'app/mod/db'
import { request } from '../../app_a/connect/con_mgr'
import { CfgMgr } from './cfg_mgr'
import { Equipment, Scroll } from '../../fight/class'
import { Common } from './common';
//app

// ============================ 导出

export class DBback {
    /**
     * @description 拉取游戏全数据
     * @param {Function}callback 数据处理完之后回调
     */
    static getAllDB(res?) {
        count++
        let url = Pi.server + 'read_all?user_id=' + res.userId
        ajax.get(
            url,
            null,
            null,
            null,
            null,
            resp => {
                let data = JSON.parse(resp).ok
                backDB = data || {}
                backDB.read = 1
                handleData(backDB)

                initBackDataToForeDB(backDB);

                updataBag()
                
                res.cb && res.cb()
            },
            error => {
                if (count < 3) {
                    this.getAllDB(res)
                } else {
                    count = 0
                    globalSend('msgScreenTips', {
                        text: `请求错误,${error},初始化数据失败，请刷新重试`
                    })
                    res.cb && res.cb()
                }
            },
            progress => {
                // globalSend('msgScreenTips', { text: `请求数据中,进度${progress}` });
                // res.cb && res.cb();
            }
        )
    }
    /**
     * @description 监听后台数据,如果监听的时候数据已经就绪，则先调用一次监听回调
     *
     */
    static listenBack(key, handler) {
        backDB.read && task(handler, [backDB[key]], 54, 0)
        if (!handleTable[key]) handleTable[key] = []
        handleTable[key].push(handler)
    }
    /**
     * @description 存储数据到本地
     * @param key "stage"
     */
    static save(key: string, data: any) {
        backDB[key] = data
        localStorage.backdb = JSON.stringify(backDB)
    }
}

export const updataBag = () => {
    let player = localDB.player
    let bag = {
        equipment: [],
        scroll: [],
        prop: [],
        material: []
    }
    let equipment = [].concat(
        player.weapon,
        player.armor,
        player.other_equipments,
        localDB.equipments
    )
    equipment.forEach(id => {
        if (id) {
            let equip = CfgMgr.create(['cfg/equipment'], id, Equipment)
            bag.equipment.push(equip)
            equip.goodType = 'equipment'
        }
    });
    (player.scrolls || []).forEach(id => {
        if (id) {
            let scroll = CfgMgr.create(['cfg/scrolls'], id, Scroll)
            scroll.goodType = 'scroll'
            bag.scroll.push(scroll)
        }
    })

    updata('bag', bag);
    
    Common.achieveDiffDBArr().forEach(achieveDiffDB => {
        achieveDiffDB.eqNum = bag.equipment.length;
    }); 
};

export const initHouse = () => {
    let house = {
        // equipment:[1,2,3,4,5,6,7,8],
        // scroll:[1,2,3,4],
        // prop:[1,2,3,4,5,7,8],
        // stuff:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
        equipment: [],
        scroll: [],
        prop: [],
        material: []
    }

    updata('house', house)
}

/**
 * @method initBackDataToForeDB 初始化后台数据到前台数据库
 * @param backData 
 */
const initBackDataToForeDB = (backData: any) => {
    for (let k in backData) {
        if (k === 'equipments') {
            updata(k, backData[k] || []);
        }
        else if (k === 'hero') {
            updata(k, { id: backData[k][0], level: backData[k][1], exp: backData[k][2] })
        }
        else {
            updata(k, backData[k]);
        }
       
    }
};

// ============================ 本地
/**
 * @description 后台数据
 */
let backDB: any = {}

/**
 * @description 事件处理列表
 */
let handleTable = {}

/**
 * @description 重连次数
 */
let count = 0

/**
 * @description 后台数据处理,分发给每个监听器,同步执行，防止数据更新与玩家操作冲突
 * @param {String}data 后台得到的JSON字符串
 */
const handleData = data => {
    // backDB = JSON.parse(data).ok;
    console.log('游戏全数据=============================')
    console.log(backDB)
    for (let k in handleTable) {
        if (backDB[k] != undefined) {
            for (let t in handleTable[k]) {
                if (handleTable[k][t]) {
                    try {
                        handleTable[k][t](backDB[k])
                    } catch (e) {}
                }
            }
        }
    }
}

// ============================= 导出

// ============================== 立即执行
//获取本地数据
globalReceive({
    initData: res => {
        DBback.getAllDB(res)
    }
})
