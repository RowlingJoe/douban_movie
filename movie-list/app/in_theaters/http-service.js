;
(function (angular) {
  Object.prototype.queryStringify = function () {
    var queryString = ''
    for (var key in this) {
      // 过滤掉原型上的属性成员
      if (this.hasOwnProperty(key)) {
        queryString += (key + '=' + this[key] + '&')
      }
    }
    return queryString
  }

  angular.module('app')
    .service('HttpService', ['$window', '$document', function ($window, $document) {
      // 内部有一个 this 可以直接为该服务添加属性方法
      this.jsonp = function (options) {
        return new Promise(function (resolve, reject) {
          var callbackName = 'itcast_' + Math.random().toString().substr(2)
          // 下面的回调处理函数取决于 script 标签什么时候请求响应成功并且被浏览器解析执行
          // 该方法是由浏览器去解析执行的
          $window[callbackName] = function (data) {
            // 这里调用 resolve 就相当于调用了 promise 对象的 then 方法中指定的回调处理函数
            resolve(data)
            $document[0].body.removeChild(script)
          }

          var script = $document[0].createElement('script')

          if (typeof options.data === 'object') {
            options.data = options.data.queryStringify()
          } else {
            options.data = ''
          }

          script.src = options.url + '?' + options.data + 'callback=' + callbackName

          // 该 script 标签什么时候请求响应成功，不确定
          // 它的请求不是由你发出的，由浏览器发出去的
          $document[0].body.appendChild(script)
        })
      }
    }])
})(angular)
