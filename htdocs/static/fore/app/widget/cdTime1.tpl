{{% cd_time 表示倒计时的时间点，可以是时间点的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒。}}
{{% now_time 使用时间不是本地时间,请传，表示现在时间，可以是时间点的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒}}
{{% cd_interval属性，表示倒计时的计时频率，单位毫秒，默认1000}}
{{% cd_not_zerofill，表示是否不补零,默认补零.}}
{{% cd_type 输出的倒计时的样式 返回的格式 "x天x时x分x秒", "x:x:x", "x天x:x:x" ,"x:x" 这里默认为00:00:00}}
{{% full 是否用0填充空位}}

{{let Util = _get("app/mod/util").exports.Util}}
{{let seconds = it.cdInfo.second * 1 + it.cdInfo.minute * 60 + it.cdInfo.hour * 60 * 60 + it.cdInfo.date * 24 * 60 *60}}
{{let type = it.cd_type || 'x:x:x'}}
{{let full = it.full || 0}}


<div>{{Util.dateForm(seconds,type,full) || "00"}}</div>