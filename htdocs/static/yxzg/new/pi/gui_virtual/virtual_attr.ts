/**
 * 虚拟节点 attr属性集
 * * 虚拟节点 attr 数据 键
 */
// TODO ra
export class VirtualAttr {
    [index:string]: any;
    public classList?: string[];
    public namedItem?: string;
    public w_tag?: string;
    public w_plugin?: Object;
    public w_props?: Object;
    public src?: string;
}

export interface AttrData<T> {
    value: any;
    init(data: string);
    equal(other: T): boolean;
    read(): string;
    copy(data: T);
}

export const equalAttr = (owner: any | AttrData<any>, other: any | AttrData<any>): boolean => {
    if ((<AttrData<any>>owner).equal && (<AttrData<any>>other).equal) {
        return (<AttrData<any>>owner).equal(other);
    } else {
        return owner === other;
    }
};