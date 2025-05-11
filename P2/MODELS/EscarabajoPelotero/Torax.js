import * as THREE from 'three';

class Torax extends THREE.Object3D {
  constructor() {
    super();

    this.abdomenShape = new THREE.Shape();

    this.abdomenShape.moveTo(0, 0);

    this.abdomenShape.quadraticCurveTo(0.3, 0, 0.5, 0.1); 
    this.abdomenShape.quadraticCurveTo(0.5, 0.3, 0.3, 0.5);  
    this.abdomenShape.lineTo(0, 0.55);

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
        color: 0x3b2f2f,             // Marrón oscuro base con tono rojizo
        metalness: 0.6,              // Metal medio-alto, da efecto "placa metálica"
        roughness: 0.6,              // Más rugoso, menos reflejos especulares
        clearcoat: 0.2,              // Un poco de capa brillante, pero muy tenue
        clearcoatRoughness: 0.4,     // Casi mate
        sheen: 0.3,                  // Un poco de brillo superficial, tipo cáscara
        sheenColor: new THREE.Color(0x223344), // Azul oscuro para el tono azulado
      });      
      

    const points = this.abdomenShape.getPoints(50);
    this.seccionTorax = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.seccionTorax, this.OriginalMaterial);

    this.add(mesh);
  }
}

export { Torax };
