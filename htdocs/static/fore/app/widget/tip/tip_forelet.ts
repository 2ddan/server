import { Forelet } from "pi/widget/forelet";

export const forelet = new Forelet();

export const globalReceive = {
    "upTip": () => {
        forelet.paint(null);
    }
}