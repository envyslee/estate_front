var app = null;

(function () {
  'use strict';

  app = angular.module('beauty', [
    'ui.router',
    'ngResource',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',
    'infinite-scroll'
  ]);

  app.service = {
    'baseUrl': 'http://localhost:8080/wy',

   // 'baseUrl': '/wy',

    'type':'1',
    'version':'1.0'
  };

  app.config(config);

  app.factory('beautyCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('beauty', {capacity: 50});
  }]);

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider'];

  function config($urlProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, $rootScope) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    //$locationProvider.hashPrefix('!');

    //angular sys-collections
    app.register =
    {
      controller: $controllerProvider.register,
      directive: $compileProvider.directive,
      filter: $filterProvider.register,
      factory: $provide.factory,
      service: $provide.service
    };

    //Post param
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.defaults.transformRequest = function (data) {
      if (angular.isObject(data)) {
        if (data instanceof FileList || data instanceof File) {
          return paramFile(data);
        }
        else {
          return param(data);
        }
      }
      else
        return data;
    };
  }

  app.run(['beautyCache', function (beautyCache) {
    FastClick.attach(document.body);
    app.register.directive('vScroll', vScroll);
    app.register.directive('vPageload', vPageLoad);
    app.register.directive('vLoading', vLoading);
    app.register.directive('inputOnChange',vInputFile);
  }]);



  var param = function (obj) {

    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; i++) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }

    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  var paramFile = function (data) {
    var fd = new FormData();
    angular.forEach(data, function (value, key) {
      if (value instanceof FileList) {
        if (value.length == 1) {
          fd.append(key, value[0]);
        } else {
          angular.forEach(value, function (file, index) {
            fd.append(key + '_' + index, file);
          });
        }
      } else {
        fd.append(key, value);
      }
    });
    return fd;
  }
})();



var vInputFile=function(){
  return{
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.inputOnChange);
      element.bind('change', onChangeFunc);
    }
  }
}

var vScroll = function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      vScroll_model: "=ngModel",
      vScroll_startX: "@",
      vScroll_imgSrc: "@",
      vScroll_id: "@",
      vScroll_min: "@",
      vScroll_max: "@",
      vScroll_left: "@",
      vScroll_right: "@",
      vScroll_base: "@",
      vScroll_factor: "@"
    },
    template: '<div class="scroll-wrap">' +
    '<p class="scroll-bar"><img src="" alt="" style="width: auto;"></p>' +
    '<p class="scroll-line age-line "></p>' +
    '<div class="scroll-mask fade"><img class="swing" src="assets/images/hand.png" alt=""></div>' +
    '</div>',
    link: function (scope, element, attrs) {
      var img = element.children()[0].querySelector('img');
      img.src = attrs.vScrollImgSrc;
      img.onload = function () {
        var vScroll = new IScroll(element.children()[0], {
          scrollX: true,
          scrollY: false,
          mouseWheel: true,
          probeType: 3,
          startX: parseInt(attrs.vScrollStartX),
          zoomMin: 1,
          zoomMax: 1
        });

        vScroll.on("scroll", function () {
          var self = this;
          var num = parseInt(attrs.vScrollMin);
          var x = self.x;
          if (x >= 0) {
            self.scrollTo(parseInt(attrs.vScrollLeft), 0);
            num = parseInt(attrs.vScrollMin);
          } else if (x < parseInt(attrs.vScrollRight)) {
            self.scrollTo(parseInt(attrs.vScrollRight), 0);
            num = parseInt(attrs.vScrollMax);
          } else {
            num += parseInt(Math.floor(-x / attrs.vScrollBase)) * parseInt(attrs.vScrollFactor);
          }
          scope.$apply(function () {
            scope.vScroll_model = num;
          });
        });
      }
    },
    replace: true
  }
};

var vPageLoad = function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      loadingtext: '@',
      loadingfunc: '@'
    },
    templateUrl: 'templates/common/pageload.html',
    link: function (scope, element) {
      element.css('display', 'none');
      scope.show = false;
      var loadingText = scope.loadingtext && scope.loadingtext.length > 0 ? scope.loadingtext : '努力加载中...';
      var errorText = '哎呀，服务器开小差了！刷新一下吧！';
      document.querySelector('#loadingtext').innerHTML = loadingText;
      document.querySelector('#refresh').addEventListener('click', function () {
        window.location.reload();
      });

      element.on('pageload', function (event, cb) {
        element.css('display', 'block');
        document.querySelector('#loadingtext').innerHTML = loadingText;
        cb().then(function (data) {
          element.css('display', 'none');
        }, function (e) {
          document.querySelector('#loadingtext').innerHTML = errorText;
          element.css('display', 'block');
        });
      });
    },
    replace: true
  }
};

var vLoading = function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/common/loading.html',
    compile: function (element) {
      element.on('loading', function () {
        element.css('display', 'block');
      });
      element.on('end', function () {
        element.css('display', 'none');
      });
    },
    replace: true
  }
};
