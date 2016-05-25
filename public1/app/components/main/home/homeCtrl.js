angular.module('orthoApp')
    .controller('homeCtrl', function($scope, mainService, $state) {

        function initMap() {
            var lyman = {
                lat: 41.32,
                lng: -110.29
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                center: lyman,
                scrollwheel: false,
                zoom: 7
            });
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            // HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var request = {
                        destination: lyman,
                        origin: pos,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    // Pass the directions request to the directions service.
                    var directionsService = new google.maps.DirectionsService();
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            // Display the route on the map.
                            directionsDisplay.setDirections(response);
                        }
                    });
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }
        initMap();

    });
