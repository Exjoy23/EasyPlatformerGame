import Phaser from 'phaser';
import GameScene from './scenes/gamescene';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },
  plugins: {
    global: [
      {
        key: 'rexVirtualJoyStick',
        plugin: VirtualJoyStickPlugin,
        start: true,
      },
    ],
  },
  backgroundColor: '#ffffff',
  scene: [GameScene],
};

export default new Phaser.Game(config);
