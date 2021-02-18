/// <reference path="./utils/GoogleGeocodeResultType.ts" />
/// <reference path="./map/map.ts" />
/// <reference path="./markerList/markerList.ts" />

// TODO: remove infoWindow when deleting marker
// TODO: create boundary for markers
// TODO: implement events (Singleton maybe?)
// TODO: VALIDATION

let
    // main consts
    gMap: App.Map,
    markerList: App.MarkerList,

    // events
    markersChanged = (markers: App.Marker[]) => {
        gMap.removeAllMarkers();

        markers.forEach((marker) => {
            gMap.addMarker(marker.latitude, marker.longitude, marker.title, marker.address);
        });
    },

    // this function will be called by google maps
    initMap = function () {
        gMap = new App.Map(30, 0, 2.1);

        markerList = new App.MarkerList(markersChanged);
    };


