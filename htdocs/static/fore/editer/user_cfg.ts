import { cfg } from './default_cfg';

//清除老的editer存储数据
if (!localStorage.clean0118) {
    localStorage.clear();
    localStorage.clean0118 = true;
}

const getUserCfg = () => {
    if (localStorage.editer) {
        let localCfg = JSON.parse(localStorage.editer);
        localCfg["rootFore"] = cfg["rootFore"];
        localCfg["loadDirs"] = cfg["loadDirs"];
        localCfg["widgetPath"] = cfg["widgetPath"];
        localCfg["resPath"] = cfg["resPath"];
        for (let v of localCfg.tabs.arr) {
            v.needFresh = false;
        }
        return localCfg;
    }
    else return cfg;
}

export const saveUserCfg = () => {
    localStorage.editer = JSON.stringify(userCfg);
}

//读取本地用户配置
export const userCfg = getUserCfg();