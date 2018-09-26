import { THREE } from "./three";

/**
 * 构建纹理图集
 */

export class TextureAtlas {
    pages = new Array<TextureAtlasPage>();
    regions = new Array<TextureAtlasRegion>();

    constructor(atlasText: string, textureLoader: (path: string) => any) {
        this.load(atlasText, textureLoader);
    }

    private load(atlasText: string, textureLoader: (path: string) => any) {
        if (textureLoader == null)
            throw new Error("textureLoader cannot be null.");

        let reader = new TextureAtlasReader(atlasText);
        let tuple = new Array<string>(4);
        let page: TextureAtlasPage = null;
        while (true) {
            let line = reader.readLine();
            if (line == null)
                break;
            line = line.trim();
            if (line.length == 0)
                page = null;
            else if (!page) {
                page = new TextureAtlasPage();
                page.name = line;

                if (reader.readTuple(tuple) == 2) { // size is only optional for an atlas packed with an old TexturePacker.
                    page.width = parseInt(tuple[0]);
                    page.height = parseInt(tuple[1]);
                    reader.readTuple(tuple);
                }
                // page.format = Format[tuple[0]]; we don't need format in WebGL

                reader.readTuple(tuple);
                page.minFilter = Texture.filterFromString(tuple[0]);
                page.magFilter = Texture.filterFromString(tuple[1]);

                let direction = reader.readValue();
                page.uWrap = TextureWrap.ClampToEdge;
                page.vWrap = TextureWrap.ClampToEdge;
                if (direction == "x")
                    page.uWrap = TextureWrap.Repeat;
                else if (direction == "y")
                    page.vWrap = TextureWrap.Repeat;
                else if (direction == "xy")
                    page.uWrap = page.vWrap = TextureWrap.Repeat;

                page.texture = textureLoader(line);
                page.texture.setFilters(page.minFilter, page.magFilter);
                page.texture.setWraps(page.uWrap, page.vWrap);
                // page.width = page.texture.getImage().width;
                // page.height = page.texture.getImage().height;
                this.pages.push(page);
            } else {
                let region: TextureAtlasRegion = new TextureAtlasRegion();
                region.name = line;
                region.page = page;

                region.rotate = reader.readValue() == "true";

                reader.readTuple(tuple);
                let x = parseInt(tuple[0]);
                let y = parseInt(tuple[1]);

                reader.readTuple(tuple);
                let width = parseInt(tuple[0]);
                let height = parseInt(tuple[1]);

                region.u = x / page.width;
                region.v = y / page.height;
                if (region.rotate) {
                    region.u2 = (x + height) / page.width;
                    region.v2 = (y + width) / page.height;
                } else {
                    region.u2 = (x + width) / page.width;
                    region.v2 = (y + height) / page.height;
                }
                region.x = x;
                region.y = y;
                region.width = Math.abs(width);
                region.height = Math.abs(height);

                if (reader.readTuple(tuple) == 4) { // split is optional
                    // region.splits = new Vector.<int>(parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3]));
                    if (reader.readTuple(tuple) == 4) { // pad is optional, but only present with splits
                        //region.pads = Vector.<int>(parseInt(tuple[0]), parseInt(tuple[1]), parseInt(tuple[2]), parseInt(tuple[3]));
                        reader.readTuple(tuple);
                    }
                }

                region.originalWidth = parseInt(tuple[0]);
                region.originalHeight = parseInt(tuple[1]);

                reader.readTuple(tuple);
                region.offsetX = parseInt(tuple[0]);
                region.offsetY = parseInt(tuple[1]);

                region.index = parseInt(reader.readValue());

                region.texture = page.texture;
                this.regions.push(region);
            }
        }
    }

    findRegion(name: string): TextureAtlasRegion {
        for (let i = 0; i < this.regions.length; i++) {
            if (this.regions[i].name == name) {
                return this.regions[i];
            }
        }
        return null;
    }

    dispose() {
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].texture.dispose();
        }
    }
}

class TextureAtlasReader {
    lines: Array<string>;
    index: number = 0;

    constructor(text: string) {
        this.lines = text.split(/\r\n|\r|\n/);
    }

    readLine(): string {
        if (this.index >= this.lines.length)
            return null;
        return this.lines[this.index++];
    }

    readValue(): string {
        let line = this.readLine();
        let colon = line.indexOf(":");
        if (colon == -1)
            throw new Error("Invalid line: " + line);
        return line.substring(colon + 1).trim();
    }

    readTuple(tuple: Array<string>): number {
        let line = this.readLine();
        let colon = line.indexOf(":");
        if (colon == -1)
            throw new Error("Invalid line: " + line);
        let i = 0, lastMatch = colon + 1;
        for (; i < 3; i++) {
            let comma = line.indexOf(",", lastMatch);
            if (comma == -1) break;
            tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
            lastMatch = comma + 1;
        }
        tuple[i] = line.substring(lastMatch).trim();
        return i + 1;
    }
}

export abstract class Texture {
    protected _image: HTMLImageElement;

