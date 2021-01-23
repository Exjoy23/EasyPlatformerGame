'use strict';

import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y, camera) {
    this.scene = scene;

    const anims = scene.anims;
    anims.create({
      key: 'walk',
      frames: anims.generateFrameNames('player', {
        prefix: 'robo_player_',
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1
    });

    anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 'robo_player_0' }],
      frameRate: 10,
    });

    anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 'robo_player_1' }],
      frameRate: 10,
    });

    this.sprite = scene.physics.add
      .sprite(x, y, 'player', 0)
      .setBounce(0.1);

    this.sprite.body.setSize(this.sprite.width - 10, this.sprite.height - 30).setOffset(10, 25);

    const { LEFT, RIGHT, UP, W, A, D, SPACE, ENTER } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      space: SPACE,
      enter: ENTER,
      w: W,
      a: A,
      d: D
    });

    camera.startFollow(this.sprite);
    camera.roundPixels = true;
  }

  update(direction) {
    const { keys, sprite } = this;

    if (keys.left.isDown || keys.a.isDown || direction === 'left' || direction === 'upleft') {
      sprite.setVelocityX(-200);
      if (sprite.body.onFloor()) {
        sprite.play('walk', true);
      }
    } else if (keys.right.isDown || keys.d.isDown || direction === 'right' || direction === 'upright') {
      sprite.setVelocityX(200);

      if (sprite.body.onFloor()) {
        sprite.play('walk', true);
      }
    } else {
      sprite.setVelocityX(0);
      if (sprite.body.onFloor()) {
        sprite.play('idle', true);
      }
    }

    if ((keys.space.isDown || keys.up.isDown || keys.w.isDown || direction === 'up' || direction === 'upright' || direction === 'upleft') && sprite.body.onFloor()) {
      // this.scene.jumpSound.play();
      sprite.setVelocityY(-550);
      sprite.play('jump', true);
    }

    if (sprite.body.velocity.x > 0) {
      sprite.setFlipX(false);
    } else if (sprite.body.velocity.x < 0) {
      sprite.setFlipX(true);
    }
  }

  playerHit(player, spike) {
    player.setVelocity(0, 0);
    player.setX(800);
    player.setY(0);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
      targets: player,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 5,
    });
  }

  destroy() {
    this.sprite.destroy();
  }
}
