import Phaser from 'phaser';
import GameScene from './scenes/gamescene';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 450,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },
  backgroundColor: '#ffffff',
  scene: [GameScene],
};

export default new Phaser.Game(config);
