angular.module('sampleApp', ['ngRoute', 'templates'])
  .config(config)
  .controller('HomeIndexController', HomeIndexController);

config.$inject = ['$routeProvider', '$locationProvider'];
function config (  $routeProvider,   $locationProvider  )  {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeIndexController',
      controllerAs: 'homeIndexCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
};

HomeIndexController.$inject=['$http'];
function HomeIndexController($http){
  var vm = this;
  vm.greeting = "what's up?";
  vm.newTodo = {};

  $http({
    method: 'GET',
    url: '/api/todos'
  }).then(function successCallback(response) {
     console.log('response for get one', response);
     vm.todos = response.data
   }, function errorCallback(error) {
     console.log('There was an error getting the data', error);
   });

   vm.createTodo = function (){
     $http({
       method: 'POST',
       url: '/api/todos',
       data: vm.newTodo
     }).then(function successCallback(response) {
       console.log('response for create todo:', response);
       vm.todos.push(response.data);
       vm.newTodo = null
     }, function errorCallback(error) {
       console.log('There was an creating the todo', error);
     });
   };
}
