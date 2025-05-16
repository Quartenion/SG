import * as THREE from 'three';

class Femur extends THREE.Object3D {
  constructor() {
    super();

    this.femurShape = new THREE.Shape();
    this.femurShape.moveTo(0, 0); 
    this.femurShape.quadraticCurveTo(0.2, 0, 0.2, 0.3);
    this.femurShape.bezierCurveTo(0.2, 0.6, 0.05, 0.85, 0.1, 1.4);
    this.femurShape.quadraticCurveTo(0.1, 1.5, 0, 1.5);
    this.drawSolid(); 
  }

  drawSolid() {
    this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9ACD32,
      roughness: 0.5,
      metalness: 0.3,
      clearcoat: 1,
    });

    const points = this.femurShape.getPoints(50);
    this.femur = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.femur, this.OriginalMaterial);

    this.add(mesh);
  }
}

export { Femur };
