app.service("supplierService", function ($http) {


    this.GetAll = function () {

        return $http.get("/api/Supplier");

    };

    this.insertServiceArea = function (serviceArea) {
        var response = $http({
            method: "POST",
            url: "/api/Supplier",
            data: JSON.stringify(serviceArea),
            dataType: "json"
        });
        return response;
    }

    this.getBounds = function (id) {

        var response = $http({
            method: "GET",
            url: "/api/Supplier/" + id,
            data: JSON.stringify(id),
            dataType: "json"
        });
        return response;

    };


    this.ifSupplierExist = function (id) {

        var response = $http({
            method: "GET",
            url: "/api/supplier/ifSupplierExist/" + id,
            data: JSON.stringify(id),
            dataType: "json"
        });
        return response;

    };



});