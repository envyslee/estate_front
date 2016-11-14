/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var houseDetailController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var from=$stateParams.from;
    var id=$stateParams.id;

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.goBack=function () {
     if(from=='home'){
       $state.go('house');
     }else {
       $state.go('houseList',{type:from});
     }
    }

    $scope.goGallery=function () {
      $state.go('gallery',{from:from,id:id});
    }



  };
  houseDetailController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('houseDetailController', houseDetailController);
});
