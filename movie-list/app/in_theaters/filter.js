;
(function (angular) {
  angular.module('app')
    .filter('getNames', function () {
      return function (directors, join) {
        var count = directors.length - 1
        var result = ''
        directors.forEach(function (director, index) {
          if (index === count) {
            return result += director.name
          }
          result += (director.name + join)
        })
        return result
      }
    })
    .filter('getTotalPage', function () {
      return function (total, pageSize) {
        return Math.ceil(total / pageSize)
      }
    })
})(angular)
