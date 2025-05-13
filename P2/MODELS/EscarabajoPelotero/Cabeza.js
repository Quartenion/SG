import * as THREE from 'three';

class Cabeza extends THREE.Object3D {
  constructor(material = null) {
    super();

    this.cabezaShape = new THREE.Shape();
    this.cabezaShape.moveTo(0, 0); 
    this.cabezaShape.lineTo(0.5, 0); 
    this.cabezaShape.quadraticCurveTo(0.5, 0.3, 0, 0.4);  
    this.cabezaShape.quadraticCurveTo(-0.5, 0.3, -0.5, 0); 
    this.cabezaShape.lineTo(0, 0); 

    this.drawSolid(material);
    this.addEyes();
  }

  drawSolid(material) {
    const points = this.cabezaShape.getPoints(50); 
    this.seccionTorax = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2); 
    const mesh = new THREE.Mesh(this.seccionTorax, material); 

    this.add(mesh);
  }

  addEyes() {
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffbf00, 
      emissive: 0xffa500, 
      emissiveIntensity: 0.4, 
      metalness: 0.3,  
      roughness: 0.3  
    });

    const eyeGeometry = new THREE.SphereGeometry(0.06, 32, 32); 

    // Ojo izquierdo
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.set(0.25, 0.25, 0.3); // Posición del ojo izquierdo

    // Ojo derecho
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeRight.position.set(0.25, 0.25, -0.3); // Posición del ojo derecho

    this.add(eyeLeft);
    this.add(eyeRight);
  }
}

export { Cabeza };
