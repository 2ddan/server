import { Widget } from "../../../widget/widget";

interface Item {
    label: String;
    value: number;
}

interface Props {
    data: Item[];
    newLab: string;
    innerHTML: string;
    points: String;
    labels: Label[];
}

interface Label {
    x: number;
    y: number;
    content: string;
}


export class SvgGraph extends Widget {
    props: Props;

    /*初始化数据*/
    create() {
        this.props = {
            data: [
                { label: 'A', value: 100 },
                { label: 'B', value: 100 },
                { label: 'C', value: 100 },
                { label: 'D', value: 100 },
                { label: 'E', value: 100 },
                { label: 'F', value: 100 }
            ],
            innerHTML: "",
            newLab: "",
            points: "",
            labels: []
        }
        this.getPoints();
        this.getLabels();
        this.refresh();
    }

    /*滑动滑块改变数值*/
    change(ev, index) {
        let newVal = ev.target.value;
        this.props.data[index].value = parseInt(newVal);
        this.getPoints();
        this.getLabels();
        this.refresh();
        this.paint();

    }

    /*删除数据*/
    delete(index) {
        this.props.data.splice(index, 1);
        this.getPoints();
        this.getLabels();
        this.refresh();
        this.paint();
    }

    /*添加数据*/
    add() {
        this.props.data.push({
            label: this.props.newLab,
            value: 100
        })

        this.props.newLab = "";
        this.getPoints();
        this.getLabels();
        this.refresh();
        this.paint(true);
    }

    /*记录输入框中的数据*/
    inputChange(ev) {
        this.props.newLab = ev.target.value;
        if (ev.keyCode === 13) {
            this.add();
        }
    }

    /*将value转化成其对应的坐标*/
    valueToPoint(value, index, total) {
        var x = 0
        var y = -value * 0.8
        var angle = Math.PI * 2 / total * index
        var cos = Math.cos(angle)
        var sin = Math.sin(angle)
        var tx = x * cos - y * sin + 100
        var ty = x * sin + y * cos + 100
        return {
            x: tx,
            y: ty
        }
    }

    /*获取点数据*/
    getPoints() {
        let data = this.props.data;
        let result = "";
        for (let i = 0; i < data.length; i++) {
            let obj = this.valueToPoint(data[i].value, i, data.length);
            result += obj.x + "," + obj.y + " ";
        }
        this.props.points = result;
    }

    /*获取标签坐标*/
    getLabels() {
        let data = this.props.data;
        this.props.labels = [];
        for (let i = 0; i < data.length; i++) {
            let num = data[i].value;
            let obj = this.valueToPoint(num + 10, i, data.length);
            let content = data[i].label.toString();
            this.props.labels.push({
                x: obj.x,
                y: obj.y,
                content: content
            })
        }
    }

    /*重绘图形*/
    refresh() {
        this.props.innerHTML = '<svg width="400px" height="400px"><polygon points="' + this.props.points + '" fill="#42b983"></polygon><circle cx="100" cy="100" r="80" stroke="#999" fill="transparent"></circle>';
        let labels = this.props.labels;
        for (let i = 0; i < labels.length; i++) {
            this.props.innerHTML += "<text x='" + labels[i].x + "' y='" + labels[i].y + "'>" + labels[i].content + "</text>"
        }
        this.props.innerHTML += '</svg>'
    }
}
