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

var anims={
    idle:{
        key :  0,
        endFrame: 4,
        speed: 0.2
    },
    walk:{
        startFrame: 19,
        endFrame: 27,
        speed: 0.15
    },
    attack:{
        startFrame: 12,
        endFrame: 20,
        speed: 0.11
    },
    die:{
        startFrame: 20,
        endFrame: 28,
        speed: 0.2
    },
    shoot:{
        startFrame: 28,
        endFrame: 32,
        speed: 0.1
    },
    right:{
        startFrame: 28,
        endFrame: 37,
        speed : 0.5
    },
    left:{
        startFrame: 10,
        endFrame: 17,
        speed : 0.5
    },
    up:{
        startFrame: 1,
        endFrame: 8,
        speed : 0.5
    },
    down:{
        startFrame: 19,
        endFrame: 26,
        speed : 0.5
    }
};

function preload () {
    this.load.json('map', '../json/map.json');
    //fichier image du monde
    this.load.spritesheet('tiles', '../images/sprite.png', {frameWidth: 64, frameHeight: 64});
    //fichier image du joueur
    this.load.spritesheet('hero', '../images/hero.png', {frameWidth: 64, frameHeight: 64});    
}

