/**
 * 环境配置json
 */
export const ambientJson = {
    /**
     * 地图
     */
    "map": () => {
        return {
            "name" : "sce_map01",
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
                "name" : "mesh_map01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    0.0,
                    4.40000009536743
                  ],
                  "scale"    : [
                    3.0,
                    3.0,
                    3.0
                  ],
                  "rotate"   : [
                    4.71238899230957,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "QY2AFLzA1S7naV9WF96xSr.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "Hof1LsqCETn7pUDYQ19X2p.jpg"
                        }
                      }
                    }
                  ]
                }
              }
            ]
        };
    },
    /**
     * 战斗
     */
    "fight": () => {
        return {
            "name" : "sce_warmap01",
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
            "animator"  : {
              "controller" : {
                "sce_warmap01" : "G6F6zQSWgMvZjrmQ5vEpRb.ai"
              },
              "aniBox"     : {
                "sce_warmap01" : {
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
              "playAnim"   : {
                "name" : "sce_warmap01"
              }
            },
            "children"  : [
              {
                "name" : "mesh_wm01bg",
                "type" : "node",
                "transform" : {
                  "position" : [
                    0.0,
                    -3.63000011444092,
                    -20.7099990844727
                  ],
                  "scale"    : [
                    0.409999996423721,
                    0.409999996423721,
                    0.409999996423721
                  ],
                  "rotate"   : [
                    6.02138614654541,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "TYR1EToj2h1hcAnBLZkb9N.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "DucqSkXwAAwxaT5fFF7rzR.jpg"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "name" : "mesh_wm01stone01",
                "type" : "node",
                "transform" : {
                  "position" : [
                    -7.94000005722046,
                    -0.639999985694885,
                    9.27000045776367
                  ],
                  "scale"    : [
                    1.9169008731842,
                    1.91690039634705,
                    1.91690039634705
                  ],
                  "rotate"   : [
                    6.02138614654541,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "WNiHoer7JV4s2bqUnJpRhq.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "SVpkgVrDPdTzn4uEgyPdLD.png"
                        }
                      },
                      "transparent" : true,
                      "layer"       : 3000
                    }
                  ]
                }
              },
              {
                "name" : "mesh_wm01stone02",
                "type" : "node",
                "transform" : {
                  "position" : [
                    8.10999965667725,
                    -0.0599999986588955,
                    9.09000015258789
                  ],
                  "scale"    : [
                    1.74131798744202,
                    1.54872000217438,
                    1.54872000217438
                  ],
                  "rotate"   : [
                    6.02138614654541,
                    0.0,
                    0.0
                  ]
                },
                "geometry"  : {
                  "type" : "BufferGeometry",
                  "res"  : "RBfws2GVnUymKsu3EhY6vb.geo"
                },
                "meshRender" : {
                  "material" : [
                    {
                      "type" : "MeshBasicMaterial",
                      "map"  : {
                        "generateMipmaps" : false,
                        "image"           : {
                          "name" : "SVpkgVrDPdTzn4uEgyPdLD.png"
                        }
                      },
                      "transparent" : true,
                      "layer"       : 3000
                    }
                  ]
                }
              },
              {
                "name" : "wm01tree",
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
                    "name" : "mesh_wm01tree01",
                    "type" : "node",
                    "transform" : {
                      "position" : [
                        12.2399997711182,
                        11.5100002288818,
                        6.34999990463257
                      ],
                      "scale"    : [
                        1.39999997615814,
                        1.40000069141388,
                        1.40000092983246
                      ],
                      "rotate"   : [
                        4.98138952255249,
                        2.90417122840881,
                        3.37077689170837
                      ]
                    },
                    "geometry"  : {
                      "type" : "BufferGeometry",
                      "res"  : "AXNwpsZYBZ4PqyH9VntPZp.geo"
                    },
                    "meshRender" : {
                      "material" : [
                        {
                          "type" : "MeshBasicMaterial",
                          "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                              "name" : "SVpkgVrDPdTzn4uEgyPdLD.png"
                            }
                          },
                          "transparent" : true,
                          "layer"       : 3000
                        }
                      ]
                    }
                  },
                  {
                    "name" : "mesh_wm01tree02",
                    "type" : "node",
                    "transform" : {
                      "position" : [
                        12.5,
                        11.1499996185303,
                        6.34999990463257
                      ],
                      "scale"    : [
                        1.39999997615814,
                        1.40000057220459,
                        1.40000057220459
                      ],
                      "rotate"   : [
                        4.97418832778931,
                        3.14159274101257,
                        3.14159274101257
                      ]
                    },
                    "geometry"  : {
                      "type" : "BufferGeometry",
                      "res"  : "YEeaxAP2W3zeozEhk8PPzg.geo"
                    },
                    "meshRender" : {
                      "material" : [
                        {
                          "type" : "MeshBasicMaterial",
                          "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                              "name" : "SVpkgVrDPdTzn4uEgyPdLD.png"
                            }
                          },
                          "transparent" : true,
                          "layer"       : 3000
                        }
                      ]
                    }
                  },
                  {
                    "name" : "mesh_wm01tree03",
                    "type" : "node",
                    "transform" : {
                      "position" : [
                        12.9499998092651,
                        10.9899997711182,
                        6.34999990463257
                      ],
                      "scale"    : [
                        1.39999997615814,
                        1.39999973773956,
                        1.40000021457672
                      ],
                      "rotate"   : [
                        4.99143838882446,
                        3.50365614891052,
                        2.79240417480469
                      ]
                    },
                    "geometry"  : {
                      "type" : "BufferGeometry",
                      "res"  : "Y6xDwc1VaCmhbR7ADuFRY1.geo"
                    },
                    "meshRender" : {
                      "material" : [
                        {
                          "type" : "MeshBasicMaterial",
                          "map"  : {
                            "generateMipmaps" : false,
                            "image"           : {
                              "name" : "SVpkgVrDPdTzn4uEgyPdLD.png"
                            }
                          },
                          "transparent" : true,
                          "layer"       : 3000
                        }
                      ]
                    }
                  }
                ]
              }
            ]
        };
    },
    /**
     * 选择角色
     */
    "selectUser": () => {
      return {
        "name" : "sce_xzjs",
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
            "name" : "mesh_scexzjs",
            "type" : "node",
            "transform" : {
              "position" : [
                -2.17000007629395,
                -0.819999992847443,
                -9.77999973297119
              ],
              "scale"    : [
                0.899999976158142,
                0.899999976158142,
                0.899999976158142
              ],
              "rotate"   : [
                4.97418832778931,
                3.14159274101257,
                3.14159274101257
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "UCMnZKyobpkSMPRRECPSKa.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "JFZqEV9PVD8CdDcukF3wGW.jpg"
                    }
                  }
                }
              ]
            }
          }
        ]
      };
    },
    "sce_warmap02a":()=>{
      return {
        "name" : "sce_warmap02a",
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
            "name" : "mesh_wm01bg",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                -4.0,
                -22.0900001525879
              ],
              "scale"    : [
                0.409999996423721,
                0.410000026226044,
                0.410000026226044
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "TYR1EToj2h1hcAnBLZkb9N.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "GqXq2VpizeYxmnvA5DQTyz.jpg"
                    }
                  }
                }
              ]
            }
          }
        ]
      };
    },
    "sce_warmap02b": () => {
      return {
        "name" : "sce_warmap02b",
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
            "name" : "mesh_wm01bg",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                -3.0,
                -18.3500003814697
              ],
              "scale"    : [
                0.409999996423721,
                0.410000026226044,
                0.410000026226044
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "TYR1EToj2h1hcAnBLZkb9N.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "SPA6HqcChCQ5FEn7xRjWR6.png"
                    }
                  },
                  "layer" : 2200
                }
              ]
            }
          }
        ]
      };
    },
    "sce_warmap02c": () => {
      return {
        "name" : "sce_warmap02c",
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
        "animator"  : {
          "controller" : {
            "sce_warmap02c" : "P6WevKEsaaBias6FoULRZB.ai"
          },
          "aniBox"     : {
            "sce_warmap02c" : {
              "center" : [
                0.0,
                0.0,
                0.0
              ],
              "size"   : [
                20.0,
                10.0,
                1.0
              ]
            }
          },
          "playAnim"   : {
            "name" : "sce_warmap02c"
          }
        },
        "children"  : [
          {
            "name" : "mesh_wm01bg",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                -1.74000000953674,
                -13.6700000762939
              ],
              "scale"    : [
                0.409999996423721,
                0.410000026226044,
                0.410000026226044
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "TYR1EToj2h1hcAnBLZkb9N.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "N2sCiHdRPa1RPgG9zsCg7a.png"
                    }
                  },
                  "transparent" : true,
                  "layer"       : 3000
                }
              ]
            }
          },
          {
            "name" : "mesh_wujian02",
            "type" : "node",
            "transform" : {
              "position" : [
                7.78999996185303,
                0.296999990940094,
                -14.6190004348755
              ],
              "scale"    : [
                1.24458086490631,
                1.24458110332489,
                0.574404537677765
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "ADAC6q73csuCmPfam1a3Rv.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "F7LRzpPXGwCA2WC5xfFhs4.png"
                    }
                  },
                  "transparent" : true,
                  "layer"       : 3000
                }
              ]
            }
          },
          {
            "name" : "mesh_wm01bg2",
            "type" : "node",
            "transform" : {
              "position" : [
                0.0,
                4.26000022888184,
                8.75
              ],
              "scale"    : [
                0.409999996423721,
                0.410000026226044,
                0.410000026226044
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "TYR1EToj2h1hcAnBLZkb9N.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "Ff1bakC6WChWggyPRm2nYp.png"
                    }
                  },
                  "transparent" : true,
                  "layer"       : 3000
                }
              ]
            }
          },
          {
            "name" : "mesh_wujian01",
            "type" : "node",
            "transform" : {
              "position" : [
                11.6099996566772,
                12.5100002288818,
                8.55000019073486
              ],
              "scale"    : [
                2.34645414352417,
                2.34645414352417,
                0.848148941993713
              ],
              "rotate"   : [
                6.02138614654541,
                0.0,
                0.0
              ]
            },
            "geometry"  : {
              "type" : "BufferGeometry",
              "res"  : "UkBR1oLAxBjXJfeDaX2rqj.geo"
            },
            "meshRender" : {
              "material" : [
                {
                  "type" : "MeshBasicMaterial",
                  "map"  : {
                    "generateMipmaps" : false,
                    "image"           : {
                      "name" : "F7LRzpPXGwCA2WC5xfFhs4.png"
                    }
                  },
                  "transparent" : true,
                  "layer"       : 3000
                }
              ]
            }
          }
        ]
      };
    }
};