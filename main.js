$(() => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoiYmVuamFtaW5tYXBib3giLCJhIjoiY2tmbWlta3I5MDM2cjJ4b2ZuMHkwZGc3MiJ9.G3LZcBfCM_fI0GD3socJVg";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/gentritbiba/ckgc3ebne2st719qugbefamvy",
        zoom: 2.45,
        center: [-49.44189125005539, 5.6687710404076],
    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", function () {

        map.addLayer({
            id: "All Network",
            type: "line",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Full_KMZ.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                'line-width': 4,
                'line-color': '#F7EA3B',
            },
        });
        map.addLayer({
            id: "EllaLink On net",
            type: "line",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Onet.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                'line-width': 4,
                'line-color': '#0000FF',
            },
        });

        // add source and layer for contours
        // map.addSource("contours", {
        //   type: "vector",
        //   url: "mapbox://mapbox.mapbox-terrain-v2",
        // });
        map.addLayer({
            id: "Future extensions",
            type: "line",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Futures_extensions.geojson",
                // "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Full_KMZ.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
                // "line-join": "round",
                // "line-cap": "round",
            },
            paint: {
                'line-width': 4,
                'line-color': '#FFFF00',
                'line-dasharray': [1, 1]
            },
        });


        map.addLayer({
            id: "Capacity Services",
            type: "line",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Capa.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                'line-width': 4,
                'line-color': '#FFFF00',
            },
        });


        map.addLayer({
            id: "Managed & Open Spectrum Services",
            type: "line",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Spec.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                'line-width': 4,
                'line-color': '#0000FF',
            },
        });
        map.addLayer({
            id: "Type 1 – Full services POP",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/T1.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                "circle-radius": 8,
                "circle-color": "#FFFF00",
            },
        });
        map.addLayer({
            id: "Type 2 – Network POP",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/T2.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                "circle-radius": 8,
                "circle-color": "#FFFF00",
            },
        });
        map.addLayer({
            id: "Type 3 – Virtual POP",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/T3.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            paint: {
                "circle-radius": 8,
                "circle-color": "#0000FF",
            },
        });
        map.addLayer({
            id: "Data centers",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/DC.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            //   paint: {
            //     "circle-radius": 8,
            //     "circle-color": "rgba(55,148,179,1)",
            //   },
        });
        map.addLayer({
            id: "Cable landing stations",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/CLS.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            //   paint: {
            //     "circle-radius": 8,
            //     "circle-color": "rgba(55,148,179,1)",
            //   },
        });
        map.addLayer({
            id: "Offices",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/Office.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            //   paint: {
            //     "circle-radius": 8,
            //     "circle-color": "rgba(55,148,179,1)",
            //   },
        });
        map.addLayer({
            id: "Diversity points",
            type: "circle",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/it-taskforce/EllaLink/master/diversity_points.geojson",
            },
            layout: {
                // make layer visible by default
                visibility: "none",
            },
            //   paint: {
            //     "circle-radius": 8,
            //     "circle-color": "rgba(55,148,179,1)",
            //   },
        });


    });


    // map.on('click', '', function (e) {
    //  console.log(e.features[0].properties.Name);

    //  var coordinates = e.features[0].geometry.coordinates.slice();
    //  var description = e.features[0].properties.Name;

    //  // Ensure that if the map is zoomed out such that multiple
    //  // copies of the feature are visible, the popup appears
    //  // over the copy being pointed to.
    //  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //  }

    //  new mapboxgl.Popup()
    //  .setLngLat(coordinates)
    //  .setHTML(description)
    //  .addTo(map);
    //  });

    // enumerate ids of the layers
    var toggleableLayerIds = [{
        id: "All Network",
        type: "radio",
        isDefaultActive: true,
        category: "routes"
    },
    {
        id: "EllaLink On net",
        type: "radio",
        category: "routes"
    },
    {
        id: "No Network",
        type: "radio",
        isNone: true,
        category: "routes"
    },
    {
        id: "Future extensions",
        type: "checkbox",
        isDefaultActive: true,
        category: "routes"

    },
    {
        id: "Capacity Services",
        type: "radio",
        category: "services"
    },
    {
        id: "Managed & Open Spectrum Services",
        type: "radio",
        category: "services"
    },
    {
        id: "No service",
        type: "radio",
        isNone: true,
        category: "services"
    },
    {
        id: "Type 1 – Full services POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops"
    },
    {
        id: "Type 2 – Network POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops"
    },
    {
        id: "Type 3 – Virtual POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops"
    },
    {
        id: "Data centers",
        type: "checkbox",
        isDefaultActive: true,
        category: "sites"
    },
    {
        id: "Cable landing stations",
        type: "checkbox",
        isDefaultActive: true,
        category: "sites"
    },
    {
        id: "Offices",
        type: "checkbox",
        isDefaultActive: true,
        category: "sites"
    },
    {
        id: "Diversity points",
        type: "checkbox",
        isDefaultActive: true,
        category: "sites"
    }];


    // set up the corresponding toggle button for each layer
    //Network
    toggleableLayerIds.forEach(element => {

        var id = element.id;

        var input = document.createElement("input");
        if (element.type == "radio") {
            input.name = element.category;
        }
        else {
            input.name = id;
        }
        setTimeout(function () {
            if (element.isDefaultActive) {
                map.setLayoutProperty(id, "visibility", "visible");
                input.checked = true;
            }
        }, 1500);
        input.type = element.type;
        input.href = "#";
        input.textContent = id;
        input.value = id;
        input.id = "id-"+id;
        input.setAttribute("data-isnone", element.isNone);

        var label = document.createElement("label");
        label.type = "label";
        label.textContent = id;
        label.setAttribute("for", "id-"+id);

        if (element.type !== "radio")
            input.onclick = function (e) {
                var clickedLayer = this.textContent;
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, "visibility");


                // toggle layer visibility by changing the layout object's visibility property
                if (visibility === "visible") {
                    map.setLayoutProperty(clickedLayer, "visibility", "none");
                    this.className = "";
                } else {

                    map.setLayoutProperty(clickedLayer, "visibility", "visible");
                    this.className = "active";
                }
            };

        

        var layers = document.getElementById(element.category + "-menu");
        layers.appendChild(input);
        layers.appendChild(label);
        var br = document.createElement("br");
        layers.appendChild(br);

    });
    $('#options-wrapper input[type=radio]').change(function () {
        // console.log(this.value)
        const name = this.name;
        const value = this.value;
        $("input[type=radio][name="+name+"]").removeClass();
        toggleableLayerIds.filter(elem => elem.category == name && !elem.isNone).forEach(elem=> {
            map.setLayoutProperty(elem.id, "visibility", "none");
            this.className = "";
        })
        if($(this).data("isnone") !== true){
            map.setLayoutProperty(value, "visibility", "visible");
        }
        this.className = "active";
    });

    var layerArray = ['Type 1 – Full services POP', 'Type 2 – Network POP', 'Type 3 – Virtual POP','Data centers', 'Cable landing stations', 'Offices', 'Cable landing stations',  'Diversity points'] ;
    layerArray.forEach(elem => {
        
        map.on('click', elem, function (e) {
            console.log(e.features[0].properties.Name);
    
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.Name;
    
            // Ensure that if the map is zoome  out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            map.flyTo({center: e.features[0].geometry.coordinates, zoom:8});
    
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });
    })
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );
    const geocoderElem = $(".mapboxgl-ctrl-geocoder");
    const geocoderWrapper = $("<div class='geocoder-card-wrapper card-header'></div>");
    geocoderWrapper.append(geocoderElem);
    $("#options-wrapper").prepend(geocoderWrapper);    
})