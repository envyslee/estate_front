/**
 * Created by dell on 2016/11/23.
 */
define([], function () {
  var outFixAddController = function ($scope, $stateParams, $state, $controller,commonService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.fixInfo={
      name:'',
      area:'',
      content:'',
      areaId:''
    }

    $scope.outFixSubmit=function () {
      convenientService.SubmitOutFix($scope.fixInfo).then(function (data) {
        if(data.status==200){

        }
      },function (e) {
        alert('提交失败，请稍后再试')
      })
    }



    $scope.imgSrc={
      i1:'',
      i2:'',
      i3:'',
      b1:'',
      b2:'',
      b3:''
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
        $scope.imgSrc.b1='';
      }else if(index==2){
        $scope.imgSrc.i2='';
        $scope.imgSrc.i2='';
      }else if(index==3){
        $scope.imgSrc.i3='';
        $scope.imgSrc.b3='';
      }
      imgIndex--;
    }

    $scope.uploadImg = function () {
      var file = event.target.files[0];
      if($scope.imgSrc.i1==''){
        $scope.imgSrc.i1=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b1=zipPic(this.result);
        }
      }else  if($scope.imgSrc.i2==''){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b2=zipPic(this.result);
        }
      }else {
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          $scope.imgSrc.b3=zipPic(this.result);
        }
      }
      $scope.$apply();
      imgIndex++;
    }

    var zipPic=function (result) {
      var canvas=document.getElementById("uploadImg");
      var cxt=canvas.getContext('2d');
      var img=new Image();
      img.src= result;
      canvas.width=640;
      canvas.height=640*(img.height/img.width);
      cxt.drawImage(img,0,0,640,canvas.height);
      return canvas.toDataURL("image/jpeg",0.9);
    }

  };
  outFixAddController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','convenientService'];
  app.register.controller('outFixAddController', outFixAddController);
});
