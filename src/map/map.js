"use strict";
var App;
(function (App) {
    var Map = (function () {
        function Map(lat, lng, zoom) {
            var _this = this;
            if (zoom === void 0) { zoom = 8; }
            this.gMarkers = [];
            this.infoWindows = [];
            this.$latInput = $('#latitude');
            this.$lngInput = $('#longitude');
            this.$latLngButton = $('#lat-lng-center');
            this.$addressInput = $('#address');
            this.$addressButton = $('#address-center');
            this.latLngButtonClicked = function () {
                var latitude = _this.$latInput.val(), longitude = _this.$lngInput.val();
                if (typeof latitude === "string" && latitude !== "" && typeof longitude === "string" && longitude !== "") {
                    _this.setCenter(+latitude, +longitude);
                }
            };
            this.addressButtonClicked = function () {
                var address = _this.$addressInput.val();
                if (typeof address === "string" && address.length > 0) {
                    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_API_KEY)
                        .then(function (response) {
                        if (response.data.status !== 'ZERO_RESULT') {
                            var location_1 = response.data.results[0].geometry.location;
                            _this.setCenter(location_1.lat, location_1.lng);
                        }
                    });
                }
            };
            this.setCenter = function (lat, lng) {
                _this._gMap.setCenter({ lat: lat, lng: lng });
            };
            this.$latLngButton.on('click', this.latLngButtonClicked);
            this.$addressButton.on('click', this.addressButtonClicked);
            this._gMap = new google.maps.Map(document.getElementById("map"), {
                center: { lat: lat, lng: lng },
                zoom: zoom
            });
        }
        Object.defineProperty(Map.prototype, "gMap", {
            get: function () {
                return this._gMap;
            },
            enumerable: false,
            configurable: true
        });
        Map.prototype.addMarker = function (lat, lng, title, address) {
            var _this = this;
            if (title === void 0) { title = ''; }
            if (address === void 0) { address = ''; }
            var marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: this._gMap,
                title: title
            });
            this.gMarkers.push(marker);
            if (title && address) {
                var infoWindow_1 = new google.maps.InfoWindow({
                    content: "<strong>" + title + "</strong><br />" + address
                });
                this.infoWindows.push(infoWindow_1);
                marker.addListener("click", function () {
                    infoWindow_1.open(_this._gMap, marker);
                });
            }
        };
        Map.prototype.removeAllMarkers = function () {
            this.gMarkers.forEach(function (gMarker) {
                gMarker.setMap(null);
            });
            this.gMarkers = [];
        };
        return Map;
    }());
    App.Map = Map;
})(App || (App = {}));
//# sourceMappingURL=map.js.map