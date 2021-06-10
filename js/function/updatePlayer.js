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