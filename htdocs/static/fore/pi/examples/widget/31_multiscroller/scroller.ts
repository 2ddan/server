import {Widget} from "../../../widget/widget";
import {notify} from "../../../widget/event";

export class Scroller extends Widget{
	inner = null;
	outer = null;
	outery = 0;
	innery = 0;
    scroll(event){
		console.log(`id is : ${event.id}, x is : ${event.x}, y is : ${event.y}`)
		if(event.id == "outer"){
			this.outery = event.y;
			this.outer = event.instance;
			if(event.y == -100){
				this.outer.disable();
			}
		}
		if(event.id == "inner"){
			this.inner = event.instance;
			this.innery = event.y;
			if(this.innery == 0){
				this.outer.enable();
			}
		}
	}
	tap(event){
		alert("tap");
	}
	longtap(event){
		alert("longtap");
	}
}  
