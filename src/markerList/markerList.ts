declare const GOOGLE_API_KEY: string;
declare var axios: any;

namespace App {

    export class MarkerList {
        private _markersState: App.MarkersState;

        // NEW MARKER DOM
        $newMarkerTitleInput = $('#new-marker-title') as JQuery<HTMLInputElement>;
        $newMarkerAddressInput = $('#new-marker-address') as JQuery<HTMLInputElement>;
        $addMarkerButton = $('#add-marker') as JQuery<HTMLButtonElement>;

        // MARKER LIST DOM
        $markerList = $('#marker-list') as JQuery<HTMLDivElement>;
        $markerTemplate = $('.marker-list-item-template').detach().removeClass('marker-list-item-template') as JQuery<HTMLLinkElement>;

        // private funcs
        markerAdded = (title: string, address: string, lat: number, lng: number, id: string) => {
            var
                // DOM
                $marker = this.$markerTemplate.clone();

            // set up marker DOM
            $marker.find('.marker-title').text(title);
            $marker.find('.marker-address').text(address);
            $marker.find('.marker-latitude').text(lat);
            $marker.find('.marker-longitude').text(lng);
            $marker.attr('data-id', id);

            // add event
            $marker.find('.remove-marker').on('click', this.removeMarkerClicked);

            this.$markerList.append($marker);
        };
        markerRemoved = (markerId: string) => {
            const $marker = $(`.marker-list-item[data-id="${markerId}"]`);

            if ($marker.length === 0) {
                throw new Error('Trying to remove element ' + markerId + ' which does not exists.');
            }

            $marker.remove();
        };
        addMarkerButtonClicked = () => {
            const
                title = this.$newMarkerTitleInput.val(),
                address = this.$newMarkerAddressInput.val();

            if (typeof title !== 'string' || title.length === 0 || typeof address !== 'string' || address.length === 0) {
                return; // TODO: VALIDATION
            }

            this.$newMarkerTitleInput.val('');
            this.$newMarkerAddressInput.val('');

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                .then((response: GoogleGeocodeResult) => {
                    if (response.data.status !== 'ZERO_RESULT') {
                        const location = response.data.results[0].geometry.location;

                        // tell the state object to add this marker
                        this._markersState.addMarker(location.lat, location.lng, title, address);
                    }
                });
        };
        removeMarkerClicked = (event: Event) => {
            var
                $removeLink = $(event.target as HTMLElement),
                $marker = $removeLink.closest('.marker-list-item'),

                // misc
                markerId = $marker.attr('data-id') as string;

            this._markersState.removeMarker(markerId);
        };


        constructor(markersState: App.MarkersState) {
            this._markersState = markersState;

            // set up DOM events
            this.$addMarkerButton.on('click', this.addMarkerButtonClicked);

            // set up state events
            this._markersState.listenToAdding(this.markerAdded);
            this._markersState.listenToRemoving(this.markerRemoved);

            // TESTING
            this.$newMarkerTitleInput.val('London');
            this.$newMarkerAddressInput.val('London, England');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('Budapest');
            this.$newMarkerAddressInput.val('Budapest, Ferenciek Tere');
            this.$addMarkerButton.trigger('click');
            this.$newMarkerTitleInput.val('New York');
            this.$newMarkerAddressInput.val('New York, Empire State Building');
            this.$addMarkerButton.trigger('click');

            // setTimeout(() => {
            //     this.removeMarkerFuncGenerator(1)();
            // }, 500);
        }
    }
}