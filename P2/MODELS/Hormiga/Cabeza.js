import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js';

import { Mandibula } from './Mandibula.js';
import { Antena } from './Antena.js';

class Cabeza extends THREE.Object3D {
    constructor() {
        super();
        
        this.cabezaShape = new THREE.Shape();

        this.cabezaShape.moveTo(0, 0);
        this.cabezaShape.bezierCurveTo(0.7, 0, 0.4, 1, 0, 1);
        this.drawSolid();
    }

    drawLines() {
        const points = this.cabezaShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });

        this.EyeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000822,
            roughness: 0.5,
            metalness: 0.3,
            clearcoat: 0.1,
            reflectivity: 0.2,
        });

        const points = this.cabezaShape.getPoints(50);

        this.CraneoGeo = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.OjoIzdaGeo = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.OjoDchaGeo = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);

        this.MandibulaIzdaObj = new Mandibula();
        this.MandibulaDchaObj = new Mandibula();

        this.MandibulaIzdaGeo = this.MandibulaIzdaObj.children[0].geometry;
        this.MandibulaDchaGeo = this.MandibulaDchaObj.children[0].geometry;

        this.AntenaIzdaObj = new Antena();
        this.AntenaDchaObj = new Antena();

        this.AntenaIzdaGeo = this.AntenaIzdaObj.children[0].geometry;
        this.AntenaDchaGeo = this.AntenaDchaObj.children[0].geometry;
        
        this.CraneoGeo.rotateZ(Math.PI / -2);
        this.CraneoGeo.translate(-0.1, 0.15, 0);
        this.CraneoGeo.scale(1, 0.9, 0.9);

        this.OjoIzdaGeo.scale(0.35, 0.45, 0.35);
        this.OjoIzdaGeo.rotateZ(Math.PI / -2);
        this.OjoIzdaGeo.rotateY(Math.PI / 15);
        this.OjoIzdaGeo.translate(0.2, 0.2, 0.3);
        
        this.OjoDchaGeo.scale(0.35, 0.45, 0.35);
        this.OjoDchaGeo.rotateZ(Math.PI / -2);
        this.OjoDchaGeo.rotateY(Math.PI / -15);
        this.OjoDchaGeo.translate(0.2, 0.2, -0.3);

        this.MandibulaIzdaGeo.scale(0.2, 0.2, 0.2);
        this.MandibulaIzdaGeo.rotateX(Math.PI);
        this.MandibulaIzdaGeo.rotateY(Math.PI / 8);
        this.MandibulaIzdaGeo.translate(0.7, 0.1, 0);

        this.MandibulaDchaGeo.scale(0.2, 0.2, 0.2);
        this.MandibulaDchaGeo.rotateY(Math.PI / -8);
        this.MandibulaDchaGeo.translate(0.7, 0.1, 0);

        
        this.AntenaIzdaGeo.rotateY(Math.PI / 8);
        this.AntenaIzdaGeo.rotateZ(Math.PI / 8);
        this.AntenaIzdaGeo.translate(0.6, 0.3, -0.2);

        this.AntenaDchaGeo.rotateY(Math.PI / -8);
        this.AntenaDchaGeo.rotateZ(Math.PI / 8);
        this.AntenaDchaGeo.translate(0.6, 0.3, 0.2);

        let CraneoBrush = new CSG.Brush(this.CraneoGeo, this.OriginalMaterial);
        let OjoIzdaBrush = new CSG.Brush(this.OjoIzdaGeo, this.EyeMaterial);
        let OjoDchaBrush = new CSG.Brush(this.OjoDchaGeo, this.EyeMaterial);
        let MandibulaIzdaBrush = new CSG.Brush(this.MandibulaIzdaGeo, this.OriginalMaterial);
        let MandibulaDchaBrush = new CSG.Brush(this.MandibulaDchaGeo, this.OriginalMaterial);
        let AntenaIzdaBrush = new CSG.Brush(this.AntenaIzdaGeo, this.OriginalMaterial);
        let AntenaDchaBrush = new CSG.Brush(this.AntenaDchaGeo, this.OriginalMaterial);

        let evaluator = new CSG.Evaluator();
        let iter1 = evaluator.evaluate(CraneoBrush, OjoIzdaBrush, CSG.ADDITION);
        let iter2 = evaluator.evaluate(iter1, OjoDchaBrush, CSG.ADDITION);
        let iter3 = evaluator.evaluate(iter2, MandibulaIzdaBrush, CSG.ADDITION);
        let iter4 = evaluator.evaluate(iter3, MandibulaDchaBrush, CSG.ADDITION);
        let iter5 = evaluator.evaluate(iter4, AntenaIzdaBrush, CSG.ADDITION);
        let iter6 = evaluator.evaluate(iter5, AntenaDchaBrush, CSG.ADDITION);

        iter6.scale.set(0.06, 0.06, 0.06);
        this.add(iter6);
    }
}

export { Cabeza };
