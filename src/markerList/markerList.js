"use strict";
var App;
(function (App) {
    var MarkerList = (function () {
        function MarkerList(markersState) {
            var _this = this;
            this.$newMarkerTitleInput = $('#new-marker-title');
            this.$newMarkerAddressInput = $('#new-marker-address');
            this.$addMarkerButton = $('#add-marker');
            this.$markerList = $('#marker-list');
            this.$markerTemplate = $('.marker-list-item-template').detach().removeClass('marker-list-item-template');
            this.markerAdded = function (title, address, lat, lng, id) {
                var $marker = _this.$markerTemplate.clone();
                $marker.find('.marker-title').text(title);
                $marker.find('.marker-address').text(address);
                $marker.find('.marker-latitude').text(lat);
                $marker.find('.marker-longitude').text(lng);
                $marker.attr('data-id', id);
                $marker.find('.remove-marker').on('click', _this.removeMarkerClicked);
                _this.$markerList.append($marker);
            };
            this.markerRemoved = function (markerId) {
                var $marker = $(".marker-list-item[data-id=\"" + markerId + "\"]");
                if ($marker.length === 0) {
                    throw new Error('Trying to remove element ' + markerId + ' which does not exists.');
                }
                $marker.remove();
            };
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
                        _this._markersState.addMarker(location_1.lat, location_1.lng, title, address);
                    }
                });
            };
            this.removeMarkerClicked = function (event) {
                var $removeLink = $(event.target), $marker = $removeLink.closest('.marker-list-item'), markerId = $marker.attr('data-id');
                _this._markersState.removeMarker(markerId);
            };
            this._markersState = markersState;
            this.$addMarkerButton.on('click', this.addMarkerButtonClicked);
            this._markersState.listenToAdding(this.markerAdded);
            this._markersState.listenToRemoving(this.markerRemoved);
            this.$newMarkerTitleInput.val('London');
            this.$newMarkerAddressInput.val('London, England');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('Budapest');
            this.$newMarkerAddressInput.val('Budapest, Ferenciek Tere');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('New York');
            this.$newMarkerAddressInput.val('New York, Empire State Building');
            this.$addMarkerButton.trigger('click');
        }
        return MarkerList;
    }());
    App.MarkerList = MarkerList;
})(App || (App = {}));
//# sourceMappingURL=markerList.js.map