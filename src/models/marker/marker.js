"use strict";
var App;
(function (App) {
    var InfoWindow = (function () {
        function InfoWindow() {
        }
        InfoWindow.get = function () {
            if (this.infoWindow) {
                return this.infoWindow;
            }
            this.infoWindow = new google.maps.InfoWindow({});
            return this.infoWindow;
        };
        return InfoWindow;
    }());
    var Marker = (function () {
        function Marker(lat, lng, title, address, map) {
            var _this = this;
            this.onMarkerClick = function () {
                _this._infoWindow.close();
                _this._infoWindow.setContent("<strong>" + _this._title + "</srong><br />" + _this._address);
                _this._infoWindow.open(_this._map, _this._gMarker);
            };
            this._title = title;
            this._address = address;
            this._map = map;
            this._id = Math.floor(Math.random() * 100000000).toString();
            this._gMarker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                title: title
            });
            this._infoWindow = InfoWindow.get();
            this._gMarker.addListener("click", this.onMarkerClick);
        }
        Object.defineProperty(Marker.prototype, "gMarker", {
            get: function () {
                return this._gMarker;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Marker.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        return Marker;
    }());
    App.Marker = Marker;
})(App || (App = {}));
//# sourceMappingURL=marker.js.map