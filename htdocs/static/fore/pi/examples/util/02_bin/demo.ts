
import { Widget } from "../../../widget/widget";
import { Forelet } from "../../../widget/forelet";
import { HandlerResult } from "../../../util/event";



export const forelet = new Forelet();
forelet.addHandler("ok", (text): HandlerResult => {
	forelet.paint(text);
	return HandlerResult.BREAK_OK;
});