import { SceneUtils } from "../../scene_utils";
import { char_001_rtpl } from "./char_001_rtpl";
import { char_002_rtpl } from "./char_002_rtpl";

/**
 * 人物模型
 */
export const HeroRTPL = {
    /**model_char_001 */
    "TnEo668bRMttwymZFAEHqj": (it: any) => {
        const node = char_001_rtpl(it);
        return SceneUtils.complied(it, node);
    },
    /**model_char_002 */
    "9b7gLAQffCf4diiYTRHGkq": (it: any) => {
        const node = char_002_rtpl(it);
        return SceneUtils.complied(it, node);
    }
};