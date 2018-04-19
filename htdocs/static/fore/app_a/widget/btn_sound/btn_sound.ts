import { Widget } from "pi/widget/widget";
import { Music } from "app/mod/music";

export class btnMus extends Widget {
    //单击
    click() {
        Music.clickSound("button");
    }
}