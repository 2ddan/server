export const cfg: any = {
    /****************需要根据项目补全*****************/
    //前端根目录(配置自动保存用)
    rootFore: "fore",
    //编辑器需要加载的目录
    loadDirs: ["app/","app_a/","app_b/","app_c/"],
    resPath: ["app/","app_a/","app_b/","app_c/"],
    //包含组件的目录(排除多余的目录和文件) 
    widgetPath: ["app-widget-","app_a-widget-","app_b-widget-","app_c-widget-"],

    /****************谨慎操作!!!!!!!*****************/
    //默认打开的组件
    defaultOpen: "",
    needSave: true,
    //网格分辨率。可自行添加
    resolution: {
        cfg: [["game_pre", 540, 900], ["Lumia 950", 360, 640], ["iPhone 6", 365, 667], ["iPhone 6p", 414, 736], ["编辑", null]],
        curr: 0
    },
    //属性面板
    inspector: {
        lang: "en", // 属性显示语言 en | zh
        star: ["position", "left", "top", "width", "height", "color"] // 收藏的属性(显示在顶部)
    },
    //各面板的布局
    layout: { panl: [0, 0, 0], widget: [0, 0], ui: [0, 0], aside: "sytree", showCode: true },
    //拾色器
    colorPicker: {
        type: 0,// hex | rgba
        history: ["360,0,100,1", "360,0,0,1", "198,98,95,1", "4,77,95,1", "291,77,69,1", "87,62,76,1"] // 常用颜色
    },
    zoom: 1,//缩放

    //多标签页
    tabs: {
        arr: [
            {
                title: "default",
                path: "editer-ui_component-default",
                tempPath: "",
                lines: {
                    arr: [[220, "h"], [120, "v"]],
                    show: true
                },
                needSave: true,
                needFresh: false
            }],
        index: 0
    },
    noEvent:true
}