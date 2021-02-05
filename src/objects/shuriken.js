export default class Shuriken {
  constructor(player, scene, platforms) {
    this.player = player;
    this.scene = scene;
    this.platforms = platforms;
  }

  shurikenThrow(direction) {
    this.speed = 200 * Math.random() + 300;
    this.shuriken = this.scene.physics.add.sprite(
      this.player.x,
      this.player.y + 20,
      'shuriken',
      0,
    );
    this.shuriken.body.setSize(30, 20);
    this.shuriken.body.checkCollision.up = false;
    this.shuriken.setVelocityX(this.speed * direction);
    this.shuriken.setVelocityY(-300);
    this.scene.physics.add.collider(
      this.shuriken,
      this.player,
      this.shurikenTake,
      null,
      this.scene,
    );
    this.scene.physics.add.collider(
      this.shuriken,
      this.platforms,
      this.shurikenStuck,
      null,
      this.scene,
    );
  }

  shurikenTake(shuriken) {
    shuriken.destroy();
    this.player.shurikenIncrement();
  }

  shurikenStuck(shuriken) {
    // shuriken.setAlpha(0.5);
    shuriken.setVelocityX(0);
    // shuriken.setVelocityY(-300);
  }
}
