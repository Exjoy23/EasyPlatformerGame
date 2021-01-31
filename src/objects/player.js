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
        end: 59,
      }),
      frameRate: 120,
      repeat: -1,
    });

    anims.create({
      key: 'idle',
      frames: anims.generateFrameNames('player', {
        prefix: 'ninja_idle_',
        start: 0,
        end: 59,
      }),
      frameRate: 90,
      repeat: -1,
    });

    anims.create({
      key: 'jump',
      frames: anims.generateFrameNames('player', {
        prefix: 'ninja_jump_',
        start: 0,
        end: 59,
      }),
      frameRate: 60,
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

    this.buttonJump = document.querySelector('.button--up');
    this.buttonMoveLeft = document.querySelector('.button--left');
    this.buttonMoveRight = document.querySelector('.button--right');

    this.jump = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.buttonJump.addEventListener('touchstart', () => {
      this.jump = true;
    });

    this.buttonJump.addEventListener('touchend', () => {
      this.jump = false;
    });

    this.buttonMoveLeft.addEventListener('touchstart', () => {
      this.moveLeft = true;
    });

    this.buttonMoveLeft.addEventListener('touchend', () => {
      this.moveLeft = false;
    });

    this.buttonMoveRight.addEventListener('touchstart', () => {
      this.moveRight = true;
    });

    this.buttonMoveRight.addEventListener('touchend', () => {
      this.moveRight = false;
    });

    this.moveSpeed = 192;
    this.jumpHeight = 576;

    this.direction = 1;
    this.letThrow = true;
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
    } else if (keys.right.isDown || this.moveRight) {
      sprite.setVelocityX(this.moveSpeed);

      if (sprite.body.onFloor()) {
        sprite.play('walk', true);
      }
    } else {
      sprite.setVelocityX(0);

      if (sprite.body.onFloor()) {
        sprite.play('idle', true);
      }
    }

    if ((keys.up.isDown || this.jump) && sprite.body.onFloor()) {
      // this.scene.jumpSound.play();
      sprite.setVelocityY(-this.jumpHeight);
      sprite.play('jump', true);
    }

    if (sprite.body.velocity.x > 0) {
      sprite.setFlipX(false);
      this.direction = 1;
    } else if (sprite.body.velocity.x < 0) {
      sprite.setFlipX(true);
      this.direction = -1;
    }

    if (keys.space.isDown && this.letThrow && this.shurikenCount) {
      shuriken.shurikenThrow(this.direction);
      this.letThrow = false;

      if (this.shurikenCount > 0) {
        this.shurikenCount--;
      }
      setTimeout(() => {
        this.letThrow = true;
      }, 400);
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
}
