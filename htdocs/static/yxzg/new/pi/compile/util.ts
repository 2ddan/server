declare var require;
var pathMode = require("path");
let os = require("os");

export const resolve = (path: string): string => {
    let rp = pathMode.resolve(path);//绝对路径
    let ps = path.split("\\");
    let rps = rp.split("\\");
    let len = ps.length;
    for(let i = 0; i < len; i++){
        if(ps[i] === ".."){
            ps[i] = rps[rps.length - (len - i)];
        }else if(ps[i] === "."){ //i = 0时才可能是"."
            ps = ps.slice(1, len);
            break;
        }else{
            break;
        }
    }
    return ps.join("/");
}

//计算路径
export const parsePath = (selfPath: string, dstPath: string): string => {
	let p = pathMode.relative(selfPath, dstPath).replace(/\\/g, "/");
	let pp = p.split("/");
	if(pp[0] && pp[0] === ".."){
		if(pp[1] !== ".."){
			pp[0] = ".";
		}else{
			pp = pp.slice(1, pp.length);
		}
	}
	return pp.join("/")
}

export const relativePath = (root: string, path: string): string => {
    let p;
    if(os.platform() == "linux"){
        root = root.replace(/\\/ig,"/");
        p = pathMode.relative(root,path)
    }else{
        p = pathMode.relative(pathMode.resolve(root),path);
    }
    p = p.replace(/\\/ig,"/");
    return p;
}