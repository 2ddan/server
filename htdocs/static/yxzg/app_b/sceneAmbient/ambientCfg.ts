export const getSkyCfg = ()=>{
    return {
        "name" : "sce_demosky",
        "type" : "node",
        "transform" : {
            "position" : [
                0.0,
                0.0,
                0.0
            ],
            "scale"    : [
                1.0,
                1.0,
                1.0
            ],
            "rotate"   : [
                0.0,
                0.0,
                0.0
            ]
        },
        "children"  : [
            {
                "name" : "sce_demosky",
                "type" : "node",
                "transform" : {
                    "position" : [
                        0.0,
                        0.0,
                        0.0
                    ],
                    "scale"    : [
                        1.0,
                        1.0,
                        1.0
                    ],
                    "rotate"   : [
                        4.71238899230957,
                        0.0,
                        0.0
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "5kPaeiAjzsQyua7NggRGjq.geo"
                },
                "meshRender" : {
                    "material" : [
                        {
                            "type" : "MeshBasicMaterial",
                            "map"  : {
                                "generateMipmaps" : false,
                                "image"           : {
                                    "name" : "P7zGm2nbwrVdPJJKHdNidn.jpg"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    };
}

export const getStageObj = ( type: number )=>{
    let obj: any;

    switch ( type ) {
        case 1 :{
            obj     = JSON.parse( stageCfg1 );
            break;
        }
        case 2 :{
            obj     = JSON.parse( stageCfg2 );
            break;
        }
        case 3 :{
            obj     = JSON.parse( stageCfg3 );
            break;
        }
    }

    return obj;
}

export const StageCreateCfg = {
    startY: -2,
    endY: -0,
    time: 500
}

export const StageDownCfg = {
    startY: -0,
    endY: -2,
    time: 400
}

const stageCfg1  = `
        {
            "name" : "sce_demomesh01",
            "type" : "node",
            "transform" : {
                "position" : [
                0.0,
                0.0,
                0.0
                ],
                "scale"    : [
                1,1,1
                ],
                "rotate"   : [
                0.0,
                0.0,
                0.0
                ]
            },
            "children"  : [
                {
                "name" : "sce_demomesh",
                "type" : "node",
                "transform" : {
                    "position" : [
                    0.0,
                    0.0,
                    0.0
                    ],
                    "scale"    : [
                        0.4,
                        0.4,
                        0.4
                    ],
                    "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "QGNHSGXWGjjFSqm75YptUM.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshBasicMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "Wp5a6rkdKKZYdBjEWhgBQA.jpg"
                        }
                        }
                    }
                    ]
                }
                }
            ]
        }`;


const stageCfg2  = `{
            "name" : "sce_demomesh02",
            "type" : "node",
            "transform" : {
            "position" : [
                0.0,
                0.0,
                0.0
            ],
            "scale"    : [
                1.0,
                1.0,
                1.0
            ],
            "rotate"   : [
                0.0,
                0.0,
                0.0
            ]
            },
            "children"  : [
            {
                "name" : "sce_demomesh",
                "type" : "node",
                "transform" : {
                "position" : [
                    0.0,
                    0.0,
                    0.0
                ],
                "scale"    : [
                    1.0,
                    1.0,
                    1.0
                ],
                "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                ]
                },
                "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "QGNHSGXWGjjFSqm75YptUM.geo"
                },
                "meshRender" : {
                "material" : [
                    {
                    "type" : "MeshBasicMaterial",
                    "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                        "name" : "B2FHzq6yaYFFBfSdR1Zvf7.jpg"
                        }
                    }
                    }
                ]
                }
            }
            ]
        }`;

const stageCfg3  = `{
            "name" : "sce_demomesh03",
            "type" : "node",
            "transform" : {
            "position" : [
                0.0,
                0.0,
                0.0
            ],
            "scale"    : [
                1.0,
                1.0,
                1.0
            ],
            "rotate"   : [
                0.0,
                0.0,
                0.0
            ]
            },
            "children"  : [
            {
                "name" : "sce_demomesh",
                "type" : "node",
                "transform" : {
                "position" : [
                    0.0,
                    0.0,
                    0.0
                ],
                "scale"    : [
                    1.0,
                    1.0,
                    1.0
                ],
                "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                ]
                },
                "geometry"  : {
                "type" : "BufferGeometry",
                "res"  : "QGNHSGXWGjjFSqm75YptUM.geo"
                },
                "meshRender" : {
                "material" : [
                    {
                    "type" : "MeshBasicMaterial",
                    "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                        "name" : "L8YPPZG3v8NxM9NebEDTZB.jpg"
                        }
                    }
                    }
                ]
                }
            }
            ]
        }`;

