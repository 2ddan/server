let tab = [];


    tab.push({
        "name": "小有钱财",
        "award": {
            "gain_contribute": 100,
            "gain_money": 500
        },
        "cost": [["100001", 5000], ["100002", undefined]],
        "limit": 5
    })
    tab.push({
        "name": "慷慨解囊",
        "award": {
            "gain_contribute": 200,
            "gain_money": 1000
        },
        "cost": [["100001", 0], ["100002", 100]],
        "limit": -1
    })
    tab.push({
        "name": "乾坤一掷",
        "award": {
            "gain_contribute": 500,
            "gain_money": 3000
        },
        "cost": [["100001", 0], ["100002", 200]],
        "limit": -1
    })

export let guild_charge = tab;