    constructor(image: HTMLImageElement) {
        this._image = image;
    }

    getImage(): HTMLImageElement {
        return this._image;
    }

    abstract setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void;
    abstract setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void;
    abstract dispose(): void;

    public static filterFromString(text: string): TextureFilter {
        switch (text.toLowerCase()) {
            case "nearest": return TextureFilter.Nearest;
            case "linear": return TextureFilter.Linear;
            case "mipmap": return TextureFilter.MipMap;
            case "mipmapnearestnearest": return TextureFilter.MipMapNearestNearest;
            case "mipmaplinearnearest": return TextureFilter.MipMapLinearNearest;
            case "mipmapnearestlinear": return TextureFilter.MipMapNearestLinear;
            case "mipmaplinearlinear": return TextureFilter.MipMapLinearLinear;
            default: throw new Error(`Unknown texture filter ${text}`);
        }
    }

    public static wrapFromString(text: string): TextureWrap {
        switch (text.toLowerCase()) {
            case "mirroredtepeat": return TextureWrap.MirroredRepeat;
            case "clamptoedge": return TextureWrap.ClampToEdge;
            case "repeat": return TextureWrap.Repeat;
            default: throw new Error(`Unknown texture wrap ${text}`);
        }
    }
}

export class ThreeJsTexture extends Texture {
    texture: any;

    constructor(image: HTMLImageElement, texture) {
        super(image);
        this.texture = texture || new THREE.Texture();
        this.texture.image = image;
        this.texture.flipY = false;
        this.texture.needsUpdate = true;
    }

    setFilters(minFilter: TextureFilter, magFilter: TextureFilter) {
        this.texture.minFilter = ThreeJsTexture.toThreeJsTextureFilter(minFilter);
        this.texture.magFilter = ThreeJsTexture.toThreeJsTextureFilter(magFilter);
    }

    setWraps(uWrap: TextureWrap, vWrap: TextureWrap) {
        this.texture.wrapS = ThreeJsTexture.toThreeJsTextureWrap(uWrap);
        this.texture.wrapT = ThreeJsTexture.toThreeJsTextureWrap(vWrap);
    }

    dispose() {
        // this.texture.dispose();
    }

    static toThreeJsTextureFilter(filter: TextureFilter) {
        if (filter === TextureFilter.Linear) return THREE.LinearFilter;
        else if (filter === TextureFilter.MipMap) return THREE.LinearMipMapLinearFilter; // also includes TextureFilter.MipMapLinearLinear
        else if (filter === TextureFilter.MipMapLinearNearest) return THREE.LinearMipMapNearestFilter;
        else if (filter === TextureFilter.MipMapNearestLinear) return THREE.NearestMipMapLinearFilter;
        else if (filter === TextureFilter.MipMapNearestNearest) return THREE.NearestMipMapNearestFilter;
        else if (filter === TextureFilter.Nearest) return THREE.NearestFilter;
        else throw new Error("Unknown texture filter: " + filter);
    }

    static toThreeJsTextureWrap(wrap: TextureWrap) {
        if (wrap === TextureWrap.ClampToEdge) return THREE.ClampToEdgeWrapping;
        else if (wrap === TextureWrap.MirroredRepeat) return THREE.MirroredRepeatWrapping;
        else if (wrap === TextureWrap.Repeat) return THREE.RepeatWrapping;
        else throw new Error("Unknown texture wrap: " + wrap);
    }
}

export class TextureRegion {
    renderObject: any;
    u = 0; v = 0;
    u2 = 0; v2 = 0;
    width = 0; height = 0;
    rotate = false;
    offsetX = 0; offsetY = 0;
    originalWidth = 0; originalHeight = 0;
}

export class TextureAtlasPage {
    name: string;
    minFilter: TextureFilter;
    magFilter: TextureFilter;
    uWrap: TextureWrap;
    vWrap: TextureWrap;
    texture: Texture;
    width: number;
    height: number;
}

export class TextureAtlasRegion extends TextureRegion {
    page: TextureAtlasPage;
    name: string;
    x: number;
    y: number;
    index: number;
    rotate: boolean;
    texture: Texture;
}

export enum TextureFilter {
    Nearest = 9728, // WebGLRenderingContext.NEAREST
    Linear = 9729, // WebGLRenderingContext.LINEAR
    MipMap = 9987, // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
    MipMapNearestNearest = 9984, // WebGLRenderingContext.NEAREST_MIPMAP_NEAREST
    MipMapLinearNearest = 9985, // WebGLRenderingContext.LINEAR_MIPMAP_NEAREST
    MipMapNearestLinear = 9986, // WebGLRenderingContext.NEAREST_MIPMAP_LINEAR
    MipMapLinearLinear = 9987 // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
}

export enum TextureWrap {
    MirroredRepeat = 33648, // WebGLRenderingContext.MIRRORED_REPEAT
    ClampToEdge = 33071, // WebGLRenderingContext.CLAMP_TO_EDGE
    Repeat = 10497 // WebGLRenderingContext.REPEAT
}
