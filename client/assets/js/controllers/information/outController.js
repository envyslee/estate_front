/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var outController = function ($scope, $stateParams, $state, $controller,commonService,userService,informationService,convenientService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var type=$stateParams.type;
    $scope.title= type=='sale'?'我要卖房':'我要出租';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }

    $scope.outInfo={
      village:'',
      houseType:'',
      fixture:'',
      houseProperty:'',
      address:'',
      houseArea:'',
      housePrice:'',
      phone:'',
      remarks:''
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
          var result=this.result;
          var img=new Image();
          img.src=result;
          var maxsize=100*1024;
          if(result.length<=maxsize){
            $scope.imgSrc.b1=result;
          }else {
            if(img.complete){
              $scope.imgSrc.b1=commonService.Compress(img);
              img = null;
            }else{
              img.onload=function () {
                $scope.imgSrc.b1=commonService.Compress(img);
                img = null;
              }
            }
          }
        }
      }else  if($scope.imgSrc.i2==''){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          var result=this.result;
          var img=new Image();
          img.src=result;
          var maxsize=100*1024;
          if(result.length<=maxsize){
            $scope.imgSrc.b2=result;
          }else {
            if(img.complete){
              $scope.imgSrc.b2=commonService.Compress(img);
              img = null;
            }else{
              img.onload=function () {
                $scope.imgSrc.b2=commonService.Compress(img);
                img = null;
              }
            }
          }
        }
      }else {
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
          var result=this.result;
          var img=new Image();
          img.src=result;
          var maxsize=100*1024;
          if(result.length<=maxsize){
            $scope.imgSrc.b3=result;
          }else {
            if(img.complete){
              $scope.imgSrc.b3=commonService.Compress(img);
              img = null;
            }else{
              img.onload=function () {
                $scope.imgSrc.b3=commonService.Compress(img);
                img = null;
              }
            }
          }
        }
      }
      $scope.$apply();
      imgIndex++;
    }

    $scope.outInit=function () {
      commonService.Loading();
      var villages= commonService.GetCacheObj('village');
      if (villages==null){
        userService.GetVillage().then(function (data) {
          if(data.status==200){
            commonService.LoadingEnd();
            $scope.villages=data.data;
            commonService.CacheObj('village',data.data);
          }else{
            alert('获取小区失败，请稍后再试');
          }
        },function (e) {
          commonService.LoadingEnd();
          alert('获取小区失败，请稍后再试');
        });
      }else{
        commonService.LoadingEnd();
        $scope.villages=villages;
      }
    }

    $scope.outSubmit=function () {

      if(!commonService.CheckPhone($scope.outInfo.phone)){
        alert('手机号不正确，请重新输入');
        return;
      }

      commonService.Loading();
      informationService.SubmitSell($scope.outInfo,type=='sale'?1:2).then(function (d) {
        if(d.status==200) {
          if ($scope.imgSrc.b1 == '' && $scope.imgSrc.b2 == '' && $scope.imgSrc.b3 == '') {
            commonService.LoadingEnd();
            history.go(-1);
          } else {
            convenientService.SaveImg($scope.imgSrc, d.data,5).then(function (data) {
              commonService.LoadingEnd();
              if (data.status == 200) {
                alert('提交成功，工作人员将尽快给您推荐优质客源');
                history.go(-1);
              } else {
                alert('图片上传失败');
              }
            }, function (e) {
              commonService.LoadingEnd();
              alert('图片上传失败');
            })
          }
        }else{
          alert('提交失败，请稍后再试');
        }
      },function (e) {
        commonService.LoadingEnd();
        alert('提交失败，请稍后再试');
      });
    }


  };
  outController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService','userService','informationService','convenientService'];
  app.register.controller('outController', outController);
});
