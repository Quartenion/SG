import * as THREE from 'three';

class Pelota extends THREE.Object3D {
  constructor() {
    super();

    const pelotaGeo = new THREE.SphereGeometry(0.05, 32, 32);

    // Cargar textura difusa
    const texture = new THREE.TextureLoader().load('./TEXTURES/pelota.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    // Cargar bump map
    const bumpMap = new THREE.TextureLoader().load('./TEXTURES/pelota_bump1.png');
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(1, 1);

    // Crear material con mapa de relieve
    const PelotaMat = new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: bumpMap,
      bumpScale: 10 // Ajusta el valor según la intensidad que desees
    });

    const pelota = new THREE.Mesh(pelotaGeo, PelotaMat);
    this.add(pelota);
  }
}

export { Pelota };
