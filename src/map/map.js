"use strict";
var App;
(function (App) {
    var Map = (function () {
        function Map(lat, lng, zoom) {
            var _this = this;
            if (zoom === void 0) { zoom = 8; }
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
        return Map;
    }());
    App.Map = Map;
})(App || (App = {}));
//# sourceMappingURL=map.js.map