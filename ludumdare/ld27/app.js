var app = angular.module(
    'ld27', 
    ['timer'])
    .controller(
        'GameCtrl',
        ['$scope',
         function($scope) {
             // Underscore
             $scope._ = _;
             
             // Setup
             var game = {
                 easy: {
                     columns:10,
                     rows:10,
                     colors:[[],[],[],[],[],
                             [],[],[],[],[]],
                 },
                 medium: {
                     columns:20,
                     rows:20,
                     colors:[[],[],[],[],[],
                             [],[],[],[],[],
                             [],[],[],[],[],
                             [],[],[],[],[]],
                 },
                 hard: {
                     columns:40,
                     rows:40,
                     colors:[[],[],[],[],[],[],[],[],[],[],
                             [],[],[],[],[],[],[],[],[],[],
                             [],[],[],[],[],[],[],[],[],[],
                             [],[],[],[],[],[],[],[],[],[]],
                 },
             };
             resetGame('easy');

             /*
              * Start the game
              */
             $scope.start = function(difficulty) {
                 resetGame(difficulty);
                 $scope.game.score = 0;
                 $scope.game.running = true;
                 $scope.$broadcast('timer-start');
             };

             /*
              * Game Over listener
              */
             $scope.$on('timer-ended', function(newV, oldV) {
                 $scope.total_score = angular.copy($scope.game.score);
                 resetGame($scope.game.difficulty);
             });

             /*
              * Reset Game state
              */
             function resetGame(difficulty) {
                 for (var i = game[difficulty].rows; i--;) {
                     for (var j = game[difficulty].columns; j--;) {
                         game[difficulty].colors[i][j] = getColor();
                     }
                 }

                 $scope.game = {
                     running:false,
                     time:10,
                     columns:game[difficulty].columns,
                     rows:game[difficulty].rows,
                     colors:game[difficulty].colors,
                     difficulty:difficulty,
                 };
             }

         }]
    )
    .directive('boxen', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                color: '=color',
                game: '=game',
                row: '=row',
                col: '=col',
            },
            template: '<div class="box-{{game.difficulty}} box-{{game.colors[row][col]}} floater" ng-click="clicked()">',
            link: function(scope, element, attrs) {
                scope.clicked = function() {
                    // if already clicked return
                    if (scope.game.colors[scope.row][scope.col] == 'gray') return;

                    // Check color and act on game accordingly
                    if (scope.game.colors[scope.row][scope.col] == 'green') {
                        scope.game.time += 2;
                    }
                    else if (scope.game.colors[scope.row][scope.col] == 'blue') {
                        scope.game.score += 1;
                    }
                    else if (scope.game.colors[scope.row][scope.col] == 'red') {
                        scope.game.time -= 1;
                    }
                    else if (scope.game.colors[scope.row][scope.col] == 'orange') {
                        scope.game.score -= 2;
                    }
                    else if (scope.game.colors[scope.row][scope.col] == 'black') {
                        /*
                         * Change black to something else
                         * and randomly change all around it (other than gray)
                         */
                        // Check up to one row before to one after
                        for (var i = -1; i < 2; i++) {
                            var row = scope.row + i;

                            // Row edge detection
                            if (scope.game.colors[row]) {

                                // Check up to one column before to one after
                                for (var j = -1; j < 2; j++) {
                                    var col = scope.col + j;

                                    // Column edge detection
                                    if (scope.game.colors[row][col]) {
                                        scope.game.colors[row][col]= getColor(true);
                                    }
                                }
                            }
                        }
                    }

                    /*
                     * Finally change to gray
                     */
                    scope.game.colors[scope.row][scope.col] = 'gray';
                };
            }
        }
    })
;

function getColor(noBlack) {
    var rand = _.random(1,100), color;
    if (noBlack) {
        rand = _.random(1,80);
    }
    if (1 <= rand && rand <= 40) {
        if (_.random(1,8) === 1) color = "green";
        else                     color = "blue";
    }
    else if (41 <= rand && rand <= 60) color = "red";
    else if (61 <= rand && rand <= 80) color = "orange";
    else if (81 <= rand && rand <= 100) color = "black";
    return color;
}
