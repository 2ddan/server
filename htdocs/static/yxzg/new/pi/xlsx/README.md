# .xlsx配置表解析
这是一个.xlsx文件作为配置文件的导出插件，目的是将.xlsx配置的数据（符合配置规范，后面会详细阐述配置规范）转换为.ts类型的配置文件。 该插件需要与另一个插件（rs2ts, 详见文档）配合使用， 最终生成两个ts文件， 分别为.c.st和.s.ts文件。

注意： 下文列举的代码与实际生成代码有出入， 仅作为参考。

例如，我们可以解析如下player.xlsx：

| $Player | name | id |
| ------ | ------ | ------ |
|  | str | u32 |
|  | 小红 | 53333 |
|  | 小明 | 52222 |

生成player.s.ts文件：

    class Player{
        name: string;
        id: number;

        construtor(name?: string, id?: number){
            this.name = name;
            this.id = id;
        }

        //以及一些工具方法
        ...
    }
和player.c.ts文件：

    import {Player} from "./player.s";
    import {cfgMgr} from "pi/util/cfg";

    cfgMgr.set("player.Player", new Map([[0, new Player("小红"， 53333)],[1, new Player("小明"， 52222)])]);

看完上面的例子， 你能配置出一个关于武器的配置表吗？

## 构建配置
该插件为构建系统的插件之一， 因此需要在构建脚本的配置文件（参考文档“TODO”）中加入如下配置：

    [{
        "suf":".xlsx",
        "proc":"./plugin/xls2rs",
        "args":[{"cfgPath":"../src/pi/util/cfg"}]
    },{
        "suf":".rs",
        "proc":"./plugin/rs2ts",
        "args":[{"root": "server","bin": "../src/pi/util/bon", "mgr": "../src/pi/struct/struct_mgr", "sinfo": "../src/pi/struct/sinfo"}]
    }]

其中， args中的参数， 因根据实际情况改写。

## 配置规范
该插件目前支持导出数据的类型有 **类**、**枚举**、**常量**、**公式**， 上文中提到的Player就是一个类。

我们规定， 用“$”表示**类**， “e$”表示**枚举**， “v$”表示**常量**， “f$”表示**公式**

### 枚举配置

| e$Color | black | red | green |
| --- | -- | -- | -- |
|  | 1 | 2 | 3 |

枚举的配置我们可将其分为4部分：
- 第一行第一单元格： e$ + 枚举名称。
- 第一行其余单元格： 枚举成员名称。
- 第二行2-n列： 枚举成员类型， 目前仅支持u8类型的枚举值， 该行应该留白。
- 第三行2-n列： 枚举成员的值， ts中枚举值可省略，但目前插件未支持， 必填

### 常量的配置

| v$ | PI | E |
| --- | -- | -- |
|  | f32 | f32 |
|  | 3.14 | 2.718 |

同样可将常量配置分为4部分：
- 第一行第一单元格： v$。
- 第一行其余单元格： 常量名称。
- 第二行2-n列： 各常量类型， 常量仅支持基础类型（对象、数组、map都不支持）
- 第三2-n列： 各常量的值

### 公式的配置
| f$ | add | sub |
| --- | -- | -- |
|  | (a1: u8, a2: u8):u8 | (s1: u8, s2:u8):u8 |
|  | a1 - a2 | s1 - s2 |

将公式配置分为4部分：
- 第一行第一单元格： f$。
- 第一行其余单元格： 公式名称。
- 第二行2-n列： 各公式类型， 形如"(参数1: 参数1类型， 参数2: 参数2类型)"
- 第三2-n列： 各公式表达式

### 类的配置
| $Staff | name | info | | | other | |  | computerid |
| --- | -- | -- | -- | -- | --- |---- | --- |- |- |
|  | str | [u32 | bool | u8] | {id：str | eay |u32} | u32|
|  | 小红 | 53333 | true | 5 | 0 | 2 | 10 | 1|
|  | 小明 | 52222 | true | 5 | 0 | 2 | 10 | 2|

| $Computer | id | color |
| --- | -- | -- |
|  | u32 | Color |
|  | 1 | black |
|  | 2 | red |

类的配置相较于上面的其他配置，有更复杂的规则, 可将其分为五个部分：
- 第一行第一个单元格： "$"+类型名称
- 第一行其余单元格：字段名称， 有些字段为复合类型， 可能占据多列，其所占列的第一列为字段名称
- 第二行2-n列：字段类型， 包括 u8、u16、u32、i8、i16、i32、bool、str, f32, f64、匿名数组、匿名对象，引用对象

    + 匿名数组： 数组可占据多列，每列为一个基础类型， 数组第一列以"["开头， 最后一列以“]”结尾， 如“[str u32 str]”
    + 匿名对象： 对象可占据多列，每列为一个基础类型， 对象第一列以"{"开头， 最后一列以“}”结尾，其字段名和类型以“:”分隔， 如“{name:str id:u32 count:u32}”
    + 引用对象： 引用对象是指引用其他类的数据， 形如“Computer#computerid#id”, 即（相对路径.结构类型#内部关联键@外部关联键）
- 其余行2-n列： 数据
- 注解： 可以为类型和字段名的单元格添加批注， 批注形如：“#[a=b]”, 这种格式的批注会解析成注解（注解的概念参考文档“todo”）

上述的类型条目可以留白， 省略类型时被认为是数据的默认类型（配置数据如果能parseInt，则为f64, 否则为字符串）， 同时，该插件支持同一个sheet中配置多个导出项（一个类， 一组常数都可看做一个导出项）， 不同的项间隔两行或两列以上