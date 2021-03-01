namespace App {
    export type AddMarkerListener = (marker: App.Marker) => void;
    export type RemoveMarkerListener = (id: string) => void;

    export class MarkersState {
        // MARKERS
        private markers: App.Marker[] = [];

        // LISTENERS
        private addMarkerListeners: AddMarkerListener[] = [];
        private removeMarkerListeners: RemoveMarkerListener[] = [];

        // SUBSCRIBER FUNCS
        listenToAdding(listener: AddMarkerListener) {
            this.addMarkerListeners.push(listener);
        }
        listenToRemoving(listener: RemoveMarkerListener) {
            this.removeMarkerListeners.push(listener);
        }

        // SINGLETON PATTERN
        private static instance: MarkersState;
        static map: google.maps.Map;
        private constructor() { }
        static getInstance(map: google.maps.Map) {
            if (this.instance) {
                return this.instance;
            }

            this.instance = new MarkersState();
            this.map = map;

            return this.instance;
        }

        // EVENTS
        addMarker(lat: number, lng: number, title: string, address: string) {
            const marker = new App.Marker(lat, lng, title, address, MarkersState.map);

            this.markers.push(marker);

            this.addMarkerListeners.forEach((listener) => listener(marker));

            return marker;
        }
        removeMarker(id: string) {
            let removedMarkerIndex: number = -1;

            for (let i = 0; i < this.markers.length; i++) {
                if (this.markers[i].id === id) {
                    removedMarkerIndex = i;
                }
            }

            if (removedMarkerIndex === -1) {
                throw new Error(`The following id (${id}) is not found in the markers array.`);
            }

            this.markers.splice(removedMarkerIndex, 1);

            this.removeMarkerListeners.forEach(listener => listener(id));
        }
    }
}


