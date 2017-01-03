/**
 * Created by dell on 15/8/25.
 */

'use strict';
define([], function () {
  var commonService = function ($resource, $q,beautyCache) {

    var _BasePostRequest = function (url, param) {
      var api = $resource(url);
      var defer = $q.defer();
      api.save(param, function (data) {
        defer.resolve(data);
      }, function (data) {
        console.log(data);
        defer.reject(data);
      });
      return defer.promise;
    }

    var _BaseGetRequest = function (url) {
      var api = $resource(url);
      var defer = $q.defer();
      api.get(function (data) {
        defer.resolve(data);
      }, function (data) {
        console.log(data);
        defer.reject(data);
      });
      return defer.promise;
    }

    var _PostRequest = function (url, param) {
      var defer = $q.defer();
      _BasePostRequest(url, param).then(function (data) {
        if (data.result == 0) {
          defer.resolve(data.content);
        }
        else {
          console.log(data);
          defer.reject(data);
        }
      }, function (e) {
        console.log(e);
        defer.reject(e);
      });
      return defer.promise;
    }



    var _Notify = function (content) {
      var msg = '';
      if (content) {
        if (content.message && content.message.length > 0)
          msg = content.message;
        else
          msg = content;
      }
      else {
        msg = "系统异常";
      }

      var notify_alert = document.querySelector('#alert');
      if(notify_alert){
        document.body.removeChild(notify_alert);
      }
      notify_alert = document.createElement("div");
      notify_alert.id='alert';
      notify_alert.className='maja';
      notify_alert.innerHTML='<p></p>';
      document.body.appendChild(notify_alert);
      document.querySelector('#alert>p').innerHTML = msg;
      angular.element(document.querySelector('#alert')).css('display', 'block');
    }

    var _ErrorNotify = function () {
      _Notify("系统异常");
    }






    var _PageLoad = function (fn) {
      angular.element(document.querySelector('#pageload')).triggerHandler('pageload', function () {
        var defer = $q.defer();
        fn().then(function (data) {
          defer.resolve(data);
        }, function (e) {
          //_ErrorNotify();
          _Notify(e);
          defer.reject(e);
        });
        return defer.promise;
      });
    };

    var _Loading = function () {
      angular.element(document.querySelector('#loading')).triggerHandler('loading');
    }

    var _LoadingEnd = function () {
      angular.element(document.querySelector('#loading')).triggerHandler('end');
    }

    var cacheObj=function (key ,value) {
      beautyCache.put(key,value);
    }

    var getCacheObj=function (key) {
      return beautyCache.get(key);
    }

    var _checkIdNo=function (idNo) {
      var reg=/^(?:\d{8}(?:0[1-9]|1[0-2])[0123]\d{4}|\d{6}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])[0123]\d{4}[0-9Xx])?$/;
      if(reg.test(idNo))
        return true;
      return false;
    }

    var _checkPhone=function (phoneNo) {
      var reg=/^0?1[3|4|5|7|8][0-9]\d{8}$/;
      if(reg.test(phoneNo))
        return true;
      return false;
    }


    var _compress=function (img) {
      var canvas = document.createElement("canvas");
      var ctx=canvas.getContext('2d');
      var tCanvas = document.createElement("canvas");
      var tctx = tCanvas.getContext("2d");
      
      var width = img.width;
      var height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      var ratio;
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      var count;
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
          for (var j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //进行最小压缩
      var ndata = canvas.toDataURL('image/jpeg', 0.1);
      // console.log('压缩前：' + initSize);
      // console.log('压缩后：' + ndata.length);
      // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    }




    return {
      BaseGetRequest: _BaseGetRequest,
      BasePostRequest: _BasePostRequest,
      PostRequest: _PostRequest,
      Notify: _Notify,
      ErrorNotify: _ErrorNotify,
      PageLoad: _PageLoad,
      Loading: _Loading,
      LoadingEnd: _LoadingEnd,
      CacheObj:cacheObj,
      GetCacheObj:getCacheObj,
      CheckIdNo:_checkIdNo,
      CheckPhone:_checkPhone,
      Compress:_compress
    }
  };

  commonService.$inject = ['$resource', '$q','beautyCache'];
  app.register.factory('commonService', commonService);
});
