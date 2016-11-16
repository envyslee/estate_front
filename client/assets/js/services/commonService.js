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
      CheckPhone:_checkPhone
    }
  };

  commonService.$inject = ['$resource', '$q','beautyCache'];
  app.register.factory('commonService', commonService);
});
