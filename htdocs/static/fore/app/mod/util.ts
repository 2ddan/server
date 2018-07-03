// 游戏修正时间，减0小时,//28800
import { Pi } from "app/mod/pi";
import { getSeverTime } from "pi/ui/con_mgr";

export class Util {
    /**
     * 获得服务器时间
     * @param secound 转化成秒
     */
    static serverTime(secound?: Boolean) {
        return Math.round(getSeverTime() / (secound ? 1000 : 1));
    };

    /**
     * 比较两个时间的日期(对齐到天)大小
     */
    static campareDay(time1, time2) {
        return (new Date(time1).setHours(0, 0, 0, 0) - new Date(time2).setHours(0, 0, 0, 0));
    };

    /**
     * 计算一段时间内恢复数量
     * @param interval 恢复间隔
     * @param maxCount 最大值
     * @param oldSecond 开始时间
     * @param nowSecond 结束时间(不传则为当前服务器时间)
     */
    static calc_count(interval, maxCount, oldSecond, nowSecond?): any {
        nowSecond = (nowSecond || Util.serverTime(true)) - oldSecond;
        if (nowSecond < 0) {
            return { count: 0, surplusTime: interval };
        }
        let _count = Math.floor(nowSecond / interval);
        return (_count >= maxCount) ? { count: maxCount, surplusTime: 0 } : { count: _count, surplusTime: interval + _count * interval - nowSecond };
    };

    /**
     * 时间按格式输出
     * @param seconds 时间秒数
     * @param form 返回的格式 "x天x时x分x秒", "x:x:x", "x天x:x:x" ,"x:x"
     * @param full 是否用0填充, 输出"00:00:20"
     */
    static dateForm(seconds, form, full?: Boolean) {
        let key = form.split("x");
        let num = [parseInt(seconds), 86400, 3600, 60, 1]
        let res = "";
        while (key.length > 1 && (seconds || full)) {
            let temp = seconds % (key.length > 2 ? num[num.length - 2] : num[0] + 1) / num[num.length - 1]; //num[0]+1 表示取余的结果是原值
            res = (temp < 10 ? "0" + temp : temp) + key[key.length - 1] + res;
            seconds = seconds - seconds % num[num.length - 2];
            key.pop();
            num.pop();
        }
        return res;
    };

    /**
     * 返回时间点的 [年,月,日,时,分,秒,星期(星期日为7)]
     * @param time 时间 (毫秒) 
     */
    static arrDate(time) {
        let date = new Date(time);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getDay() || 7];
    };
    /**
     * 计算两个时间相差几天(未满算1)
     * @param nowTime 
     * @param oldTime 
     */
    static getDaysTo(nowTime, oldTime) {
        return this.campareDay(nowTime, oldTime) / (24 * 3600 * 1000) + 1;
    };
    //将时间转化为日时分秒的数组（时间间隔而非时间点）
    static getIntervalDate(seconds) {
        let day, hour, minute, second, duration = "";
        day = Math.floor(seconds / (24 * 60 * 60));
        hour = Math.floor((seconds - day * 24 * 60 * 60) / (60 * 60));
        minute = Math.floor((seconds - (hour * 60 * 60 + day * 24 * 60 * 60)) / 60);
        second = seconds % 60;
        return [day, hour, minute, second, duration];
    };


    /* 时间格式化 */
    static getMinute(warm: Object) {
        alert("请使用  dateForm()  方法");
        console.log("请使用  dateForm()  方法");
    };
    static getDuration(warm: Object) {
        alert("请使用  dateForm()  方法");
        console.log("请使用  dateForm()  方法");
    };
    static getDurationEx(warm: Object) {
        alert("请使用  dateForm()  方法");
        console.log("请使用  dateForm()  方法");
    }
    /* 获取服务器时间 */
    static serverMillisecond(warm: Object) {
        alert("请使用  serverTime()  方法");
        console.log("请使用  serverTime()  方法");
    };
    static serverSecond(warm: Object) {
        alert("请使用  serverTime()  方法");
        console.log("请使用  serverTime()  方法");
    };
    /* 数组格式时间 */
    static getTheDate(warm: Object) {
        alert("请使用  arrDate()  方法");
        console.log("请使用  arrDate()  方法");
    }
};
