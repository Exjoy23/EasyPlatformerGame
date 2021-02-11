import Phaser from 'phaser';
import Spikes from '../objects/spikes';
import Player from '../objects/player';
import Shuriken from '../objects/shuriken';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.spritesheet('shuriken', './assets/images/shuriken.png', {
      frameWidth: 30,
      frameHeight: 31,
    });
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
    const buttonStart = document.querySelector('.menu');
    buttonStart.addEventListener('click', () => {
      buttonStart.style.display = 'none';
    });
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
    this.spikes = new Spikes(this.player, map, this, this.shuriken);
    this.shuriken = new Shuriken(
      this.player.sprite,
      this,
      platforms,
      this.spikes,
    );
    this.fps = document.querySelector('.fps');
    this.shurikenCount = document.querySelector('.shurikens__count');
  }

  update() {
    this.fps.textContent = this.game.loop.actualFps.toFixed(0);
    this.shurikenCount.textContent = this.player.getShurikenCount();
    this.player.update(this.shuriken);
  }
}
