import { Pi } from "app/mod/pi";
    var s, table,arr = [], min = 99999999, max = 0,
	key=["sid","name","type","quality","resolve","describe","icon"];
    if(!Pi.sample) {
		Pi.sample = {};
	};
    table = Pi.sample;
	
	arr.push([200000,
		"太极无极[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800003"
	]);
	
	arr.push([200001,
		"太极无极[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800003"
	]);
	
	arr.push([200002,
		"两仪化形[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800004"
	]);
	
	arr.push([200003,
		"两仪化形[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800004"
	]);
	
	arr.push([200004,
		"三才化生[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800005"
	]);
	
	arr.push([200005,
		"三才化生[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800005"
	]);
	
	arr.push([200006,
		"四象轮回[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800006"
	]);
	
	arr.push([200007,
		"四象轮回[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800006"
	]);
	
	arr.push([200008,
		"五行方尽[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800007"
	]);
	
	arr.push([200009,
		"五行方尽[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800007"
	]);
	
	arr.push([200010,
		"六合独尊[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800008"
	]);
	
	arr.push([200011,
		"六合独尊[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800008"
	]);
	
	arr.push([200012,
		"七星拱瑞[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800009"
	]);
	
	arr.push([200013,
		"七星拱瑞[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800009"
	]);
	
	arr.push([200014,
		"八卦洞玄[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800010"
	]);
	
	arr.push([200015,
		"八卦洞玄[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800010"
	]);
	
	arr.push([200016,
		"九转归一[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800011"
	]);
	
	arr.push([200017,
		"九转归一[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800011"
	]);
	
	min = 200000;
	max = 200017;
	for(var i=0,len = arr.length;i<len;i++){
	s = {};
	for(var k = 0,leng = key.length;k<leng;k++){
		s[key[k]] = arr[i][k];
	}
	table[arr[i][0]] = s;
}