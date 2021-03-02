"use strict";
var map, markersState, markerList, initMap = function () {
    map = new App.Map(30, 0, 2.1);
    markersState = App.MarkersState.getInstance(map.gMap);
    markerList = new App.MarkerList(markersState);
};
//# sourceMappingURL=app.js.map