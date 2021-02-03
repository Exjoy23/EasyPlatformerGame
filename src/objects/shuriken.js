export default class Shuriken {
  constructor(player, scene, platforms) {
    this.player = player;
    this.scene = scene;
    this.platforms = platforms;
    this.shurikens = this.scene.physics.add.group();
  }

  shurikenThrow(direction) {
    this.speed = 500;
    this.shuriken = this.shurikens.create(
      this.player.x,
      this.player.y + 20,
      'shuriken',
      0,
    );
    this.shuriken.setVelocityX(this.speed * direction);
    this.shuriken.setVelocityY(-300);
    // this.scene.physics.add.collider(this.shurikens, this.shurikens);
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
    shuriken.setAlpha(0.5);
    shuriken.setVelocityX(0);
    // shuriken.setVelocityY(-300);
  }
}
