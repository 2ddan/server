/**
 * eff_common_gedangright02_rtpl
 */
export const eff_common_gedangright02_rtpl = (it: any) => {
    return {
        "name" : "eff_common_gedangright02 ",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
            "controller" : {
            "eff_common_gedangright02" : "PNxRPCLdQ5LgqRRxVvD9a1.ai"
            },
            "aniBox"     : {
            "eff_common_gedangright02" : {
                "center" : [
                0.0,
                0.0,
                0.0
                ],
                "size"   : [
                1.0,
                1.0,
                1.0
                ]
            }
            },
            "playAnim"   : it.playAnim?it.playAnim:null
        },
        "children"  : [
            {
            "name" : "eff_common_gedangright02 ",
            "type" : "node",
            "transform" : {
                "position" : [
                0.0,
                0.166999995708466,
                0.870000004768372
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
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -1.1399998664856,
                    1.60000002384186,
                    -0.360000014305115
                    ],
                    "scale"    : [
                    2.8360698223114,
                    2.54000091552734,
                    2.79029083251953
                    ],
                    "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "CK4yXrFZtFnuJe2q5g5Gk8.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "YafrVZua8UbCqG8wfhTDdF.png"
                        }
                        },
                        "vertexColors" : 2,
                        "transparent"  : true,
                        "blendSrc"     : 204,
                        "blendDst"     : 201,
                        "side"         : 2,
                        "tintColor"    : 8355711,
                        "tintOpacity"  : 0.0,
                        "layer"        : 3000,
                        "blending"     : 5
                    }
                    ]
                }
                },
                {
                "name" : "ray",
                "type" : "node",
                "transform" : {
                    "position" : [
                    1.50999999046326,
                    1.79999995231628,
                    -0.0299999993294477
                    ],
                    "scale"    : [
                    14.0,
                    14.0,
                    14.0
                    ],
                    "rotate"   : [
                    0.0,
                    4.57573366165161,
                    0.0
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "AySkAczvaLfHEnPcpTKoEC.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "wrap" : [
                            1001,
                            1001
                        ],
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "BBqAbJYgCU3LttbtPaFj9p.png"
                        }
                        },
                        "vertexColors" : 2,
                        "transparent"  : true,
                        "blendSrc"     : 204,
                        "blendDst"     : 201,
                        "side"         : 2,
                        "tintColor"    : 8355711,
                        "tintOpacity"  : 0.0,
                        "layer"        : 3000,
                        "blending"     : 5
                    }
                    ]
                }
                },
                {
                "name" : "glow2",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -1.1399998664856,
                    1.59999990463257,
                    -0.360000014305115
                    ],
                    "scale"    : [
                    2.8360698223114,
                    2.54000091552734,
                    2.79029083251953
                    ],
                    "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "CK4yXrFZtFnuJe2q5g5Gk8.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "wrap" : [
                            1001,
                            1001
                        ],
                        "filter" : [
                            1006,
                            1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                            "name" : "XN7qu6zc7kVUzoaRjNHh15.png"
                        }
                        },
                        "vertexColors" : 2,
                        "transparent"  : true,
                        "blendSrc"     : 204,
                        "blendDst"     : 201,
                        "side"         : 2,
                        "tintColor"    : 8355711,
                        "tintOpacity"  : 0.0,
                        "layer"        : 3000,
                        "blending"     : 5
                    }
                    ]
                }
                },
                {
                "name" : "tx_dun_sui",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -0.980000019073486,
                    1.69000005722046,
                    0.0
                    ],
                    "scale"    : [
                    1.10000002384186,
                    1.10000002384186,
                    1.10000002384186
                    ],
                    "rotate"   : [
                    0.0,
                    1.57079637050629,
                    4.71238899230957
                    ]
                },
                "children"  : [
                    {
                    "name" : "tx_dun_01",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "TBn3XrHsdA8XWdn5AwP5x3.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui002",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "AXR5ESsRjrmRMqxUSxkEVV.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui003",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "7Y19i6p6Zso7K7ojEFXfJ3.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui004",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "XqcAPHKCzNaKb7mmC3dZUV.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui005",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "9eAA82YQ6C14bUhpbFxLCN.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui006",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "MiXxf4NDrQ1KrFTcwAkem8.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui007",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "6rD6ZT9g5WxqiaAyoaYyqd.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui008",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "UTHZDepq86m9A1SgN7FfRt.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui009",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "JF2Tgx3iKAtjSRFo8kaFM1.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui010",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "RqX8t8u17TTJVVNMKSS87M.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui011",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "Ao9w3m2tnJmR353eiBhGdD.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui012",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "FT4E7uCcn4kYbNPtfzNEhj.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui013",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "3sxBApYZu932yzVBeNnmRW.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui014",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "7mfjEGPxx3m1LcpPMQc7VX.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui015",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "VNCtcvnuC4sWy7zFMA9pr9.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui016",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "EBjn7wVn65XGuNvRSniFqN.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    },
                    {
                    "name" : "sui017",
                    "type" : "node",
                    "transform" : {
                        "position" : [
                        0.0,
                        2.28881830821592E-07,
                        -0.0894142389297485
                        ],
                        "scale"    : [
                        2.53999996185303,
                        2.53999996185303,
                        2.53999996185303
                        ],
                        "rotate"   : [
                        0.0,
                        4.71238899230957,
                        0.0
                        ]
                    },
                    "geometry"  : {
                        "type" : "BufferGeometry",
                        "res"  : "S4t2u3BoN7HFYbJcodpgdX.geo"
                    },
                    "meshRender" : {
                        "material" : [
                        {
                            "type" : "MeshParticlesMaterial",
                            "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                                "name" : "KGMqvGQySzDhRpdEok5w2s.png"
                            }
                            },
                            "vertexColors" : 2,
                            "transparent"  : true,
                            "blendSrc"     : 204,
                            "blendDst"     : 201,
                            "side"         : 2,
                            "tintColor"    : 8355711,
                            "tintOpacity"  : 0.0,
                            "layer"        : 3000,
                            "blending"     : 5
                        }
                        ]
                    }
                    }
                ]
                },
                {
                "name" : "hit2",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -0.978999972343445,
                    3.7260000705719,
                    0.0
                    ],
                    "scale"    : [
                    1.0,
                    4.0,
                    1.0
                    ],
                    "rotate"   : [
                    0.0,
                    0.0,
                    1.07616996765137
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "KG8ijFpXyoPp5cgL5fFtwB.png"
                        }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 201,
                        "side"        : 2,
                        "tintColor"   : 8355711,
                        "tintOpacity" : 0.0,
                        "layer"       : 3000,
                        "blending"    : 5
                    }
                    ]
                }
                },
                {
                "name" : "hit3",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -0.720000028610229,
                    0.419999986886978,
                    0.0
                    ],
                    "scale"    : [
                    1.0,
                    4.0,
                    1.0
                    ],
                    "rotate"   : [
                    0.0,
                    0.0,
                    1.88495552539825
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "KG8ijFpXyoPp5cgL5fFtwB.png"
                        }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 201,
                        "side"        : 2,
                        "tintColor"   : 8355711,
                        "tintOpacity" : 0.0,
                        "layer"       : 3000,
                        "blending"    : 5
                    }
                    ]
                }
                },
                {
                "name" : "hit4",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -0.202999994158745,
                    3.21000003814697,
                    0.170000001788139
                    ],
                    "scale"    : [
                    2.0,
                    8.0,
                    1.0
                    ],
                    "rotate"   : [
                    0.0,
                    0.0,
                    1.04388129711151
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "ABnghH9EBHe2NJMSG9Cvoh.png"
                        }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 201,
                        "side"        : 2,
                        "tintColor"   : 8355711,
                        "tintOpacity" : 0.0,
                        "layer"       : 3000,
                        "blending"    : 5
                    }
                    ]
                }
                },
                {
                "name" : "hit5",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -0.203000068664551,
                    1.85899996757507,
                    0.169999957084656
                    ],
                    "scale"    : [
                    3.0,
                    5.0,
                    1.0
                    ],
                    "rotate"   : [
                    0.0,
                    0.0,
                    1.57079637050629
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "ABnghH9EBHe2NJMSG9Cvoh.png"
                        }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 201,
                        "side"        : 2,
                        "tintColor"   : 8355711,
                        "tintOpacity" : 0.0,
                        "layer"       : 3000,
                        "blending"    : 5
                    }
                    ]
                }
                },
                {
                "name" : "hit1",
                "type" : "node",
                "transform" : {
                    "position" : [
                    -1.88999998569489,
                    1.90600001811981,
                    0.0
                    ],
                    "scale"    : [
                    2.0,
                    6.0,
                    1.0
                    ],
                    "rotate"   : [
                    0.0,
                    0.0,
                    1.56887626647949
                    ]
                },
                "geometry"  : {
                    "type" : "BufferGeometry",
                    "res"  : "4RCTz8EDoKEFg52ZCCudfL.geo"
                },
                "meshRender" : {
                    "material" : [
                    {
                        "type" : "MeshParticlesMaterial",
                        "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                            "name" : "KG8ijFpXyoPp5cgL5fFtwB.png"
                        }
                        },
                        "transparent" : true,
                        "blendSrc"    : 204,
                        "blendDst"    : 201,
                        "side"        : 2,
                        "tintColor"   : 8355711,
                        "tintOpacity" : 0.0,
                        "layer"       : 3000,
                        "blending"    : 5
                    }
                    ]
                }
                }
            ]
            }
        ]
    };
}