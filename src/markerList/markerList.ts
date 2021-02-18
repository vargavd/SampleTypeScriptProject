declare const GOOGLE_API_KEY: string;
declare var axios: any;

namespace App {

    export class Marker {
        constructor(
            public title: string,
            public address: string,
            public latitude: number,
            public longitude: number) { }
    }

    export class MarkerList {
        // NEW MARKER DOM
        $newMarkerTitleInput = $('#new-marker-title') as JQuery<HTMLInputElement>;
        $newMarkerAddressInput = $('#new-marker-address') as JQuery<HTMLInputElement>;
        $addMarkerButton = $('#add-marker') as JQuery<HTMLButtonElement>;

        // MARKER LIST DOM
        $markerList = $('#marker-list') as JQuery<HTMLDivElement>;
        $markerTemplate = $('.marker-list-item-template').detach() as JQuery<HTMLLinkElement>;

        // private consts
        markers: Marker[] = [];

        // private funcs
        renderMarkers = () => {
            // empty the marker list DOM
            this.$markerList.empty();

            // rerender the marker list
            this.markers.forEach((marker: Marker, index: number) => {
                var
                    // DOM
                    $marker = this.$markerTemplate.clone();

                // set up marker DOM
                $marker.attr('data-index', index);
                $marker.find('.marker-title').text(marker.title);
                $marker.find('.marker-address').text(marker.address);
                $marker.find('.marker-latitude').text(marker.latitude);
                $marker.find('.marker-longitude').text(marker.longitude);

                // remove event
                $marker.find('.remove-marker').on('click', this.removeMarkerFuncGenerator(index));

                this.$markerList.append($marker);

                // render on the map
                gMap.addMarker(marker.latitude, marker.longitude);
            });
        };
        removeMarkerFuncGenerator = (markerIndex: number) => () => {
            if (this.markers.length === 0) {
                throw new Error('Trying to remove element ' + markerIndex + ' when markers array is empty');
            }

            if (0 > markerIndex || markerIndex > this.markers.length - 1) {
                throw new RangeError('markerIndex (' + markerIndex + ') is out of range, should be between' + 0 + ' and ' + (this.markers.length - 1));
            }

            this.markers.splice(markerIndex, 1);

            this.renderMarkers();

        };
        addMarkerButtonClicked = () => {
            const
                title = this.$newMarkerTitleInput.val(),
                address = this.$newMarkerAddressInput.val();

            if (typeof title !== 'string' || title.length === 0 || typeof address !== 'string' || address.length === 0) {
                return; // TODO: VALIDATION
            }

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                .then((response: GoogleGeocodeResult) => {
                    if (response.data.status !== 'ZERO_RESULT') {
                        const location = response.data.results[0].geometry.location;

                        // adding the new marker to the list
                        this.markers.push(new Marker(title, address, location.lat, location.lng));

                        // render markers
                        this.renderMarkers();

                        // tell app.js that the markers have changed
                        this.markersChanged(this.markers);
                    }
                });
        };


        constructor(public markersChanged: (markers: Marker[]) => void) {
            // set up events
            this.$addMarkerButton.on('click', this.addMarkerButtonClicked);

            // TESTING
            this.$newMarkerTitleInput.val('London');
            this.$newMarkerAddressInput.val('London, England');
            this.$addMarkerButton.trigger('click');
        }
    }
}