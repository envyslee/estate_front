/**
 * Created by dell on 2016/10/27.
 */
define([], function () {
  var outFixController = function ($scope, $stateParams, $state, $controller,commonService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.list = {
      items :[],
      busy : false,
      after: '',
      page : 1,
      rows:10,
      areaName:''
    }



    $scope.nextPage=function () {
      if ($scope.list.busy){
        return;
      }
      $scope.list.busy=true;

      //ajax更新数据
      convenientService.GetOutFixList($scope.list.page,$scope.list.rows).then(function (d) {
        if(d.total>0){
          $scope.list.page++;
          var data=$scope.list.items;
          $scope.list.items=data.concat(d.data);
        }
        $scope.list.busy=false;
      },function () {
        alert('获取数据异常，请稍后再试');
      });

    }





  };
  outFixController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService'];
  app.register.controller('outFixController', outFixController);
});
