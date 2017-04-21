/// <reference path="../Module.js" />
app.controller("ServiceAreaCtrl", function ($scope, serviceAreaService) {

    initMap(null, null, null, null);
    getall();
    var allServiceAreas = [];

    function getall() {
        var getdata = serviceAreaService.GetAll();
        getdata.then(function (d) {
            $scope.serviceArea = d.data;

            $.each(d.data, function (index, value) {
                allServiceAreas.push(value);
            });

            //console.log('data is '+ allServiceAreas);
        }, function () { alert('arror in getting records'); });
    }



    function initMap(north, south, east, west) {

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 44.5452, lng: -78.5389 },
            zoom: 9
        });

        var bounds = {
            north: north,
            south: south,
            east: east,
            west: west
        };

        // Define the rectangle and set its editable property to true.
        rectangle = new google.maps.Rectangle({
            bounds: bounds,
            editable: true,
            draggable: true
        });

        rectangle.setMap(map);

        // Add an event listener on the rectangle.
        rectangle.addListener('bounds_changed', showNewRect);

        google.maps.event.addListener(map, 'click', function (e) {

            debugger;
            var area;

            for (var i = 0; i < allServiceAreas.length; i++) {

                var triangleCoords = [
                         { lat: parseFloat(allServiceAreas[i].north), lng: parseFloat(allServiceAreas[i].west) },
                         { lat: parseFloat(allServiceAreas[i].north), lng: parseFloat(allServiceAreas[i].east) },
                         { lat: parseFloat(allServiceAreas[i].south), lng: parseFloat(allServiceAreas[i].east) },
                         { lat: parseFloat(allServiceAreas[i].south), lng: parseFloat(allServiceAreas[i].west) }
                ];

                //var triangleCoords = [
                //         { lat: 45.0218308454953, lng: -77.4267709960938 },
                //         { lat: 45.0218308454953, lng: -76.674201171875 },
                //         { lat: 44.5741906313423, lng: -76.674201171875 },
                //         { lat: 44.5741906313423, lng: -77.4267709960938 }
                //];

                var CurrentServiceArea = new google.maps.Polygon({ paths: triangleCoords });

                var resultColor =
                    google.maps.geometry.poly.containsLocation(e.latLng, CurrentServiceArea) ?
                    'blue' :
                    'red';

                if (resultColor == "blue") {
                    $("#divMsg").text('this point belongs to the supplier ' + allServiceAreas[i].SupplierId);
                    $("#divMsg").addClass('lert alert-danger text-center');
                    break;
                }
                if (resultColor == "red") {
                    $("#divMsg").text('this point dos not belongs to any supplier');
                    $("#divMsg").removeClass('lert alert-danger');
                }

                var resultPath =
                    google.maps.geometry.poly.containsLocation(e.latLng, CurrentServiceArea) ?
                    // A triangle.
                    "m 0 -1 l 1 2 -2 0 z" :
                    google.maps.SymbolPath.CIRCLE;

                new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    icon: {
                        path: resultPath,
                        fillColor: resultColor,
                        fillOpacity: .2,
                        strokeColor: 'white',
                        strokeWeight: .5,
                        scale: 10
                    }
                });
            }

        });

        // Define an info window on the map.
        infoWindow = new google.maps.InfoWindow();
    }
    // Show the new coordinates for the rectangle in an info window.

    /** @this {google.maps.Rectangle} */
    function showNewRect(event) {
        ne = rectangle.getBounds().getNorthEast();
        sw = rectangle.getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        //console.log(ne.lat());
        //console.log(ne.lng());
        //console.log(sw.lat());
        //console.log(sw.lng());

        console.log(contentString);

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);
    }

});