/// <reference path="./utils/map/map.ts" />
/// <reference path="./utils/marker/marker.ts" />

// TODO: SPLIT CODE MORE
// TODO: implement events (Singleton maybe?)
// TODO: VALIDATION


declare var axios: any;
declare const GOOGLE_API_KEY: string;

type GoogleGeocodeResult = {
    data: {
        results: {
            geometry: {
                location: {
                    lat: number,
                    lng: number
                }
            }
        }[],
        status: string
    }
}

let
    // MARKER FORM DOM
    $newMarkerTitleInput = $('#new-marker-title'),
    $newMarkerAddressInput = $('#new-marker-address'),
    $addMarkerButton = $('#add-marker'),

    // CENTER MAP FORM DOM
    $latInput = $('#latitude'),
    $lngInput = $('#longitude'),
    $latLngButton = $('#lat-lng-center'),
    $addressInput = $('#address'),
    $addressButton = $('#address-center'),

    // MARKERS DOM
    $markerList = $('#marker-list'),
    $markerTemplate = $('.marker-list-item-template').detach(),

    // main consts
    gMap: App.Map,
    markers: App.Marker[] = [],

    // events
    latLngButtonClicked = () => {
        const
            latitude = $latInput.val(),
            longitude = $lngInput.val();

        if (typeof latitude === "string" && latitude !== "" && typeof longitude === "string" && longitude !== "") {
            centerMap(+latitude, +longitude);
        }
    },
    addressButtonClicked = () => {
        const
            address = $addressInput.val();

        if (typeof address === "string" && address.length > 0) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                .then(function (response: GoogleGeocodeResult) {
                    if (response.data.status !== 'ZERO_RESULT') {
                        const location = response.data.results[0].geometry.location;

                        centerMap(location.lat, location.lng);
                    }
                });
        }
    },
    addMarkerButtonClicked = () => {
        const
            title = $newMarkerTitleInput.val(),
            address = $newMarkerAddressInput.val();

        if (typeof title !== 'string' || title.length === 0 || typeof address !== 'string' || address.length === 0) {
            return; // TODO: VALIDATION
        }

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
            .then(function (response: GoogleGeocodeResult) {
                if (response.data.status !== 'ZERO_RESULT') {
                    const location = response.data.results[0].geometry.location;

                    addMarker(title, address, location.lat, location.lng);

                    renderMarkers();
                }
            });
    },

    // main funcs
    centerMap = function (latitude: number, longitude: number) {
        gMap.setCenter(latitude, longitude);
    },
    addMarker = function (title: string, address: string, latitude: number, longitude: number) {
        markers.push(new App.Marker(title, address, latitude, longitude));
    },
    renderMarkers = function () {
        $markerList.empty();

        markers.forEach((marker: App.Marker) => {
            var
                // DOM
                $marker = $markerTemplate.clone();

            $marker.find('.marker-title').text(marker.title);
            $marker.find('.marker.address').text(marker.address);
            $marker.find('.marker-latitude').text(marker.latitude);
            $marker.find('.marker-longitude').text(marker.longitude);

            $markerList.append($marker);

            // render on the map
            gMap.addMarker(marker.latitude, marker.longitude);
        });
    },

    // this function will be called by google maps
    initMap = function () {
        gMap = new App.Map(30, 0, 2.1);

        // setting up events
        $latLngButton.on('click', latLngButtonClicked);
        $addressButton.on('click', addressButtonClicked);
        $addMarkerButton.on('click', addMarkerButtonClicked);

        $newMarkerTitleInput.val('London');
        $newMarkerAddressInput.val('London');
        $addMarkerButton.trigger('click');
    };


