;
(function (angular) {
  angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          // 路由的核心作用：根据不同请求路径，将指定的模板文件渲染到指定的位置，并且指定具体的控制器处理函数用来处理当前被渲染的视图模板文件
          // 该路由匹配路径只匹配 hash 中的路径部分
          // 例如当一个 hash 为：#!/in_theaters
          // #!/in_theaters/foo  x
          // #!/in_theaters?foo=bar √
          // #!/in_theaters?foo=bar&a=b √
          // 该路径不关心查询字符串
          // /in_theaters √
          // /in_theaters/1 √
          // /in_theaters/2 √
          // /in_theaters/1/2 x
          // 在控制器中可以通过 $route.updateParams 方法更新路径中的动态路径参数
          // 例如：$route.updateParams({ page: 5 }) 则路径中的 page  部分会被改掉，然后路径重载执行
          // /in_theaters/:page? 中的问好表示可有可无
        .when('/list/:category/:page?', {
          templateUrl: 'app/in_theaters/view.html',
          controller: 'ListController'
        })
        .when('/subject/:id', {
          templateUrl: 'app/subject/view.html',
          controller: 'SubjectController'
        })
        .otherwise({
          redirectTo: '/list/in_theaters'
        })
    }])
})(angular)
