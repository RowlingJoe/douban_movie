;
(function (angular) {
  angular.module('app')
    .controller('SubjectController', [
      '$scope',
      'HttpService',
      '$routeParams',
      function ($scope, HttpService, $routeParams) {

        $scope.movie = {}

        // /subject/1
        // /subject/2
        var id = $routeParams.id
        HttpService.jsonp({
          url: ' https://api.douban.com/v2/movie/subject/' + id
        }).then(function (data) {
          $scope.movie = data
          $scope.$apply() // 在自己写的 jsonp 的回到处理函数中，如果修改了模型数据，一定要记得 $scope.$apply() 用以刷新模型数据
        })
      }
    ])
})(angular)
