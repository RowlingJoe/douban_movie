;
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

function jsonp(options) {
  return new Promise(function (resolve, reject) {
    var callbackName = 'itcast_' + Math.random().toString().substr(2)
    window[callbackName] = function (data) {
      resolve(data)
      document.body.removeChild(script)
    }

    var script = document.createElement('script')

    if (typeof options.data === 'object') {
      options.data = options.data.queryStringify()
    } else {
      options.data = ''
    }

    // 3. 设定 script 标签的 src = 请求路径?callback=全局回调函数名
    script.src = options.url + '?' + options.data + 'callback=' + callbackName

    // 4. 将 script 标签追加到 DOM 中，发起请求
    document.body.appendChild(script)

    // 5. 当往 body 中追加了一个 script 标签之后
    //    浏览器发现是一个 script 标签，则解析出对应的 src 路径地址，然后发起请求
    //    当浏览器收到服务端响应的数据的时候：callback("abc")
    //    紧接着开始使用 JavaScript 解析执行引擎开始执行 JavaScript 代码
    //    由于服务端响应的是：callback("abc")
    //    所以浏览器直接解析执行的时候，会去全局找打 callback 这个名字的函数
    //    找到函数，带着数据直接调用
  })
}
