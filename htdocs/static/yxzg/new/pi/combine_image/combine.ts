/**
 * 资源图片 合并到图片集 后的 图片集信息管理
 * * 注册配置信息
 * * 获取指定源图片配置信息
 */

export interface IPropCfg {
    /**
     * 源图片路径
     */
    src?: string;
    /**
     * 目标精灵图路径
     */
    combine?: string;
    /**
     * 目标精灵图中的内容矩形
     */
    rect?: [number, number, number, number];
}

export interface ICombineImgFileData {
    [index: string]: CombineCfg;
}

export type CombineWidth = number;
export type CombineHeight = number;
export type CombineX = number;
export type CombineY = number;
export type CombineIndex = number;

export type CombineCfg = [CombineWidth, CombineHeight, CombineX, CombineY, CombineIndex];

export type CombineCfg2 = [CombineWidth, CombineHeight, CombineX, CombineY, string];

export interface ISrcImagePath {
    isPNG: boolean;
    path: string[];
    name: string;
}

export class CombineImageMgr {
    private static map: Map<string, ICombineImgFileData> = new Map();
    private static pathList: string[] = [];
    /**
     * 
     * @param jsonFile 目标配置项目内全路径 <depend 中路径>
     * @param cfg 目标 json 数据
     */
    public static register(jsonFile: string, cfg: ICombineImgFileData) {
        this.map.set(jsonFile, cfg);
        this.pathList.push(jsonFile.replace('combine.jpg.json', '').replace('combine.png.json', ''))
    }
    /**
     * 获取目标图片的图片集信息
     * @param srcImgUrl 目标图片项目内全路径 <depend 中路径>
     * @returns [w, h, x, y, 合并后图片路径]
     */
    public static readImageInfo(srcImgUrl: string): CombineCfg2 {
        const urlInfo = this.analyimageURL(srcImgUrl);
        const ftype  = urlInfo.isPNG ? 'png' : 'jpg';

        let jsonPath: string, jsonFile: string, jsonData: ICombineImgFileData, imgCfg: CombineCfg, result: CombineCfg2;

        for (let len = urlInfo.path.length - 2; 0 <= len; len--) {
            jsonPath = '';

            for (let i = 0; i <= len; i++) {
                jsonPath += `${urlInfo.path[i]}/`;
            }

            jsonFile = `${jsonPath}combine.${ftype}.json`;

            jsonData = this.read(jsonFile);

            if (jsonData) {
                let tempPath: string = '';

                for (let j = len + 1; j <= urlInfo.path.length - 2; j++) {
                    tempPath += `${urlInfo.path[j]}/`;
                }

                // 有 json 配置， 没有目标图片信息， 不应该出现这种情况， 出现了的话需检查构建配置
                imgCfg = jsonData[`${tempPath}${urlInfo.name}`];

                // 拷贝数据避免污染
                result = [imgCfg[0], imgCfg[1], imgCfg[2], imgCfg[3], `${tempPath}combine.${imgCfg[4]}.${ftype}`];

                break;
            }
        }

        return result;
    }
    /**
     * 获取目标图片的图片集信息
     * @param srcImgUrl 目标图片项目内全路径 <depend 中路径>
     * @returns [w, h, x, y, 合并后图片路径]
     */
    public static readImageInfo2(srcImgUrl: string): CombineCfg2 {
        const urlInfo = this.analyimageURL(srcImgUrl);
        const ftype  = urlInfo.isPNG ? 'png' : 'jpg';

        let jsonPath: string, jsonFile: string, jsonData: ICombineImgFileData, imgCfg: CombineCfg, result: CombineCfg2;

        for (let len = urlInfo.path.length - 2; 0 <= len; len--) {
            jsonPath = '';

            for (let i = 0; i <= len; i++) {
                jsonPath += `${urlInfo.path[i]}/`;
            }

            jsonFile = `${jsonPath}combine.${ftype}.json`;

            jsonData = this.read(jsonFile);

            if (jsonData) {
                let tempPath: string = '';

                for (let j = len + 1; j <= urlInfo.path.length - 2; j++) {
                    tempPath += `${urlInfo.path[j]}/`;
                }

                // 有 json 配置， 没有目标图片信息， 不应该出现这种情况， 出现了的话需检查构建配置
                imgCfg = jsonData[`${tempPath}${urlInfo.name}`];

                // 拷贝数据避免污染
                result = [imgCfg[0], imgCfg[1], imgCfg[2], imgCfg[3], `${tempPath}combine.${imgCfg[4]}.${ftype}`];

                break;
            }
        }

        return result;
    }
    /**
     * 获取指定配置数据
     * @param jsonFile 目标配置文件项目内全路径 <depend 中路径>
     */
    public static read(jsonFile: string) {
        return this.map.get(jsonFile);
    }
    /**
     * 解析图片路径
     * @param url 图片链接
     */
    public static analyimageURL(url: string): ISrcImagePath {
        const cfg: ISrcImagePath = <any>{};

        const urlLen = url.length;

        cfg.isPNG   = url[urlLen -3]==='p' && url[urlLen -2]==='n' && url[urlLen -1]==='g';
        cfg.path    = url.split('/');
        cfg.name    = cfg.path[cfg.path.length - 1].split('.')[0];

        return cfg;
    }
}