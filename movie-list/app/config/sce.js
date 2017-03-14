;
(function (angular) {
  angular.module('app')
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.douban.com/v2/**'
      ])
    }])
})(angular)
