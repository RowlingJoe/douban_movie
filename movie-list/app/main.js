;
(function (angular) {
  angular.module('app', ['ngRoute'])
    .controller('SearchController', ['$scope', '$route', function ($scope, $route) {
      $scope.searchText = ''
      $scope.search = function (searchText) {
        if (searchText.trim() === '') {
          return
        }
        // 当路由规则中没有设定 q 的时候，则 q 会以查询字符串的形式放到请求路径之后
        // 如果路由规则中设定了 :category :page 则会被更新为路径参数部分
        $route.updateParams({
          category: 'search',
          page: 1,
          q: searchText
        })
      }
    }])
})(angular)
