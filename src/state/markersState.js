"use strict";
var App;
(function (App) {
    var MarkersState = (function () {
        function MarkersState() {
            this.markers = [];
            this.addMarkerListeners = [];
            this.removeMarkerListeners = [];
        }
        MarkersState.prototype.listenToAdding = function (listener) {
            this.addMarkerListeners.push(listener);
        };
        MarkersState.prototype.listenToRemoving = function (listener) {
            this.removeMarkerListeners.push(listener);
        };
        MarkersState.getInstance = function (map) {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new MarkersState();
            this.map = map;
            return this.instance;
        };
        MarkersState.prototype.addMarker = function (lat, lng, title, address) {
            var marker = new App.Marker(lat, lng, title, address, MarkersState.map);
            this.markers.push(marker);
            this.addMarkerListeners.forEach(function (listener) {
                return listener(title, address, lat, lng, marker.id);
            });
            return marker;
        };
        MarkersState.prototype.removeMarker = function (id) {
            var removedMarkerIndex = -1;
            for (var i = 0; i < this.markers.length; i++) {
                if (this.markers[i].id === id) {
                    removedMarkerIndex = i;
                }
            }
            if (removedMarkerIndex === -1) {
                throw new Error("The following id (" + id + ") is not found in the markers array.");
            }
            var marker = this.markers.splice(removedMarkerIndex, 1);
            marker[0].gMarker.setMap(null);
            this.removeMarkerListeners.forEach(function (listener) { return listener(id); });
        };
        return MarkersState;
    }());
    App.MarkersState = MarkersState;
})(App || (App = {}));
//# sourceMappingURL=markersState.js.map