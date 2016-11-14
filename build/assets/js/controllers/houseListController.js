/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var houseListController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.list = {
      items :[],
      busy : false,
      after: '',
      page : 0
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

    $scope.houseListInit=function () {
      $scope.list.items=origin;
    }

    $scope.nextPage=function () {
      if ($scope.list.busy){
        return;
      }
      $scope.list.busy=true;

      //ajax更新数据
        $scope.list.items=[];
        $scope.list.items=origin.concat(add);
        $scope.list.busy=false;


    }



    var origin=[{title:'城南花园 单间1',time:'2014/12/12 12:00:00',id:'1',price:'2342314.33',area:'103㎡'},
      {title:'城南花园2 三室一厅',time:'2014/12/12 12:00:00',id:'2',price:'2314.33',area:'103㎡'},
      {title:'城南花园3 公寓',time:'2014/12/12 12:00:00',id:'3',price:'23424.33',area:'103㎡'},
      {title:'城南花园4 隔断',time:'2014/12/12 12:00:00',id:'4',price:'2343',area:'103㎡'},
      {title:'城南花园5 单间',time:'2014/12/12 12:00:00',id:'5',price:'2314.33',area:'103㎡'},
      {title:'城南花园6 公寓',time:'2014/12/12 12:00:00',id:'3',price:'2342314.33',area:'103㎡'},
      {title:'城南花园7 隔断',time:'2014/12/12 12:00:00',id:'4',price:'14.33',area:'103㎡'},
      {title:'城南花园8 单间',time:'2014/12/12 12:00:00',id:'5',price:'234',area:'103㎡'},
      {title:'城南花园9 公寓',time:'2014/12/12 12:00:00',id:'3',price:'14.33',area:'103㎡'},
      {title:'城南花园10 隔断',time:'2014/12/12 12:00:00',id:'4',price:'314.33',area:'103㎡'},
      {title:'城南花园11 单间',time:'2014/12/12 12:00:00',id:'5',price:'2314.33',area:'103㎡'},
      {title:'城南花园12 公寓',time:'2014/12/12 12:00:00',id:'3',price:'23423',area:'103㎡'},
      {title:'城南花园13 隔断',time:'2014/12/12 12:00:00',id:'4',price:'242.33',area:'103㎡'},
      {title:'城南花园14 单间',time:'2014/12/12 12:00:00',id:'5',price:'2342314.33',area:'103㎡'},
      {title:'城南花园15 公寓',time:'2014/12/12 12:00:00',id:'3',price:'22333',area:'103㎡'},
      {title:'城南花园16 隔断',time:'2014/12/12 12:00:00',id:'4',price:'2314.33',area:'103㎡'},
      {title:'城南花园17 单间',time:'2014/12/12 12:00:00',id:'5',price:'2314.33',area:'103㎡'}];


    var add=[{title:'城南花园18 单间',time:'2014/12/12 12:00:00',id:'18',price:'2342314.33',area:'103㎡'},
      {title:'城南花园19 三室一厅',time:'2014/12/12 12:00:00',id:'19',price:'2342314.33',area:'103㎡'},
      {title:'城南花园20 公寓',time:'2014/12/12 12:00:00',id:'20',price:'2342314.33',area:'103㎡'},
      {title:'城南花园21 隔断',time:'2014/12/12 12:00:00',id:'21',price:'2342314.33',area:'103㎡'},
      {title:'城南花园 单间22222222',time:'2014/12/12 12:00:00',id:'22',price:'2342314.33',area:'103㎡'}];



  };
  houseListController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('houseListController', houseListController);
});
