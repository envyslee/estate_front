/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var crdRouteController = function ($scope, $stateParams, $state, $controller, crdService, homeService,commonService,userService,$q) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    var getReport = function () {
      var defer = $q.defer();
      crdService.GetReport().then(function (json) {
        if (json.StatusCode == 0) {
          defer.resolve(availabilityCredit(json.Result));
        } else {
          defer.resolve(availabilityCredit());
        }
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    commonService.PageLoad(getReport);

    var availabilityCredit = function (jsonStr) {
      var defer =  $q.defer();
      var json = {};
      if (jsonStr) {
        json = JSON.parse(jsonStr);
      }
      crdService.AvailabilityCredit(json.Id,json.ReportSn, json.Name,json.ReportCreateTime).then(function (json) {
        defer.resolve(process());
      }, function (e) {
        defer.reject(e);
      });
      defer.promise;
    }

    var process = function(){
      var defer = $q.defer();
      homeService.GetCurrentState( userService.GetUser().openId).then(function (data) {
        $state.go(homeService.Process(data));
      },function(e){
        defer.reject(e);
      });
      defer.promise;
    }
  };

  crdRouteController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'crdService', 'homeService','commonService','userService','$q'];
  app.register.controller('crdRouteController', crdRouteController);
});
