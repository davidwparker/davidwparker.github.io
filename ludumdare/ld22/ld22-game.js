$(function(){
/*********************************
 * VARS and GAME DATA
 *********************************/
// jquery vars
var $intro = $("#intro-content")
    , $welcome = $("#welcome-content")
    , $main = $("#main-content")
    , $hangoutModal = $("#hangout-modal")
    , $upgradeModal = $("#upgrade-modal")
    , $upgradeFailModal = $("#upgrade-fail-modal")
    , $logoutModal = $("#logout-modal")
    , $gameoverModal = $("#gameover-modal")
    , $battleModal = $("#battle-modal")
    , $winModal = $("#win-modal")
    , $witModal = $("#wit-modal");

// game vars
var game = {
    "abilities":[
	{"aid":"0","name":"Your Mom","description":"Your mom!","type":"insult","damage_min":"0","damage_max":"5","wit":"0","points":"0"}
	, {"aid":"1","name":"Stupid","description":"Everyone is entitled to be stupid, but you abuse the privilege.","type":"insult","damage_min":"1","damage_max":"5","wit":"1","points":"2"}
	, {"aid":"2","name":"Medication","description":"People like you are the reason I&#39;m on medication.","type":"insult","damage_min":"2","damage_max":"6","wit":"2","points":"4"}
	, {"aid":"3","name":"Not You","description":"If I could be one person for a day, it sure as hell wouldn&#39;t be you.","type":"insult","damage_min":"3","damage_max":"6","wit":"3","points":"6"}
	, {"aid":"4","name":"Anti-Social","description":"I&#39;m not anti-social, I just don&#39;t like you.","type":"insult","damage_min":"4","damage_max":"6","wit":"4","points":"8"}
	, {"aid":"5","name":"Boyfriend","description":"I called your boyfriend gay and he hit me with his purse.","type":"rumor","damage_min":"4","damage_max":"8","wit":"4","points":"10"}
	, {"aid":"6","name":"Herpes","description":"I heard you have herpes.","type":"rumor","damage_min":"5","damage_max":"9","wit":"5","points":"12"}
	, {"aid":"7","name":"Poop","description":"What type of person eats their own poo?","type":"rumor","damage_min":"6","damage_max":"10","wit":"6","points":"14"}
	, {"aid":"8","name":"Rickroll","description":"Son, you just got Rickrolled!","type":"special","damage_min":"7","damage_max":"12","wit":"7","points":"16"}
	, {"aid":"9","name":"Spam","description":"Massive spam on their wall.","type":"special","damage_min":"8","damage_max":"14","wit":"8","points":"18"}
	, {"aid":"10","name":"Barnville Spamming","description":"Can we get enough of this awesome farm game?","type":"special","damage_min":"9","damage_max":"16","wit":"9","points":"20"}
	, {"aid":"11","name":"Inappropriate Photo","description":"Yeah, that&#39;s just gross.","type":"special","damage_min":"10","damage_max":"20","wit":"10","points":"30"}
	, {"aid":"12","name":"Untag Photo","description":"I honestly never hang out with you.","type":"special","damage_min":"15","damage_max":"30","wit":"15","points":"40"}
	, {"aid":"13","name":"Hack Profile","description":"Time to cancel an account.","type":"special","damage_min":"20","damage_max":"40","wit":"20","points":"50"}
    ]
    , "enemies": [
	{"eid":"0","name":"Mom","description":"It\'s your mom!","type":"family","damage_min":"40","damage_max":"60","feelings":"200","feelings_max":"200","peace":"100","pic":"mother.jpg"}
	, {"eid":"1","name":"Best friend Ryan","description":"Your best friend just won\'t let you go.","type":"friend","damage_min":"30","damage_max":"55","feelings":"120","feelings_max":"120","peace":"90","pic":"bestfriend.jpg"}
	, {"eid":"2","name":"Big Brother Jay","description":"Your big bro is being a douche.","type":"family","damage_min":"25","damage_max":"50","feelings":"100","feelings_max":"100","peace":"80","pic":"brother.jpg"}
	, {"eid":"3","name":"Ex-girlfriend Tabitha","description":"She\'s pretty much obsessed with you. Who can blame her?","type":"friend","damage_min":"20","damage_max":"50","feelings":"60","feelings_max":"60","peace":"75","pic":"exgirlfriend.jpg"}
	, {"eid":"4","name":"Zark Muckerberg","description":"Didn\'t this guy create The Social Network?","type":"acquaintance","damage_min":"8","damage_max":"40","feelings":"70","feelings_max":"70","peace":"60","pic":"zark.jpg"}
	, {"eid":"5","name":"Little Sister Arwyn","description":"How can your little sister be so annoying?","type":"family","damage_min":"10","damage_max":"40","feelings":"40","feelings_max":"40","peace":"55","pic":"sister.jpg"}
	, {"eid":"6","name":"College friend Eric","description":"You used to be pretty good friends.","type":"friend","damage_min":"18","damage_max":"30","feelings":"60","feelings_max":"60","peace":"45","pic":"college.jpg"}
	, {"eid":"7","name":"The Twins","description":"They\'re pretty talented. But not really though.","type":"acquaintance","damage_min":"15","damage_max":"25","feelings":"50","feelings_max":"50","peace":"35","pic":"twins.jpg"}
	, {"eid":"8","name":"Cousin Rufous","description":"2nd cousin, twice removed.","type":"family","damage_min":"10","damage_max":"30","feelings":"45","feelings_max":"45","peace":"30","pic":"cousin.jpg"}
	, {"eid":"9","name":"So and So\'s baby","description":"Yeah, there\'s a few too many babies on The Social Network.","type":"acquaintance","damage_min":"3","damage_max":"30","feelings":"20","feelings_max":"20","peace":"25","pic":"baby.jpg"}
	, {"eid":"10","name":"First Job Supervisor","description":"He\'d like to stay relevant.","type":"acquaintance","damage_min":"10","damage_max":"15","feelings":"40","feelings_max":"40","peace":"20","pic":"firstjob.jpg"}
	, {"eid":"11","name":"College artsy person","description":"Yet another who won\'t give up.","type":"acquaintance","damage_min":"5","damage_max":"26","feelings":"20","feelings_max":"20","peace":"18","pic":"artsy.jpg"}
	, {"eid":"12","name":"College football failure","description":"He wasn\'t very good.","type":"acquaintance","damage_min":"8","damage_max":"20","feelings":"30","feelings_max":"30","peace":"17","pic":"football.jpg"}
	, {"eid":"13","name":"Frat guy","description":"Man needs to shower.","type":"acquaintance","damage_min":"10","damage_max":"8","feelings":"25","feelings_max":"25","peace":"16","pic":"frat.jpg"}
	, {"eid":"14","name":"High school cheerleader","description":"Well, she used to be hot.","type":"acquaintance","damage_min":"6","damage_max":"12","feelings":"20","feelings_max":"20","peace":"15","pic":"cheerleader.jpg"}
	, {"eid":"15","name":"High school band mates","description":"Remember band? Yeah, I don\'t either.","type":"acquaintance","damage_min":"5","damage_max":"10","feelings":"15","feelings_max":"15","peace":"12","pic":"band.jpg"}
	, {"eid":"16","name":"Middle School guy","description":"Oh, those terrible days.","type":"acquaintance","damage_min":"3","damage_max":"8","feelings":"15","feelings_max":"15","peace":"11","pic":"middle.jpg"}
	, {"eid":"17","name":"Friend from elementary school ","description":"They wish they were you.","type":"acquaintance","damage_min":"3","damage_max":"7","feelings":"13","feelings_max":"13","peace":"10","pic":"elem.jpg"}
	, {"eid":"18","name":"So and So\'s dog\'s former owner","description":"You like dogs. But not this one.","type":"friend","damage_min":"3","damage_max":"5","feelings":"10","feelings_max":"10","peace":"8","pic":"soso.jpg"}
	, {"eid":"19","name":"Friend of a friend","description":"You almost met this person that one time.","type":"acquaintance","damage_min":"0","damage_max":"5","feelings":"8","feelings_max":"8","peace":"5","pic":"friendfriend.jpg"}
	, {"eid":"20","name":"Friend of a friend of a friend","description":"You don\'t even know this guy.","type":"acquaintance","damage_min":"0","damage_max":"3","feelings":"5","feelings_max":"5","peace":"5","pic":"friendfriendfriend.jpg"}
    ]
    , "randomEnemy":{"eid":"-1","name":"Random","description":"Description","type":"friend","damage_min":"0","damage_max":"0","feelings":"0","feelings_max":"0","peace":"0"}
    , "attacks": [
	{"name":"love notes"}
	, {"name":"cyber stalking"}
	, {"name":"creeping"}
	, {"name":"event invite"}
	, {"name":"birthday party invite"}
	, {"name":"sleepover invite"}
	, {"name":"picture tagging"}
	, {"name":"status liking"}
	, {"name":"thumbs up"}
	, {"name":"plus one"}
	, {"name":"sharing a lame link"}
    ]
    , "verbs": [
	{"verb":"attacks"}
	, {"verb":"strikes"}
	, {"verb":"blitzes"}
	, {"verb":"charges"}
	, {"verb":"ambushes"}
	, {"verb":"barrages"}
	, {"verb":"bangs"}
	, {"verb":"bashes"}
	, {"verb":"beats"}
	, {"verb":"knocks"}
    ]
    , "lblStatsBad": [
	{"name":""}
	, {"name":"warning"}
	, {"name":"important"}
    ]
    , "lblStatsGood": [
	{"name":"success"}
	, {"name":"notice"}
    ]
    , "player": {"name":""
		 , "pic":"player.jpg"
		 , "level":"1"
		 , "points":"10"
		 , "friends":"50"
		 , "peace":"0","peace_next":"10"
		 , "feelings":"20","feelings_max":"20"
		 , "wit":"10","wit_max":"10"
		 , "abilities":[
		     {"aid":"0"}
		     , {"aid":"1"}
		 ]}
    , "enemy": {}
    , "lastEnemy": {}
    , "upgrade": {}
    , "turnNumber": 0
    , "gameplay": {"current":"player"}
    , "profileLoaded": false
    , "playerLoaded": false
    , "hangoutLoaded": false
};

/*
 * Click through enemies for debugging
 */
//$("#hangout").click(function(){
//    nextEnemy();
//});

/**********************************
 * SETUP
 **********************************/
setupGame();

/*
 * initialization
 */
function setupGame() {
    game.profileLoaded = false;
    game.playerLoaded = false;
    game.hangoutLoaded = false;

    $welcome.hide();
    $main.hide();
    resetPlayer();
    loadPlayer();
    loadProfileAbilities();
    loadHangoutAbilities();
    loadPlayerAbilities();

    game.enemy = {};
    loadEnemy(game.enemies.length-1);
    game.gameplay.current = "player";
    game.turnNumber = 0;
    $("#turns").empty();
    $("#logon-btn").focus();
}

/*
 * reset the player object
 */
function resetPlayer() {
    game.player.name = "";
    game.player.level = 1;
    game.player.points = 10;
    game.player.friends = 50;
    game.player.peace = 0;
    game.player.peace_next = 10;
    game.player.feelings = 20;
    game.player.feelings_max = 20;
    game.player.wit = 10;
    game.player.wit_max = 10;
    game.player.abilities = [
	{"aid":"0"}
	, {"aid":"1"}
    ];
}

/*
 * load the player stats from the player object
 */
function loadPlayer() {
    $(".player-level").text(game.player.level);
    $(".player-points").text(game.player.points);
    $(".player-friends").text(game.player.friends);
    $(".player-peace").text(game.player.peace);
    $(".player-peace-next").text(game.player.peace_next);
    $(".player-feelings").text(game.player.feelings);
    $(".player-feelings-max").text(game.player.feelings_max);
    $(".player-wit").text(game.player.wit);
    $(".player-wit-max").text(game.player.wit_max);
    $(".player-pic").attr("src",game.player.pic);
}

/*
 * loads an enemy
 */
function loadEnemy(eid) {
    if (game.enemy.name == undefined) {
	game.enemy = game.enemies[eid];
	$(".enemy-name").text(game.enemy.name);
	$(".enemy-desc").text(game.enemy.description);
	$(".enemy-type").text(game.enemy.type);
	$(".enemy-feelings").text(game.enemy.feelings);
	$(".enemy-feelings-max").text(game.enemy.feelings_max);
	$(".enemy-pic").attr("src",game.enemy.pic);
    }
}

/*
 * return the ability type (selector) given an ability type
 */
function getAbilityType(type) {
    var abilityType = "";
    if (type == "insult") {
	abilityType = ".insults";
    } else if (type == "rumor") {
	abilityType = ".rumors";
    } else if (type == "special") {
	abilityType = ".specials";
    }
    return abilityType;
}

/*
 * only show active player abilities on hangout tab
 */
function loadHangoutAbilities() {
    if (game.hangoutLoaded == true) return;
    else {
	$("#hangout .abilities")
	    .find(".insults .insult").remove().end()
	    .find(".rumors .rumor").remove().end()
	    .find(".specials .special").remove();
    }
    for (var i = 0; i < game.player.abilities.length; i++) {
	var gAbility = game.abilities[game.player.abilities[i].aid]
	, abilityType = getAbilityType(gAbility.type);

	var $ability = $("<li class=\'ability "+gAbility.type
			 +"\'><button class=\'label success\' data-ability-id=\'"+gAbility.aid
			 +"\' rel=\'popover\' data-content=\'"+gAbility.description
			 +" Damage="+gAbility.damage_min+"-"+gAbility.damage_max
			 +". Wit Cost="+gAbility.wit
			 +"\' data-original-title=\'"+gAbility.name+"\'>"+gAbility.name+"</btn></li>");
	$("#hangout .abilities").find(abilityType).append($ability);
	$("button[rel=popover]").popover({offset:10});
    }
    game.hangoutLoaded = true;
}

/*
 * load all game abilities in profile page
 * TODO: refactor this... a lot of similarities with hangout abilities
 */
function loadProfileAbilities() {
    if (game.profileLoaded == true) return;
    else {
	$("#profile .abilities")
	    .find(".insults .insult").remove().end()
	    .find(".rumors .rumor").remove().end()
	    .find(".specials .special").remove();
    }
    for (var i = 0; i < game.abilities.length; i++) {
	var gAbility = game.abilities[i]
	, abilityType = getAbilityType(gAbility.type);

	var $ability = $("<li class=\'ability "+gAbility.type
			 +"\'><button class=\'label\' data-ability-id=\'"+gAbility.aid
			 +"\' rel=\'popover\' data-content=\'"+gAbility.description
			 +" Damage="+gAbility.damage_min+"-"+gAbility.damage_max
			 +". Wit Cost="+gAbility.wit
			 +". Ability Point Cost="+gAbility.points+"."
			 +"\' data-controls-modal=\'upgrade-modal\' data-backdrop=\'true\' data-keyboard=\'true\'"
			 +"\' data-original-title=\'"+gAbility.name+"\'>"+gAbility.name+"</button></li>");
	$("#profile .abilities").find(abilityType).append($ability);
	$("button[rel=popover]").popover({offset:10});
    }
    game.profileLoaded = true;
}

/*
 * highlight active player abilities
 */
function loadPlayerAbilities() {
    if (game.playerLoaded == true) return;
    for (var i = 0; i < game.player.abilities.length; i++) {
	var pAbility = game.player.abilities[i]
	, gAbility = game.abilities[pAbility.aid]
	, hasAbility = " - You have this ability!";
	$(".ability").children("button").each(function(){
	    $this = $(this);
	    sAbility = $this.attr("data-ability-id");
	    if (sAbility == gAbility.aid && !$this.hasClass("success")) {
		$this.removeAttr("data-controls-modal")
		    .removeAttr("data-backdrop").removeAttr("data-keyboard")
		    .addClass("success");
	    }
	});
    }
    game.playerLoaded = true;
}

/*
 * suppress media grid
 */
 $(".media-grid a").click(function(e){
     e.preventDefault();
 });

/*********************************
 * INTRO PAGE
 *********************************/
// logon clicked or enter pressed
$("#logon-name").keypress(function(e){
    if (e.which == 13) {
	$("#logon-btn").trigger("click");
    }
});
$("#logon-btn").click(function(){
    $intro.hide();
    $welcome.show();
    game.player.name = $("#logon-name").val();
    if (game.player.name == "") game.player.name = "Nameless";
    $(".player-name").text(game.player.name);
    $("#welcome-btn").focus();
});

/*********************************
 * WELCOME PAGE
 *********************************/
// welcome button clicked
$welcome.find("#welcome-btn").click(function(){
    $welcome.hide()
    $main.show();
});

/*********************************
 * MAIN PAGE (different sections)
 *********************************/
// profile
/*
 * set upgrade 
 */
$("#profile .abilities button").live("click", function(e){
    if (!$(this).hasClass("success")) {
	var aid = $(this).attr("data-ability-id");
	game.upgrade = game.abilities[aid];
	$(".ability-points").text(game.upgrade.points);
    }
});

/*
 * upgrade if possible
 */
function performUpgrade() {
    if (game.player.points >= game.upgrade.points) {
	game.player.points -= game.upgrade.points;
	$(".player-points").text(game.player.points);
	$("[data-ability-id="+game.upgrade.aid+"]").addClass("success");
	game.hangoutLoaded = false;
	game.player.abilities.push({"aid":game.upgrade.aid});
	loadHangoutAbilities();
    }
    else {
	$upgradeFailModal.modal({show:true,backdrop:true});
    }
}

// hangout
/*
 * set the turn and perform enemy attack as necessary
 */
function setTurn() {
    if (game.gameplay.current == "player") {
	$("#turns").append("<li>Turn #" + game.turnNumber + ": "+ game.player.name + "\'s turn...</li>");
    } else if (game.gameplay.current == "enemy") {
	$("#turns").append("<li>Turn #" + game.turnNumber + ": " + game.enemy.name + "\'s turn...</li>");
	enemyAttack();
    }
}

/*
 * increment the turn and remove old turn data
 */
function incrementTurn() {
    game.turnNumber++;
    if (game.turnNumber > 3) {
	// TODO: figure out a better way to do this...
	$("#turns > li:first").remove();
	$("#turns > li:first").remove();
	$("#turns > li:first").remove();
	$("#turns > li:first").remove();
    }
}

/*
 * set the most previous enemy
 */
function setLastEnemy() {
    game.lastEnemy = game.enemy;
}

/*
 * randomly determine an enemy
 */ 
function randomEnemy() {
    game.lastEnemy = game.enemy;
    game.randomEnemy.eid = (game.enemy.eid*1)+1;
    game.randomEnemy.name = "Another who?";
    game.randomEnemy.description = "Just someone who randomly friended you";
    game.randomEnemy.type = "acquaintance";
    game.randomEnemy.damage_min = Math.round(Math.random()*game.player.level*3);
    game.randomEnemy.damage_max = Math.round(Math.random()*game.player.level*5);
    game.randomEnemy.feelings = Math.round(Math.random()*game.player.feelings*0.8);
    game.randomEnemy.feelings_max = game.randomEnemy.feelings;
    game.randomEnemy.peace = Math.round(Math.random()*game.player.level*10);
    game.randomEnemy.pic = "random" + Math.round(Math.random()*4)+ ".jpg";
    game.enemy = game.randomEnemy;
    $(".enemy-name").text(game.enemy.name);
    $(".enemy-desc").text(game.enemy.description);
    $(".enemy-type").text(game.enemy.type);
    $(".enemy-feelings").text(game.enemy.feelings);
    $(".enemy-feelings-max").text(game.enemy.feelings_max);
    $(".enemy-pic").attr("src",game.enemy.pic);
}

/*
 * load the next enemy
 */
function nextEnemy() {
    var eid = game.enemy.eid;
    eid--;
    setLastEnemy();
    game.enemy = {};
    if (eid == -1) 
	eid = game.enemies.length-1;
    loadEnemy(eid);
}

/*
 * enemy attack! 
 */
function enemyAttack() {
    // random attack from enemy
    var damage = Math.max(Math.round(Math.random()*game.enemy.damage_max),game.enemy.damage_min)
    , attackId = Math.round(Math.random()*(game.attacks.length-1))
    , attackName = game.attacks[attackId].name
    , verbId = Math.round(Math.random()*(game.verbs.length-1))
    , verb = game.verbs[verbId].verb
    , statId = Math.round(Math.random()*(game.lblStatsBad.length-1))
    , stat = game.lblStatsBad[statId].name;

    $("#turns").append("<li>..." + game.enemy.name 
		       + " <span class=\'label " + stat + "\'>" + verb + "</span> with " 
		       + " <span class=\'label " + stat + "\'>" + attackName + "</span>"
		       + " for " + damage + " points of feelings damage!</li>");
    incrementTurn();
    
    // determine remaining life
    var $feelings = $("#hangout .player-feelings")
    , life = $feelings.text() - damage;
    if (life <= 0) {
	$feelings.text("0");
	$gameoverModal.modal({show:true,backdrop:true});
	return;
    }
    else {
	$feelings.text(life);
    }
    // switch gameplay to player
    game.gameplay.current = "player";
    setTurn();
}

/*
 * player clicked ability - attacking
 */
$("#hangout .abilities button").live("click", function(e){
    // return if not the player's turn
    if (game.gameplay.current != "player") return;

    var $this = $(this)
    // determine ability
    , aid = $this.attr("data-ability-id")
    , gAbility = game.abilities[aid]
    // determine damage
    , damage = Math.max(Math.round(Math.random()*gAbility.damage_max),gAbility.damage_min)
    , verbId = Math.round(Math.random()*(game.verbs.length-1))
    , verb = game.verbs[verbId].verb
    , statId = Math.round(Math.random()*(game.lblStatsGood.length-1))
    , stat = game.lblStatsGood[statId].name;

    // determine wit
    if (game.player.wit >= gAbility.wit) {
	game.player.wit -= gAbility.wit;
	$(".player-wit").text(game.player.wit);
    } else {
	$witModal.modal({show:true,backdrop:true});
	return;
    }

    // do action
    $("#turns").append("<li>..." + game.player.name 
		       + " <span class=\'label " + stat + "\'>" + verb + "</span> with " 
		       + " <span class=\'label " + stat + "\'>" + gAbility.name + "</span>"
		       + " for " + damage + " points of feelings damage!</li>");
    
    var $feelings = $("#hangout .enemy-feelings")
    , life = $feelings.text() - damage;
    // battle is won
    if (life <= 0) {
	$feelings.text("0");
	game.player.peace += (game.enemy.peace*1+(1+Math.round(Math.random()*game.enemy.peace*0.3)));

	// deal with friends
	var friends = game.player.friends*1;
	friends--;
	if (friends < game.enemy.eid)
	    friends = game.enemy.eid
	game.player.friends = friends;
	// game over, you win
	if (game.player.friends <= 0) {
	    $winModal.modal({show:true,backdrop:true});
	}

	// setup next enemy
	setLastEnemy();
	nextEnemy();

	// level up
	if (game.player.peace >= game.player.peace_next) {
	    game.player.level++;
	    bonus_point_multi = 1;
	    if (game.enemy.type == "friend")
		bonus_point_multi = 2;
	    else if (game.enemy.type == "family")
		bonus_point_multi = 3;
	    game.player.points += (game.player.level + game.player.level*Math.round(Math.random()*3)*bonus_point_multi);
	    game.player.peace_next += game.player.peace_next*(1+Math.round(Math.random()*2));
	    game.player.wit_max += game.player.level*Math.round(1+Math.random()*5);  
	    game.player.feelings_max += game.player.level*Math.round(1+Math.random()*10);  
	}

	game.player.feelings = game.player.feelings_max;
	game.player.wit = game.player.wit_max;
	loadPlayer();
	$(".enemy-peace").text(game.enemy.peace);
	$battleModal.modal({show:true,backdrop:true});
	return;
    }
    else {
	$feelings.text(life);
    }

    // switch gameplay to enemy
    game.gameplay.current = "enemy";
    setTurn();
});

/*********************************
 * MODALS
 *********************************/
/*
 * common switching of main content
 */
function mainSwitch(loc) {
    $main
	.find(".pill-content").children().removeClass("active").end().end()
	.find(loc).addClass("active");
}

/*
 * common intro load
 */
function loadIntro(e) {
    $main.hide();
    $("#turns").empty();
    mainSwitch("#profile")
    $intro.show();
    e.preventDefault();
}

// hangout modal
$hangoutModal.find(".secondary").click(function(e){
    $hangoutModal.modal("hide");
    e.preventDefault();
}).end().find(".primary").click(function(e){
    $hangoutModal.modal("hide");
    setTurn();
    mainSwitch("#hangout");
    e.preventDefault();
}).end().find(".info").click(function(e){
    $hangoutModal.modal("hide");
    setTurn();
    randomEnemy();
    mainSwitch("#hangout");
    e.preventDefault();
});

// ugrade modal
$upgradeModal.find(".secondary").click(function(e){
    $upgradeModal.modal("hide");
    e.preventDefault();
}).end().find(".primary").click(function(e){
    $upgradeModal.modal("hide");
    performUpgrade();
    e.preventDefault();
});

// game over modal
$upgradeFailModal.find(".primary").click(function(e){
    $upgradeFailModal.modal("hide");
    e.preventDefault();
});

// log out modal
$logoutModal.find(".secondary").click(function(e){
    $logoutModal.modal("hide");
    e.preventDefault();
}).end().find(".primary").click(function(e){
    $logoutModal.modal("hide");
    loadIntro(e);
});

// game over modal
$gameoverModal.find(".primary").click(function(e){
    $gameoverModal.modal("hide");
    setupGame();
    loadIntro(e);
});

// battle over modal
$battleModal.find(".primary").click(function(e){
    $battleModal.modal("hide");
    $("#turns").empty();
    game.turnNumber = 0;
    mainSwitch("#profile");
    e.preventDefault();
});

// battle over modal
$winModal.find(".primary").click(function(e){
    $winModal.modal("hide");
    $("#turns").empty();
    game.turnNumber = 0;
    mainSwitch("#profile");
    e.preventDefault();
});

// no wit modal
$witModal.find(".primary").click(function(e){
    $witModal.modal("hide");
    e.preventDefault();
});

});

