var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,
    backgroundColor : '#5fd5e8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//instancier un nouveau jeu
var game = new Phaser.Game(config);
var player;
var players = [];
var cursors;
var scene;

function preload () 
{

    this.load.json('map', '../json/map.json');
    //fichier image du joueur
    this.load.spritesheet('tiles', '../images/sprite.png', {frameWidth: 64, frameHeight: 64});
    //fichier image du monde
    this.load.spritesheet('hero', '../images/hero.png', {frameWidth: 64, frameHeight: 64});    
}

function create () {

    scene = this;    
    
    
    cursors = this.input.keyboard.createCursorKeys(); 

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero', frame: 19 } ],
        frameRate: 20
    });

    //animation du joueur se déplaçant à GAUCHE
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('hero',{start: 10,end: 17}),
        frameRate : 20,
        repeat: -1
    });

    //animation du joueur se déplaçant à DROITE
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 28, end: 37 }),
        frameRate: 20,
        repeat: -1
    });

    //animation du joueur se déplaçant vers le HAUT
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('hero', { start: 1, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    //animation du joueur se déplaçant vers le BAS
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero', { start: 19, end: 26 }),
        frameRate: 20,
        repeat: -1
    });
    
    buildMap();
    player = this.game.add.object(100,100, 'hero');
    player.setCollideWorldBounds(true);
    this.cameras.main.setSize(screenWidth, screenHeight);
}

function buildMap ()
{
    //  Parse the data out of the map
    var data = scene.cache.json.get('map');

    var tilewidth = data.tilewidth;
    var tileheight = data.tileheight;

    tileWidthHalf = tilewidth / 2;
    tileHeightHalf = tileheight / 2;

    var layer = data.layers[0].data;

    var mapwidth = data.layers[0].width;
    var mapheight = data.layers[0].height;

    var centerX = mapwidth * tileWidthHalf;
    var centerY = 16;

    var i = 0;

    for (var y = 0; y < mapheight; y++)
    {
        for (var x = 0; x < mapwidth; x++)
        {
            id = layer[i] - 1;

            var tx = (x - y) * tileWidthHalf;
            var ty = (x + y) * tileHeightHalf;

            var tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);

            tile.depth = centerY + ty;

            i++;
        }
    }
}

function update () {    

    // action lorsque la fleche de GAUCHE est enfoncée
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);   

    // action lorsque la fleche de DROITE est enfoncée
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);

    // action lorsque la fleche du HAUT est enfoncée
    } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true);

    // action lorsque la fleche du BAS est enfoncée
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true);

    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
    } 

   
   
}