
import { THREE } from "../../pi/render3d/three";

let axisHelper2D: any, axisHelper3D: any;
let gridHelper2D: any, gridHelper3D: any;

let testOK: boolean = false;

const ClipTypes = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

let ClipPlanMap2D: any = {
    [ClipTypes.up]: new Map,
    [ClipTypes.down]: new Map,
    [ClipTypes.left]: new Map,
    [ClipTypes.right]: new Map
};

export class SceneHelper {
    static render3DAxisHelper = ( scene3D: any )=>{
        
        if (axisHelper3D === undefined){
    
            axisHelper3D = new THREE.AxisHelper( 400 );
            scene3D.add( axisHelper3D );
            
        }
    }
    
    
    static render2DAxisHelper = ( scene2D: any )=>{
        
        if (axisHelper2D === undefined){
    
            axisHelper2D = new THREE.AxisHelper( 400 );
            scene2D.scene.add( axisHelper2D );
    
        }
    }
    
    
    static render3DGridHelper = ( scene3D: any )=>{
        
        if (gridHelper3D === undefined){
            
            // 2D
            gridHelper3D  = new THREE.GridHelper( 2000, 40, 0xffffff, 0x88ee55 );
            gridHelper3D.material.opscity       = 0.4;
            gridHelper3D.material.transparent   = true;
            gridHelper3D.rotation.fromArray( [-1.57, 0, 0] );
            scene3D.add( gridHelper3D );
    
        }
    }
    
    
    static render2DGridHelper = ( scene2D: any )=>{
        
        if (gridHelper2D === undefined){
            
            // 2D
            gridHelper2D  = new THREE.GridHelper( 2000, 40, 0xffffff, 0x88ee55 );
            gridHelper2D.material.opscity       = 0.4;
            gridHelper2D.material.transparent   = true;
            gridHelper2D.rotation.fromArray( [-1.57, 0, 0] );
            gridHelper2D.attachment = "2D";
            scene2D.add( gridHelper2D );
    
        }
    }
    
    static renderModelsEdge = ( meshArray: Array<any> )=>{
    
        for (let i=0, len=meshArray.length; i<len; i++ ){
            let temp: any;
    
            temp = meshArray[i];
            SceneHelper.renderModelEdge( temp );
        }
    
    }
    
    static renderModelEdge = ( model: any )=>{
        
        if (model instanceof THREE.Mesh && model.geometry && (model as any).edgeOK !== true){
            // var geo = new THREE.EdgesGeometry( model.geometry ); // or WireframeGeometry
            // var mat = new THREE.LineBasicMaterial( { color: "#ff5544", linewidth: 5 } );
            // var wireframe = new THREE.LineSegments( geo, mat );
            // model.add( wireframe );
            // (model as any).edgeOK = true;
        }else if (model instanceof THREE.Text2D && (model as any).children[0].edgeOK !== true){
            // var geo = new THREE.EdgesGeometry( (model as any).children[0].geometry ); // or WireframeGeometry
            // var mat = new THREE.LineBasicMaterial( { color: "#16c9ff", linewidth: 5 } );
            // var wireframe = new THREE.LineSegments( geo, mat );
            // (model as any).add( wireframe );
            (model as any).children[0].edgeOK = true;
            (model as any).children[0].material.generateMipmaps = false;
            (model as any).children[0].material.needsUpdate = true;
            (model as any).children[0].material.map.magFilter  = 1006;
            (model as any).children[0].material.map.minFilter  = 1007;
            // if ( testOK === false ){
            //     let canvas = (model as any).children[0].material.map.image;
            //     if ( canvas ){
            //         testOK = true;
            //         document.body.appendChild( canvas );
            //         canvas.style.cssText = 'width: 50pa;height: 50px;position:fixed;top:20%;left:0;cursor:pointer;opacity:0.8;z-index:10000;';
            //     }
            // }
        }
    
    }

    static createLineWithMesh( impl: any, points: number[], color: string, lineWidth: number ) {
        let lineGeometry, material, line;

        lineGeometry = new THREE.BufferGeometry(); 
        lineGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );

        material = new THREE.LineBasicMaterial( { color: color, linewidth: lineWidth } );

        line = new THREE.LineSegments( lineGeometry, material );

        (impl as any).add( line );
    }

    static clipMesh = ( mesh: any, pos: number, flag: string )=>{
        
        let plane: any;

        if ( mesh.material === null || mesh.material === undefined ) return;

        if ( mesh.material.clippingPlanes === null || mesh.material.clippingPlanes === undefined ){
            mesh.material.clippingPlanes = [];
        }

        plane = ClipPlanMap2D[flag].get( pos );

        if (plane === undefined) {
            switch (flag) {
                case (ClipTypes.up):{
                    plane   = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 1 );
                    break;
                }
                case (ClipTypes.down):{
    
                    plane   = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), pos );
                    break;
                }
                case (ClipTypes.left):{
                    plane   = new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), -pos );
                    break;
                }
                case (ClipTypes.right):{
                    plane   = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), pos );
                    break;
                }
            }
            ClipPlanMap2D[flag].set( pos, plane );
        }

        mesh.material.clippingPlanes.push( plane );
        // mesh.material.needsUpdate = true;
    }

    static renderBoxHelpers = ( meshArray: Array<any> )=>{
        for (let i=0, len=meshArray.length; i<len; i++ ){
            let temp: any;
    
            temp = meshArray[i];
            SceneHelper.renderBoxHelper( temp );
        }
    }

    static renderBoxHelper = ( model: any )=>{
        if (model instanceof THREE.Mesh && model.geometry && (model as any).boxOK !== true){
            model.setBoundVisible(1);
            (model as any).boxOK = true;
        }else if (model instanceof THREE.Text2D && model.boxOK !== true){
            // var box = new THREE.BoxHelper( (model as any).children[0], 0xffff00 ); 
            // (model as any).add( box );
            // (model as any).boxOK = true;
        }
    }

    static toScreenXY( position, camera, canvas ) {
        let pos: any, projScreenMat, offset: any ;

        pos = position.clone();
        projScreenMat = new THREE.Matrix4();
        projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
        projScreenMat.multiplyVector3( pos );

        // offset = SceneHelper.findOffset(canvas);
        // return {    
        //         x: ( pos.x   + 1 ) * canvas.width / 2 + offset.left,
        //         y: ( - pos.y + 1 ) * canvas.height / 2 + offset.top 
        //     };
            
        return {    
            x: ( pos.x   + 1 ) * canvas.width  / 2 + 0,
            y: ( - pos.y + 1 ) * canvas.height / 2 + 0 
        };

    }

    static findOffset(element) { 
        let pos: any;
        pos = new Object();
        pos.left = pos.top = 0;        
        if (element.offsetParent){ 
            do { 
                pos.left    += element.offsetLeft; 
                pos.top     += element.offsetTop; 
            } while (element = element.offsetParent); 
        } 
        return pos;
    } 
    
    /**
     * 3D 模型线框调试
     * @param b 
     */
    static wireframeDebug(scene: any, b: boolean) {
        if (scene) {
            scene.meshList.forEach(mesh => { 
                if (mesh.material !== undefined) { 
                    if (mesh.material instanceof Array) { 
                        mesh.material.forEach(mat => {
                            mat.wireframe = b;
                        }) 
                    }else {
                        mesh.material.wireframe = b;
                    } 
                } 
            });
        }
    }
    
}