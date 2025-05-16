import * as THREE from 'three';
import * as CSG from 'csg';

class Abdomen extends THREE.Object3D {
  constructor(material = null) {
    super();
    this.material = material;
    this.createShape();
    this.createSolid();
  }

  createShape() {
    this.abdomenShape = new THREE.Shape();
    this.abdomenShape.moveTo(0, 0);
    this.abdomenShape.quadraticCurveTo(0.5, 0, 0.5, 0.5);   
    this.abdomenShape.quadraticCurveTo(0.51, 0.51, 0.5, 0.52);   
    this.abdomenShape.quadraticCurveTo(0.51, 0.53, 0.5, 0.54);  
    this.abdomenShape.quadraticCurveTo(0.5, 1, 0, 1);       
  }

  createSolid() {
    const points = this.abdomenShape.getPoints(50);
    const abdomenGeo = new THREE.LatheGeometry(points, 50);
    const abdomenMesh = new CSG.Brush(abdomenGeo, this.material);

    this.Agujero = new THREE.BoxGeometry(1, 1, 1.5).translate(-0.5, 0.5, 0);
    const holeMesh = new CSG.Brush(this.Agujero, this.material);
  
    const evaluator = new CSG.Evaluator();
    const result = evaluator.evaluate(abdomenMesh, holeMesh, CSG.SUBTRACTION);

    this.add(result);
  }
}

export { Abdomen };
