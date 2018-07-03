- ui-imgfilter组件使用示例
- ui-imgtext组件使用示例

# ui-imgfilter组件

- 对图片进行滤镜处理

## 使用

- 在组件中通过json对象配置props

```html
<ui-imgfilter>{"img":"./btnr.png", "path":{{_path}}, "arr":[["hsl", 150, 2]]}</ui-imgfilter>
```

- img 原始图片路径
- path （暂时不了解其作用）------路径，设置为空或者_path都表示当前路径，可以设置为其他路径
- arr 数组对象，表示对图片进行的一系列处理，包括 灰度-色相饱和度亮度-亮度对比度-腐蚀-锐化-高斯模糊，arr":[["gray"], ["hsl", 180?, 1?, 1?], ["brightnessContrast", 0.5, 0?], ["corrode", 3?], ["sharp", 3?], ["gaussBlur", 3?]]}
- 如果arr不存在或长度为0, 表示使用标准图像


# ui-imgtext组件

- 图像文字，即对文字进行一系列处理

```html
  <ui-imgtext>{"textCfg":{
        "width":20,
        "hfactor":1.1,
        "zoomfactor":2,
        "text":"神兵",
        "font":"normal 400 16px kaiti_bold",
        "color":{"x1":0,"y1":"45%","x2":0,"y2":"55%","steps":[0,"rgb(206,175,233)",1,"rgb(159,97,212)"] },
        "strokeWidth":2,
        "strokeColor":"rgb(0,0,0)",
        "lineHeight":6
    }}
    </ui-imgtext> 
```

## 需传递的props对象
- 目前space好像没什么作用 
- show设置的文字会覆盖TextCfg中的text(和imgtext.ts中的说法有不同)
- 文字是垂直显示，水平显示方法未知？ ------ 宽度设置更大则可以水平展示文字

```json
{
  	textCfg:canvas.ImgTextCfg,
 	space?:number,
 	"show":"" // 如果有show，表示为拼接文字，text为全文字，show变动不会生成新的文字图片
				
}
```

- canvas.ImgTextCfg 
```json
{
    "text": "测试",
    "font": "normal 400 24px 宋体",
    "color": "#636363" | GradientCfg, // 颜色 或渐变颜色
    "shadow": { // 阴影
        "offsetX": number,
        "offsetY": number, //偏移量
        "blur": number, // 模糊值，一般为5
        "color": string; // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
    };
    "strokeWidth": number, // 描边宽度
    "strokeColor": string | GradientCfg, // 描边颜色
    "background": string | GradientCfg, // 背景
}
```
