import * as THREE from 'three';

class Torax extends THREE.Object3D {
  constructor(material = null) {
    super();
    this.cabezaShape = new THREE.Shape();
    this.cabezaShape.bezierCurveTo(0.4, 0, 0.7, 1.5, 0, 1.5);

    const geoTronco = new THREE.CylinderGeometry(0.5, 0.5, 1, 20);
    geoTronco.rotateZ(-Math.PI / 2);
    const geoMesh = new THREE.Mesh(geoTronco, material);
    this.add(geoMesh);
  }
}

export { Torax };
