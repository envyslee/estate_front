/**
 * Created by dell on 2016/10/27.
 */

define([], function () {
  var enteringController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var from=$stateParams.from;
    if(from=='inFix'){
      $scope.title="室内报修";
    }else if(from=='wash'){
      $scope.title="洗衣服务";
    }else if(from=='housekeeping'){
      $scope.title="家政服务";
    }

    $scope.imgSrc={
      i1:'',
      i2:'',
      i3:''
    }

    var imgIndex=1;

    $scope.labelClick=function () {
      if(imgIndex>3){
        alert('只可以上传3张图片');
        return;
      }
      var appVersion=window.navigator.appVersion;
      if((/iphone|ipad/gi).test(appVersion)){
        var input=document.getElementById('p1');
        input.click();
      }
    }

    $scope.showMax=function (index) {
      document.body.style.overflow='hidden';
      if(index==1){
        $scope.chooseImg=$scope.imgSrc.i1;
      }else if(index==2){
        $scope.chooseImg=$scope.imgSrc.i2;
      }else if(index==3){
        $scope.chooseImg=$scope.imgSrc.i3;
      }
    }

    $scope.closeMax=function () {
      document.body.style.overflow='auto';
      $scope.chooseImg='';
    }

    $scope.delImg=function (index) {
      if(index==1){
        $scope.imgSrc.i1='';
      }else if(index==2){
        $scope.imgSrc.i2='';
      }else if(index==3){
        $scope.imgSrc.i3='';
      }
      imgIndex--;
    }

    $scope.uploadImg = function () {
      var file = event.target.files[0];
      if($scope.imgSrc.i1==''){
        $scope.imgSrc.i1=window.URL.createObjectURL(file);
      }else  if($scope.imgSrc.i2==''){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
      }else {
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
      }
      $scope.$apply();
      imgIndex++;
    }

  };
  enteringController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('enteringController', enteringController);
});
