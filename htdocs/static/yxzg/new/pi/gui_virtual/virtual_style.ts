import * as REnum from '../gui/enum';
import { RGBA, Tools } from '../gui/tools';
import { AttrData } from './virtual_attr';

/**
 * 虚拟节点样式
 * * 编译 tpl 时，虚拟节点style数据 键 的集合
 */
export class VirtualStyle {
    public backgroundColor: RGBA;    

    public borderWidth: number;
    public borderColor: RGBA;
    public borderRadius:    string;

    public display:     string;
    public visibility:  string;

    // font:        string;
    public fontFamily:  string;
    public fontSize:    number;
    public fontStyle:   string;
    public fontVariant: string;
    public fontWeight:  string;

    public height:      LengthData;
    public width:       LengthData;
    public maxHeight:   LengthData;
    public minHeight:   LengthData;
    public maxWidth:    LengthData;
    public minWidth:    LengthData;

    // 

    // public margin:          string;
    public marginBottom:    LengthData;
    public marginLeft:      LengthData;
    public marginRight:     LengthData;
    public marginTop:       LengthData;

    public opacity:         string;

    // outline:         string;
    // public outlineColor:    string;
    // public outlineOffset:   string;
    // public outlineStyle:    string;
    // public outlineWidth:    string;

    public overflow:        string;
    public overflowX:      string;
    public overflowY:      string;

    // public padding:         string;
    public paddingBottom:   LengthData;
    public paddingLeft:     LengthData;
    public paddingRight:    LengthData;
    public paddingTop:      LengthData;

    public bottom:          LengthData;
    public clip:            string;
    public left:            LengthData;
    public position:        string;
    public right:           LengthData;
    public top:             LengthData;
    public zIndex:          number;

    public color:           RGBA;
    public direction:       string;
    public letterSpacing:   number;
    public lineHeight:      number;
    public textAlign:       string;
    // textDecoration:  string;
    public textIndent:      string;
    public textShadow:      string;
    public textTransform:   string;
    // textOverflow:    string;
    // unicodeBidi:     string;
    public verticalAlign:   string;
    public whiteSpace:      string;
    public wordSpacing:     string;
    constructor(arr: any[]) {
        const len = arr.length / 2;
        for (let i = 0; i < len; i++) {
            this[arr[i * 2]] = arr[i * 2 + 1];
        }
    }
}

/**
 * 长度数据
 * * 单位
 * * 值
 * * 两个数据相等检查
 * * 数据从 字符串 设置
 * * 读取 返回字符串
 */
export class LengthData implements AttrData<LengthData> {
    public value: number;
    private _type: REnum.LengthUnitType;
    private _parmas: string;
    constructor(_type?: number, _value?: number) {
        this._type  = _type;
        this.value  = _value;
    }
    public init(data: string) {
        const [_t, _d] = Tools.lengthData(data);
        this._type  = _t;
        this.value  = _d;
    }
    public equal(other: LengthData): boolean {
        return this.read() === other.read();
    }
    public read(): string {
        if (this._parmas === undefined) {
            this._parmas = this._type === REnum.LengthUnitType.Pixel
                            ? `${this.value}px`
                            : `${this.value}%`;
        }

        return this._parmas;
    }
    public copy() {
        const other = new LengthData();
        other.value = this.value;
        other._type = this._type;
        other._parmas = this._parmas;
    }
}

/**
 * 2d 矩阵变换参数
 */
export class MatrixData implements AttrData<MatrixData> {
    public value: number[];
    private _parmas: string;
    
    public init(data: string) {
        this._parmas    = data;
        this.value      = [];

        data.split(',').forEach(v => {
            this.value.push(<any>v - 0);
        });
    }
    public equal(other: MatrixData): boolean {
        return this.read() === other.read();
    }
    public read(): string {
        if (this._parmas === undefined) {
            this._parmas = this.value.join(',');
        }

        return this._parmas;
    }
    public copy() {
        const other = new MatrixData();
        other.value     = this.value;
        other._parmas   = this._parmas;
        other.value.length = 0;
        this.value.forEach(v => {
            other.value.push[v];
        });
    }
}

/**
 * 3d 矩阵变换参数
 */
export class Matrix3DData extends MatrixData {
    
}