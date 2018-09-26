

//测试
export const test = function (readData, Arg) {
    console.log(readData);
    console.log(Arg);
    let showData = { a: 1 };
    return JSON.stringify(showData) + "#" + "1-10,2-10";
};