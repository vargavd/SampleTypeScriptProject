"use strict";
var $newMarkerTitleInput = $('#new-marker-title'), $newMarkerAddressInput = $('#new-marker-address'), $addMarkerButton = $('#add-marker'), $latInput = $('#latitude'), $lngInput = $('#longitude'), $latLngButton = $('#lat-lng-center'), $addressInput = $('#address'), $addressButton = $('#address-center'), $markerList = $('#marker-list'), $markerTemplate = $('.marker-list-item-template').detach(), gMap, markers = [], latLngButtonClicked = function () {
    var latitude = $latInput.val(), longitude = $lngInput.val();
    if (typeof latitude === "string" && latitude !== "" && typeof longitude === "string" && longitude !== "") {
        centerMap(+latitude, +longitude);
    }
}, addressButtonClicked = function () {
    var address = $addressInput.val();
    if (typeof address === "string" && address.length > 0) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_API_KEY)
            .then(function (response) {
            if (response.data.status !== 'ZERO_RESULT') {
                var location_1 = response.data.results[0].geometry.location;
                centerMap(location_1.lat, location_1.lng);
            }
        });
    }
}, addMarkerButtonClicked = function () {
    var title = $newMarkerTitleInput.val(), address = $newMarkerAddressInput.val();
    if (typeof title !== 'string' || title.length === 0 || typeof address !== 'string' || address.length === 0) {
        return;
    }
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_API_KEY)
        .then(function (response) {
        if (response.data.status !== 'ZERO_RESULT') {
            var location_2 = response.data.results[0].geometry.location;
            addMarker(title, address, location_2.lat, location_2.lng);
            renderMarkers();
        }
    });
}, centerMap = function (latitude, longitude) {
    gMap.setCenter(latitude, longitude);
}, addMarker = function (title, address, latitude, longitude) {
    markers.push(new App.Marker(title, address, latitude, longitude));
}, renderMarkers = function () {
    $markerList.empty();
    markers.forEach(function (marker) {
        var $marker = $markerTemplate.clone();
        $marker.find('.marker-title').text(marker.title);
        $marker.find('.marker.address').text(marker.address);
        $marker.find('.marker-latitude').text(marker.latitude);
        $marker.find('.marker-longitude').text(marker.longitude);
        $markerList.append($marker);
        gMap.addMarker(marker.latitude, marker.longitude);
    });
}, initMap = function () {
    gMap = new App.Map(30, 0, 2.1);
    $latLngButton.on('click', latLngButtonClicked);
    $addressButton.on('click', addressButtonClicked);
    $addMarkerButton.on('click', addMarkerButtonClicked);
    $newMarkerTitleInput.val('London');
    $newMarkerAddressInput.val('London');
    $addMarkerButton.trigger('click');
};
//# sourceMappingURL=app.js.map