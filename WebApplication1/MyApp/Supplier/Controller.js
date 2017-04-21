
/// <reference path="c:\users\ibrahim ayman\documents\visual studio 2013\Projects\WebApplication1\WebApplication1\scripts/angular.min.js" />
/// <reference path="../Module.js" />
app.controller("supplierCtrl", function ($scope, supplierService) {
    // gloable variables
    var rectangle;
    var map;
    var infoWindow;
    var ne;
    var sw;

    //$scope.isMoved = true;
    var supplierId;

    $scope.drpGetId = function (id) {
        debugger;
        supplierId = id;
        var getdata = supplierService.getBounds(id);
        getdata.then(function (d) {
            var supplierhasArea = supplierService.ifSupplierExist(id);
            supplierhasArea.then(function (exist) {
                debugger;
                console.log(exist.data);
                if (exist.data == false) {
                    $("#btnSave").prop('disabled', false); // enable save button to insert new values.
                    // initMap with random values
                    initMap(parseFloat('44.7396377337595'), parseFloat('44.5917965236352'), parseFloat('-78.6270209960937'), parseFloat('-78.8742197265626'));
                }
                else {
                    $("#btnSave").prop('disabled', true); // enable save button to insert new values.
                    initMap(parseFloat(d.data.north), parseFloat(d.data.south), parseFloat(d.data.east), parseFloat(d.data.west));
                }
            }, function () { });

        }, function () {
            $("#contentMesg").text('Error in locatong the customer service area.');
            $("#InfoModel").modal('show');
        })

    }

    getAllSuppliers();
    debugger;
    initMap(null, null, null, null);

    function getAllSuppliers() {

        var getData = supplierService.GetAll();
        getData.then(function (supplier) {
            $scope.data = supplier.data;
        }, function () {
            alert('Error in getting records');
        });

    }


    $scope.saveServiceArea = function () {
        var serviceArea = {
            north: ne.lat(),
            south: sw.lat(),
            east: ne.lng(),
            west: sw.lng(),
            SupplierId: supplierId
        }
        if (serviceArea.supplierId === undefined || serviceArea.supplierId === null) {
            $("#headerMsg").text('Info Message');
            $("#contentMesg").text('Please select Customer.');
            $("#InfoModel").modal('show');
        }
        var getdata = supplierService.insertServiceArea(serviceArea);
        getdata.then(function () {
            $("#headerMsg").text('Info Message');
            $("#contentMesg").text('Area Bounds Saved successfuly');
            $("#InfoModel").modal('show');
        }, function () { alert('Error in Saving records') })

    };



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

        google.maps.event.addListener(map, 'click', function (e) {

            console.log(e.latLng.lat() + ', ' + e.latLng.lng());


        });


        // Add an event listener on the rectangle.
        rectangle.addListener('bounds_changed', showNewRect);

        // Define an info window on the map.
        infoWindow = new google.maps.InfoWindow();
    }
    // Show the new coordinates for the rectangle in an info window.

    /** @this {google.maps.Rectangle} */
    function showNewRect(event) {
        debugger;
        //$scope.isMoved = false;
        $("#btnSave").prop('disabled', false);
        ne = rectangle.getBounds().getNorthEast();
        sw = rectangle.getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        //console.log(ne.lat());
        //console.log(ne.lng());
        //console.log(sw.lat());
        //console.log(sw.lng());

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);
    }


});