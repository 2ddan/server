import {Widget} from "../../../widget/widget";

interface Props{
    itemsTitle: Array<any>;
    items: Array<any>;
}
export class Father extends Widget{
    props = {
            itemsTitle: ["图片", "品名", "数量", "入库成本单价"],
            items:[
                ["","图片详情1", 200, 90],
                ["","图片详情2", 20, 2]                
            ]
        }    
}  