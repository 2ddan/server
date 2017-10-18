# server
    本服务器只路由服务器静态资源，不做后台html模版
    数据库采用mongodb


## • back 
    服务器相关配置与启动，数据库存放
### » boot
    项目启动目录，包括nodejs依赖模块、mongodb配置及启动、项目启动

### » db
    mongodb数据库存放目录

## • htdocs
    服务器源码

### boot
    nodejs项目启动代码及配置
### common
    后台框架代码
### static
    静态资源目录（路由根目录）

