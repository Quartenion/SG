import * as THREE from 'three';
import * as CSG from 'csg';

class Torax extends THREE.Object3D {
  constructor() {
    super();
    this.cabezaShape = new THREE.Shape();
    this.cabezaShape.bezierCurveTo(0.4, 0, 0.7, 1.5, 0, 1.5);
    this.drawSolid(); 
  }

  drawSolid() {

      this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9ACD32,
        roughness: 0.5,
        metalness: 0.3,
        clearcoat: 1,
      });
  
      const geoTronco = new THREE.CylinderGeometry(0.5, 0.5, 1, 20);
        geoTronco.rotateZ(-Math.PI / 2);
        const geoMesh = new THREE.Mesh(geoTronco, this.OriginalMaterial);
      this.add(geoMesh);
    }
}

export { Torax };
