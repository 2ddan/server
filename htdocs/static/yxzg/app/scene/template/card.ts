export class Ui_Card{
    constructor(it:any){
        this.meshRender.material.map.image.name = it.image;
        this.geometry.width = it.width;
        this.geometry.height = it.height;
        this.geometry.horizontalAlign = it.horizontalAlign || "left";
        this.geometry.verticalAlign = it.verticalAlign || "top";
        this.meshRender.material.transparent = it.transparent || false;
        this.children[0].textCon.show = it.energy.toString();
        this.children[1].textCon.show = it.title;
        this.children[1].textCon.textcfg.text = it.title;
        this.children[2].textCon.show = it.type;
        this.rayID = `playCard-${it.index}`;
        if(it.position){
            this.transform.position = it.position.slice();
        }
        if(it.scale){
            this.transform.scale = it.scale.slice();
        }
    }
    name = "2dimage"
    type = "node"
    transform = {
        position : [0,0,0],
        scale    : [1,1,1],
        rotate   : [0,0,0]
    }
    attachment = "2D"
    geometry = {
        type:"Plane", 
        width:0, 
        height:0,
        horizontalAlign:'left',
        verticalAlign:'top'
    }
    meshRender = {
        material:{
            map:{image:{name:"" }},
            transparent: false
        }
    }
    rayID:any = 0
    children = [
        {
            "transform" : {
                "position" : [-2,0,0],
                "scale"    : [1,1,1],
                "rotate"   : [0,0,0]
              },
              "name":"2dtext",
              "type" : "node",
              "attachment":"2D",
              "textCon":{
                  "opacity": 1,
                  "transparent": true,
                  "show":"0",
                  "horizontalAlign":"left",
                  "verticalAlign":"top",
                  "textcfg":{
                        "font": "normal 400 28px mnjsh",
                        "color": "#ffffff",
                        "isPowerOfTwo": true,
                        "hfactor": 1.8,
                        "textAlign":"center",
                        "text": "0123456789",
                        "strokeWidth": 1,
                        "strokeColor": "rgb(27,13,8)"
                    }
              }
        },
        {
            "transform" : {
                "position" : [-75,0,0],
                "scale"    : [1,1,1],
                "rotate"   : [0,0,0]
              },
              "name":"2dtext",
              "type" : "node",
              "attachment":"2D",
              "textCon":{
                  "opacity": 1,
                  "transparent": true,
                  "show":"0",
                  "horizontalAlign":"center",
                  "verticalAlign":"top",
                  "textcfg":{
                        "font": "normal 400 16px mnjsh",
                        "color": "#ffffff",
                        "width" : 256,
                        "isPowerOfTwo": true,
                        "hfactor": 1.8,
                        "textAlign":"center",
                        "text": "0123456789",
                        "zoomfactor" : 1,
                        "strokeWidth": 1,
                        "strokeColor": "rgb(27,13,8)"
                    }
            }
        },
        {
            "transform" : {
                "position" : [-75,-110,0],
                "scale"    : [1,1,1],
                "rotate"   : [0,0,0]
              },
              "name":"2dtext",
              "type" : "node",
              "attachment":"2D",
              "textCon":{
                  "opacity": 1,
                  "transparent": true,
                  "show":"0",
                  "horizontalAlign":"center",
                  "verticalAlign":"top",
                  "textcfg":{
                        "font": "normal 400 16px mnjsh",
                        "color": "#ffffff",
                        "width" : 256,
                        "isPowerOfTwo": true,
                        "hfactor": 1.8,
                        "textAlign":"center",
                        "zoomfactor" : 1,
                        "text": "攻击技能力状态",
                        "strokeWidth": 1,
                        "strokeColor": "rgb(27,13,8)"
                    }
            }
        }
    ]
};
