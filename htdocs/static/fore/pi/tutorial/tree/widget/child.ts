import { Widget } from "../../../widget/widget";

interface Child {
	name: string;
	children?: Child[];
}
interface TreeData {
	data: Child;
	open: boolean;
	folderOpen: boolean;
}
export class Tree extends Widget {
	props: TreeData;
	create() {
		this.props = {
			open: false,
			folderOpen: false,
			data: {
				name: 'My Tree',
				children: [
					{ name: 'hello' },
					{ name: 'wat' },
					{
						name: 'child folder',
						children: [
							{
								name: 'child folder',
								children: [
									{ name: 'hello' },
									{ name: 'wat' }
								]
							},
							{ name: 'hello' },
							{ name: 'wat' },
							{
								name: 'child folder',
								children: [
									{ name: 'hello' },
									{ name: 'wat' }
								]
							}
						]
					}
				]
			}
		}
	}

	// setProps(props: Json, oldProps?: Json): void {
	// 	this.props = props;
	// }

	slideDown() {
		this.props.open = !this.props.open;
		this.paint();
	}

	addChild() {
		this.props.data.children.push({ name: "new stuff" });
		this.paint();
	}

	addFolder(i: number) {
		this.props.data.children[i].children = [{ name: "new stuff" }];
		this.props.folderOpen = true;
		this.paint();
	}
}
