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
    
    player = this.physics.add.sprite(100,100, 'hero');
    player.setCollideWorldBounds(true);
    buildMap();
    this.cameras.main.setSize(screenWidth, screenHeight);
}