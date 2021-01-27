export default class Joystick {
  constructor(plugin, scene) {
    this.direction = null;
    this.joyStick = plugin.get('rexVirtualJoyStick').add(scene, {
      x: 125,
      y: 400,
      radius: 100,
      base: scene.add.circle(0, 0, 70, 0x888888),
      thumb: scene.add.circle(0, 0, 35, 0xcccccc),
      // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    }).on('update', this.dumpJoyStickState, this);
  }

  dumpJoyStickState() {
    const cursorKeys = this.joyStick.createCursorKeys();
    this.direction = '';
    for (let name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        this.direction += name;
      }
    }
    // this.s += '\n';
    // this.s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    // this.s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    // this.text.setText(this.s);
  }

  getDirection() {
    return this.direction;
  }
}
