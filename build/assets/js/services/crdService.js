/**
 * Created by chengchao on 15/8/24.
 */
'use strict';
define([], function () {
  function crdService(commonService, userService, $q) {
    var creditapi = app.service.credituri;
    var o2oapi = app.service.baseuri;

    var _Init = function () {
      var url = creditapi + "pbccrc/init/json";
      return commonService.BaseGetRequest(url);
    };

    var _Login = function (username, password, security_code, token) {
      var defer = $q.defer();
      var tokenParam = token ? token : userService.GetToken();
      userService.GetCust().then(function (cus) {
        var param = {
          'token': tokenParam,
          'username': username,
          'password': password,
          'vercode': security_code,
          'identitycard': cus.idNo,
          'name': ''
        };
        var url = creditapi + "pbccrc/login/json";
        defer.resolve(_post(url, param));
      }, function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    var _GetQuestion = function () {
      var param = {
        'token': userService.GetToken(),
        'type': 'unverify'
      };
      var url = creditapi + "pbccrc/query/apply/1/json";
      return _post(url, param);
    };

    var _SubmitAnswer = function (questions) {
      var param = {
        'token': userService.GetToken(),
        'kbaQuestions': questions
      };
      var url = creditapi + "pbccrc/query/apply/2/json";
      return _post(url, param);
    };

    var _RegFirstSubmit = function (token, name, certNo, certType, vercode) {
      var param = {
        'token': token,
        'name': commonService.UTF162UTF8(name),
        'certNo': certNo,
        'certType': certType,
        'vercode': vercode
      };
      var url = creditapi + "pbccrc/register/1/json";
      return _post(url, param);
    };

    var _registerVerifyMobile = function (token, mobileTel) {
      var param = {
        'token': token,
        'mobileTel': mobileTel
      }
      var url = creditapi + "pbccrc/register/2/json";
      return _post(url, param);
    };

    var _RegSecondSubmit = function (token, username, password, email, mobileTel, smscode) {
      var param = {
        'token': token,
        'username': commonService.UTF162UTF8(username),
        'password': password,
        'confirmpassword': password,
        'email': email,
        'mobileTel': mobileTel,
        'smscode': smscode
      }
      var url = creditapi + "pbccrc/register/3/json";
      return _post(url, param);
    };

    var _GetReport = function () {
      var defer = $q.defer();
      userService.GetCust().then(function (cus) {
        var param = {
          'name': '',
          'identitycard': cus.idNo
        }
        var url = creditapi + "query/summary/json";
        defer.resolve(_post(url, param));
      }, function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    var _SubmitCode = function (querycode) {
      var defer = $q.defer();
      userService.GetCust().then(function (cus) {
        var param = {
          'token': userService.GetToken(),
          'busType': 'LIRENDAIO2O',
          'querycode': querycode,
          'identitycard': cus.idNo,
          'name': ''
        }
        var url = creditapi + "pbccrc/query/report/json";
        defer.resolve(_post(url, param));
      }, function (e) {
        defer.reject(e);
      });

      return defer.promise;
    };

    var _CodeCondition = function () {
      var param = {
        'token': userService.GetToken()
      }
      var url = creditapi + "pbccrc/query/apply/result/json";
      return _post(url, param);
    }

    var _post = function (url, param) {
      return commonService.BasePostRequest(url, commonService.Encode(JSON.stringify(param)));
    }
//------------------------------------------ -----------------------------//

    var _loginCredit = function (data) {
      var url = o2oapi + "credit/login";
      var param = {
        'creditAccount': data.username,
        'creditPass': data.password,
        'creditStatus': data.status,
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId
      };
      return commonService.PostRequest(url, param);
    }

    var _queryCreditCode = function () {
      var url = o2oapi + "credit/queryCreditCode";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId
      };
      return commonService.PostRequest(url, param);
    }

    var _loading = function () {
      var url = o2oapi + "credit/loading";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId
      };
      return commonService.PostRequest(url, param);
    }

    var _submitReport = function (reportId, reportSn, Name, time) {
      var url = o2oapi + "credit/submitReport";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId,
        'reportId': reportId,
        'reportSn': reportSn,
        'custName': Name,
        'time': time
      };
      return commonService.PostRequest(url, param);
    }

    var _getCredit = function () {
      var url = o2oapi + "credit/findByOrderId";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId
      };
      return commonService.PostRequest(url, param);
    }

    var _relogin = function () {
      var url = o2oapi + "credit/getCredit";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId
      };
      return commonService.PostRequest(url, param);
    }

    var _availabilityCredit = function (reportId, reportSn, Name, time) {
      var url = o2oapi + "credit/availabilityCredit";
      var param = {
        'orderId': userService.GetUser().currentOrderId,
        'openId': userService.GetUser().openId,
        'reportId': reportId,
        'reportSn': reportSn,
        'custName': Name,
        'time': time
      };
      return commonService.PostRequest(url, param);
    }

    return {
      Init: _Init,
      Login: _Login,
      GetQuestion: _GetQuestion,
      RegFirstSubmit: _RegFirstSubmit,
      RegisterVerifyMobile: _registerVerifyMobile,
      RegSecondSubmit: _RegSecondSubmit,
      SubmitCode: _SubmitCode,
      SubmitAnswer: _SubmitAnswer,
      CodeCondition: _CodeCondition,
      LoginCredit: _loginCredit,
      QueryCreditCode: _queryCreditCode,
      GetReport: _GetReport,
      Loading: _loading,
      SubmitReport: _submitReport,
      GetCredit: _getCredit,
      Relogin: _relogin,
      AvailabilityCredit: _availabilityCredit
    }
  };
  crdService.$inject = ['commonService', 'userService', '$q'];
  app.register.factory('crdService', crdService);
});
