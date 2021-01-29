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
    this.load.atlas(
      'player',
      './assets/images/ninja.png',
      './assets/images/ninja_atlas.json',
    );
  }

  create() {
    const map = this.make.tilemap({
      key: 'map',
      tileWidth: 64,
      tileHeight: 64,
    });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    const platforms = map.createLayer('Platforms', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    this.spawnPoint = map.findObject(
      'Objects',
      (obj) => obj.name === 'Spawn Point 1',
    );
    this.player = new Player(
      this,
      this.spawnPoint.x,
      this.spawnPoint.y,
      this.cameras.main,
    );
    this.physics.add.collider(this.player.sprite, platforms);
    this.spikes = new Spikes(this.player, map, this.physics, this);
    this.fps = document.querySelector('.fps');
    // this.joystick = new Joystick(this, 125, 400);

    // this.scale.on('orientationchange', function (orientation) {
    //   if (orientation === Phaser.Scale.PORTRAIT) {
    //     console.log('portrait');
    //   } else if (orientation === Phaser.Scale.LANDSCAPE) {
    //     console.log('landscape');
    //   }
    // });
  }

  update() {
    // this.fps.textContent = this.game.loop.actualFps.toFixed(0);

    this.player.update();
  }
}
