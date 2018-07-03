- 这是一个事件冒泡的示例

1. child组件绑定了点击事件并且触发了父组件的自定义事件
2. 在child页面点击时会弹出【childClick】
3. father组件定义了【ev-child-click = "childClick"】事件，并在自定义事件中触发了父组件grand的自定义事件
4. 在father页面点击child会先触发child组件的点击事件，弹出【childClick】，然后触发father组件的自定义事件【ev-child-click = "childClick"】，弹出【`i am father , i get ev-child-click event${event.value}`】
5. grand组件绑定了点击事件【on-click="grandClick"】和自定义事件【ev-child-click = "childClick"】，并包含了father组件和child组件
6. 在grand页面点击grand组件，会弹出【i am grand , i get on-click event】
7. 在grand页面点击father组件下的child,会首先触发child的click事件，弹出【childClick】，然后触发father组件的自定义事件，弹出【`i am father , i get ev-child-click event${event.value}`】，在触发grand的自定义事件，弹出【'i am grand , i get ev-child-click event'】，最后通过事件冒泡触发grand本身的点击事件，弹出【i am grand , i get on-click event】
8. 在grand页面点击child组件，首先触发child的click事件，弹出【childClick】，然后触发grand组件的自定义事件，弹出【'i am grand , i get ev-child-click event'】，最后通过事件冒泡触发grand本身的点击事件，弹出【i am grand , i get on-click event】




# [on-事件名] 以事件冒泡形式触发