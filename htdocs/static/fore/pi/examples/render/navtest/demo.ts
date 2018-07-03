import {Widget} from "../../../widget/widget";
import { Json } from '../../../lang/type';
import { Polygon, NavMesh } from '../../../ecs/navmesh';
import { THREE } from '../../../render3d/three';
import { butil, commonjs } from '../../../lang/mod';
import { loadDir } from "../../../widget/util";

let navMesh: NavMesh;
export class NavTest extends Widget{
    ctx;
    start;
    firstPaint(): void {
        var can = (<any>this.tree).children[0].link;
        this.ctx = can.getContext('2d');
        for(let i = 0; i < navMesh.polygons.length; i++){
            drawPoly(navMesh.polygons[i], this.ctx);
        }
	}
    click(e: MouseEvent):void{
        if(!this.start){
            this.start = new THREE.Vector3(e.offsetX/20, 0, -e.offsetY/20);
        }else{
            let points = navMesh.findPath(this.start, new THREE.Vector3(e.offsetX/20, 0, -e.offsetY/20), 1);
            this.start = null;
            drawPath(points, this.ctx);
        }
    }
} 

export const drawPoly = (poly: Polygon, ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgba(255,0,0,0.1)";
    ctx.beginPath( );
    ctx.moveTo(poly.navMesh.vertexs[poly.indexs[0]].x * 20, -poly.navMesh.vertexs[poly.indexs[0]].z * 20);
    for(let i = 1; i < poly.indexs.length; i++){
        ctx.lineTo(poly.navMesh.vertexs[poly.indexs[i]].x * 20, -poly.navMesh.vertexs[poly.indexs[i]].z * 20)
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export const drawPath = (vs: Array<THREE.Vector3>, ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(vs[0].x * 20, -vs[0].z * 20);
    for(let i = 1; i < vs.length; i++){
        ctx.lineTo(vs[i].x * 20, -vs[i].z * 20)
    }
    ctx.stroke();
}

loadDir(["examples/render/res/nav/"], commonjs.flags, {}, {}, fileMap => {
    navMesh = new NavMesh();
    navMesh.load(fileMap["examples/render/res/nav/11.nav"]);
}, () => { }, () => { });
