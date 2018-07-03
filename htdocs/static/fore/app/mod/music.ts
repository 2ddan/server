//导入模块
import { Mgr, getContext } from "pi/util/sound";
import { setEvents } from "pi/ui/root";
import { Pi } from "app/mod/pi";
import { hiddenTable } from "app/mod/hidden";

hiddenTable.addHandler('hidden', function (arg):any {
    let ua = navigator.userAgent.toLowerCase();
    // if (/iphone|ipad|ipod/.test(ua)) {
    //     //alert("iphone");		
    // } else if (/android/.test(ua)) {
    //     alert("android");
    // }
    if (arg) {
        let key = Object.keys(mgrObj);
        key.forEach((k) => {
            Music.destorySoundObj(k);
        })
    } else {
        let key = Object.keys(mgrObj);
        key.forEach((k) => {
            Music.getSoundObj(k);
        });
        if (!musicState.bgMusic) {
            mgrObj.mgr_bg.play(`${cfg.src}wild_bg.mp3`, cfg.delay, cfg.repeat);
        }
    }
})

const cfg = {
    //音乐资源路径
    'src': "app/music_src/",
    //加载后延迟秒数
    'delay': 0,
    //背景音乐循环次数
    'repeat': 100,
    //循环延迟秒数
    'repeatDelay': 0,
    //记录当前播放的背景音乐的名字
    'bg_name': ''
}

//是否屏蔽音效 和 背景音乐状态  true -> 屏蔽
let musicState = {
    "bgMusic": false,
    "btnMusic": false
}

//保存创建的所有声音控制器
let mgrObj = {
    //游戏背景音乐控件
    mgr_bg: new Mgr(),
    //按钮点击音效
    mgr_btn: new Mgr(),
    //模型说话
    mgr_speaker: new Mgr()
};


//设置声音大小 
mgrObj.mgr_bg.setVolume(0.5);

export const changeMusicState = function (key, state) {
    musicState[key] = state;
    if (key == "bgMusic") {
        if (state) {
            mgrObj.mgr_bg.stop();
        } else {
            mgrObj.mgr_bg.play(`${cfg.src}wild_bg.mp3`, cfg.delay, cfg.repeat);
        }
    }
}

export class Music {
    //播放背景音乐 (名字)
    static playBgMusci(name) {
        if (!mgrObj.mgr_bg) {
            return;
        }
        if (Pi.localStorage["bgMusic"] || musicState.bgMusic) {
            return;
        }
        if (cfg.bg_name != name) {
            mgrObj.mgr_bg.stop();
            cfg.bg_name = name;
            mgrObj.mgr_bg.play(`${cfg.src}${name}.mp3`, cfg.delay, cfg.repeat);
        }
    }
    //点击按钮发声
    static clickSound(name) {
        if (!mgrObj.mgr_btn) {
            return;
        }
        if (!musicState.btnMusic) {
            mgrObj.mgr_btn.play(`${cfg.src}${name}.mp3`);
        }
    }
    //技能发声
    static skillSound(name, delay?) {
        if (!mgrObj.mgr_btn) {
            return;
        }
        if (!musicState.btnMusic) {
            mgrObj.mgr_btn.play(`${cfg.src}${name}.mp3`, delay);
        }
    }
    //获取声音控制器
    static getSoundObj(key) {
        if (!mgrObj[key]) {
            mgrObj[key] = new Mgr();
        }
        return key;
    }
    //销毁某声音控制器
    static destorySoundObj(key) {
        if (mgrObj[key]) {
            mgrObj[key].stop();
            mgrObj[key] = null;
        }
    }
    //模型说话
    static roleSound(name, delay?) {
        if (!mgrObj.mgr_speaker) {
            return;
        }
        mgrObj.mgr_speaker.stop();
        mgrObj.mgr_speaker.play(`${cfg.src}${name}.mp3`, delay);
    }
    //其他声音
    static otherSpeak(key, name, delay?) {
        if (mgrObj[key]) {
            mgrObj[key].play(`${cfg.src}${name}.mp3`, delay);
        }
    }
};


/**
 * @description 兼容ios声音自动播放
 */
if (Pi.flags && Pi.flags.os.name === "ios") {
    let fixCount = 0,
        fixIosSound = (ev) => {
            try {
                iphoneM();
            } catch (e) {
                alert(e);
            }
            fixCount += 1;
            if (fixCount == 5) {
                setEvents("touchStart", null);
            }
        };
    setEvents("touchStart", fixIosSound);
}

let context = getContext();

//创建一个极小极短的声音[解决iphone必须手动触发问题]
const iphoneM = function () {
    let oscillator = context.createOscillator();
    let gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    // 指定音调的类型
    oscillator.type = 'sine';
    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = 196.00;
    // 当前时间设置音量为0
    gainNode.gain.setValueAtTime(0, context.currentTime);
    // 0.01秒后音量为1
    gainNode.gain.linearRampToValueAtTime(0.001, context.currentTime + 0.1);
    // 音调从当前时间开始播放
    oscillator.start(context.currentTime);
    // 1秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.1);
    // 1秒后完全停止声音
    oscillator.stop(context.currentTime + 0.1);
    gainNode.disconnect();
}

