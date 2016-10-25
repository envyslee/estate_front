/**
 * Created by dell on 2016/10/25.
 */
define([], function () {
  var investmentController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.list=[{img:'assets/images/hand.png',title:'xx物业',desc:'房屋买卖',time:'2016/09/28 10:42:15',phone:'135****5654'},
      {img:'assets/images/hand.png',title:'xx物业',desc:'房屋买卖',time:'2016/09/28 10:42:15',phone:'135****5654'},
      {img:'assets/images/hand.png',title:'xx物业',desc:'房屋买卖',time:'2016/09/28 10:42:15',phone:'135****5654'},
      {img:'assets/images/hand.png',title:'xx物业',desc:'房屋买卖',time:'2016/09/28 10:42:15',phone:'135****5654'},
      {img:'assets/images/hand.png',title:'xx物业',desc:'房屋买卖',time:'2016/09/28 10:42:15',phone:'135****5654'}];

  };
  investmentController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('investmentController', investmentController);
});
