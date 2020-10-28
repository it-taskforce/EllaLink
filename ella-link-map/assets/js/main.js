var map;
$ = jQuery;
// code for converting kmz to geojson
// enumerate ids of the layers
var canClick = true;
var symbolMarkers = {
    "yellow-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/Points/Yellow_point.png",
    "blue-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/Points/Blue_Point.png",
    "white-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/Points/Blue_point_Wb.png",
    "dc-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/DC/DC_Wb.png",
    "cs-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/CS/CS_Wb.png",
    "office-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/Office/Office_Yb.png",
    "dp-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons_small/Diverse/Diverse_Yb.png",
    "gl-marker" : "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/map_icons/Gl/LogoGeolab.png"
}

function toggleMapOptions() {
    $("#options-wrapper").toggleClass("show");
    $(".toggle-menu").toggleClass("hide");
    $(".mapboxgl-ctrl-top-right").toggleClass("hide");
}

var toggleableLayerIds = [{
        id: "All Network",
        type: "radio",
        isDefaultActive: true,
        category: "network"
    },
    {
        id: "EllaLink On net",
        type: "radio",
        category: "network"
    },
    // {
    //     id: "No Network",
    //     type: "radio",
    //     isNone: true,
    //     category: "network"
    // },
    {
        id: "Future extensions",
        type: "checkbox",
        isDefaultActive: true,
        category: "network"

    },
    // {
    //     id: "Capacity Services",
    //     type: "radio",
    //     category: "services"
    // },
    // {
    //     id: "Managed & Open Spectrum Services",
    //     type: "radio",
    //     category: "services"
    // },
    // {
    //     id: "No service",
    //     type: "radio",
    //     isNone: true,
    //     category: "services"
    // },
    {
        id: "Type 1 – Full services POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops",
        marker:"yellow-marker",
    },
    {
        id: "Type 2 – Network POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops",
        marker:"yellow-marker",
    },
    {
        id: "Type 3 – Virtual POP",
        type: "checkbox",
        isDefaultActive: true,
        category: "pops",
        marker:"white-marker",
    },
    {
        id: "Data centers",
        type: "checkbox",
        // isDefaultActive: true,
        category: "sites",
        marker:"dc-marker",
    },
    {
        id: "Cable landing stations",
        type: "checkbox",
        // isDefaultActive: true,
        category: "sites",
        marker:"cs-marker",
    },
    {
        id: "Offices",
        type: "checkbox",
        // isDefaultActive: true,
        category: "sites",
        marker:"office-marker",
    },
    {
        id: "Diversity points",
        type: "checkbox",
        // isDefaultActive: true,
        category: "sites",
        marker:"dp-marker",
    },
    {
        id: "GeoLab",
        type: "checkbox",
        // isDefaultActive: true,
        category: "sites",
        marker:"gl-marker",
    }
];

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
let getDom = xml => (new DOMParser()).parseFromString(xml, "text/xml")
let getExtension = fileName => fileName.split(".").pop()

function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
let getKmlDom = (kmzFile) => {
    var zip = new JSZip()
    return zip.loadAsync(kmzFile)
        .then(zip => {
            let kmlDom = null
            zip.forEach((relPath, file) => {
                if (getExtension(relPath) === "kml" && kmlDom === null) {
                    kmlDom = file.async("string").then(getDom)
                }
            })
            return kmlDom || Promise.reject("No kml file found")
        });
}

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });


}

function convertKmzGeoJSON(url) {

    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            var blob = new Blob([request.response], { type: "octet/stream" });
            let zip = blobToFile(blob, blob.type);
            let geoJson = getKmlDom(zip).then(kmlDom => {
                let geoJsonObject = toGeoJSON.kml(kmlDom)
                    // console.log(geoJsonObject)
                let retObject = {
                    "type": "FeatureCollection",
                    "features": geoJsonObject.features
                }
                console.log(retObject)
                resolve(retObject);
            })
        };
        request.send();
    })

}
// end code for converting kmz to geojson



