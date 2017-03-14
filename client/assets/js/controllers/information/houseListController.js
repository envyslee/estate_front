/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var houseListController = function ($scope, $stateParams, $state, $controller,commonService,informationService) {
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


    if($stateParams.type=='sale'){
      $scope.title='卖房信息';
      $scope.goType='sale';
    }else {
      $scope.title='出租信息';
      $scope.goType='tenement';
    }

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }



    $scope.nextPage=function () {
      if ($scope.list.busy){
        return;
      }
      $scope.list.busy=true;

      //ajax更新数据
      informationService.GetList($stateParams.type,$scope.list.page,$scope.list.rows,$scope.list.areaName).then(function (d) {
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

    $scope.houseSearch=function () {
      $scope.list.items=[];
      $scope.list.page=1;
      $scope.list.busy=true;
      //ajax更新数据
      informationService.GetList($stateParams.type,$scope.list.page,$scope.list.rows,$scope.list.areaName).then(function (d) {
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
  houseListController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','informationService'];
  app.register.controller('houseListController', houseListController);
});
