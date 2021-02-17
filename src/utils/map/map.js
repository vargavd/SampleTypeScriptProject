"use strict";
var App;
(function (App) {
    var Map = (function () {
        function Map(lat, lng, zoom) {
            if (zoom === void 0) { zoom = 8; }
            this.gMarkers = [];
            this.gMap = new google.maps.Map(document.getElementById("map"), {
                center: { lat: lat, lng: lng },
                zoom: zoom
            });
        }
        Map.prototype.setCenter = function (lat, lng) {
            this.gMap.setCenter({ lat: lat, lng: lng });
        };
        Map.prototype.addMarker = function (lat, lng) {
            this.gMarkers.push(new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: this.gMap
            }));
        };
        return Map;
    }());
    App.Map = Map;
})(App || (App = {}));
//# sourceMappingURL=map.js.map