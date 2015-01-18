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

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg","assets/pow.png");
    game.load.image("churchill","assets/churchill.jpg");
    game.load.audio("score", "assets/pain.mp3");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#CC9900");
    game.add.text(450, 250 , "game Game GAME!",
    {font: "40px Arial", fill: "#FF0000"});

    game.add.sprite(40, 40, "playerImg");
    game.add.sprite(780, 40, "playerImg");
    game.add.sprite(40, 380, "playerImg");
    game.add.sprite(780, 380, "playerImg");

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    label_score = game.add.text(15, 15, "0");
    player = game.add.sprite(100, 200, "churchill")
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

function clickHandler(event){
//    game.add.sprite(event.x, event.y, "playerImg");
    player.kill();
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}

function moveRight() {
    player.x=player.x+1
}

function moveLeft() {
    player.x=player.x-1
}

function moveUp() {
    player.y=player.y-1
}

function moveDown() {
    player.y=player.y+1
}