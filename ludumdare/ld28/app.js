var app = angular.module('ld28',[])
    .controller(
        'GameCtrl',
        ['$scope',
         function($scope) {
             // Set act data from state
             function setAct(state) {
                 $scope.game.state = acts[state].state;
                 $scope.game.game = acts[state].game;
                 $scope.game.act = acts[state].act;
                 $scope.game.header = acts[state].header;
                 $scope.game.has_img = acts[state].has_img;
                 $scope.game.img = acts[state].img;
                 $scope.game.story = acts[state].story;
                 $scope.game.question = acts[state].question || "";
                 $scope.game.optionName = acts[state].optionName || "";
                 $scope.game.options = acts[state].options;
                 $scope.game.nextAct = acts[state].nextAct || "";
                 if (acts[state].dir)
                     $scope.game.dir = acts[state].dir;
                 $scope.game.show = $scope.game.choices.game[state].show;
             };
             
             // Setup
             var gstate = 'init';
             if (localStorage){ 
                 if (!localStorage.played) {
                     localStorage.played = 'true';
                 }
                 else if (localStorage.played === 'true') {
                     gstate = 'played';
                 }
             }
             $scope.game = {
                 state:gstate,
                 choices: {
                     show:false,
                     planet: {},
                     family: {},
                     power: {},
                     game: {
                         act1:{show:true}, act2:{show:true}, act3:{show:true},
                         act10:{show:true}, act11:{show:true}, act12:{show:true}, act13:{show:true},
                         act14:{show:true}, act15:{show:true}, act16:{show:true}, act17:{show:true},
                         act18:{show:true}, act19:{show:true}, act20:{show:true}, act21:{show:true},
                     },
                 },
                 items: {}
             };

             // Game data
             var acts = {
                 "act1": {
                     state:"act",
                     game:false,
                     act:"1",
                     header:"An unknown world",
                     has_img:true,
                     img:"img-planet.jpg",
                     story:[
                         "The universe is vast.",
                         "Before born, you must decide which world you were born on.",
                         "A charred world? An ice world? Dying? Temperate? You must decide.",
                     ],
                     question:"Which world do you hail from?",
                     optionName:"planet",
                     options:[
                         {"name":"Charhottopia","desc":"A planet known for its Dragons","v":1},
                         {"name":"Icelandia","desc":"A dang cold planet","v":2},
                         {"name":"Dying world","desc":"It's on the verge of being destroyed","v":3},
                         {"name":"Earf","desc":"That boring place","v":4},
                     ],
                     nextAct:['act2','Act 2'],
                 },
                 "act2": {
                     state:"act",
                     game:false,
                     act:"2",
                     header:"Family is forever",
                     has_img:true,
                     img:"img-family.jpg",
                     question:'To which family do you belong?',
                     optionName:"family",
                     options:[
                         {"name":"The Kentz","desc":"An old couple from the farm","v":1},
                         {"name":"The Adamz Family","desc":"A bunch of Goth wannabes","v":2},
                         {"name":"Zombie Milk-man","desc":"A zombie who used to be a milkman","v":3},
                     ],
                     nextAct:['act3','Act 3'],
                 },
                 "act3": {
                     state:"act",
                     game:false,
                     act:"3",
                     header:"Great Power comes with Great Responsibility",
                     has_img:true,
                     img:"img-power.jpg",
                     question:'What power do you have?',
                     optionName:"power",
                     options:[
                         {"name":"Flight","desc":"Right on over the bridge","v":1},
                         {"name":"Laser Eyez","desc":"You can shoot cool red lasers","v":2},
                         {"name":"Peeing your pants","desc":"It really is a power","v":3},
                     ],
                     nextAct:['act19','Begin'],
                 },

                 /*
                  * Game
                  */
                 "act10": {
                     state:"act",
                     game:true,
                     act:"10",
                     header:"A desert",
                     has_img:false,
                     img:"",
                     question:'Would you like to kick the sand?',
                     optionName:"act10",
                     options:[
                         {"name":"Yes","desc":"","v":1},
                         {"name":"No","desc":"","v":2},
                     ],
                     nextAct:['act10','Do it!'],
                     dir:{
                         left:['act13','go left'],
                         right:['act11','go right'],
                         up:['act18','go up'],
                         down:['act14','go down'],
                     },
                 },
                 "act11": {
                     state:"act",
                     game:true,
                     act:"11",
                     header:"Energy",
                     has_img:false,
                     img:"",
                     question:'Touch the spark?',
                     optionName:"act11",
                     options:[
                         {"name":"Yes","desc":"","v":1},
                         {"name":"No","desc":"","v":2},
                     ],
                     nextAct:['act11','Do it!'],
                     dir:{
                         left:['act10','go left'],
                         right:['act12','go right'],
                         up:['act19','go up'],
                         down:['act15','go down'],
                     },
                 },
                 "act12": {
                     state:"act",
                     game:true,
                     act:"12",
                     header:"Silence",
                     has_img:false,
                     img:"",
                     optionName:"act12",
                     options:[
                     ],
                     dir:{
                         left:['act11','go left'],
                         right:['act13','go right'],
                         up:['act20','go up'],
                         down:['act16','go down'],
                     },
                 },
                 "act13": {
                     state:"act",
                     game:true,
                     act:"13",
                     header:"To infinite",
                     has_img:false,
                     img:"",
                     optionName:"act13",
                     options:[
                     ],
                     dir:{
                         left:['act12','go left'],
                         right:['act10','go right'],
                         up:['act21','go up'],
                         down:['act17','go down'],
                     },
                 },
                 "act14": {
                     state:"act",
                     game:true,
                     act:"14",
                     header:"My Power",
                     has_img:false,
                     img:"",
                     question:'Do you begin to cry?',
                     optionName:"act14",
                     options:[
                         {"name":"Yes","desc":"","v":1},
                         {"name":"No","desc":"","v":2},
                     ],
                     nextAct:['act14','Do it!'],
                     dir:{
                         left:['act17','go left'],
                         right:['act15','go right'],
                         up:['act10','go up'],
                         down:['act18','go down'],
                     },
                 },
                 "act15": {
                     state:"act",
                     game:true,
                     act:"15",
                     header:"Another way?",
                     has_img:false,
                     img:"",
                     optionName:"act15",
                     options:[
                     ],
                     dir:{
                         left:['act14','go left'],
                         right:['act16','go right'],
                         up:['act11','go up'],
                         down:['act19','go down'],
                     },
                 },
                 "act16": {
                     state:"act",
                     game:true,
                     act:"16",
                     header:"Family",
                     has_img:false,
                     img:"",
                     question:'Beg your family to leave with you?',
                     optionName:"act16",
                     options:[
                         {"name":"Yes","desc":"Desperately describe to them how they need to come.","v":1},
                         {"name":"No","desc":"Tell them they're better off staying here (and you're sick of them anyway).","v":2},
                     ],
                     nextAct:['act16','Do it!'],
                     dir:{
                         left:['act15','go left'],
                         right:['act17','go right'],
                         up:['act12','go up'],
                         down:['act20','go down'],
                     },
                 },
                 "act17": {
                     state:"act",
                     game:true,
                     act:"17",
                     header:"Reflection",
                     has_img:false,
                     img:"",
                     optionName:"act17",
                     options:[
                     ],
                     dir:{
                         left:['act16','go left'],
                         right:['act14','go right'],
                         up:['act13','go up'],
                         down:['act21','go down'],
                     },
                 },
                 "act18": {
                     state:"act",
                     game:true,
                     act:"18",
                     header:"Old Man",
                     has_img:false,
                     img:"",
                     question:'What do you want to do with the old man?',
                     optionName:"act18",
                     options:[
                         {"name":"Wait","desc":"allow him to reach into his pocket.","v":1},
                     ],
                     nextAct:['act18','Do it!'],
                     dir:{
                         left:['act21','go left'],
                         right:['act19','go right'],
                         up:['act14','go up'],
                         down:['act10','go down'],
                     },
                 },
                 "act19": {
                     state:"act",
                     game:true,
                     act:"19",
                     header:"The Great Escape",
                     has_img:false,
                     img:"",
                     question:'Are you going to leave?',
                     optionName:"act19",
                     options:[
                         {"name":"Yes","desc":"Dang it, I'm out of here","v":1},
                         {"name":"No","desc":"It's actually really nice here","v":2},
                     ],
                     nextAct:['act19','Do it!'],
                     dir:{
                         left:['act18','go left'],
                         right:['act20','go right'],
                         up:['act15','go up'],
                         down:['act11','go down'],
                     },
                 },
                 "act20": {
                     state:"act",
                     game:true,
                     act:"20",
                     header:"A whole lot of nothing",
                     has_img:false,
                     img:"",
                     optionName:"act20",
                     options:[
                     ],
                     dir:{
                         left:['act19','go left'],
                         right:['act21','go right'],
                         up:['act16','go up'],
                         down:['act12','go down'],
                     },
                 },
                 "act21": {
                     state:"act",
                     game:true,
                     act:"21",
                     header:"The Door.",
                     has_img:false,
                     img:"",
                     question:'Open the door?',
                     optionName:"act21",
                     options:[
                         {"name":"Yes","desc":"","v":1},
                     ],
                     nextAct:['act21','Do it!'],
                     dir:{
                         left:['act20','go left'],
                         right:['act18','go right'],
                         up:['act17','go up'],
                         down:['act13','go down'],
                     },
                 },

             };
             
             /*
              * Set game state
              */
             $scope.newGame = function() {
                 $scope.setState('init');
             };
             $scope.left = function(state) {
                 $scope.setState($scope.game.dir.left[0]);
             };
             $scope.right = function(state) {
                 $scope.setState($scope.game.dir.right[0]);
             };
             $scope.up = function(state) {
                 $scope.setState($scope.game.dir.up[0]);
             };
             $scope.down = function(state) {
                 $scope.setState($scope.game.dir.down[0]);
             };

             $scope.setState = function(state) {
                 
                 if (state == 'actt')
                     state = $scope.game.nextAct[0];

                 // INITIALIZE
                 if (state === 'init') {
                     $scope.game.state = 'init';
                     $scope.game.choices.show = false;
                 }

                 // INTRO TO THE GAME
                 else if (state === 'intro') {
                     $scope.game.state = 'intro';
                 }

                 // PLANET
                 else if (state === 'act1') {
                     setAct(state);
                 }

                 // FAMILY
                 else if (state === 'act2') {
                     if (!$scope.game.choices.planet.v) {
                         $scope.game.choices.planet = {"name":"Charhottopia","desc":"A planet known for its Dragons","v":1};
                     }

                     $scope.game.choices.show = true;
                     acts.act2.story = [
                         "On " + $scope.game.choices.planet.name + " you, belong to a family",
                         "You may not think you chose them, but you did.",
                         "They help shape your belief of the world, and all those around you.",
                     ];
                     setAct(state);
                 }

                 // POWER
                 else if (state === 'act3') {
                     if (!$scope.game.choices.family.v) {
                         $scope.game.choices.family = {"name":"The Kentz","desc":"An old couple from the farm","v":1};
                     }

                     acts.act3.story = [
                         "As you were born to the." + $scope.game.choices.family,
                         "They realized you were special. You had powers."
                     ];
                     setAct(state);
                 }

                 // GAME == act10 - act21, start act19
                 else if (state === 'act10') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act10.story = [
                             "Despite the planet " + $scope.game.choices.planet.name + " not seeming like it would,",
                             "it actually has quite a bit of desert.",
                             "'I hate the desert.' You grumble to yourself",
                         ];
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act10.story = [
                                 "The wind picks up the sand you kicked and hits you in the eye.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act10.story = [
                                 "The sand mocks you as your foot seems unable to respond.",
                             ];
                         }
                     }
                     setAct(state);
                 }
                 else if (state === 'act11') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act11.story = [
                             "Your cousin has been following you and points desperately at something bright.",
                             "You look closer, and what do you see? A spark. It must be the energy source.",
                         ];
                         if ($scope.game.choices.power.v === 1) {
                             acts.act11.options.push({"name":"Fly away","desc":"","v":3});
                         }
                         else if ($scope.game.choices.power.v === 2) {
                             acts.act11.options.push({"name":"Shoot it with your eyes.","desc":"","v":4});
                         }
                         else if ($scope.game.choices.power.v === 3) {
                             acts.act11.options.push({"name":"Pee on it.","desc":"","v":5});
                         }
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act11.story = [
                                 "Your finger is fried, but you feel the energy surging through your body.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act11.story = [
                                 "The step back, afraid to touch the energy.",
                                 "Without you knowing, your cousin pushes you into the energy.",
                                 "You trip, falling directly onto the source. The energy flows through you, and you feel like you have a terrible hangover.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 3) {
                             acts.act11.story = [
                                 "You begin to fly away, but your cousin jumps on you and trips you.",
                                 "You fall towards the spark, energy surging through you.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 4) {
                             acts.act11.story = [
                                 "You shoot the spark with your laser eyes. Nothing happens.",
                                 "'That won't work' your cousin says.",
                                 "'What won't work?' you ask.",
                                 "'Shooting it with your eyes.' he replies. 'Look out!' he yells and you look over your shoulder.",
                                 "He quickly trips you into the spark.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 5) {
                             acts.act11.story = [
                                 "You unzip your pants and start to pee on the spark.",
                                 "It conducts energy back towards you... destroying your privates.",
                             ];
                         }
                         acts.act11.story.push("You definitely have enough power to leave now.");
                         $scope.game.items.energy = true;
                     }
                     setAct(state);
                 }
                 else if (state === 'act12') {
                     acts.act12.story = [
                         "Nothingness. All around you.",
                     ];
                     setAct(state);
                 }
                 else if (state === 'act13') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act13.story = [
                             "You see a lovely space ship in front of you..."
                         ];
                         if (!$scope.game.items.key1 &&
                             !$scope.game.items.key2 &&
                             !$scope.game.items.energy && 
                             !$scope.game.items.permission) {
                             acts.act13.story.push("You don't have anything that you need...");
                         }
                         else if ($scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("You have a pretty key, but there is still much to be found...");
                         }
                         else if (!$scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("You have an ugly key, but there is still much to do...");
                         }
                         else if (!$scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("You have the energy needed, but how will you drive this thing?");
                         }
                         else if (!$scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("You have permission to go, but don't have anything needed to get it off the ground");
                         }
                         else if ($scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("You've got both keys, but not enough power!");
                         }
                         else if ($scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("One key and the energy... but still need another key.");
                         }
                         else if ($scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("You still seem to be missing a key and energy...");
                         }
                         else if (!$scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("Another key, you must have...");
                         }
                         else if (!$scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("Not enough pylons. Or energy. And you're missing a key too.");
                         }
                         else if (!$scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("How do you expect to drive this thing without any keys?");
                         }
                         else if (!$scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("So close, but yet... a key is missing.");
                         }
                         else if ($scope.game.items.key1 &&
                                  !$scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("Where be my key???");
                         }
                         else if ($scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  !$scope.game.items.energy && 
                                  $scope.game.items.permission) {
                             acts.act13.story.push("Not enough vespene gas.");
                         }
                         else if ($scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  $scope.game.items.energy && 
                                  !$scope.game.items.permission) {
                             acts.act13.story.push("You have everything you need to leave, but you should probably go talk to your family first...");
                         }
                         else if ($scope.game.items.key1 &&
                                  $scope.game.items.key2 &&
                                  $scope.game.items.energy &&
                                  $scope.game.items.permission) {
                             acts.act13.story = [
                                 "You jump into the ship, forgetting to load the energy source.",
                                 "Getting back out, you press yourself onto the battery, and the energy flows through you fully charging the battery.",
                                 "You insert the ugly key, then you insert the pretty key. You turn both simultaneously.",
                                 "The engine revs, and you're off...",
                             ];
                             acts.act13.nextAct = ['end','Leave!'];
                         }

                     }
                     setAct(state);
                 }
                 else if (state === 'act14') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act14.story = [
                             "You imagine life without the super power of '" + $scope.game.choices.power.name + "', and think how terrible that would be.",
                             "'Who are these people without powers? And why was I granted such a great responsibility?'",
                             "The universe is so vast, but you're pretty sure no one else can do what you can do...",
                         ];
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act14.story = [
                                 "You wipe away the tears and remember what you're here for.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act14.story = [
                                 "Only a wimp would cry. And you're not a wimp.",
                             ];
                         }
                     }
                     setAct(state);
                 }
                 else if (state === 'act15') {
                     acts.act15.story = [
                         "Looking out into space, you think about how many other worlds are like " + $scope.game.choices.planet.name + ".",
                         "'There must be another way. I must be able to go on vacation, and save everyone here.' you say to yourself.",
                         "No, you think. There isn't... who are you to do anything anyway?",
                     ];
                     setAct(state);
                 }
                 else if (state === 'act16') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act16.story = [
                             "You know that the end is near. But vacation is even closer.",
                         ];

                         if ($scope.game.choices.family.v === 1) {
                             acts.act16.story.push("The Kentz aren't normally ones for vacations. But you think this time may be different.");
                         }
                         else if ($scope.game.choices.family.v === 2) {
                             acts.act16.story.push("The Adamz love vacation. But they're extremely dangerous when let out.");
                             acts.act16.story.push("You aren't sure if this is the right time to ask or not, so you have to decide.");
                         }
                         else if ($scope.game.choices.family.v === 3) {
                             acts.act16.story.push("'MMmmmMmMmMMmmmm' mumbles your Zombie dad.");
                             acts.act16.story.push("You know he's thinking back to when he used to deliver Milk,");
                             acts.act16.story.push("and getting off this rock may help him to relax and enjoy retirement.");
                         }
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act16.story = [
                                 "You desperately beg your family to come with you.",
                             ];
                             if ($scope.game.choices.family.v === 1) {
                                 acts.act16.story.push("The Kentz look back at each other, and back at you again.");
                                 acts.act16.story.push("'Sounds great!', they reply.");
                                 acts.act16.story.push("They join you in your quest.");
                             }
                             else if ($scope.game.choices.family.v === 2) {
                                 acts.act16.story.push("'Hmmm... sounds like a great way to destroy some Yeti', they reply...");
                                 acts.act16.story.push("They join you in your quest.");
                             }
                             else if ($scope.game.choices.family.v === 3) {
                                 acts.act16.story.push("'MMmmmm' grumbles your Zombie dad.");
                                 acts.act16.story.push("He joins you in your quest.");
                             }
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act16.story = [
                                 "'I'm leaving,' you announce. 'And you're not invited'.",
                             ];
                             if ($scope.game.choices.family.v === 1) {
                                 acts.act16.story.push("The Kentz look back at each other, and back at you again.");
                                 acts.act16.story.push("'Sounds great!', they reply.");
                                 acts.act16.story.push("You walk away, knowing you may never see them again.");
                             }
                             else if ($scope.game.choices.family.v === 2) {
                                 acts.act16.story.push("'Hmmm... sounds like a great way to destroy some Yeti', they reply...");
                                 acts.act16.story.push("You walk away, knowing you may never see them again.");
                             }
                             else if ($scope.game.choices.family.v === 3) {
                                 acts.act16.story.push("'MMmmmm' grumbles your Zombie dad.");
                                 acts.act16.story.push("You walk away, knowing you may never see him again.");
                             }
                         }
                         $scope.game.items.permission = true;
                     }
                     setAct(state);
                 }
                 else if (state === 'act17') {
                     acts.act17.story = [
                         "Your homeworld, " + $scope.game.choices.planet.name + ", is not anything like you thought it would be.",
                         "You reflect back on how the world used to be.",
                         "One day, you'll be able to change all this... until then, you just want out.",
                     ];
                     setAct(state);
                 }
                 else if (state === 'act18') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act18.story = [
                             "An old man stares you down.",
                             "He's shaking and reaches into his pocket...",
                         ];

                         if ($scope.game.choices.power.v === 1) {
                             acts.act18.options.push({"name":"Fly away","desc":"","v":2});
                         }
                         else if ($scope.game.choices.power.v === 2) {
                             acts.act18.options.push({"name":"Shoot him with your laserz","desc":"","v":3});
                         }
                         else if ($scope.game.choices.power.v === 3) {
                             acts.act18.options.push({"name":"You're scared. Wet yourself.","desc":"","v":4});
                         }
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act18.story = [
                                 "You wait for the old man to reach into his pocket...",
                                 "He reaches in, grabs something and pulls out his hand.",
                                 "'A key' he says... 'for you'",
                                 "You take the key",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act18.story = [
                                 "As you begin to fly away, you see something glimmer as you glance back",
                                 "'A key' he says... 'for you'",
                                 "You fly back and take the key",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 3) {
                             acts.act18.story = [
                                 "Before the old man can even move, you blast him with your laser vision",
                                 "'Stupid old man' you grunt",
                                 "As you look into the pile of dust that the man used to be, you see something glimmer. You reach down and grab it.",
                                 "A key!",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 4) {
                             acts.act18.story = [
                                 "You wet yourself uncontrollably.",
                                 "'Gross.' says the old man",
                                 "He tosses you a key from a distance.",
                                 "'Keep away from me...' he says as you acquire the key.",
                             ];
                         }
                         $scope.game.items.key1 = true;
                     }
                     setAct(state);
                 }
                 else if (state === 'act19') {
                     if (!$scope.game.choices.power.v) {
                         $scope.game.choices.power = {"name":"Flight","desc":"Right on over the bridge","v":1};
                     }

                     if ($scope.game.choices.game[state].show) {
                         acts.act19.story = [
                             "This is the story...",
                         ];
                         if ($scope.game.choices.planet.v === 1) {
                             acts.act19.story.push(
                                 $scope.game.choices.planet.name 
                                     + " is charred, and dang it, you just want to go on vacation.");
                         } 
                         else if ($scope.game.choices.planet.v === 2) {
                             acts.act19.story.push(
                                 $scope.game.choices.planet.name 
                                     + " is cold as mess, and dang it, you just want to go on vacation.");
                         }
                         else if ($scope.game.choices.planet.v === 3) {
                             acts.act19.story.push(
                                 $scope.game.choices.planet.name 
                                     + " is about to explode, and dang it, you just want to go on vacation.");
                         }
                         else if ($scope.game.choices.planet.v === 4) {
                             acts.act19.story.push(
                                 $scope.game.choices.planet.name 
                                     + " is so boring, and dang it, you just want to go on vacation.");
                         }
                         acts.act19.story.push("Your mission, should you choose to accept it, is to get the necessary stuff to do so, and to do it in time (there's not a real timer, but I'd love to give you just one minute)...");
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act19.story = [
                                 "You must find the key, the energy, and dang it, another key...",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act19.story = [
                                 "Too bad, you must find the key, the energy, and another key...",
                             ];
                         }
                     }
                     setAct(state);
                 }
                 else if (state === 'act20') {
                     acts.act20.story = [
                         "You look out on " + $scope.game.choices.planet.name + ".",
                         "'Wow, I gotta get out of here...' you say to yourself",
                     ];
                     setAct(state);
                 }
                 else if (state === 'act21') {
                     if ($scope.game.choices.game[state].show) {
                         acts.act21.story = [
                             "You see a decrepit old shack in front of you. As you look at the shack, you see the cracks of where and age.",
                             "It appears that it's been here since the great war years ago.",
                         ];
                         if ($scope.game.choices.planet.v === 1) {
                             acts.act21.story.push("The shack's door is extremely burnt, and appears to be hot to the touch.");
                         } 
                         else if ($scope.game.choices.planet.v === 2) {
                             acts.act21.story.push("The shack's door looks frozen, and might not budge.");
                         }
                         else if ($scope.game.choices.planet.v === 3) {
                             acts.act21.story.push("The shack is looks like it's about to fall over.");
                         }
                         else if ($scope.game.choices.planet.v === 4) {
                             acts.act21.story.push("The shack, despite being extremely old, looks decently maintained.");
                         }
                         if ($scope.game.choices.power.v === 1) {
                             acts.act21.options.push({"name":"Fly into the door.","desc":"","v":2});
                         }
                         if ($scope.game.choices.power.v === 2) {
                             acts.act21.options.push({"name":"Shoot the door down.","desc":"","v":3});
                         }
                         if ($scope.game.choices.power.v === 3) {
                             acts.act21.options.push({"name":"Take a leak on the door.","desc":"","v":4});
                         }
                     }
                     else {
                         if ($scope.game.choices.game[state].v === 1) {
                             acts.act21.story = [
                                 "You kick the door with all of your might. You're pretty weak though",
                                 "As you walk away though, you hear a creak",
                                 " Oddly, the door falls off its hinges.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 2) {
                             acts.act21.story = [
                                 "You fly into the door.",
                                 "'Umph!' you proclaim, as you bounce away.",
                                 "Oddly, it doesn't do much to the shack, but the door falls off its hinges.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 3) {
                             acts.act21.story = [
                                 "You blast the door with your laser vision. Oddly, it doesn't do much to the shack, but the door falls off its hinges.",
                             ];
                         }
                         else if ($scope.game.choices.game[state].v === 4) {
                             acts.act21.story = [
                                 "You get scared and begin to pee. The door's weak, old hinges, seem to melt off, and the door falls after.",
                             ];
                         }
                         acts.act21.story.push("You take a peak inside. The ground is covered with rubble.");
                         acts.act21.story.push("Looking at shelves upon shelves of tools and old guns, you see something else that tickles you fancy.");
                         acts.act21.story.push("'A key!' you explode with happiness");
                     }
                     $scope.game.items.key2 = true;
                     setAct(state);
                 }

                 // GAME END
                 else if (state === 'end') {
                     if ($scope.game.choices.game['act16'].v === 1) {
                         $scope.game.end = $scope.game.choices.family.name + ", I'm so glad you're here.";
                     }
                     else if ($scope.game.choices.game['act16'].v === 2) {
                         $scope.game.end = "You feel a bit bad that you left " + $scope.game.choices.family.name + ", but what's done is done.";
                     }
                     $scope.game.state = 'end';
                 }
             }

             $scope.setChoice = function(act, choice, name) {
                 if (act === "1") {
                     $scope.game.choices.planet = {"name":name, "v":choice};
                 }
                 else if (act === "2") {
                     $scope.game.choices.family = {"name":name, "v":choice};
                 }
                 else if (act === "3") {
                     $scope.game.choices.power = {"name":name, "v":choice};
                 }
                 else if (parseInt(act) >= 10) {
                     $scope.game.choices.game["act"+act] = {"name":name, "v":choice, show:false};
                 }
             };
         }]
    )
;
