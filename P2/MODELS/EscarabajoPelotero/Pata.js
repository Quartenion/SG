import * as THREE from 'three';

class Pata extends THREE.Object3D {
  constructor() {
    super();

    this.pataShape = new THREE.Shape();

    // Forma base y garras
    this.pataShape.moveTo(0, 0);
    this.pataShape.lineTo(0.05, 0);
    this.pataShape.bezierCurveTo(0, 0.1, 0.18, 0.25, 0.05, 0.4); // Garra 1
    this.pataShape.quadraticCurveTo(0.065, 0.375, 0.07, 0.35);   // Detalle Garra 1

    // Separación
    this.pataShape.lineTo(0.06, 0.345);

    // Garra 2
    this.pataShape.quadraticCurveTo(0.045, 0.36, 0.025, 0.345);
    this.pataShape.quadraticCurveTo(0.05, 0.35, 0.07, 0.32);

    // Separación
    this.pataShape.lineTo(0.06, 0.315);

    // Garra 3
    this.pataShape.quadraticCurveTo(0.045, 0.33, 0.01, 0.305);
    this.pataShape.quadraticCurveTo(0.05, 0.32, 0.07, 0.28);

    // Separación
    this.pataShape.lineTo(0.06, 0.275);

    // Garra 4
    this.pataShape.quadraticCurveTo(0.045, 0.29, 0.015, 0.26);
    this.pataShape.quadraticCurveTo(0.05, 0.27, 0.07, 0.24);

    // Separación
    this.pataShape.lineTo(0.06, 0.235);

    // Garra 5
    this.pataShape.quadraticCurveTo(0.045, 0.24, 0.03, 0.22);
    this.pataShape.quadraticCurveTo(0.1, 0.25, 0, 0);

    this.drawSolid();
  }

  drawLines() {
    const points = this.pataShape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const object = new THREE.Line(geometry, this.OriginalMaterial);

    this.add(object);
  }

  drawSolid() {
    const extrudeSettings = { 
      depth: 0.1, 
      bevelEnabled: false,
    };

    const geometry = new THREE.ExtrudeGeometry(this.pataShape, extrudeSettings);

    this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b2f2f,                // Marrón oscuro base con tono rojizo
      metalness: 0.6,                 // Metal medio-alto
      roughness: 0.6,                 // Menos reflejos especulares
      clearcoat: 0.2,                 // Capa brillante tenue
      clearcoatRoughness: 0.4,        // Casi mate
      sheen: 0.3,                     // Brillo superficial suave
      sheenColor: new THREE.Color(0x223344), // Azul oscuro
    });

    const mesh = new THREE.Mesh(geometry, this.OriginalMaterial);
    mesh.scale.z = 0.1;

    this.add(mesh);
  }
}

export { Pata };
