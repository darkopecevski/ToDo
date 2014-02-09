'use strict';

angular.module('todoAngularYeomanApp')
  .controller('TodoCtrl', function ($scope, $routeParams, filterFilter, todoLocalStorage) {
        var todos = $scope.todos = todoLocalStorage.get();
        $scope.isChecklist = true;

        $scope.addTodo = function() {
            var newTodo = $scope.todoItem.trim();
            if (!newTodo) {
                return false;
            }

            todos.unshift({
                title: newTodo,
                done: false
            })

            $scope.todoItem = '';
        };

        $scope.removeTodo = function(todo) {
            var index = todos.indexOf(todo);

            if (index > -1) {
                todos.splice(index, 1);
            }
        };

        $scope.$on('$routeChangeSuccess', function() {
            var todoStatus = $scope.todoStatus = $routeParams.todoStatus || '';

            if (todoStatus == '') {
                $scope.todoFilter = null;
            } else if (todoStatus == 'done') {
                $scope.todoFilter = {done: true};
            } else if (todoStatus == 'active') {
                $scope.todoFilter = {done: false};
            }
        });

        $scope.$watch('todos', function(todoItem, oldItem) {
            $scope.activeTodos = filterFilter(todos, {done: false}).length;
            $scope.doneTodos = todos.length - $scope.activeTodos;
            if (todoItem !== oldItem) {
                todoLocalStorage.put(todos);
            }
        }, true);

        $scope.clearDone = function() {
            var tmpArr = [];
            angular.forEach(todos, function(value, key) {
                if (!value.done) {
                    tmpArr.push(value);
                }
            });
            $scope.todos = todos = tmpArr;
        };

        $scope.deleteTodos = function() {
            $scope.todos = todos = [];
        }

        $scope.toggleChecklist = function(toggle) {
            $scope.isChecklist = toggle;
        }

  });
