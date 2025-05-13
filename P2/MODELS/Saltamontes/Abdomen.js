import * as THREE from 'three';

class Abdomen extends THREE.Object3D {
  constructor() {
    super();

    this.abdomenShape = new THREE.Shape();

    this.abdomenShape.moveTo(0, 0);

    // Definir pasos equidistantes para las primeras 5 hendiduras
    const stepY = 0.15; 
    this.abdomenShape.quadraticCurveTo(0.1, 0.05, 0.12, stepY);               
    this.abdomenShape.quadraticCurveTo(0.14, stepY + 0.03, 0.12, stepY * 2);  
    this.abdomenShape.quadraticCurveTo(0.15, stepY * 2 + 0.03, 0.12, stepY * 3); 
    this.abdomenShape.quadraticCurveTo(0.16, stepY * 3 + 0.03, 0.12, stepY * 4); 
    this.abdomenShape.quadraticCurveTo(0.15, stepY * 4 + 0.03, 0.12, stepY * 5); 
    this.abdomenShape.quadraticCurveTo(0.15, 1.1, 0, 1.1);

    this.drawSolid();
  }

  drawLines() {
    const points = this.abdomenShape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const object = new THREE.Line(geometry, this.OriginalMaterial);

    this.add(object);
  }

  drawSolid() {
    this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9ACD32,
      roughness: 0.5,
      metalness: 0.3,
      clearcoat: 1,
    });

    const points = this.abdomenShape.getPoints(50);
    this.seccionTorax = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.seccionTorax, this.OriginalMaterial);

    this.add(mesh);
  }
}

export { Abdomen };
