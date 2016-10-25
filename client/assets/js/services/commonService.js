/**
 * Created by chengchao on 15/8/25.
 */

'use strict';
define([], function () {
  var commonService = function ($resource, $q) {
    //Base64
    var _PADCHAR = "=";
    var _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function _getbyte64(s, i) {
      var idx = _ALPHA.indexOf(s.charAt(i));
      if (idx === -1) {
        throw "Cannot decode base64";
      }
      return idx;
    }

    function _decode(s) {
      var pads = 0,
        i,
        b10,
        imax = s.length,
        x = [];

      s = String(s);

      if (imax === 0) {
        return s;
      }

      if (imax % 4 !== 0) {
        throw "Cannot decode base64";
      }

      if (s.charAt(imax - 1) === _PADCHAR) {
        pads = 1;

        if (s.charAt(imax - 2) === _PADCHAR) {
          pads = 2;
        }
        imax -= 4;
      }

      for (i = 0; i < imax; i += 4) {
        b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
      }

      switch (pads) {
        case 1:
          b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6);
          x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
          break;

        case 2:
          b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
          x.push(String.fromCharCode(b10 >> 16));
          break;
      }

      return x.join("");
    }

    function _getbyte(s, i) {
      var x = s.charCodeAt(i);
      if (x > 255) {
        throw "INVALID_CHARACTER_ERR: DOM Exception 5";
      }
      return x;
    }

    function _encode(s) {

      s = String(s);

      var i,
        b10,
        x = [],
        imax = s.length - s.length % 3;

      if (s.length === 0) {
        return s;
      }

      for (i = 0; i < imax; i += 3) {
        b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2);
        x.push(_ALPHA.charAt(b10 >> 18));
        x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
        x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
        x.push(_ALPHA.charAt(b10 & 0x3f));
      }

      switch (s.length - imax) {
        case 1:
          b10 = _getbyte(s, i) << 16;
          x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
          break;

        case 2:
          b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
          x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
          break;
      }

      return x.join("");
    }

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

    //新增分享列表
    var _GetShareList = function(url){
      var defer = $q.defer();
      _BaseGetRequest(url).then(function (data) {
          defer.resolve(data);
        },function (e) {
        console.log(e);
        defer.reject(e);
      });
      return defer.promise;
    }

    var _GetRequest = function (url) {
      var defer = $q.defer();
      _BaseGetRequest(url).then(function (data) {
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

    var _ShowPosition = function (position) {
      var latitude = position.coords.latitude + ',' + position.coords.longitude;
      var url = "http://maps.google.cn/maps/api/geocode/json?latlng=" + latitude + "&language=CN";
      var defer = $q.defer();
      _BaseGetRequest(url).then(function (data) {
        if (data.status == "OK") {
          var result = {province: '', city: '', position: position};
          angular.forEach(data.results[0].address_components, function (data) {
            if (data.types == "administrative_area_level_1,political") {
              result.province = data.long_name;
            } else if (data.types == "locality,political") {
              result.city = data.long_name;
            }
          });
          defer.resolve(result);
        } else {
          defer.reject("定位失败,请手动选择");
        }
      }, function (data) {
        defer.reject("定位失败,请手动选择");
      });
      return defer.promise;
    }

    ///^1(3[0-9]|5[0-35-9]|7[01235-9]|8[01235-9])\d{8}$/
    var _MobileCheck = function (inpVal) {
      var Errors = [true, "*请输入手机号码", "*请正确填写手机号码"];
      var phoneNum = inpVal;
      var defer = $q.defer();
      if (phoneNum == null || phoneNum == "") {
        defer.reject({msg: Errors[1]});
        return defer.promise;
      } else if (phoneNum.length != 11) {
        defer.reject({msg: Errors[2]});
        return defer.promise;
      } else if (!phoneNum.match(/^0?1[3|4|5|7|8][0-9]\d{8}$/)) {
        defer.reject({msg: Errors[2]});
        return defer.promise;
      }
      defer.resolve(inpVal);
      return defer.promise;
    }

    var _IdCardCheck = function (idCard) {
      var defer = $q.defer();
      var Errors = [
        true,
        "请输入身份证号码", "身份证号码校验错误"];
      var reg = /^(?:\d{8}(?:0[1-9]|1[0-2])[0123]\d{4}|\d{6}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])[0123]\d{4}[0-9Xx])?$/;
      if (idCard == null || idCard == "") {
        defer.reject({msg: Errors[1]});
      } else if (idCard && !reg.test(idCard)) {
        defer.reject({msg: Errors[2]});
      } else {
        defer.resolve('ok');
      }
      defer.resolve(idCard);
      return defer.promise;
    }

    var _IdCardCheckFull = function (idCard) {
      var defer = $q.defer();
      var Errors = [
        true,
        "*身份证号码位数不对", "*身份证号码校验错误",
        "*身份证号码校验错误", "*身份证地区非法", "请输入身份证号码"];
      var area = {
        11: "\u5317\u4eac",
        12: "\u5929\u6d25",
        13: "\u6cb3\u5317",
        14: "\u5c71\u897f",
        15: "\u5185\u8499\u53e4",
        21: "\u8fbd\u5b81",
        22: "\u5409\u6797",
        23: "\u9ed1\u9f99\u6c5f",
        31: "\u4e0a\u6d77",
        32: "\u6c5f\u82cf",
        33: "\u6d59\u6c5f",
        34: "\u5b89\u5fbd",
        35: "\u798f\u5efa",
        36: "\u6c5f\u897f",
        37: "\u5c71\u4e1c",
        41: "\u6cb3\u5357",
        42: "\u6e56\u5317",
        43: "\u6e56\u5357",
        44: "\u5e7f\u4e1c",
        45: "\u5e7f\u897f",
        46: "\u6d77\u5357",
        50: "\u91cd\u5e86",
        51: "\u56db\u5ddd",
        52: "\u8d35\u5dde",
        53: "\u4e91\u5357",
        54: "\u897f\u85cf",
        61: "\u9655\u897f",
        62: "\u7518\u8083",
        63: "\u9752\u6d77",
        64: "\u5b81\u590f",
        65: "\u65b0\u7586",
        71: "\u53f0\u6e7e",
        81: "\u9999\u6e2f",
        82: "\u6fb3\u95e8",
        91: "\u56fd\u5916"
      };
      var Y, JYM;
      var S, M;
      var idCard_array = new Array();
      idCard_array = idCard.split("");
      if (idCard == "") {//为空
        defer.reject({msg: Errors[5]});
        return defer.promise;
      }
      if (area[parseInt(idCard.substr(0, 2))] == null) {
        defer.reject({msg: Errors[4]});
        return defer.promise;
      }
      var ereg = null;
      switch (idCard.length) {
        case 15://15_DIGITS_ID_TOKEN
          if ((parseInt(idCard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idCard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idCard.substr(6, 2)) + 1900) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
          } else {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
          }
          if (ereg.test(idCard)) {
            defer.reject({msg: Errors[0]});
          } else {
            defer.reject({msg: Errors[2]});
            return defer.promise;
          }
          break;
        case 18:
          if (parseInt(idCard.substr(6, 4)) % 4 == 0 || (parseInt(idCard.substr(6, 4)) % 100 == 0 && parseInt(idCard.substr(6, 4)) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
          } else {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
          }
          if (ereg.test(idCard)) {
            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
            Y = S % 11;
            M = "F";
            JYM = "10X98765432";
            M = JYM.substr(Y, 1);
            if (idCard_array[17] == "x") {
              idCard_array[17] = "X";
            }
            if (M == idCard_array[17]) {
              defer.reject({msg: Errors[0]});
              return defer.promise;
            } else {
              defer.reject({msg: Errors[3]});
              return defer.promise;
            }
          } else {
            defer.reject({msg: Errors[2]});
            return defer.promise;
          }
          break;
        default:
          defer.reject({msg: Errors[2]});
          return defer.promise;
          break;
      }
      defer.resolve(idCard);
      return defer.promise;
    }

    //UTF16->UTF8
    function _UTF162UTF8(s) {
      var i, code, ret = [], len = s.length;
      for (i = 0; i < len; i++) {
        code = s.charCodeAt(i);
        if (code > 0x0 && code <= 0x7f) {
          ret.push(s.charAt(i));
        } else if (code >= 0x80 && code <= 0x7ff) {
          ret.push(
            String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
            String.fromCharCode(0x80 | (code & 0x3f))
          );
        } else if (code >= 0x800 && code <= 0xffff) {
          ret.push(
            String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
            String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
            String.fromCharCode(0x80 | (code & 0x3f))
          );
        }
      }
      return ret.join('');
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

    var _isEmail = function (email) {
      var defer = $q.defer();
      var Errors = [true, "请输入正确的邮箱"];
      var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (email.search(reg) != -1){
        defer.resolve('ok');
      }else{
        defer.reject({msg: Errors[1]});
      }
      defer.resolve(email);
      return defer.promise;
    }


    return {
      Encode: _encode,
      Decode: _decode,
      BaseGetRequest: _BaseGetRequest,
      BasePostRequest: _BasePostRequest,
      PostRequest: _PostRequest,
      GetRequest: _GetRequest,
      UTF162UTF8: _UTF162UTF8,
      Notify: _Notify,
      ErrorNotify: _ErrorNotify,
      ShowPosition: _ShowPosition,
      IdCardCheck: _IdCardCheck,
      MobileCheck: _MobileCheck,
      PageLoad: _PageLoad,
      Loading: _Loading,
      LoadingEnd: _LoadingEnd,
      IsEmail: _isEmail,
      GetShareList:_GetShareList
    }
  };

  commonService.$inject = ['$resource', '$q'];
  app.register.factory('commonService', commonService);
});
