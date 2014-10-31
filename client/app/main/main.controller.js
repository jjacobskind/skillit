'use strict';

angular.module('generatorApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.search_text;
    $scope.awesomeThings = [];


    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.getRecipes = function() {
      $http.post('/api/things/get_recipes', {search: $scope.search_text})
        .success(function(recipe_list) {
          $scope.awesomeThings = recipe_list;
        });
    };

    $scope.tagRecipe = function(url) {
      console.log(url);
      $http.post('/api/things/tag_recipe', {url: url});
    };
  });
