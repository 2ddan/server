//pi
import * as root  from "pi/ui/root";
//scene
import { mgr_data, mgr } from "app/scene/scene";

export let initNode = {
    //menu_parent节点创建
    menuParent : function() {
        let node = {
            "imgWidth" : 1024 * mgr_data.scale,
            "imgHeight" : 128 * mgr_data.scale,
            "image" : "images/wild_bottom.png",
            "x" : mgr_data.div["wild"].width / 2,
            "y" : -(352 * mgr_data.scale), 
            "z" : 0,
            "attachment" : "2D",
            "scale" : mgr_data.scale
        }
        mgr.create(node,"node2d");
    }

};
