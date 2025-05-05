import * as THREE from 'three';

class Suelo extends THREE.Object3D {
  constructor() {
    super();

    var geometryGround = new THREE.CylinderGeometry(5, 5, 0.01, 32);

    var texture = new THREE.TextureLoader().load('./TEXTURES/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10); 

    var materialGround = new THREE.MeshStandardMaterial({ map: texture });

    var ground = new THREE.Mesh(geometryGround, materialGround);

    ground.position.y = -0.055;

    this.add(ground);
  }
}

export { Suelo };
