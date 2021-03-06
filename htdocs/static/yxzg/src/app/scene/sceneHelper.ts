
import { THREE } from "../../pi/render3d/three";

let axisHelper2D: any, axisHelper3D: any;
let gridHelper2D: any, gridHelper3D: any;

let testOK: boolean = false;
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
        }else if (model instanceof THREE.Text2D && model.edgeOK !== true){
            var geo = new THREE.EdgesGeometry( (model as any).children[0].geometry ); // or WireframeGeometry
            var mat = new THREE.LineBasicMaterial( { color: "#16c9ff", linewidth: 5 } );
            var wireframe = new THREE.LineSegments( geo, mat );
            (model as any).add( wireframe );
            (model as any).edgeOK = true;
            (model as any).children[0].material.generateMipmaps = false;
            (model as any).children[0].material.needsUpdate = true;

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
    
}