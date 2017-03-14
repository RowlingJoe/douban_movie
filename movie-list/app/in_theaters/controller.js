;
(function (angular) {
  angular.module('app')
    .controller('ListController', [
      '$scope',
      '$http',
      'HttpService',
      '$routeParams',
      '$route',
      function ($scope, $http, HttpService, $routeParams, $route) {
        // 当路由路径中有查询字符串的时候，ngRoute 会自动帮你把查询字符串解析成一个对象，交给 $routeParams
        // 也就是说可以通过 $routeParams 服务对象拿到当前请求中的查询字符串数据
        // 当动态路径中设定了 page 选项的时候，ngRoute 会自动帮你解析出来放到 $routeParmas 对象上
        // ngRoute 把动态路径参数和查询字符串都解析到一个对象上了
        var page = ($routeParams.page && parseInt($routeParams.page)) || 1 // 获取 hash 里面的请求路径中的页码，默认为第 1 页
        var pageSize = 5 // 每页显示大小
        $scope.page = page
        $scope.pageSize = pageSize
        $scope.totalPage = 0
        $scope.title = 'Loading...'
        $scope.movie_list = []
        $scope.loading = true
        $scope.go = function (willPage) {
          // 如果将要跳转的页码小于等于0，则不处理
          if (willPage <= 0) {
            return
          }

          // 如果将要跳转的页码大于总页码，则不处理
          if (willPage > $scope.totalPage) {
            return
          }
          // #!/in_theaters?page=x
          // 这个方法表示更新路由规则中设定的路径参数（不是查询字符串）
          // 调用过后，路径就被更改了，同时当前控制器以及页面会被重新执行渲染
          $route.updateParams({
            page: willPage
          })
        }
        var queryData = {
          start: (page - 1) * pageSize,
          count: pageSize
        }
        $routeParams.q && (queryData.q = $routeParams.q)
        HttpService.jsonp({
            url: 'https://api.douban.com/v2/movie/' + $routeParams.category,
            data: queryData
          })
          // promise 对象内部的 resolve 就是用来接收 then 方法中指定的回调处理函数的
          .then(function (data) {
            $scope.movie_list = data
              // 在咱们自己封装的异步 API 中，如果修改了 $scope 模型上的数据一定要记得通过 $scope.$apply() 强制更新模型数据
            $scope.title = data.title
            $scope.loading = false
            $scope.totalPage = Math.ceil(data.total / pageSize)
            $scope.$apply()
          })
      }
    ])
})(angular)
