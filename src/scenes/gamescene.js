'use strict';

import Phaser from 'phaser';
import Enemy from './enemy';

import Player from './player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.image('background', './assets/images/background.png');
    this.load.image('tiles', './assets/tilesets/platformPack_tilesheet.png');
    this.load.image('spike', './assets/images/spike.png');
    this.load.tilemapTiledJSON('map', './assets/tilemaps/map.json');
    this.load.atlas('player', './assets/images/kenney_player.png',
      './assets/images/kenney_player_atlas.json');
  }

  create() {
    // const backgroundImage = this.add.image(0, -300, 'background').setOrigin(0, 0);
    // backgroundImage.setScale(2, 0.8);
    const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
    const tileset = map.addTilesetImage('platformPack_tilesheet', 'tiles');
    const platforms = map.createLayer('Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);

    const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point');
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.cameras.main);
    this.physics.add.collider(this.player.sprite, platforms);

    // this.cameras.main.setBounds(0, -200, backgroundImage.displayWidth, backgroundImage.displayHeight);
    this.fps = document.querySelector('.fps');

    this.spikes = new Enemy(this.player, map, this.physics, this);
  }

  update() {
    // this.fps.textContent = (this.game.loop.actualFps).toFixed(0);

    this.player.update();
  }
}
