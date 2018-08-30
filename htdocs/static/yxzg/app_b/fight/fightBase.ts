export const FightFlags = {
    "INIT": 1,
    "BEGIN": 2,
    "ING": 3,
    "END": 4,
    "DISPOSED": 5
}

export const FightEffectFlag = {
    "SKILL1": 1,
    "BEHIT": 2
}

let FightCurrFlag: number;

export const readFightFlag = ()=>{
    return FightCurrFlag;
}

export const setFightFlag = ( flag: number )=>{
    FightCurrFlag = flag;
}

export class EffectData {
    playAnim: any;
    effectName: string;
    type: string = "effect";
    id: number;
    finishCall: Function;
}