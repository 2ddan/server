- 这是wcss样式应用的示例

# 样式应用

- 在.tpl同目录下建立.wcss文件，此文件为样式表文件，其内的样式经编译后以内联样式的形式嵌入html标签中

- 在.tpl中使用wcss文件中的样式,w-class表示使用wcss样式，其使用方式和css class使用一致

-  注意，因wcss编译成内联样式，一些内联样式无法使用的特性在此也无效

比如：

伪元素 :before :after

伪类 :first-child 等等

## tpl
```html
<div w-class="color-red">
    i am blue, and top is 100px
</div>
```

## wcss
```css
.color-red{
    background-color:blue;
    margin-top:100px;
}
```