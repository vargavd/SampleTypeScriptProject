namespace App {
    export type GoogleGeocodeResult = {
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
    };
}