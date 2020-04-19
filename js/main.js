var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

function preload () {
    //on preload le fichier image du joueur
    this.load.spritesheet('hero', '../images/hero.png', {frameWidth: 64, frameHeight: 64});    
}

function create () {

    player = this.physics.add.sprite(100,100, 'hero');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero', frame: 19 } ],
        frameRate: 20
    });

    //animation du joueur se déplaçant à gauche
    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('hero',{start: 10,end: 17}),
        frameRate : 20,
        repeat: -1
    });

    //animation du joueur se déplaçant à droite
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 28, end: 37 }),
        frameRate: 20,
        repeat: -1
    });

    //animation du joueur se déplaçant vers le haut
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('hero', { start: 1, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    //animation du joueur se déplaçant vers le bas
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero', { start: 19, end: 26 }),
        frameRate: 20,
        repeat: -1
    });
    
    cursors = this.input.keyboard.createCursorKeys();    
}

function update () {    

    // action lorsque la fleche de gauche est enfoncée
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);

    // action lorsque la fleche de droite est enfoncée
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);

    // action lorsque la fleche du haut est enfoncée
    } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true);

    // action lorsque la fleche du bas est enfoncée
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true);

    } else {
        player.setVelocityX(0);
        player.anims.play('turn');

    } if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }
    
}