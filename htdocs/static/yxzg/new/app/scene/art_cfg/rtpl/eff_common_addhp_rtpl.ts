/**
 * eff_common_addhp_rtpl
 */
export const eff_common_addhp_rtpl = (it: any) => {
    return {
        "name" : "eff_common_addhp",
        "type" : "node",
        "transform" : {
            "position" : it.position?[it.position[0], it.position[1], it.position[2]] : [0, 0, 0],
            "scale"    : it.scale?[it.scale[0], it.scale[1], it.scale[2]] : [1, 1, 1],
            "rotate"   : it.rotate?[it.rotate[0], it.rotate[1], it.rotate[2]] : [0, 0, 0]
        },
        "animator"  : {
          "controller" : {
            "eff_common_addhp" : "SBeNbKKXB6EJiNAG5sqZbA.ai"
          },
          "aniBox"     : {
            "eff_common_addhp" : {
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
            "name" : "dm",
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
                "name" : "dm01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    3.0,
                    3.0,
                    3.0
                  ],
                  "rotate"   : [
                    1.57079637050629,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "T3QPCmAF7NmGTNhccsqxCJ.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "QYmxboL62qwhVfKWwWSrdU.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
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
                "name" : "dm01_2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0500000007450581,
                    0.0
                  ],
                  "scale"    : [
                    2.0,
                    2.0,
                    2.0
                  ],
                  "rotate"   : [
                    1.57079637050629,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "T3QPCmAF7NmGTNhccsqxCJ.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "4afWRUysxS92yZGdPFMnQ3.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.503000020980835,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "tx_bowen_1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.219999998807907,
                    0.100000001490116,
                    0.0
                  ],
                  "scale"    : [
                    1.0,
                    1.0,
                    2.0
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6tzEBkxjxWZCaxDaexMh7P.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "repeat" : [
                          1.0,
                          2.0
                        ],
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "DHgBpUiknETgJa9kC2kbYd.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "layer"        : 3000
                    }
                  ]
                }
              },
              {
                "name" : "trail_03",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.170000076293945,
                    0.879999995231628,
                    0.140000000596046
                  ],
                  "scale"    : [
                    1.0,
                    1.00000047683716,
                    0.5
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    5.48382472991943,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "LX7zpUTrJsSKXJFm8EKYHv.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_04",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.0299999993294477,
                    1.22000002861023,
                    0.140000000596046
                  ],
                  "scale"    : [
                    0.800000011920929,
                    0.800000011920929,
                    0.699999988079071
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    1.74532926082611,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "LX7zpUTrJsSKXJFm8EKYHv.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_di1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.170000001788139,
                    -0.0900000035762787,
                    0.140000000596046
                  ],
                  "scale"    : [
                    1.39999997615814,
                    1.39999997615814,
                    0.5
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    1.74532926082611,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "LX7zpUTrJsSKXJFm8EKYHv.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.5,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_02",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0599999986588955,
                    0.150000005960464,
                    0.140000000596046
                  ],
                  "scale"    : [
                    2.5,
                    2.5,
                    1.00000047683716
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    5.41052103042603,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "YSZXNQRy3hWhf33vYL17Qn.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 201,
                      "side"         : 2,
                      "tintColor"    : 8355711,
                      "tintOpacity"  : 0.5,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.100000001490116,
                    -2.66000008583069,
                    0.349999994039536
                  ],
                  "scale"    : [
                    4.5,
                    5.0,
                    10.0
                  ],
                  "rotate"   : [
                    0.0,
                    1.57079637050629,
                    4.71238899230957
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "XLWF8MGEXxzSEiBX6SH3J.geo"
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
                      "tintOpacity"  : 0.5,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "glow_02",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.100000001490116,
                    1.24000000953674,
                    0.449999988079071
                  ],
                  "scale"    : [
                    10.0,
                    6.0,
                    4.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    1.57079637050629
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "2AEFUTEoeyCdQPQyVh1SMh.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "4afWRUysxS92yZGdPFMnQ3.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 201,
                      "side"        : 2,
                      "tintColor"   : 8355711,
                      "tintOpacity" : 0.503000020980835,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_1",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.150000005960464,
                    -0.230000004172325,
                    0.600000023841858
                  ],
                  "scale"    : [
                    5.0,
                    5.0,
                    5.0
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    4.88692188262939,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "H5KdUpXoyrwvtahSDaQdyF.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 201,
                      "side"         : 2,
                      "tintColor"    : 8355711,
                      "tintOpacity"  : 0.5,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              },
              {
                "name" : "trail_1_2",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.209999993443489,
                    -0.230000004172325,
                    0.5
                  ],
                  "scale"    : [
                    6.0,
                    1.00000047683716,
                    6.0
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    3.14159274101257,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "H5KdUpXoyrwvtahSDaQdyF.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "filter" : [
                          1006,
                          1007
                        ],
                        "generateMipmaps" : true,
                        "image"           : {
                          "name" : "5UCFUJTbZqpHdHrLVRgfh1.png"
                        }
                      },
                      "vertexColors" : 2,
                      "transparent"  : true,
                      "blendSrc"     : 204,
                      "blendDst"     : 201,
                      "side"         : 2,
                      "tintColor"    : 8355711,
                      "tintOpacity"  : 0.5,
                      "layer"        : 3000,
                      "blending"     : 5
                    }
                  ]
                }
              }
            ]
          },
          {
            "name" : "xs",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.300000011920929,
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
                "name" : "xs01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    0.0
                  ],
                  "scale"    : [
                    0.600000023841858,
                    0.600000023841858,
                    0.600000023841858
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "9jSGMvwCpVZ291b5tD3EWi.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "xs02",
                "type" : "node",
                "transform" : {
                  "position" : [
                    1.83000004291534,
                    0.0,
                    1.12000000476837
                  ],
                  "scale"    : [
                    0.699999988079071,
                    0.699999988079071,
                    0.699999988079071
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "9jSGMvwCpVZ291b5tD3EWi.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "xs03",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.75999999046326,
                    0.0,
                    0.860000014305115
                  ],
                  "scale"    : [
                    0.800000011920929,
                    0.800000011920929,
                    0.800000011920929
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "9jSGMvwCpVZ291b5tD3EWi.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "xs04",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.21000003814697,
                    0.0,
                    -1.94000005722046
                  ],
                  "scale"    : [
                    0.600000023841858,
                    0.600000023841858,
                    0.600000023841858
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "9jSGMvwCpVZ291b5tD3EWi.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "xs05",
                "type" : "node",
                "transform" : {
                  "position" : [
                    1.26999998092651,
                    0.0,
                    -2.11999988555908
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
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "9jSGMvwCpVZ291b5tD3EWi.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              }
            ]
          },
          {
            "name" : "xian",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                0.300000011920929,
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
                "name" : "x01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    1.17999994754791
                  ],
                  "scale"    : [
                    1.0,
                    0.920000016689301,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "x02",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -0.910000026226044,
                    0.0,
                    -1.83000004291534
                  ],
                  "scale"    : [
                    1.0,
                    1.29999995231628,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "x03",
                "type" : "node",
                "transform" : {
                  "position" : [
                    1.70000004768372,
                    0.0,
                    0.280000001192093
                  ],
                  "scale"    : [
                    1.0,
                    1.14999997615814,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "x04",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.699999988079071,
                    0.0,
                    1.38999998569489
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
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "x05",
                "type" : "node",
                "transform" : {
                  "position" : [
                    1.5900000333786,
                    0.0,
                    -1.69000005722046
                  ],
                  "scale"    : [
                    1.0,
                    1.19000005722046,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
                      "tintOpacity" : 0.0,
                      "layer"       : 3000,
                      "blending"    : 5
                    }
                  ]
                }
              },
              {
                "name" : "x06",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -1.97000002861023,
                    0.0,
                    -1.69000005722046
                  ],
                  "scale"    : [
                    1.0,
                    1.41999995708466,
                    1.0
                  ],
                  "rotate"   : [
                    0.0,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "6K1JWM8xGBJ6kPwQfUWeUU.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshParticlesMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "3NwSWcecnjaWzKs7cb1WQC.png"
                        }
                      },
                      "transparent" : true,
                      "blendSrc"    : 204,
                      "blendDst"    : 205,
                      "side"        : 2,
                      "tintColor"   : 8421504,
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