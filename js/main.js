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
var cursors;
var scene;


var directions = {
    west: { offset: 0, x: -2, y: 0, opposite: 'east' },
    northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
    north: { offset: 64, x: 0, y: -2, opposite: 'south' },
    northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
    east: { offset: 128, x: 2, y: 0, opposite: 'west' },
    southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
    south: { offset: 192, x: 0, y: 2, opposite: 'north' },
    southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};

var anims = {
    idle: {
        key :  0,
        endFrame: 4,
        speed: 0.2
    },
    walk: {
        startFrame: 19,
        endFrame: 27,
        speed: 0.15
    },
    attack: {
        startFrame: 12,
        endFrame: 20,
        speed: 0.11
    },
    die: {
        startFrame: 20,
        endFrame: 28,
        speed: 0.2
    },
    shoot: {
        startFrame: 28,
        endFrame: 32,
        speed: 0.1
    },
    right:
    {
        startFrame: 28,
        endFrame: 37,
        speed : 0.5
    },
    left:
    {
        startFrame: 10,
        endFrame: 17,
        speed : 0.5
    },
    up:
    {
        startFrame: 1,
        endFrame: 8,
        speed : 0.5
    },
    down:
    {
        startFrame: 19,
        endFrame: 26,
        speed : 0.5
    }
};

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
    var Player = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Player (scene, x, y, motion, direction, distance)
        {
            this.startX = x;
            this.startY = y;
            this.distance = distance;

            this.motion = motion;
            this.anim = anims[motion];
            this.direction = directions[direction];
            this.speed = 0.15;
            this.f = this.anim.startFrame;

            Phaser.GameObjects.Image.call(this, scene, x, y, 'hero');

            this.depth = y + 64;

            scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
        },

        update: function ()
        {
            if (this.motion === 'walk')
            {
                this.x += this.direction.x * this.speed;

                if (this.direction.y !== 0)
                {
                    this.y += this.direction.y * this.speed;
                    this.depth = this.y + 64;
                }

                //  Walked far enough?
                if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance)
                {
                    this.direction = directions[this.direction.opposite];
                    this.f = this.anim.startFrame;
                    this.frame = this.texture.get(this.direction.offset + this.f);
                    this.startX = this.x;
                    this.startY = this.y;
                }
            }
        }

    });
    
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
    player = this.physics.add.sprite(100,100, 'hero');
    player.setCollideWorldBounds(true);
    this.add.existing(new Player(this, 240, 290, 'right', 'southEast', 100));
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