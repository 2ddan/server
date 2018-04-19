// 修改大写字符，加上前缀Fighter
let fixCountVar = function (s) {
    return s.replace(/([A-Z]\w*\.)/g, "F.$1");
}
let fixCount = function(s, tab) {
	return s.replace(/([A-Za-z0-9_]+Count)/g, function(ss) {
		return tab[ss];
	});
}
let i, calcArgNames, argNames = ["Max", "Min", "pow", "F", "T", "Skill"], calcArgLocs = {};
calcArgNames = argNames.slice();
let tab;

export class Fight_formula {
    static init(cfg) {
        tab = cfg; //mod_fight.formula;
        var ccc = 0;
        // 计算所有中间公式名称，并修改统计公式
        do {
            ccc = 0;
            for(i in tab) {
                    if(i.indexOf("Count") > 0 && tab[i].indexOf("Count") > 0) {
                        tab[i] = fixCount(tab[i], tab);
                        ccc++;
                    }
                }
        }while(ccc);
        for (i in tab) {
            if (tab.hasOwnProperty(i)) {
                if (i.indexOf("Formula") > 0) {
                    calcArgLocs[i] = calcArgNames.length;
                    calcArgNames.push(i);
                } else if (i.indexOf("Count") > 0) {
                    tab[i] = fixCountVar(tab[i]);
                }
            }
        }
        // 生成公式
        for (i in tab) {
            if (tab.hasOwnProperty(i)) {
                if (i.indexOf("Formula") > 0) {
                    Fight_formula[i] = new Function(calcArgNames, "return " + tab[i]);
                } else if (i.indexOf("Count") > 0) {
                    Fight_formula[i] = new Function(argNames.join(), "return " + tab[i]);
                }
            }
        }
        // 将中间公式的参数默认设为0
        for (i = 0; i < calcArgNames.length; i++){
            calcArgNames[i] = 0;
        }

    };
    // 获得技能计算的公式参数列表
    static getArgArr(fighter, target, skill?, skillCalc?) {
        let arr = skillCalc ? calcArgNames.slice() : argNames.slice();
        arr[0] = function (a, b) { return a > b ? a : b };
        arr[1] = function (a, b) { return a < b ? a : b };
        arr[2] = Math.pow;
        arr[3] = fighter;
        arr[4] = target;
        arr[5] = skill;
        return arr;
    };
    // 统计战斗者的属性
    static count(fighter) {
        let i, j;
        let argArr = Fight_formula.getArgArr(fighter, fighter);
        for (i in Fight_formula) {
            if (Fight_formula.hasOwnProperty(i)) {
                j = i.indexOf("Count");
                if (j > 0)
                    fighter[i] = parseFloat(fighter.A[i.replace("Count", "")]) || 0;
                //fighter[i] = mgr[i].apply(null, argArr);
            }
        }
    };
    // 技能公式计算
    static skillCalc(formulaName, argArr) {
        if (!Fight_formula[formulaName]) {
            console.log("There is not mgr.skillCalc : ", formulaName);
        }
        let r = Fight_formula[formulaName].apply(null, argArr);
        argArr[calcArgLocs[formulaName]] = r;
        return r;
    };
    // buff的效果公式计算
    static effectCalc(formulaStr, fighter, target?, buff?) {
        let r = Fight_formula[formulaStr];
        if (!r) {
            r = new Function(argNames.join(), "return " + formulaStr);
            Fight_formula[formulaStr] = r;
        }
        return r.apply(null, Fight_formula.getArgArr(fighter, target, buff));
    };
    // 计算战斗者的属性
    static calcArr = function(fighter,f?) {
        var i, j;
        var argArr = Fight_formula.getArgArr(fighter, fighter);
        for(i in Fight_formula) {
            if (Fight_formula.hasOwnProperty(i)) {
                j = i.indexOf("Count");
                if(j > 0) {
                    // fighter[i] = parseInt(fighter.A[i.replace("Count","")]);
                    if (f)
                        f[i] = Fight_formula[i].apply(null, argArr)|0;
                    else
                        fighter["attr"][i.replace("Count", "")] = Fight_formula[i].apply(null, argArr)|0;
                }
            }
        }
        return fighter;
    }

























}