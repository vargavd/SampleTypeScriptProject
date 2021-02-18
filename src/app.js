"use strict";
var gMap, markerList, markersChanged = function (markers) {
    gMap.removeAllMarkers();
    markers.forEach(function (marker) {
        gMap.addMarker(marker.latitude, marker.longitude, marker.title, marker.address);
    });
}, initMap = function () {
    gMap = new App.Map(30, 0, 2.1);
    markerList = new App.MarkerList(markersChanged);
};
//# sourceMappingURL=app.js.map