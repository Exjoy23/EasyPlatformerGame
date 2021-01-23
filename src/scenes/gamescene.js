'use strict';

import Phaser from 'phaser';
import Spikes from '../objects/spikes';

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

    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
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

    this.joyStick = this.plugins.get('rexVirtualJoyStick').add(this, {
      x: 400,
      y: 300,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888),
      thumb: this.add.circle(0, 0, 50, 0xcccccc),
      // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    })
      .on('update', this.dumpJoyStickState, this);

    this.s = null;
    this.text = this.add.text(0, 0);
    this.dumpJoyStickState();
  }

  update() {
    // this.fps.textContent = (this.game.loop.actualFps).toFixed(0);

    this.player.update(this.s);

    const joyStick = this.joyStick;
    if (joyStick.enable && joyStick.force > 100) {
      let tolerance = 100 / joyStick.force;
      joyStick.setPosition(
        joyStick.pointer.position.x - joyStick.forceX * tolerance,
        joyStick.pointer.position.y - joyStick.forceY * tolerance
      );

      joyStick.thumb.x = joyStick.pointer.position.x;
      joyStick.thumb.y = joyStick.pointer.position.y;
    }
  }

  dumpJoyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys();
    this.s = '';
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        this.s += name;
      }
    }
    // this.s += '\n';
    // this.s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    // this.s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    // this.text.setText(this.s);
  }
}