$(() => {
    mapboxgl.accessToken =
        "pk.eyJ1IjoiYmVuamFtaW5tYXBib3giLCJhIjoiY2tmbWlta3I5MDM2cjJ4b2ZuMHkwZGc3MiJ9.G3LZcBfCM_fI0GD3socJVg";
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/gentritbiba/ckgc3ebne2st719qugbefamvy",
        zoom: 2.45,
        center: [-29.44189125005539, 5.6687710404076],
    });
    map.addControl(new mapboxgl.NavigationControl());


    map.on("load", async function() {
        map.resize();
        const [allNetwork, ellaLink, futureExtensions, capacityServices, managedOpenScource, t1, t2, t3, dc, cls, offices, dp, GeoLab] =
        await Promise.all([convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Full_KMZ.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Onnet.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Futures_extensions.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Capa_KMZ.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Spec.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/T1.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/T2.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/T3.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/DC.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/CLS.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/Office.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/diversity_points.kmz'),
            convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/kmz/GeoLab.kmz')
        ])
        map.loadImage(
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
            function(error, image) {
                if (error) throw error;
                map.addImage('cat', image);
            })

        map.addLayer({
            id: "All Network",
            type: "line",
            source: {
                type: "geojson",
                data: allNetwork,
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
                data: ellaLink,
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
                data: futureExtensions,
                // "https://raw.githubusercontent.com/it-taskforce/EllaLink/develop/Full_KMZ.geojson",
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
                data: capacityServices
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
                data: managedOpenScource,
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
        map.loadImage(symbolMarkers["yellow-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("yellow-marker", image); //this is where we name the image file we are loading 
        })
        map.loadImage(symbolMarkers["blue-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("blue-marker", image); //this is where we name the image file we are loading 
        })
        map.loadImage(symbolMarkers["white-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("white-marker", image); //this is where we name the image file we are loading 
        })
        map.loadImage(symbolMarkers["gl-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("gl-marker", image); //this is where we name the image file we are loading 
        })
        map.addLayer({
            id: "Type 1 – Full services POP",
            type: "symbol",
            source: {
                type: "geojson",
                data: t1,
            },
            layout: {
                // make layer visible by default
                visibility: "none",

                "icon-image": "yellow-marker", // the name of image file we used above
                "icon-allow-overlap": true,
                "icon-size": .1 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

            },
        });
        map.addLayer({
            id: "Type 2 – Network POP",
            type: "symbol",
            source: {
                type: "geojson",
                data: t2,
            },
            layout: {
                // make layer visible by default
                visibility: "none",

                "icon-image": "yellow-marker", // the name of image file we used above
                "icon-allow-overlap": true,
                "icon-size": .1 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

            },
        });

        map.addLayer({
            id: "Type 3 – Virtual POP",
            type: "symbol",
            source: {
                type: "geojson",
                data: t3,
            },
            layout: {
                // make layer visible by default
                visibility: "none",

                "icon-image": "white-marker", // the name of image file we used above
                "icon-allow-overlap": true,
                "icon-size": .1 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

            },
        });
        map.loadImage(symbolMarkers["dc-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("dc-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Data centers",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: dc,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "dc-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-anchor": "center",

                    "icon-size": .19 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage(symbolMarkers["cs-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("cs-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Cable landing stations",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: cls,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "cs-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .19 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage(symbolMarkers["office-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("office-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Offices",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: offices,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "office-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .19 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage(symbolMarkers["dp-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("dp-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Diversity points",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: dp,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",
                    "icon-image": "dp-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .19 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage(symbolMarkers["gl-marker"], async function(error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("gl-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "GeoLab",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: GeoLab,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",
                    "icon-image": "gl-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .19 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })

        toggleableLayerIds.forEach(element => {
            if (element.isDefaultActive) {
                setTimeout(function() {
                    map.setLayoutProperty(element.id, "visibility", "visible");
                }, 1000)
            }
        })

    });






    // set up the corresponding toggle button for each layer
    //Network
    toggleableLayerIds.forEach(element => {

        var id = element.id;

        var input = document.createElement("input");
        if (element.type == "radio") {
            input.name = element.category;
        } else {
            input.name = id;
        }
        if (element.isDefaultActive) {
            input.checked = true;
        }
        input.type = element.type;
        input.href = "#";
        input.textContent = id;
        input.value = id;
        input.id = "id-" + id;
        input.setAttribute("data-isnone", element.isNone);

        var label = document.createElement("label");
        label.type = "label";
        label.textContent = id;
        label.setAttribute("for", "id-" + id);

        if (element.type !== "radio")
            input.onclick = function(e) {
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
        const row = $("<div class='row'></div>");
        const col = $("<div class='col'></div>");
        const thumbnail = $("<div class='thumbnail-symbol col-1' style='background-image:url("+(symbolMarkers[element.marker] || "").replace("map_icons_small","map_icons_small_thumbnail")+")'></div>");

        col.append(input);
        col.append(label);
        row.append(col);
        if(element.marker)
        {
            row.append(thumbnail);
        }
        layers.appendChild(row[0]);
        // var br = document.createElement("br");
        // layers.appendChild(br);

    });
    $('#options-wrapper input[type=radio]').change(function() {
        // console.log(this.value)
        const name = this.name;
        const value = this.value;
        $("input[type=radio][name=" + name + "]").removeClass();
        toggleableLayerIds.filter(elem => elem.category == name && elem.type == "radio" && !elem.isNone).forEach(elem => {
            map.setLayoutProperty(elem.id, "visibility", "none");
            this.className = "";
        })
        if ($(this).data("isnone") !== true) {
            map.setLayoutProperty(value, "visibility", "visible");
        }
        this.className = "active";
    });

    var layerArray = ['Type 1 – Full services POP', 'Type 2 – Network POP', 'Type 3 – Virtual POP', 'Data centers', 'Cable landing stations', 'Offices', 'Cable landing stations', 'Diversity points'];
    layerArray.forEach(elem => {

        map.on('click', elem, function(e) {
            if (!canClick) return;
            canClick = false;
            setTimeout(function() { canClick = true }, 100);
            console.log('infosplus ',e.features[0]);

            var descrition = e.features[0].properties.description;
            console.log('etat 1', descrition);
            if (descrition != undefined){
                descrition= e.features[0].properties.description;
            }else {
                descrition="";
            }   
            var coordinates = e.features[0].geometry.coordinates.slice();
            var content = "<div class='text-center'><h5>" +
                e.features[0].properties.name +
                "</h5><p>" + descrition || "" + "</p><div>"

                // Ensure that if the map is zoome  out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 9 });
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(content)
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
    const geocoderExitBtn = $("<button class='option-exit-btn' onclick='toggleMapOptions()'><i class='fa fa-times-circle'></i></button>")
    geocoderWrapper.append(geocoderElem);
    geocoderWrapper.append(geocoderExitBtn);
    $("#options-wrapper").prepend(geocoderWrapper);
})
