/**
 * Created by dell on 2016/10/26.
 */
define([], function () {
  var outController = function ($scope, $stateParams, $state, $controller,commonService) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.title= $stateParams.type=='sale'?'我要卖房':'我要出租';

    $scope.menushow = false;
    $scope.toggleMenu = function () {
      $scope.menushow = !$scope.menushow;
    }


    $scope.imgSrc={
      i1:'',
      i2:'',
      i3:''
    }

    var imgIndex=1;

    $scope.labelClick=function () {
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

    $scope.uploadImg = function () {
      var file = event.target.files[0];

      if(imgIndex==1){
        $scope.imgSrc.i1=window.URL.createObjectURL(file);
        $scope.$apply();
      }else if(imgIndex==2){
        $scope.imgSrc.i2=window.URL.createObjectURL(file);
        $scope.$apply();
      }else if(imgIndex==3){
        $scope.imgSrc.i3=window.URL.createObjectURL(file);
        $scope.$apply();
      }else{
        alert('只可以上传3张图片');
      }
      imgIndex++;
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload=function () {
      //   var canvas;
      //   if(imgIndex==1){
      //      canvas=document.getElementById('uploadImg1');
      //   }else if(imgIndex==2){
      //      canvas=document.getElementById('uploadImg2');
      //   }else  if(imgIndex==3){
      //      canvas=document.getElementById('uploadImg3');
      //   }else {
      //     alert('只可以上传3张图片');
      //   }
      //   var ctx=canvas.getContext('2d');
      //   canvas.width=64;
      //   canvas.height=64;
      //   var img=new Image();
      //   img.src=this.result;
      //   ctx.drawImage(img,0,0,64,64);
      //   imgIndex++;
      // }
    }


  };
  outController.$inject = ['$scope', '$stateParams', '$state', '$controller','commonService'];
  app.register.controller('outController', outController);
});
