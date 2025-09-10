// MapTiler 3D GL Style with OpenMapTiles
// Based on: https://github.com/openmaptiles/maptiler-3d-gl-style

export const maptiler3DStyle = {
  "version": 8,
  "name": "3D",
  "metadata": {
    "mapbox:autocomposite": false,
    "mapbox:type": "template",
    "maputnik:renderer": "ol",
    "openmaptiles:version": "3.x"
  },
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://api.maptiler.com/tiles/v3/tiles.json?key={key}"
    }
  },
  "sprite": "https://api.maptiler.com/maps/streets/sprite",
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key={key}",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "hsl(47, 26%, 88%)"
      }
    },
    {
      "id": "landuse-residential",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "maxzoom": 16,
      "filter": [
        "==",
        "class",
        "residential"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(47, 13%, 86%)",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover_grass",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 14,
      "filter": [
        "==",
        "class",
        "grass"
      ],
      "paint": {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": 0.45
      }
    },
    {
      "id": "landcover_wood",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 14,
      "filter": [
        "==",
        "class",
        "wood"
      ],
      "paint": {
        "fill-color": "hsl(82, 46%, 72%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              8,
              0.6
            ],
            [
              22,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(205, 56%, 73%)"
      }
    },
    {
      "id": "water_name",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Italic"
        ],
        "text-max-width": 5,
        "text-rotation-alignment": "map",
        "text-size": 12,
        "symbol-placement": "line",
        "text-pitch-alignment": "viewport"
      },
      "paint": {
        "text-color": "hsl(205, 56%, 53%)",
        "text-halo-color": "hsl(205, 56%, 73%)",
        "text-halo-width": 1
      }
    },
    {
      "id": "building",
      "type": "fill-extrusion",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 13,
      "paint": {
        "fill-extrusion-color": "hsl(35, 11%, 88%)",
        "fill-extrusion-height": {
          "type": "identity",
          "property": "render_height"
        },
        "fill-extrusion-base": {
          "type": "identity",
          "property": "render_min_height"
        },
        "fill-extrusion-opacity": 0.6
      }
    },
    {
      "id": "highway_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 8,
      "filter": [
        "in",
        "class",
        "minor",
        "service",
        "track"
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 97%)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "in",
        "class",
        "primary",
        "secondary",
        "tertiary",
        "trunk"
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 97%)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "highway_motorway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "==",
        "class",
        "motorway"
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(26, 87%, 62%)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "railway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "==",
        "class",
        "rail"
      ],
      "paint": {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              14,
              0.4
            ],
            [
              20,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "waterway-river",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "==",
        "class",
        "river"
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.75
            ],
            [
              20,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "waterway-stream",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "==",
        "class",
        "stream"
      ],
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "hsl(205, 56%, 73%)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              13,
              0.5
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "boundary-state",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
        "==",
        "admin_level",
        4
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(230, 8%, 51%)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "boundary-country",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
        "==",
        "admin_level",
        2
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "hsl(230, 8%, 35%)",
        "line-width": {
          "base": 1.1,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "place_label_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 8,
      "filter": [
        "in",
        "class",
        "hamlet",
        "island",
        "neighbourhood",
        "suburb"
      ],
      "layout": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-max-width": 9,
        "text-padding": 2,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              12,
              10
            ],
            [
              15,
              14
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place_label_village",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 8,
      "filter": [
        "==",
        "class",
        "village"
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-max-width": 8,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              10,
              12
            ],
            [
              15,
              22
            ]
          ]
        },
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place_label_town",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 8,
      "filter": [
        "==",
        "class",
        "town"
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Regular"
        ],
        "text-max-width": 8,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              7,
              12
            ],
            [
              11,
              16
            ]
          ]
        },
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place_label_city",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 5,
      "filter": [
        "all",
        [
          "!=",
          "capital",
          2
        ],
        [
          "==",
          "class",
          "city"
        ]
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Medium"
        ],
        "text-max-width": 8,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              7,
              14
            ],
            [
              11,
              24
            ]
          ]
        },
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    },
    {
      "id": "place_label_capital",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 3,
      "filter": [
        "all",
        [
          "==",
          "capital",
          2
        ],
        [
          "==",
          "class",
          "city"
        ]
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Noto Sans Medium"
        ],
        "text-max-width": 8,
        "text-size": {
          "base": 1.2,
          "stops": [
            [
              7,
              14
            ],
            [
              11,
              24
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "hsl(0, 0%, 25%)",
        "text-halo-blur": 0,
        "text-halo-color": "hsl(0, 0%, 100%)",
        "text-halo-width": 2
      }
    }
  ],
  "id": "3d"
};