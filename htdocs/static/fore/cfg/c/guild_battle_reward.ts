let tab = {};


    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 1,
        "type": "break",
        "param": 1,
        "desc": "任意攻破1个外城或内城",
        "award": [[100004,600], [100001, 50000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 2,
        "type": "break",
        "param": 2,
        "desc": "任意攻破2个外城或内城",
        "award": [[100004,600], [100001, 50000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 3,
        "type": "break",
        "param": 4,
        "desc": "任意攻破4个外城或内城",
        "award": [[100004,800], [100001, 100000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 4,
        "type": "break",
        "param": 6,
        "desc": "任意攻破6个外城或内城",
        "award": [[100004,800], [100001, 100000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 5,
        "type": "break",
        "param": 8,
        "desc": "任意攻破8个外城或内城",
        "award": [[100004,1000], [100001, 150000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 6,
        "type": "break",
        "param": 10,
        "desc": "任意攻破10个外城或内城",
        "award": [[100004,1500], [100001, 150000], [100002, 0]]
    })

    tab["break"] = tab["break"] || [];
    tab["break"].push({
        "index": 7,
        "type": "break",
        "param": 12,
        "desc": "任意攻破12个外城或内城",
        "award": [[100004,2000], [100001, 200000], [100002, 0]]
    })

    tab["overbreak"] = tab["overbreak"] || [];
    tab["overbreak"].push({
        "index": 8,
        "type": "overbreak",
        "param": 1,
        "desc": "任意攻破1座内城",
        "award": [[100004,1500], [100001, 100000], [100002, 0]]
    })

    tab["overbreak"] = tab["overbreak"] || [];
    tab["overbreak"].push({
        "index": 9,
        "type": "overbreak",
        "param": 2,
        "desc": "任意攻破2座内城",
        "award": [[100004,1500], [100001, 150000], [100002, 0]]
    })

    tab["overbreak"] = tab["overbreak"] || [];
    tab["overbreak"].push({
        "index": 10,
        "type": "overbreak",
        "param": 3,
        "desc": "任意攻破3座内城",
        "award": [[100004,1500], [100001, 200000], [100002, 0]]
    })

    tab["allbreak"] = tab["allbreak"] || [];
    tab["allbreak"].push({
        "index": 11,
        "type": "allbreak",
        "param": 1,
        "desc": "攻破1个门派的所有城池",
        "award": [[100025,80], [100001, 100000], [100002, 0]]
    })

    tab["allbreak"] = tab["allbreak"] || [];
    tab["allbreak"].push({
        "index": 12,
        "type": "allbreak",
        "param": 2,
        "desc": "攻破2个门派的所有城池",
        "award": [[100022,80], [100001, 200000], [100002, 0]]
    })

    tab["allbreak"] = tab["allbreak"] || [];
    tab["allbreak"].push({
        "index": 13,
        "type": "allbreak",
        "param": 3,
        "desc": "攻破3个门派的所有城池",
        "award": [[100020,80], [100001, 300000], [100002, 0]]
    })


export let guild_battle_reward = tab;