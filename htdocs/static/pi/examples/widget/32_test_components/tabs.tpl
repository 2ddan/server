<div style="background-color: white;overflow: auto;height: 100%;" ev-tabs-change="tabsChange">
    <div style="width: 90%;margin-left: 5%;">
        -------标准页签(上)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}} } </components-tabs-tabs>
        <br></br>
        -------标准页签(右)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},position:"right" } </components-tabs-tabs>
        <br></br>
        -------标准页签(下)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},position:"bottom" } </components-tabs-tabs>
        <br></br>
        -------标准页签(左)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},position:"left" } </components-tabs-tabs>
        <br></br>
        -------选项卡页签(上)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"card" } </components-tabs-tabs>
        <br></br>
        -------选项卡页签(右)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"card",position:"right" } </components-tabs-tabs>
        <br></br>
        -------选项卡页签(下)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"card",position:"bottom" } </components-tabs-tabs>
        <br></br>
        -------选项卡页签(左)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"card",position:"left" } </components-tabs-tabs>
        <br></br>
        -------卡片化页签(上)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"border_card" } </components-tabs-tabs>
        <br></br>
        -------卡片化页签(右)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"border_card",position:"right" } </components-tabs-tabs>
        <br></br>
        -------卡片化页签(下)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"border_card",position:"bottom" } </components-tabs-tabs>
        <br></br>
        -------卡片化页签(左)--------
        <components-tabs-tabs>{list:{{it1.list}},activeNum:{{it1.activeNum}},type:"border_card",position:"left" } </components-tabs-tabs>
        <br></br>
        {{it1.show}}
    </div>
</div>