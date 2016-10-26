/**
 * Created by chengchao on 15/8/24.
 */

define([], function () {
  var crdLoadingController = function ($scope, $stateParams, $state, $controller, crdService, userService,commonService,$q) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.form = {};

    var getReport = function () {
      var defer = $q.defer();
      crdService.GetReport().then(function (json) {
        if (json.StatusCode == 0) {
          defer.resolve(submitReport(json.Result));
        } else {
          defer.reject(json.StatusDescription);
        }
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    commonService.PageLoad(getReport);

    var submitReport = function (jsonStr) {
      var defer = $q.defer();
      var json = JSON.parse(jsonStr);
      crdService.SubmitReport(json.Id,json.ReportSn, json.Name,json.ReportCreateTime).then(function (json) {
        defer.resolve($state.go('limit'));
      }, function (e) {
        defer.reject(e);
      });
      return defer.promise;
    }

    //var getCust = function(){
    //  var defer = $q.defer();
    //  userService.GetCust().then(function(cust){
    //    if (cust.custSex == 1) {
    //      defer.resolve($state.go('social_gjj'));
    //    } else {
    //      defer.resolve($state.go('limit'));
    //    }
    //  },function(e){  defer.reject(e);})
    //  return defer.promise;
    //}
  };

  crdLoadingController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'crdService', 'userService','commonService','$q'];
  app.register.controller('crdLoadingController', crdLoadingController);
});
