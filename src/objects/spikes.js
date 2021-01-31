export default class Spikes {
  constructor(player, map, scene) {
    this.spikes = scene.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const spikeObjects = map.getObjectLayer('Spikes')['objects'];

    spikeObjects.forEach((spikeObject) => {
      const spike = this.spikes
        .create(spikeObject.x, spikeObject.y - spikeObject.height, 'spike')
        .setOrigin(0, 0);
      spike.body.setSize(50, 34).setOffset(7, 30);
    });

    scene.physics.add.collider(
      player.sprite,
      this.spikes,
      player.playerHit,
      null,
      scene,
    );
  }
}
