namespace App {
    export class Map {
        // google maps related vars
        private gMap: google.maps.Map;
        private gMarkers: google.maps.Marker[] = [];
        private infoWindows: google.maps.InfoWindow[] = [];

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
            this.gMap.setCenter({ lat, lng })
        }

        // public funcs
        addMarker(lat: number, lng: number, title: string = '', address: string = '') {
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: this.gMap,
                title
            });

            this.gMarkers.push(marker);

            if (title && address) {
                const infoWindow = new google.maps.InfoWindow({
                    content: `<strong>${title}</strong><br />${address}`
                });

                this.infoWindows.push(infoWindow);

                marker.addListener("click", () => {
                    infoWindow.open(this.gMap, marker);
                });
            }
        }
        removeAllMarkers() {
            this.gMarkers.forEach(gMarker => {
                gMarker.setMap(null);
            });

            this.gMarkers = [];
        }

        constructor(lat: number, lng: number, zoom: number = 8) {
            // set up the events
            this.$latLngButton.on('click', this.latLngButtonClicked);
            this.$addressButton.on('click', this.addressButtonClicked);

            // create the map
            this.gMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat, lng },
                zoom: zoom
            });
        }
    }
}