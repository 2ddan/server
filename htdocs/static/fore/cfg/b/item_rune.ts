import { Pi } from "app/mod/pi";
    var s, table,arr = [], min = 99999999, max = 0,
	key=["sid","name","type","quality","resolve","describe","icon"];
    if(!Pi.sample) {
		Pi.sample = {};
	};
    table = Pi.sample;
	
	arr.push([
		"太极无极[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800003"
	]);
	
	arr.push([
		"太极无极[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800003"
	]);
	
	arr.push([
		"两仪化形[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800004"
	]);
	
	arr.push([
		"两仪化形[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800004"
	]);
	
	arr.push([
		"三才化生[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800005"
	]);
	
	arr.push([
		"三才化生[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800005"
	]);
	
	arr.push([
		"四象轮回[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800006"
	]);
	
	arr.push([
		"四象轮回[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800006"
	]);
	
	arr.push([
		"五行方尽[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800007"
	]);
	
	arr.push([
		"五行方尽[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800007"
	]);
	
	arr.push([
		"六合独尊[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800008"
	]);
	
	arr.push([
		"六合独尊[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800008"
	]);
	
	arr.push([
		"七星拱瑞[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800009"
	]);
	
	arr.push([
		"七星拱瑞[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800009"
	]);
	
	arr.push([
		"八卦洞玄[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800010"
	]);
	
	arr.push([
		"八卦洞玄[高级]",
		"rune",
		6,
		[100058,10],
		"undefined",
		"res_800010"
	]);
	
	arr.push([
		"九转归一[初级]",
		"rune",
		1,
		[100057,10],
		"undefined",
		"res_800011"
	]);
	
	arr.push([
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