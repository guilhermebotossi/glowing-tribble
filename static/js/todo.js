/*
 Copyright 2011 The Go Authors.  All rights reserved.
 Use of this source code is governed by a BSD-style
 license that can be found in the LICENSE file.
*/

function TaskCtrl($scope, $http) {
  $scope.tasks = [];
  $scope.working = false;

  var logError = function(data, status) {
    console.log('code '+status+': '+data);
    $scope.working = false;
  };

  var refresh = function() {
    return $http.get('/task/').
      success(function(data) { $scope.tasks = data.Tasks; }).
      error(logError);
  };

  $scope.addTodo = function() {
    $scope.working = true;
    $http.post('/property/add', {url: $scope.url}).
      error(logError).
      success(function() {
        refresh().then(function() {
          console.log("Success")
        })
      });
  };

  $scope.toggleDone = function(task) {
    data = {ID: task.ID, Title: task.Title, Done: !task.Done}
    $http.put('/task/'+task.ID, data).
      error(logError).
      success(function() { task.Done = !task.Done });
  };

  refresh().then(function() { $scope.working = false; });
}