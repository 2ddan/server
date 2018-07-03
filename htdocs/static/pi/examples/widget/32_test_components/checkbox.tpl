<div style="background-color: white">
    --------基础文本框------
    <components-checkbox-checkbox>{type:"true",text:"选中"}</components-checkbox-checkbox>
    <components-checkbox-checkbox>{type:"false",text:"未选中"}</components-checkbox-checkbox>
    <components-checkbox-checkbox>{type:"indeterminate",text:"全选"}</components-checkbox-checkbox>
    <components-checkbox-checkbox>{type:"disabled",text:"禁用"}</components-checkbox-checkbox>
    -------标准文本框组-------
    <components-checkbox-checkboxGroup>{list:[{type:"true",text:"选中"},{type:"disabled",text:"禁用"}]}</components-checkbox-checkboxGroup>
    -------含全选的文本框组-------
    <components-checkbox-checkboxGroup>{chooseAll:"全选",list:[ {type:"true",text:"选中"},{type:"false",text:"未选中"} ,{type:"true",text:"选中"},{type:"false",text:"未选中"}
        ,{type:"true",text:"选中"},{type:"false",text:"未选中"},{type:"disabled",text:"禁用"}]}
    </components-checkbox-checkboxGroup>
    ------含数量控制的文本框组--------
    <components-checkbox-checkboxGroup>{list:[ {type:"true",text:"选中"},{type:"false",text:"未选中"} ,{type:"true",text:"选中"},{type:"false",text:"未选中"}
        ,{type:"true",text:"选中"},{type:"false",text:"未选中"},{type:"disabled",text:"禁用"}],min:2,max:4}
    </components-checkbox-checkboxGroup>

</div>