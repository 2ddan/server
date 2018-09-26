// 战斗状态
export const FightFlags = {
    "INIT": 1,      // 初始化
    "BEGIN": 2,     // 战斗开始
    "ING": 3,       // 战斗进行中
    "INGSELF": 4,   // 玩家回合
    "INGENEMY": 5,  // 对方回合
    "END": 6,       // 战斗结束
    "DISPOSED": 7   // 战斗内容清理
}

let FightCurrFlag: number;

export const readFightFlag = ()=>{
    return FightCurrFlag;
}

export const setFightFlag = ( flag: number )=>{
    FightCurrFlag = flag;
}

// 己方 fighter 3D站位 及 UI站位
export const FriendPosList = [
    [ 0, 0, 0 ],
    [0,0,0],
    [0,0,0],
    [254, 242],
    [0,0,0],
    [0,0,0],
];

// 己方 fighter 详细内容面板显示定位
export const FriendDetailPosList = [
    [320, 226],
    [0,0,0],
    [0,0,0],
];

// 对方 fighter 3D站位 及 UI站位
export const EnemyPosList1 = [
    [ 0,    0, -8 ],
    [ 625, 157 ]
];

// 对方 fighter 3D站位 及 UI站位
export const EnemyPosList2 = [
    [ -3, 0, -8 ],
    [  3, 0, -8 ],
    [ 718, 248 ],
    [ 562, 102 ]
];

// 对方 fighter 3D站位 及 UI站位
export const EnemyPosList3 = [
    [ 0,    0, -5.5 ],
    [ -2.5, 0, -10.5 ],
    [  2.5, 0, -10.5 ],
    [ 516, 188 ],
    [ 808, 204 ],
    [ 652, 90 ]
];

// 对方 fighter 3D站位 及 UI站位 列表
export const EnemyPosList_ = [ null, EnemyPosList1, EnemyPosList2, EnemyPosList3 ];


// 对方 fighter 详细内容面板显示定位
export const EnemyDetailPosList1 = [
    [ 535, 190 ]
];

// 对方 fighter 详细内容面板显示定位
export const EnemyDetailPosList2 = [
    [ 657, 205 ],
    [ 526, 196 ]
];

// 对方 fighter 详细内容面板显示定位
export const EnemyDetailPosList3 = [
    [ 475, 206 ],
    [ 750, 226 ],
    [ 600, 76 ]
];

// 对方 fighter 详细内容面板显示定位 列表
export const EnemyDetailPosList_ = [ EnemyDetailPosList1, EnemyDetailPosList2, EnemyDetailPosList3 ];


// 关卡 各地块定位
export const MapPosArrList = [
    // 玩家定位 及 lookAt
    [ [ 0,  0 ], [ 0, -9 ] ], 
    // 中间 关卡地块
    [ [ 0, -3 ], [ 0, -6 ],   [ 0, -9  ] ],
    // 右边 关卡地块
    [ [ -3, 0 ], [ -6, 0 ],   [ -6, -3 ],  [ -6, -6 ],  [ -6, -9 ] ],
    // 左边 关卡地块
    [ [  3, 0 ], [ 6, 0 ],    [ 6, -3  ],   [ 6, -6 ],   [ 6, -9 ] ]
] ;

// 玩家动作标识
export const RoleAnimFlags = {
    "stand": 0,
    "move": 1,
    "skill1": 2,
    "behit": 3,
    "die": 4
}

// 玩家动作列表
export const RoleAnimList = [ "act_standby", "act_run", "act_attack", "act_hit", "act_die" ];
// 对方动作列表
export const MonsterAnimList = [ "act_standby", "act_run", "act_skill1_1", "act_diefly", "act_die" ];

// 玩家 模型类型
export const RoleTplList    = [ "role" ];
// 玩家 模型名称
export const RoleNameList   = [ "demo_model01" ];

// 怪物 模型类型
export const MonsterTplList     = [ "monster" ];
// 怪物 模型名字
export const MonsterNameList    = [ "model_monster01", "model_monster02", "model_monster03", "model_monster07", "model_monster08", "model_monster09" ];

export const ReadMonsterAnim = ( monsterName: string, flag: number )=>{
    return MonsterAnimList[flag];
}

export const ReadRoleAnim = ( roleName: string, flag: number )=>{
    return RoleAnimList[flag];
}

