var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var egret3d;
(function (egret3d) {
    var Class_ParticleDSParticle = (function (_super) {
        __extends(Class_ParticleDSParticle, _super);
        function Class_ParticleDSParticle() {
            _super.call(this);
            this.count = 600;
            this._modelCount = 0;
            this._initialize = true;
            this._lastIsCube = true;
            this.anlge = 0;
            this.position = new egret3d.Vector3D();
            this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
            this.view1 = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view1.camera3D.lookAt(new egret3d.Vector3D(0, 500, -500), new egret3d.Vector3D(0, 0, 0));
            this.view1.backColor = 0xff000000;
            this._egret3DCanvas.addView3D(this.view1);
            this.cameraCrl = new egret3d.HoverController(this.view1.camera3D, new egret3d.Object3D());
            this.cameraCrl.panAngle = 45;
            this.cameraCrl.tiltAngle = 25;
            this.cameraCrl.distance = 1300;
            this._queueLoad = new egret3d.QueueLoader();
            this._queueLoad.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadMesh, this);
            this._queueLoad.loadDefaultGUISkin();
            this._queueLoad.load("resource/scene/worlds/Model/1_sc.esm");
            this._queueLoad.load("resource/ui/btn.json");
            this._queueLoad.load("resource/scene/worlds/Model/4_boat_01.esm");
            this._queueLoad.load("resource/scene/worlds/Model/3_car_02.esm");
            this._queueLoad.load("resource/scene/worlds/Model/2_shrub_01.esm");
            this._queueLoad.load("resource/white.jpg");
            this._queueLoad.load("resource/26.jpg");
        }
        Class_ParticleDSParticle.prototype.onLoadMesh = function (e) {
            var label = new egret3d.gui.UIButton();
            label.width = 150;
            label.height = 60;
            label.x = window.innerWidth * 0.5 - 50;
            label.y = window.innerHeight - 100;
            label.setStyle("down", this._queueLoad.getAsset("rest.png"));
            label.setStyle("up", this._queueLoad.getAsset("normal.png"));
            label.setStyle("over", this._queueLoad.getAsset("over.png"));
            label.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.mouseDown, this);
            this.view1.addGUI(label);
            this.shape1Value = new egret3d.Mesh3DValueShape();
            this.shape1Value.geometry = this._queueLoad.getAsset("resource/scene/worlds/Model/4_boat_01.esm");
            this.shape1Value.type = egret3d.ParticleMeshShapeType.Triangle;
            this.shape1Value.scale = 2;
            this.shape2Value = new egret3d.Mesh3DValueShape();
            this.shape2Value.geometry = this._queueLoad.getAsset("resource/scene/worlds/Model/3_car_02.esm");
            this.shape2Value.type = egret3d.ParticleMeshShapeType.Triangle;
            this.shape2Value.scale = 2;
            this.initParticle(this._queueLoad.getAsset("resource/scene/worlds/Model/1_sc.esm"));
            this.initLight();
        };
        Class_ParticleDSParticle.prototype.initParticle = function (geom) {
            var backTexture = this._queueLoad.getAsset("resource/26.jpg");
            this.view1.backImage = backTexture;
            var mat = new egret3d.TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0x555555;
            mat.blendMode = egret3d.BlendMode.NORMAL;
            mat.diffuseTexture = this._queueLoad.getAsset("resource/white.jpg");
            mat.diffuseColor = 0xff0000;
            mat.specularLevel = 0.5;
            //var mat: ColorMaterial = new ColorMaterial(0xff0000);
            //mat.ambientColor = 0x333333;
            var data = new egret3d.ParticleData();
            data.scaleBirth.type = egret3d.ParticleValueType.RandomConst;
            data.scaleBirth.max = 0.7;
            data.scaleBirth.min = 0.4;
            data.geometry.planeW = data.geometry.planeH = 12;
            var life = data.life;
            life.type = egret3d.ParticleValueType.RandomConst;
            life.max = 5;
            life.min = 3;
            life.duration = 1;
            life.delay = 0;
            life.loop = true;
            var emission = data.emission;
            emission.rate = 0;
            emission.bursts = [new egret3d.Point(0, this.count)];
            var property = data.property;
            property.particleCount = this.count;
            property.bounds.setTo(egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE, egret3d.MathUtil.MAX_VALUE);
            property.renderMode = egret3d.ParticleRenderModeType.Mesh;
            property.stayAtEnd = true;
            property.trackPosition = true;
            property.meshFile = "xxx";
            property.geometry = geom;
            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);
            var shape = data.shape;
            shape.type = egret3d.ParticleDataShapeType.Sphere;
            shape.emitFromShell = true;
            shape.sphereRadius = 600;
            var rotateSpeed = data.rotationSpeed = new egret3d.ParticleDataRotationSpeed();
            rotateSpeed.min.setTo(-40, -40, -40);
            rotateSpeed.max.setTo(40, 40, 40);
            rotateSpeed.type = egret3d.ParticleValueType.RandomConst;
            rotateSpeed.rot3Axis = true;
            data.validate();
            this.particle = new egret3d.ParticleEmitter(data, mat);
            this.particle.play();
            this.view1.addChild3D(this.particle);
            //this.view1.addChild3D(new AxisMesh(200));
            for (var _i = 0, _a = this.particle.childs; _i < _a.length; _i++) {
                var a = _a[_i];
                if (a) {
                }
            }
            this.trackNewPosition();
        };
        Class_ParticleDSParticle.prototype.trackNewPosition = function () {
            var fromCoords;
            var endCoords;
            if (this._initialize) {
                fromCoords = this.shape1Value.calculate(this.count);
                endCoords = this.shape2Value.calculate(this.count);
                this._lastIsCube = true;
            }
            else {
                fromCoords = this.particle.trackEndCoords;
                if (this._lastIsCube) {
                    endCoords = this.shape1Value.calculate(this.count);
                }
                else {
                    endCoords = this.shape2Value.calculate(this.count);
                }
                this._lastIsCube = !this._lastIsCube;
            }
            //加入一些随机
            var radius = 700;
            for (var i = 0, count = endCoords.length; i < count; i++) {
                if (Math.random() > 0.8) {
                    endCoords[i].setTo((Math.random() * 2 - 1) * radius, (Math.random() * 2 - 1) * radius, (Math.random() * 2 - 1) * radius);
                }
                var y = endCoords[i].y;
                var z = endCoords[i].z;
                endCoords[i].z = y;
                endCoords[i].y = z;
            }
            this.particle.trackPosition(fromCoords, endCoords);
            this._initialize = false;
        };
        Class_ParticleDSParticle.prototype.mouseDown = function (e) {
            this.trackNewPosition();
        };
        Class_ParticleDSParticle.prototype.initLight = function () {
            var lights = new egret3d.LightGroup();
            this.lightVector = new egret3d.Vector3D(-0.5, -0.6, 0.2);
            this.dirLight = new egret3d.DirectLight(this.lightVector);
            this.dirLight.diffuse = 0xffffff;
            lights.addLight(this.dirLight);
            this.particle.lightGroup = lights;
            //var mesh: Mesh = new Mesh(this.shapeLoader2.data);
            //mesh.scale = new Vector3D(20, 20, 20);
            //this.view1.addChild3D(mesh);
            //mesh.x = 200;
            //mesh.lightGroup = lights;
        };
        Class_ParticleDSParticle.prototype.update = function (e) {
            this.cameraCrl.update();
            this.anlge += 0.01;
            if (this.particle) {
            }
            else {
            }
        };
        return Class_ParticleDSParticle;
    }(egret3d.Class_View3D));
    egret3d.Class_ParticleDSParticle = Class_ParticleDSParticle;
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Class_ParticleDSParticle.js.map