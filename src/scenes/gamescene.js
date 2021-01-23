'use strict';

import Phaser from 'phaser';
import Spikes from '../objects/spikes';
import Joystick from '../objects/joystick';
import Player from '../objects/player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/tileset.png');
    this.load.image('spike', './assets/images/spike.png');
    this.load.tilemapTiledJSON('map', './assets/tilemaps/map.json');
    this.load.atlas('player', './assets/images/kenney_player.png',
      './assets/images/kenney_player_atlas.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const platforms = map.createLayer('Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    // const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point');
    // this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.cameras.main);
    this.player = new Player(this, 800, 0, this.cameras.main);
    this.physics.add.collider(this.player.sprite, platforms);

    this.spikes = new Spikes(this.player, map, this.physics, this);

    // this.cameras.main.setBounds(0, -200, backgroundImage.displayWidth, backgroundImage.displayHeight);
    this.fps = document.querySelector('.fps');

    this.joystick = new Joystick(this.plugins, this);
  }

  update() {
    // this.fps.textContent = (this.game.loop.actualFps).toFixed(0);

    this.player.update(this.joystick.getDirection());

    // const joyStick = this.joyStick;
    // if (joyStick.enable && joyStick.force > 100) {
    //   let tolerance = 100 / joyStick.force;
    //   joyStick.setPosition(
    //     joyStick.pointer.position.x - joyStick.forceX * tolerance,
    //     joyStick.pointer.position.y - joyStick.forceY * tolerance
    //   );

    //   joyStick.thumb.x = joyStick.pointer.position.x;
    //   joyStick.thumb.y = joyStick.pointer.position.y;
    // }
  }


}
