import * as RoleCfg         from    "./role";
import * as demo_model01    from    "./demo_model01";
import * as monster         from    "./monster";
import * as eff             from    "./eff";
import * as selectEff       from    "./eff_xuanzhong";
import * as HitEffect       from    "./eff_hit_monster_common";
import * as Shijian         from    "./shijian";

class Obj3DDataCfg {
    lookAt: Array<number>;
    playAnim: AnimCfg;
    name: string;
}

class AnimCfg {
    name: string;
    isOnce: boolean;
    speed: any;
    id: any;
}

export class TPL {
    static role = ( data: any )=>{
        return getRoleObj( data );
    }
    static demo_model01 = ( data: any )=>{
        return getDemo01( data );
    }
    static effect = ( data: any )=>{
        return getEffect( data );
    }
    static selectEffct = ( data: any )=>{
        return getSelectEffect( data );
    }
    static hitEffect = ( data: any )=>{
        return getHitEffect( data );
    }
    static monster = ( data: any )=>{
        return getMonster( data );
    }
    static shijian = ( data: any )=>{
        return getShijian( data );
    }
}

const getRoleObj = ( data: any )=>{
    let roleCfg: any;

    roleCfg     = JSON.parse( JSON.stringify( RoleCfg.default[ (data as Obj3DDataCfg).name ] ) );

    roleCfg.controller = RoleCfg.default.ainMod[roleCfg.aniControl];

    roleCfg.position    = data.position;
    roleCfg.scale       = data.scale;
    roleCfg.rotate      = data.rotate;
    
    roleCfg.lookAtOnce  = {
                            "value":    (data as Obj3DDataCfg).lookAt || [1,1,1],
                            "sign":     Math.random()*10
                        }
    roleCfg.playAnim    = data.playAnim;
    roleCfg.rayID       = data.rayID;

    return roleCfg;
}

const getMonster = ( data: any )=>{
    let tempData: any;

    tempData     = JSON.parse( JSON.stringify( monster.default[ (data as Obj3DDataCfg).name ] ) );

    tempData.controller = monster.default.ainMod[tempData.aniControl];
    tempData.position   = data.position;
    tempData.scale      = data.scale;
    tempData.rotate     = data.rotate;
    tempData.playAnim   = data.playAnim;
    tempData.rayID      = data.rayID;
    tempData.lookAtOnce = {
                            "value":    (data as Obj3DDataCfg).lookAt || [0,0,0],
                            "sign":     Math.random()*10
                        };

    return tempData;
}

const getDemo01 = ( data: any )=>{
    let tempData: any;

    tempData     = JSON.parse( JSON.stringify( demo_model01.default[ (data as Obj3DDataCfg).name ] ) );

    tempData.controller = demo_model01.default.ainMod[tempData.aniControl];
    tempData.position   = data.position;
    tempData.scale      = data.scale;
    tempData.rotate     = data.rotate;
    tempData.playAnim   = data.playAnim;
    tempData.rayID      = data.rayID;
    tempData.lookAtOnce = {
                            "value":    (data as Obj3DDataCfg).lookAt || [0,0,0],
                            "sign":     Math.random()*10
                        };

    return tempData;
}

const getEffect = ( data: any )=>{
    let tempData: any;

    tempData    = {};
    tempData.position   = data.position;
    tempData.playAnim   = data.playAnim;
    tempData.rayID      = data.rayID;
    tempData.tpl        = eff.default[data.effectName][0];

    return tempData;
}

const getSelectEffect = ( data: any )=>{
    let tempData: any;

    tempData    = {};
    tempData.position   = data.position;
    tempData.playAnim   = data.playAnim;
    tempData.rayID      = data.rayID;
    tempData.tpl        = selectEff.default[data.effectName][0];

    return tempData;
}

const getHitEffect = ( data: any )=>{
    let tempData: any;

    tempData    = {};
    tempData.position   = data.position;
    tempData.playAnim   = data.playAnim;
    tempData.rayID      = data.rayID;
    tempData.tpl        = HitEffect.default[data.effectName][0];

    return tempData;
}

const getShijian = ( data: any )=>{
    let tempData: any;

    tempData            = JSON.parse( JSON.stringify( Shijian.default[ (data as Obj3DDataCfg).name ] ) );
    tempData.position   = data.position;
    tempData.rayID      = data.rayID;

    return tempData;
}