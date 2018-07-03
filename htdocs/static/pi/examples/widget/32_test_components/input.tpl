<div style="background-color: white;padding:8px;">
    <h3>基本用法</h3>
    <components-input-input>{}</components-input-input>
    <components-input-input>{input:{{it1.count}}}</components-input-input>
    <div on-click="click">点击</div>
    <components-input-input>{placeHolder:"这是提示内容"}</components-input-input>
    <components-input-input>{input:"这是初始内容",placeHolder:"这是提示内容"}</components-input-input>
    <h3>禁用状态</h3>
    <components-input-input>{disabled:true}</components-input-input>
    <h3>可清空</h3>
    <components-input-input>{clearable:true}</components-input-input>
    <h3>文本域</h3>
    <components-input-input>{type:"textarea"}</components-input-input>
    <components-input-input>{type:"textarea",disabled:true,rows:3}</components-input-input>
    <h3>自适应高度文本域</h3>
    <components-input-input>{type:"textarea",autosize:true}</components-input-input>
    <h3>复合型输入框</h3>
    <components-input-input>{prepend:"http://"}</components-input-input>
    <p></p>
    <components-input-input>{append:".com",clearable:true}</components-input-input>
</div>