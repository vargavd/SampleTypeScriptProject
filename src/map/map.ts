namespace App {
    export class Map {
        // google maps related vars
        private _gMap: google.maps.Map;

        get gMap(): google.maps.Map {
            return this._gMap;
        }

        // DOM (centering)
        $latInput = $('#latitude') as JQuery<HTMLInputElement>;
        $lngInput = $('#longitude') as JQuery<HTMLInputElement>;
        $latLngButton = $('#lat-lng-center') as JQuery<HTMLButtonElement>;
        $addressInput = $('#address') as JQuery<HTMLInputElement>;
        $addressButton = $('#address-center') as JQuery<HTMLButtonElement>;

        // private funcs
        private latLngButtonClicked = () => {
            const
                latitude = this.$latInput.val(),
                longitude = this.$lngInput.val();

            if (typeof latitude === "string" && latitude !== "" && typeof longitude === "string" && longitude !== "") {
                this.setCenter(+latitude, +longitude);
            }
        };
        private addressButtonClicked = () => {
            const
                address = this.$addressInput.val();

            if (typeof address === "string" && address.length > 0) {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                    .then((response: GoogleGeocodeResult) => {
                        if (response.data.status !== 'ZERO_RESULT') {
                            const location = response.data.results[0].geometry.location;

                            this.setCenter(location.lat, location.lng);
                        }
                    });
            }
        };
        private setCenter = (lat: number, lng: number) => {
            this._gMap.setCenter({ lat, lng })
        }

        constructor(lat: number, lng: number, zoom: number = 8) {
            // set up the events
            this.$latLngButton.on('click', this.latLngButtonClicked);
            this.$addressButton.on('click', this.addressButtonClicked);

            // create the map
            this._gMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat, lng },
                zoom: zoom
            });
        }
    }
}