import * as THREE from 'three';
import * as CSG from 'csg';

import { Mandibula } from './Mandibula.js';
import { Antena } from './Antena.js';

class Cabeza extends THREE.Object3D {
    constructor(material = null) {
        super();

        this.materialCraneo = material;

        this.materialOjo = new THREE.MeshPhysicalMaterial({
            color: 0x000822,
            roughness: 0.5,
            metalness: 0.3,
            clearcoat: 0.1,
            reflectivity: 0.2,
        });

        this.OriginalMaterial = this.materialCraneo;

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.7, 0, 0.4, 1, 0, 1);
        const points = shape.getPoints(50);

        const geoCraneo = new THREE.LatheGeometry(points, 50);
        geoCraneo.rotateZ(-Math.PI / 2);
        geoCraneo.translate(-0.1, 0.15, 0);
        geoCraneo.scale(1, 0.9, 0.9);

        const geoOjoIzq = new THREE.LatheGeometry(points, 50);
        geoOjoIzq.scale(0.35, 0.45, 0.35);
        geoOjoIzq.rotateZ(-Math.PI / 2);
        geoOjoIzq.rotateY(Math.PI / 15);
        geoOjoIzq.translate(0.2, 0.2, 0.3);

        const geoOjoDer = new THREE.LatheGeometry(points, 50);
        geoOjoDer.scale(0.35, 0.45, 0.35);
        geoOjoDer.rotateZ(-Math.PI / 2);
        geoOjoDer.rotateY(-Math.PI / 15);
        geoOjoDer.translate(0.2, 0.2, -0.3);

        const geoMandIzq = new Mandibula(material).children[0].geometry.clone();
        geoMandIzq.scale(0.2, 0.2, 0.2);
        geoMandIzq.rotateX(Math.PI);
        geoMandIzq.rotateY(Math.PI / 8);
        geoMandIzq.translate(0.7, 0.1, 0);

        const geoMandDer = new Mandibula(material).children[0].geometry.clone();
        geoMandDer.scale(0.2, 0.2, 0.2);
        geoMandDer.rotateY(-Math.PI / 8);
        geoMandDer.translate(0.7, 0.1, 0);

        const geoAntenaIzq = new Antena(material).children[0].geometry.clone();
        geoAntenaIzq.rotateY(Math.PI / 8);
        geoAntenaIzq.rotateZ(Math.PI / 8);
        geoAntenaIzq.translate(0.6, 0.3, -0.2);

        const geoAntenaDer = new Antena(material).children[0].geometry.clone();
        geoAntenaDer.rotateY(-Math.PI / 8);
        geoAntenaDer.rotateZ(Math.PI / 8);
        geoAntenaDer.translate(0.6, 0.3, 0.2);

        // Brushes
        const brushCraneo = new CSG.Brush(geoCraneo, this.materialCraneo);
        const brushOjoIzq = new CSG.Brush(geoOjoIzq, this.materialOjo);
        const brushOjoDer = new CSG.Brush(geoOjoDer, this.materialOjo);
        const brushMandIzq = new CSG.Brush(geoMandIzq, this.materialCraneo);
        const brushMandDer = new CSG.Brush(geoMandDer, this.materialCraneo);
        const brushAntenaIzq = new CSG.Brush(geoAntenaIzq, this.materialCraneo);
        const brushAntenaDer = new CSG.Brush(geoAntenaDer, this.materialCraneo);

        // CSG
        const evaluator = new CSG.Evaluator();
        let result = evaluator.evaluate(brushCraneo, brushOjoIzq, CSG.ADDITION);
        result = evaluator.evaluate(result, brushOjoDer, CSG.ADDITION);
        result = evaluator.evaluate(result, brushMandIzq, CSG.ADDITION);
        result = evaluator.evaluate(result, brushMandDer, CSG.ADDITION);
        result = evaluator.evaluate(result, brushAntenaIzq, CSG.ADDITION);
        result = evaluator.evaluate(result, brushAntenaDer, CSG.ADDITION);

        this.add(result);
    }
}

export { Cabeza };
