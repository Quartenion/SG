import * as THREE from 'three';

class Ala extends THREE.Object3D {
  constructor() {
    super();
    this.alaShape = new THREE.Shape();
    this.alaShape.moveTo(0, 0); // base ancha y redondeada
    this.alaShape.lineTo(0.1, 0);
    this.alaShape.quadraticCurveTo(0.2, 0.5, 0.1, 1);
    this.alaShape.lineTo(0, 1.1);
    this.alaShape.lineTo(0,0);
    this.drawSolid(); 
  }

  drawSolid() {
    const extrudeSettings = { 
        depth: 0.1, 
        bevelEnabled: false,
    };
    
    const geometry = new THREE.ExtrudeGeometry(this.alaShape, extrudeSettings);
    
    const material = new THREE.MeshPhysicalMaterial({ 
        color: 0x958542,  
        transmission: 0.9,
        ior: 1.2,
        thickness: 0.1,
        roughness: 0.1,
        metalness: 0.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.z = 0.1; 
    this.add(mesh);

    }
}

export { Ala };
