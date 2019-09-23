# 粒子系统支持Unity的字段

最新版本：Unity 5.6.0f3

## 主模块

* During               支持
* Looping              支持
* Prewarm              不支持
* Start Delay          支持
* Start Lifetime       支持
* Start Speed          支持
* 3D Start Size        支持
* Start Size           支持
* 3D Start Rotation    支持
* Start Rotation       支持
* Randomize Rotation   支持
* Start Color          支持
* Gravity Modifier     支持
* Simulation Space     只支持Local
* Simulation Speed     支持
* Scaling Mode         不支持
* Play On Awake        不支持
* Max Particles        支持
* Auto Ramdom Speed    不支持

## Emission

* Rate over Time       支持
* Rate over Distance   不支持
* Bursts               支持

## Shape

Shape 目前实现了 Box Sphere Hemisphere Cone 4种类型

* Box           长方体：体，面，边
* Sphere        球：体，面
* Hemisphere    半球：体，面
* Cone          注意Arc只支持Random，圆柱，圆锥，柱面，锥面

## Velocity over Lifetime

x,y,z           支持
Space           只支持World

## Limit Velocity over Lifetime

全部支持

## Inherit Velocity

* 不支持所有属性

## Force over Lifetime

x, y, z           支持
Space             只支持World
Randomize         不支持

## Color over Lifetime

Color             支持

## Color by Speed

Color             支持
Speed Range       支持

## Size over Lifetime

Separate Axes     支持
size              支持

## Size by Speed

Separate Axes     支持
size              支持
Speed Range       支持

## Rotation over Lifetime

Separate Axes     支持
Angular Velocity  支持

## Rotation by Speed

Separate Axes     支持
Angular Velocity  支持
Speed Range       支持

## External Forces

* 不支持所有属性

## Noise

* 不支持所有属性

## Collision

* 不支持所有属性

## Triggers

* 不支持所有属性

## Sub Emitters

* 不支持所有属性

## Texture Sheet Animation

* Tiles                支持
* Animation            支持
* Frame over Time      支持
* Start Frame          支持
* Cycles               支持
* Flip U              不支持
* Flip V              不支持
* Enable UV Channels  不支持

## Lights

* 不支持所有属性

## Trails

* 不支持所有属性

## Custom Data

* 不支持所有属性

## Renderer

* Render Mode   只支持Mesh
* Material      支持
* 其他          不支持