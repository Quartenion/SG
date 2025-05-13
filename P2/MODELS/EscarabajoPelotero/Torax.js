import * as THREE from 'three';

class Torax extends THREE.Object3D {
  constructor(material = null) {
    super();

    this.abdomenShape = new THREE.Shape();

    this.abdomenShape.moveTo(0, 0);

    this.abdomenShape.quadraticCurveTo(0.3, 0, 0.5, 0.1); 
    this.abdomenShape.quadraticCurveTo(0.5, 0.3, 0.3, 0.5);  
    this.abdomenShape.lineTo(0, 0.55);

    this.drawSolid(material);
  }

  drawLines() {
    const points = this.abdomenShape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const object = new THREE.Line(geometry, this.OriginalMaterial);

    this.add(object);
  }

  drawSolid(material) {    
    const points = this.abdomenShape.getPoints(50);
    this.seccionTorax = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.seccionTorax, material);

    this.add(mesh);
  }
}

export { Torax };
