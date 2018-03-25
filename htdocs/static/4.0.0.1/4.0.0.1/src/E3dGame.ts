/**
 *
 * @author 
 *
 */
class E3dGame {
    // Canvas操作对象
    protected egret3DCanvas: egret3d.Egret3DCanvas;

    // View3D操作对象
    protected view: egret3d.View3D;

    /*
     * 进度条
     */
    protected loadProgress: egret3d.gui.UIProgressBar;

    /**
     *  加载器
     */
    protected queueLoader: egret3d.QueueLoader;

    protected lightGroup: egret3d.LightGroup;

    /**
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    */
    private cameraCtl: egret3d.LookAtController;

    private mesh: egret3d.Mesh;

    public constructor() {
        this.egret3DCanvas = new egret3d.Egret3DCanvas();
        this.egret3DCanvas.x = 0;
        this.egret3DCanvas.y = 0;
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.egret3DCanvas.start();

        var view: egret3d.View3D = new egret3d.View3D(0, 0, this.egret3DCanvas.width, this.egret3DCanvas.height);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xffcccccc;

        this.egret3DCanvas.addView3D(view);
        this.view = view;

        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.lookAtObject.y = 100;

        this.cameraCtl.distance = 380;
        this.cameraCtl.rotationY = 180;
        this.egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        // ------------------ 初始化引擎 ---------------------




        this.queueLoader = new egret3d.QueueLoader();
        // 加载默认ui 皮肤
        this.queueLoader.loadDefaultGUISkin();
        this.queueLoader.load("resource/background.jpg");
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.COMPLETE, this.onGUISkin, this);

        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);

    }

	/*
	 *  GUI皮肤和背景图加载完成
	 */
    protected onGUISkin(e: egret3d.LoaderEvent3D) {
        this.queueLoader.removeEventListener(egret3d.LoaderEvent3D.COMPLETE, this.onGUISkin, this);
        this.view.backImage = this.queueLoader.getAsset("resource/background.jpg");

        this.loadProgress = new egret3d.gui.UIProgressBar();
        this.loadProgress.y = this.egret3DCanvas.height - 175;
        this.loadProgress.width = 500;
        this.loadProgress.height = 20;

        this.loadProgress.x = this.egret3DCanvas.width / 2 - this.loadProgress.width / 2;

        this.view.addGUI(this.loadProgress);

        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.COMPLETE, this.onComplete, this);
        this.queueLoader.addEventListener(egret3d.LoaderEvent3D.PROGRESS, this.onProgress, this);

        // 加载完GUI 加载其它的资源
        var resource = [
            { "title": "resource/0_Model/Esm/", "name": ["Zhouyu"], "suffix": "esm" },
            { "title": "resource/0_Model/Eam/", "name": ["attack", "idle"], "suffix": "eam" },
            { "title": "resource/0_Model/Texture/", "name": ["hero_01"], "suffix": "png" },
            { "title": "resource/", "name": ["ZJM_pvp", "ZJM_tubia1", "ZJM_tubia2", "ZJM_tubia3", , "ZJM_tubia4", "ZJM_tubia5", "ZJM_xia1", "ZJM_xia2", "ZJM_xia3", "ZJM_xia4", "ZJM_xia5"], "suffix": "png" }]

        for (let i in resource) {
            for (let j in resource[i].name) {
                let path: string = resource[i].title + resource[i].name[j] + "." + resource[i].suffix;
                this.queueLoader.load(path)
            }
        }

        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }

    protected ani: egret3d.IAnimation;
    protected onKeyDown(e: egret3d.KeyEvent3D) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.ani.play("attack");
                break;
        }
    }

    protected onComplete(e: egret3d.LoaderEvent3D) {
        this.view.removeGUI(this.loadProgress);
        var geo: egret3d.Geometry = this.queueLoader.getAsset("resource/0_Model/Esm/Zhouyu.esm");
        var clip: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/0_Model/Eam/attack.eam");
        var idleClip: egret3d.SkeletonAnimationClip = this.queueLoader.getAsset("resource/0_Model/Eam/idle.eam");
        var tex: egret3d.ITexture = this.queueLoader.getAsset("resource/0_Model/Texture/hero_01.png");

        clip.animationName = "attack";
        idleClip.animationName = "idle";
        var mesh: egret3d.Mesh = new egret3d.Mesh(geo);
        this.mesh = mesh;
        mesh.addEventListener("onMouseClick", this.interactive, this);

        clip.isLoop = false;
        idleClip.isLoop = true;
        mesh.material.diffuseTexture = tex;

        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(idleClip);
        mesh.animation.skeletonAnimationController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        this.view.addChild3D(mesh);
        mesh.animation.play(clip.animationName);
        this.ani = mesh.animation;
        this.lightGroup = new egret3d.LightGroup();
        var dirLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(1, -1, 0))
        this.lightGroup.addLight(dirLight);
        // this.createParticle()      
        this.createBitmap();
    }
    private particle: egret3d.ParticleEmitter;
    private plane: egret3d.Mesh;
    private _plane: egret3d.Mesh;
    private uvSpriteSheetMethod: egret3d.UVSpriteSheetMethod;
    private mat: egret3d.TextureMaterial;
    private loadtex: egret3d.URLLoader;
    private createParticle() {

        let mat = new egret3d.TextureMaterial();
        this.mat = mat;
        this.mat.repeat = true;
        this._plane = new egret3d.Mesh(new egret3d.PlaneGeometry(), this.mat);
        this.view.addChild3D(this._plane);
        //this.plane = new egret3d.Mesh(new egret3d.CubeGeometry(200, 200, 200), this.mat);
        //this._view.addChild3D(this.plane);
        var uvSpriteSheetMethod = new egret3d.UVSpriteSheetMethod(10, 2, 5, 3.0);

        uvSpriteSheetMethod.start(true);
        this.uvSpriteSheetMethod = uvSpriteSheetMethod;
        var loadtex = new egret3d.URLLoader();
        loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoadTexture, this);
        loadtex.load("resource/222222.png");
        this.loadtex = loadtex;
        egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    }
    private onLoadTexture(e) {
        this.mat.diffuseTexture = e.loader.data;
        this.mat.diffuseTexture.smooth = true;
        this.mat.diffusePass.addMethod(this.uvSpriteSheetMethod);
    }

    private createBitmap() {

        let _x = 20;
        let _y = 175;
        let spacing = 125;
        for (let i = 1, j = 1; i <= 11; i++) {
            let _title = "resource/ZJM_xia" + j + ".png";
            if (i <= 5) {
                _title = "resource/ZJM_tubia" + j + ".png";
                j = (j === 5) ? 0 : j
            } else if (i === 6) {
                _x = 0;
                _y = this.view.height - 200;
            } else if (i === 11) {
                _x = 20;
                _y = this.view.height - 400;
                _title = "resource/ZJM_pvp.png";
            }

            var _texture: egret.Texture = this.queueLoader.getAsset(_title)
            let b: egret3d.gui.UIPanel = new egret3d.gui.UIPanel();
            b.width = b.height = 128;
            b.setStyle("background", _texture);

            b.x = (i > 5 && i < 11) ? _x + ((j - 1) * spacing) : _x;
            b.y = (i <= 5) ? _y + ((j - 1) * spacing) : _y;
            this.view.addGUI(b);
            j++;
        }


    }

    protected interactive() {
        console.log(2222222222)
        this.mesh.animation.play("attack");
    }

    protected onAnimationComplete(e: egret3d.LoaderEvent3D) {
        this.mesh.animation.play("idle");
    }


    protected onProgress(e: egret3d.LoaderEvent3D) {
        this.loadProgress.ratio = e.currentProgress;
    }

	/**
    * 窗口尺寸变化事件
    */
    private OnWindowResize(e: egret3d.Event3D): void {
        //重置ui大小
        this.egret3DCanvas.width = window.innerWidth;
        this.egret3DCanvas.height = window.innerHeight;
        this.view.width = this.egret3DCanvas.width;
        this.view.height = this.egret3DCanvas.height;
    }

    protected update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}
