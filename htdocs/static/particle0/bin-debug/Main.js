var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        _this.once(egret.Event.ADDED_TO_STAGE, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.createCanvas();
                this.createView();
                this.createCameraCtl();
                this.createParticle();
                return [2 /*return*/];
            });
        }); }, _this);
        return _this;
    }
    Main.prototype.createCanvas = function () {
        this.context3d = new egret3d.Egret3DCanvas(this.stage);
        egret.setRendererContext(this.context3d);
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
        var loadtex = new egret3d.URLLoader("resource/222222.png");
        loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    };
    Main.prototype.onLoadTexture = function (e) {
        this.mat.diffuseTexture = e.loader.data;
        this.mat.diffuseTexture.smooth = false;
    };
    return Main;
}(egret.DisplayObject));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map