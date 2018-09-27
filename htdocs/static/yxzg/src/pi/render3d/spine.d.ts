/**
 * 2d骨骼的动画，封装自spine.js库
 */
import { THREE } from './three';

export module Spine {
    const threejs;
    class AtlasAttachmentLoader {
        constructor(atlas);
    }
    class SkeletonJson {
        constructor(attachmentLoader);
    }

    class AssetManager {
        constructor(pathPrefix);
    }

    class SkeletonMesh {
        constructor(skeletonData);
    }

}