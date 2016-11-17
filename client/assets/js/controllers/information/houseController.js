/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var houseController = function ($scope, $stateParams, $state, $controller,commonService,informationService) {
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

      informationService.GetSale(4).then(function (d) {
        if(d.status==200){
          $scope.sale=d.data;
        }
      });

      informationService.GetTenement(4).then(function (d) {
        if(d.status==200){
          $scope.tenement=d.data;
        }
      })
    }


   

  };
  houseController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','informationService'];
  app.register.controller('houseController', houseController);
});
