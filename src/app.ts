/// <reference path="./utils/GoogleGeocodeResultType.ts" />
/// <reference path="./models/marker/marker.ts" />
/// <reference path="./state/markersState.ts" />
/// <reference path="./markerList/markerList.ts" />

// TODO: remove infoWindow when deleting marker
// TODO: inline sourceMap - for better readability in the file explorer
// TODO: create boundary for markers
// TODO: implement events (Singleton maybe?)
// TODO: VALIDATION

let
    // main consts
    map: App.Map,
    markersState: App.MarkersState,
    markerList: App.MarkerList,

    // this function will be called by google maps
    initMap = function () {
        map = new App.Map(30, 0, 2.1);

        markersState = App.MarkersState.getInstance(map.gMap);

        markerList = new App.MarkerList(markersState);
    };

