import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y, camera) {
    this.scene = scene;
    const anims = scene.anims;
    anims.create({
      key: 'walk',
      frames: anims.generateFrameNames('player', {
        prefix: 'ninja_walk_',
        start: 0,
        end: 29,
      }),
      frameRate: 60,
      repeat: -1,
    });

    anims.create({
      key: 'idle',
      frames: anims.generateFrameNames('player', {
        prefix: 'ninja_idle_',
        start: 0,
        end: 29,
      }),
      frameRate: 45,
      repeat: -1,
    });

    anims.create({
      key: 'jump',
      frames: anims.generateFrameNames('player', {
        prefix: 'ninja_jump_',
        start: 0,
        end: 29,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.sprite = scene.physics.add.sprite(x, y, 'player', 0);
    this.sprite.body.setSize(20, 75);

    const { LEFT, RIGHT, UP, SPACE } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      space: SPACE,
    });

    const buttonJump = document.querySelector('.button--up');
    const buttonMoveLeft = document.querySelector('.button--left');
    const buttonMoveRight = document.querySelector('.button--right');
    const buttonShuriken = document.querySelector('.button--shuriken');

    this.jump = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.shurikenThrow = false;

    buttonJump.addEventListener('touchstart', () => {
      this.jump = true;
    });

    buttonJump.addEventListener('touchend', () => {
      this.jump = false;
    });

    buttonMoveLeft.addEventListener('touchstart', () => {
      this.moveLeft = true;
    });

    buttonMoveLeft.addEventListener('touchend', () => {
      this.moveLeft = false;
    });

    buttonMoveRight.addEventListener('touchstart', () => {
      this.moveRight = true;
    });

    buttonMoveRight.addEventListener('touchend', () => {
      this.moveRight = false;
    });

    buttonShuriken.addEventListener('touchstart', () => {
      this.shurikenThrow = true;
    });

    buttonShuriken.addEventListener('touchend', () => {
      this.shurikenThrow = false;
    });

    this.moveSpeed = 192;
    this.jumpHeight = 576;

    this.directionThrowShuriken = 1;
    this.letThrowShuriken = true;
    this.shurikenCount = 10;

    camera.startFollow(this.sprite);
  }

  update(shuriken) {
    const { keys, sprite } = this;

    if (keys.left.isDown || this.moveLeft) {
      sprite.setVelocityX(-this.moveSpeed);

      if (sprite.body.onFloor()) {
        sprite.play('walk', true);
      }
    }

    if (keys.right.isDown || this.moveRight) {
      sprite.setVelocityX(this.moveSpeed);

      if (sprite.body.onFloor()) {
        sprite.play('walk', true);
      }
    }

    if ((keys.up.isDown || this.jump) && sprite.body.onFloor()) {
      sprite.setVelocityY(-this.jumpHeight);
      sprite.play('jump', true);
    }

    if (
      !(
        keys.left.isDown ||
        keys.right.isDown ||
        keys.up.isDown ||
        this.moveLeft ||
        this.moveRight ||
        this.jump
      )
    ) {
      sprite.setVelocityX(0);

      if (sprite.body.onFloor() && !(keys.space.isDown || this.shurikenThrow)) {
        sprite.play('idle', true);
      }
    }

    if (sprite.body.velocity.x > 0) {
      sprite.setFlipX(false);
      this.directionThrowShuriken = 1;
    }

    if (sprite.body.velocity.x < 0) {
      sprite.setFlipX(true);
      this.directionThrowShuriken = -1;
    }

    if (
      (keys.space.isDown || this.shurikenThrow) &&
      this.letThrowShuriken &&
      this.shurikenCount
    ) {
      shuriken.shurikenThrow(this.directionThrowShuriken);
      this.letThrowShuriken = false;

      if (this.shurikenCount > 0) {
        this.shurikenCount--;
      }
      setTimeout(() => {
        this.letThrowShuriken = true;
      }, 200);
    }
  }

  playerHit(player) {
    player.setVelocity(0, 0);
    player.setX(this.spawnPoint.x);
    player.setY(this.spawnPoint.y);
    player.play('idle', true);
    player.setAlpha(0);
    this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 10,
    });
  }

  destroy() {
    this.sprite.destroy();
  }

  shurikenIncrement() {
    this.shurikenCount++;
  }

  getShurikenCount() {
    return this.shurikenCount;
  }
}
