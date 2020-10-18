var map;
$ = jQuery;
// code for converting kmz to geojson
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

    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'blob';
        request.onload = function () {
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
        center: [-49.44189125005539, 5.6687710404076],
    });
    map.addControl(new mapboxgl.NavigationControl());
    

    map.on("load", async function () {
        const [allNetwork, ellaLink, futureExtensions, capacityServices, managedOpenScource, t1, t2, t3, dc, cls, offices, dp] =
        await Promise.all([convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Full_KMZ.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Onnet.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Futures_extensions.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Capa_KMZ.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Spec.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/T1.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/T2.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/T3.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/DC.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/CLS.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/Office.kmz'),
        convertKmzGeoJSON('https://raw.githubusercontent.com/it-taskforce/EllaLink/master/kmz/diversity_points.kmz')])
        map.loadImage(
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
            function (error, image) {
                if (error) throw error;
                map.addImage('cat', image);
            })

        map.addLayer({
            id: "All Network",
            type: "line",
            source: {
                type: "geojson",
                data:
                allNetwork,
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
                ellaLink,
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
                futureExtensions ,
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
                capacityServices
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
                managedOpenScource,
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
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/Points/Yellow_point.png", async function (error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("yellow-marker", image); //this is where we name the image file we are loading 
        })
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/Points/Blue_Point.png", async function (error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("blue-marker", image); //this is where we name the image file we are loading 
        })
        map.addLayer({
            id: "Type 1 – Full services POP",
            type: "symbol",
            source: {
                type: "geojson",
                data:
                   t1,
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
                data:
                    t2,
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
                data:
                    t3,
            },
            layout: {
                // make layer visible by default
                visibility: "none",

                "icon-image": "blue-marker", // the name of image file we used above
                "icon-allow-overlap": true,
                "icon-size": .1 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

            },
        });
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/DC/DC_Wb.png", async function (error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("dc-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Data centers",
                type: "symbol",
                source: {
                    type: "geojson",
                    data:
                        dc,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "dc-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-anchor": "center",
                    
                    "icon-size": .02 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/CS/CS_Wb.png", async function (error, image) { //this is where we load the image file 
        if (error) throw error;
        map.addImage("cs-marker", image); //this is where we name the image file we are loading 
        map.addLayer({
            id: "Cable landing stations",
            type: "symbol",
            source: {
                type: "geojson",
                data:
                    cls,
            },
            layout: {
                // make layer visible by default
                visibility: "none",

                "icon-image": "cs-marker", // the name of image file we used above
                "icon-allow-overlap": true,
                "icon-size": .02 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

            },
        });
        })
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/Office/Office_Yb.png", async function (error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("office-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Offices",
                type: "symbol",
                source: {
                    type: "geojson",
                    data:
                        offices,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "office-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .02 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })
        map.loadImage("https://raw.githubusercontent.com/it-taskforce/EllaLink/master/map_icons/Diverse/Diverse_Yb.png", async function (error, image) { //this is where we load the image file 
            if (error) throw error;
            map.addImage("dp-marker", image); //this is where we name the image file we are loading 
            map.addLayer({
                id: "Diversity points",
                type: "symbol",
                source: {
                    type: "geojson",
                    data:
                        dp,
                },
                layout: {
                    // make layer visible by default
                    visibility: "none",

                    "icon-image": "dp-marker", // the name of image file we used above
                    "icon-allow-overlap": true,
                    "icon-size": .02 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"

                },
            });
        })



    });



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
        }, 2000);
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
        $("input[type=radio][name=" + name + "]").removeClass();
        toggleableLayerIds.filter(elem => elem.category == name && !elem.isNone).forEach(elem => {
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

        map.on('click', elem, function (e) {
            console.log(e.features[0].properties.Name);

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = "<div class='text-center'><h5>"
                + e.features[0].properties.name
                + "</h5><p>" + (e.features[0].properties.description || "") + "</p><div>"
            console.log(e.features[0])
            // Ensure that if the map is zoome  out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 9 });

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