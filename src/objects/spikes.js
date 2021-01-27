export default class Spikes {
  constructor(player, map, physics, scene) {
    this.spikes = physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const spikeObjects = map.getObjectLayer('Spikes')['objects'];

    spikeObjects.forEach((spikeObject) => {
      const spike = this.spikes
        .create(spikeObject.x, spikeObject.y - spikeObject.height, 'spike')
        .setOrigin(0, 0);
      spike.body.setSize(spike.width - 30, spike.height - 30).setOffset(15, 30);
    });

    physics.add.collider(
      player.sprite,
      this.spikes,
      player.playerHit,
      null,
      scene,
    );
  }
}
