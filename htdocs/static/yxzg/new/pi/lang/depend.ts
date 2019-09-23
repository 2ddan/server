import { Struct } from "../struct/struct_mgr";
import { BonBuffer } from "../util/bon";
import { StructInfo } from "../struct/sinfo";
import { Json } from "../lang/type";

export class FeilDes extends Struct{
    path: string;
	sign: string;
	time: number;
	size: number;
	depend: Map<string, Array<string>>;
    children:Map<string, FeilDes>;

    //构造方法， depend形如{"js": ["a/b/c", "d/e/f"]}
    constructor(path: string, sign: string, time: number,  size: number, depend: Json, children: Map<string, FeilDes>){
        super();
        this.path = path;
        this.sign = sign;
        this.size = size;
        this.time = time;
        if(depend){
            this.depend = new Map();
            for(let k in depend){
                this.depend.set(k, depend[k]);
            }
        }
        this.children = children;
    }
    
    bonDecode(bb: BonBuffer){
        this.path = bb.readUtf8();
        this.sign = bb.readUtf8();
        this.time = bb.readInt();
        this.size = bb.readInt();
        this.depend = bb.readMap(() => {
            return [bb.readUtf8(), bb.readArray(() => {
                return bb.readUtf8();
            })];
        });
        this.children = bb.readMap(() => {
            return [bb.readUtf8(), bb.readBonCode(FeilDes)];
        });
    }

    bonEncode(bb: BonBuffer){
        bb.writeUtf8(this.path);
        bb.writeUtf8(this.sign);
        bb.writeInt(this.time);
        bb.writeInt(this.size);
        bb.writeMap(this.depend, (k, v) => {
            bb.writeUtf8(k);
            bb.writeArray(v, (el) => {
                bb.writeUtf8(el);
            });
        });
        bb.writeMap(this.children, (k, v) => {
            bb.writeUtf8(k);
            bb.writeBonCode(v);
        });
    }
}

export class Depend extends Struct{
    static _$sinfo = new StructInfo("Depend", 111111111, null, []);

    fileMap: Map<string, FeilDes> = new Map();

    bonDecode(bb: BonBuffer){
        this.fileMap = bb.readMap(() => {
            return [bb.readUtf8(), bb.readBonCode(FeilDes)];
        });
    }

    bonEncode(bb: BonBuffer){
        bb.writeMap(this.fileMap, (k, v) => {
            bb.writeUtf8(k);
            bb.writeBonCode(v);
        });
    }

    addDepend(files: Array<Json>, root: string) {
        var i, f, dir, fileMap = new Map();
        for (i = files.length - 1; i >= 0; i--) {
            let fi = files[i];
            f = new FeilDes(fi.path, fi.sign, fi.time, fi.size, fi.depend, fi.children);
            fileMap[f.path] = f;
            this.initDir(f, fileMap);
        }
    }

    // 将目录放入到文件表中
	initDir = function (f, map: Map<string, FeilDes>) {
		var i, dir, info, s, suf="", path = f.path, i = path.lastIndexOf("."), j = path.lastIndexOf("/");
		if(i > j)
			suf = path.slice(i + 1);
		j = 0;
		while ((i = path.indexOf("/", j)) >= 0) {
			dir = path.slice(j, i + 1);
			info = map[dir];
			if (!info) {
				map[dir] = info = new FeilDes(path.slice(0, i), null, null, 0, null, null) ;
				this.fileMap[path.slice(0, i + 1)] = info;
			}
			info.size += f.size;
			map = info.children;
			j = i + 1;
		}
		if (info)
			map[path.slice(j)] = f;
    };
    
    get (path: string) {
		return this.fileMap[path];
	};

	// 获得文件表
	getFileMap() {
		return this.fileMap;
	};
}