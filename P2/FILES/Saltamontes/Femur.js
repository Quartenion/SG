import * as THREE from 'three';

class Femur extends THREE.Object3D {
  constructor(material = null) {
    super();

    this.femurShape = new THREE.Shape();
    this.femurShape.moveTo(0, 0); 
    this.femurShape.quadraticCurveTo(0.2, 0, 0.2, 0.3);
    this.femurShape.bezierCurveTo(0.2, 0.6, 0.05, 0.85, 0.1, 1.4);
    this.femurShape.quadraticCurveTo(0.1, 1.5, 0, 1.5);
    this.drawSolid(material); 
  }

  drawSolid(material = null) {
    const points = this.femurShape.getPoints(50);
    this.femur = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.femur, material);

    this.add(mesh);
  }
}

export { Femur };
