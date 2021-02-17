namespace App {
    export class Map {
        private gMap: google.maps.Map;
        private gMarkers: google.maps.Marker[] = [];

        constructor(lat: number, lng: number, zoom: number = 8) {
            this.gMap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat, lng },
                zoom: zoom
            });
        }

        setCenter(lat: number, lng: number) {
            this.gMap.setCenter({ lat, lng })
        }

        addMarker(lat: number, lng: number) {
            this.gMarkers.push(new google.maps.Marker({
                position: { lat, lng },
                map: this.gMap
            }));
        }
    }
}