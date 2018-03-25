var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.onKeyDown = function (e) {
            switch (e.keyCode) {
                case egret3d.KeyCode.Key_1:
                    this.plane.material.diffusePass.removeMethod(this.plane.material.diffusePass.getMethod(egret3d.UVSpriteSheetMethod));
                    break;
                case egret3d.KeyCode.Key_2:
                    this.mat.diffusePass.addMethod(this.uvSpriteSheetMethod);
                    break;
            }
        };
        new E3dGame();
        return _this;
        // this.once(egret.Event.ADDED_TO_STAGE, () => {
        //     this.createCanvas();
        //     this.createView();
        //     this.createCameraCtl();
        //     this.createParticle();
        // }, this);
    }
    Main.prototype.createCanvas = function () {
        // this.context3d = new egret3d.Egret3DCanvas(this.stage);
        // egret.setRendererContext(this.context3d);
    };
    Main.prototype.createView = function () {
        this._view = new egret3d.View3D(0, 0, this.context3d.width, this.context3d.height);
        this._view.backColor = 0xff000000;
        this._view.camera3D.lookAt(new egret3d.Vector3D(0, 100, -100), new egret3d.Vector3D(0, 0, 0));
        this.context3d.addView3D(this._view);
    };
    Main.prototype.createCameraCtl = function () {
        this._cameraCtl = new egret3d.HoverController(this._view.camera3D);
        this._cameraCtl.tiltAngle = 60;
        this._cameraCtl.distance = 1000;
        this.context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    };
    Main.prototype.update = function (evt) {
        this._cameraCtl.update();
    };
    Main.prototype.OnWindowResize = function (evt) {
        this._view.height = this.context3d.height;
        this._view.width = this.context3d.width;
    };
    Main.prototype.createParticle = function () {
        var mat = new egret3d.TextureMaterial();
        this.mat = mat;
        this.mat.repeat = true;
        this.plane = new egret3d.Mesh(new egret3d.CubeGeometry(200, 200, 200), this.mat);
        this._view.addChild3D(this.plane);
        var uvSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(34, 6, 6, 3.0);
        this.mat.diffusePass.addMethod(uvSpriteSheetMethod);
        uvSpriteSheetMethod.start(true);
        this.uvSpriteSheetMethod = uvSpriteSheetMethod;
        // var loadtex = new egret3d.URLLoader("resource/222222.png");
        // loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    };
    Main.prototype.onLoadTexture = function (e) {
        // this.mat.diffuseTexture = e.loader.data;
        // this.mat.diffuseTexture.smooth = false;
    };
    return Main;
}(egret.DisplayObject));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map