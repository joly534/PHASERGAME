var game = new Phaser.Game(800, 600, Phaser.AUTO, "", this);
function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}
function preload() {
    game.load.image("tuile", "assets/terrain.png");
}
function create() {

    game.add.sprite(50,50,"tuile", {frameWidth: 32, frameHeight: 32} );
    
}
function update() {
}
