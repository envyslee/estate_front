define([], function () {
  var zjsListController = function ($scope, $stateParams, $state, $controller, $location, zjsService, userService, commonService) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
  $scope._init = function(){
    zjsService.queryContentList().then(function(data){
      console.log(data.Liren_Content);
      $scope.ContentList = data.Liren_Content;
    }, function(e){
    });
  }

    //跳转到下一个页面
    $scope.onTouch = function(value){
      var reg = /\?$/;
      var url = "";
      if(reg.test(value.URL)){
        url = value.URL + "imagePath=" + $stateParams.qcrPath;
      }else{
        url = value.URL + "&imagePath=" + $stateParams.qcrPath;
      }
      window.location.href = url;
    }

  }
  //注入对象
  zjsListController.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location', 'zjsService', 'userService', 'commonService'];
  app.register.controller('zjsListController', zjsListController);
});
