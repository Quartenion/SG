import * as THREE from 'three';

class Pelota extends THREE.Object3D {
  constructor() {
    super();

    var pelotaGeo = new THREE.SphereGeometry(0.05, 32, 32);

    var texture = new THREE.TextureLoader().load('./TEXTURES/pelota.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1); 

    var PelotaMat = new THREE.MeshStandardMaterial({ map: texture });

    var pelota = new THREE.Mesh(pelotaGeo, PelotaMat);
    this.add(pelota);
  }
}

export { Pelota };
