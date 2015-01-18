// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(900, 500, Phaser.AUTO, 'game', stateActions);
var score =0;
var label_score;
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/pow.png");
    game.load.image("churchill","assets/churchill.jpg");
    game.load.audio("score", "assets/pain.mp3");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#CC9900");
    game.add.text(300, 150 , "game Game GAME!",
    {font: "40px Arial", fill: "#FF0000"});

    //game.add.sprite(40, 40, "playerImg");
    //game.add.sprite(780, 40, "playerImg");
    //game.add.sprite(40, 380, "playerImg");
    //game.add.sprite(780, 380, "playerImg");

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    label_score = game.add.text(15, 15, "0");
    // player = game.add.sprite(100, 200, "churchill");


    //for (var count=0 ; count <5 ; count++){
    //    game.add.sprite(20, count * 50, "pipe");
    //    game.add.sprite(150, count * 50, "pipe");
    //}
    //generate_pipe();

    pipes = game.add.group();
    pipe_interval = 2.5;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);


    //for (var count=2; count < 10; count+=2){
    //    game.add.sprite(count * 50, 200, "pipe");
    //}

    //for (var count=0; count<8; count++){
    //    if(count !=4){
    //       game.add.sprite(500, 50 * count, "pipe")
    //    }
    //}
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //set initial coordinates for player
    player = game.add.sprite(100, 200, "churchill");
    // enable physics for the player spt
    game.physics.arcade.enable(player);
    //player.body.velocity.x = 100;
    //player.body.velocity.y = 100;
    player.body.gravity.y = 200;

    //associate spacebar with player_jump function
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);
}

function clickHandler(event){
//    game.add.sprite(event.x, event.y, "playerImg");
//    player.kill();
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}

function moveRight() {
    player.x=player.x+10
}

function moveLeft() {
    player.x=player.x-10
}

function moveUp() {
    player.y=player.y-10
}

function moveDown() {
    player.y=player.y+10
}

function generate_pipe(){
    var gap= game.rnd.integerInRange(1, 5);

    //generate the pipes, except for the gap
    for (var count = 0; count < 10; count++){
        if(count != gap && count != gap+1)
            add_pipe_block(840, count * 50);
    }
    changeScore()
}

function add_pipe_block(x,y) {
    //add a new pipe part to the pipes group
    var pipe= pipes.create(x, y, "pipe");
    //enable physics for each pipe part
    game.physics.arcade.enable(pipe);
    //set horizontal velocity
    //negative value, which causes it to go to the left
    pipe.body.velocity.x=-200

}

function player_jump(){
    //the more negative the value the higher it jumps
    player.body.velocity.y=-100;
}

function game_over() {
    game.add.text(300, 250 , "Not a Winner!",
        {font: "40px Arial", fill: "#FF0000"});
    location.reload()
}