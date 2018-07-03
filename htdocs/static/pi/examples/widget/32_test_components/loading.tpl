<div>
<div on-click="click">
    点击loading
</div>



<div on-click="localClick" style="height:500px;width:500px;margin:200px auto;background-color:#fff;position:relative;">
        局部loading
        {{if it1.showLocalLoading}}
        <components-loading-loading>{text:"局部加载"}</components-loading-loading>
        {{end}}
</div>

</div>