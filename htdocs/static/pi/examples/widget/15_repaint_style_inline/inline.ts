/**
 * 
 */
import {Widget} from '../../../widget/widget';

interface Props {
	style:string;
}

export class hahah extends Widget {
	constructor() {
		super();
		this.props = {
			style:'background-color : yellow ; font-size : 20px ; ' 
		};
	}
	attach(){
		setTimeout(()=>{
			this.props.style =  "background-color : red ; font-size : 20px ; ";
			this.paint();
		},3000);
	}
}  