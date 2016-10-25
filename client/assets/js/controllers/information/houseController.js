/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var houseController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.houseInit=function () {
      $('#mySwiper').swiper({
        speed:300,
        loop:true,
        autoplay:3000,
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction:false
      });
    }

  };
  houseController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('houseController', houseController);
});
