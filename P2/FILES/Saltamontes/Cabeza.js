import * as THREE from 'three';
import * as CSG from 'csg';
import { Antena } from './Antena.js';

class Cabeza extends THREE.Object3D {
  constructor() {
    super();
    this.cabezaShape = new THREE.Shape();
    this.cabezaShape.bezierCurveTo(0.4, 0, 0.7, 1.5, 0, 1.5);
    this.drawSolid(); 
  }

  createLatheGeometry(points, scale = 1, translate = new THREE.Vector3(0, 0, 0)) {
    const geometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
    geometry.scale(scale, scale, scale);
    geometry.translate(translate.x, translate.y, translate.z);
    return geometry;
  }

  createAntena(rotateX, rotateZ, translate) {
    const antenaGeo = new Antena().children[0].geometry.clone();
    antenaGeo.rotateX(rotateX);
    antenaGeo.rotateZ(rotateZ);
    antenaGeo.translate(translate.x, translate.y, translate.z);
    return antenaGeo;
  }

  drawSolid() {
    const materialCraneo = new THREE.MeshPhysicalMaterial({
      color: 0x9ACD32,
      roughness: 0.5,
      metalness: 0.3,
      clearcoat: 1,
    });

    const materialOjo = new THREE.MeshPhysicalMaterial({
      color: 0x000822,
      roughness: 0.5,
      metalness: 0.3,
      clearcoat: 0.1,
      reflectivity: 0.2,
    });

    const points = this.cabezaShape.getPoints(50);
    
    // Geometría del Cráneo
    const geoCraneo = this.createLatheGeometry(points);

    // Geometrías de los Ojos
    const geoOjoIzq = this.createLatheGeometry(points, 0.4, new THREE.Vector3(0.2, 0.7, 0.3));
    const geoOjoDer = this.createLatheGeometry(points, 0.4, new THREE.Vector3(0.2, 0.7, -0.3));

    // Geometrías de las Antenas
    const geoAntenaIzq = this.createAntena(-Math.PI / 8, -Math.PI / 8, new THREE.Vector3(0.2, 1.4, -0.1));
    const geoAntenaDer = this.createAntena(Math.PI / 8, -Math.PI / 8, new THREE.Vector3(0.2, 1.4, 0.1));

    // Crear los Brushes
    const brushCraneo = new CSG.Brush(geoCraneo, materialCraneo);
    const brushOjoIzq = new CSG.Brush(geoOjoIzq, materialOjo);
    const brushOjoDer = new CSG.Brush(geoOjoDer, materialOjo);
    const brushAntenaIzq = new CSG.Brush(geoAntenaIzq, materialCraneo);
    const brushAntenaDer = new CSG.Brush(geoAntenaDer, materialCraneo);

    // Evaluar la combinación de las geometrías
    const evaluator = new CSG.Evaluator();
    let result = evaluator.evaluate(brushCraneo, brushOjoIzq, CSG.ADDITION);
    result = evaluator.evaluate(result, brushOjoDer, CSG.ADDITION);
    result = evaluator.evaluate(result, brushAntenaIzq, CSG.ADDITION);
    result = evaluator.evaluate(result, brushAntenaDer, CSG.ADDITION);

    this.add(result);
  }
}

export { Cabeza };
