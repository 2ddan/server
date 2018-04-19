//读取localstorage
export const readLS = (key: string) => {
    let keyArr = key.split(".");
    let readObj = editer;
    for (let i = 0; i < keyArr.length; i++) {
        readObj = readObj[keyArr[i]];
        if (!readObj) {
            return;
        }
    }
    return readObj;
}

//写入localstorage
export const writeLS = (key: string, value: any) => {
    let keyArr = key.split(".");
    let writeObj = editer;
    for (let i = 0; i < keyArr.length; i++) {
        if (i == keyArr.length - 1) {
            writeObj[keyArr[i]] = value;
            save()
            return true;
        }
        else if (!writeObj[keyArr[i]]) {
            writeObj[keyArr[i]] = {};
        }
        writeObj = writeObj[keyArr[i]]
    }
}

//删除


//保存到localStorage
const save = () => {
    localStorage.editer = JSON.stringify(editer)
}


let editer = JSON.parse(localStorage.editer || "{}");