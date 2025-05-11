import * as THREE from 'three';

class Cabeza extends THREE.Object3D {
  constructor() {
    super();

    this.cabezaShape = new THREE.Shape();
    this.cabezaShape.moveTo(0, 0);
    this.cabezaShape.lineTo(0.5, 0);
    this.cabezaShape.quadraticCurveTo(0.5, 0.3, 0, 0.4);  
    this.cabezaShape.quadraticCurveTo(-0.5, 0.3, -0.5, 0);
    this.cabezaShape.lineTo(0, 0);

    this.drawSolid();
    this.addEyes();
  }

  drawSolid() {
    this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b2f2f,
      metalness: 0.6,
      roughness: 0.6,
      clearcoat: 0.2,
      clearcoatRoughness: 0.4,
      sheen: 0.3,
      sheenColor: new THREE.Color(0x223344),
    });

    const points = this.cabezaShape.getPoints(50);
    this.seccionTorax = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    const mesh = new THREE.Mesh(this.seccionTorax, this.OriginalMaterial);

    this.add(mesh);
  }

  addEyes() {
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffbf00, // Color ámbar
      emissive: 0xffa500,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.3
    });

    const eyeGeometry = new THREE.SphereGeometry(0.06, 32, 32);

    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.set(0.25, 0.25, 0.3);

    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeRight.position.set(0.25, 0.25, -0.3);

    this.add(eyeLeft);
    this.add(eyeRight);
  }
}

export { Cabeza };
