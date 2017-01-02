/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var galleryController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    // var from=$stateParams.from;
    // var id=$stateParams.id;

    $scope.imgUrls=$stateParams.urls.split(',');

    $scope.gallaryInit=function () {
      $('.am-gallery').pureview();
    }

    $scope.goBack=function () {
     // $state.go('houseDetail',{from:from,id:id});
    }

  };
  galleryController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('galleryController', galleryController);
});
