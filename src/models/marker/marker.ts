namespace App {
    class InfoWindow {
        private static infoWindow: google.maps.InfoWindow;
        private constructor() { }

        static get() {
            if (this.infoWindow) {
                return this.infoWindow;
            }

            this.infoWindow = new google.maps.InfoWindow({});

            return this.infoWindow;
        }
    }

    export class Marker {
        // private vars
        private _gMarker: google.maps.Marker;
        private _id: string;
        private _map: google.maps.Map;
        private _title: string;
        private _address: string;
        private _infoWindow: google.maps.InfoWindow;

        // getters for private vars
        get gMarker(): google.maps.Marker {
            return this._gMarker;
        }
        get id(): string {
            return this._id;
        }

        // events
        private onMarkerClick = () => {
            this._infoWindow.close();

            this._infoWindow.setContent(`<strong>${this._title}</srong><br />${this._address}`);

            this._infoWindow.open(this._map, this._gMarker);
        }

        constructor(
            lat: number,
            lng: number,
            title: string,
            address: string,
            map: google.maps.Map
        ) {
            this._title = title;
            this._address = address;
            this._map = map;
            this._id = Math.floor(Math.random() * 100000000).toString();

            this._gMarker = new google.maps.Marker({
                position: { lat, lng },
                map,
                title
            });

            this._infoWindow = InfoWindow.get();

            this._gMarker.addListener("click", this.onMarkerClick);
        }
    }
}