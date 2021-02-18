"use strict";
var gMap, markerList, markersChanged = function (markers) {
    console.log(markers);
}, initMap = function () {
    gMap = new App.Map(30, 0, 2.1);
    markerList = new App.MarkerList(markersChanged);
};
//# sourceMappingURL=app.js.map