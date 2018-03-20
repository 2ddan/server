var egret3d;
(function (egret3d) {
    var Class_View3D = (function () {
        function Class_View3D() {
            this._egret3DCanvas = new egret3d.Egret3DCanvas();
            this._egret3DCanvas.x = 0;
            this._egret3DCanvas.y = 0;
            this._egret3DCanvas.width = window.innerWidth;
            this._egret3DCanvas.height = window.innerHeight;
            this._egret3DCanvas.start();
            this._queueLoad = new egret3d.QueueLoader();
            this._queueLoad.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onUiFonts, this);
        }
        Class_View3D.prototype.onUiFonts = function (view) {
            this.infoText = new egret3d.gui.UITextField();
            view.addGUI(this.infoText);
            this.infoText.multiline = true;
            this.infoText.textColor = 0xff0000;
        };
        return Class_View3D;
    }());
    egret3d.Class_View3D = Class_View3D;
})(egret3d || (egret3d = {}));
//# sourceMappingURL=Class_View3D.js.map