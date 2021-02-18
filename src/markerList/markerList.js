"use strict";
var App;
(function (App) {
    var Marker = (function () {
        function Marker(title, address, latitude, longitude) {
            this.title = title;
            this.address = address;
            this.latitude = latitude;
            this.longitude = longitude;
        }
        return Marker;
    }());
    App.Marker = Marker;
    var MarkerList = (function () {
        function MarkerList(markersChanged) {
            var _this = this;
            this.markersChanged = markersChanged;
            this.$newMarkerTitleInput = $('#new-marker-title');
            this.$newMarkerAddressInput = $('#new-marker-address');
            this.$addMarkerButton = $('#add-marker');
            this.$markerList = $('#marker-list');
            this.$markerTemplate = $('.marker-list-item-template').detach();
            this.markers = [];
            this.renderMarkers = function () {
                _this.$markerList.empty();
                _this.markers.forEach(function (marker, index) {
                    var $marker = _this.$markerTemplate.clone();
                    $marker.attr('data-index', index);
                    $marker.find('.marker-title').text(marker.title);
                    $marker.find('.marker-address').text(marker.address);
                    $marker.find('.marker-latitude').text(marker.latitude);
                    $marker.find('.marker-longitude').text(marker.longitude);
                    $marker.find('.remove-marker').on('click', _this.removeMarkerFuncGenerator(index));
                    _this.$markerList.append($marker);
                });
            };
            this.removeMarkerFuncGenerator = function (markerIndex) { return function () {
                if (_this.markers.length === 0) {
                    throw new Error('Trying to remove element ' + markerIndex + ' when markers array is empty');
                }
                if (0 > markerIndex || markerIndex > _this.markers.length - 1) {
                    throw new RangeError('markerIndex (' + markerIndex + ') is out of range, should be between' + 0 + ' and ' + (_this.markers.length - 1));
                }
                _this.markers.splice(markerIndex, 1);
                _this.renderMarkers();
                _this.markersChanged(_this.markers);
            }; };
            this.addMarkerButtonClicked = function () {
                var title = _this.$newMarkerTitleInput.val(), address = _this.$newMarkerAddressInput.val();
                if (typeof title !== 'string' || title.length === 0 || typeof address !== 'string' || address.length === 0) {
                    return;
                }
                _this.$newMarkerTitleInput.val('');
                _this.$newMarkerAddressInput.val('');
                axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_API_KEY)
                    .then(function (response) {
                    if (response.data.status !== 'ZERO_RESULT') {
                        var location_1 = response.data.results[0].geometry.location;
                        _this.markers.push(new Marker(title, address, location_1.lat, location_1.lng));
                        _this.renderMarkers();
                        _this.markersChanged(_this.markers);
                    }
                });
            };
            this.$addMarkerButton.on('click', this.addMarkerButtonClicked);
            this.$newMarkerTitleInput.val('London');
            this.$newMarkerAddressInput.val('London, England');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('Budapest');
            this.$newMarkerAddressInput.val('Budapest, Ferenciek Tere');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('New York');
            this.$newMarkerAddressInput.val('New York, Empire State Building');
            this.$addMarkerButton.trigger('click');
            setTimeout(function () {
                _this.removeMarkerFuncGenerator(1)();
            }, 500);
        }
        return MarkerList;
    }());
    App.MarkerList = MarkerList;
})(App || (App = {}));
//# sourceMappingURL=markerList.js.map