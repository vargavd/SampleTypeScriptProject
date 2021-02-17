"use strict";
var App;
(function (App) {
    var Marker = (function () {
        function Marker(title, address, latitude, longitude) {
            this.title = title;
            this.address = address;
            this.latitude = latitude;
            this.longitude = longitude;
        }
        return Marker;
    }());
    App.Marker = Marker;
})(App || (App = {}));
//# sourceMappingURL=marker.js.map