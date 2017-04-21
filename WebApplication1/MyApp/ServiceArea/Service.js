app.service("serviceAreaService", function ($http) {


    this.GetAll = function () {

        return $http.get("/api/ServiceArea");

    };

});