import * as THREE from '../../../../libs/three.module.js';
import * as CSG from '../../../../libs/three-bvh-csg.js';

import { Muslo } from './Muslo.js';

class Torax extends THREE.Object3D {
    constructor() {
        super();
        
        this.toraxShape = new THREE.Shape();

        this.toraxShape.moveTo(0, 0);
        this.toraxShape.bezierCurveTo(0.7, 0, 0.4, 1, 0, 1);
        this.drawSolid();
    }

    drawLines() {
        const points = this.toraxShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });

        const points = this.toraxShape.getPoints(50);

        this.seccionTorax1 = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.seccionTorax2 = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2); 
        
        this.seccionTorax1.rotateZ(Math.PI / -2);
        this.seccionTorax1.translate(-0.8, 0, 0);

        this.seccionTorax2.scale(1, 0.9, 1);
        this.seccionTorax2.rotateZ(Math.PI / -6);
        this.seccionTorax2.translate(-0.2, -0.2, 0);

        this.MusloIzda1Obj = new Muslo();
        this.MusloIzda2Obj = new Muslo();
        this.MusloIzda3Obj = new Muslo();
        this.SubMusloIzda1Obj = new Muslo();
        this.SubMusloIzda2Obj = new Muslo();

        this.MusloIzda1Geo = this.MusloIzda1Obj.children[0].geometry;
        this.MusloIzda2Geo = this.MusloIzda2Obj.children[0].geometry;
        this.MusloIzda3Geo = this.MusloIzda3Obj.children[0].geometry;
        this.SubMusloIzda1Geo = this.SubMusloIzda1Obj.children[0].geometry;
        this.SubMusloIzda2Geo = this.SubMusloIzda2Obj.children[0].geometry;

        this.MusloDcha1Obj = new Muslo();
        this.MusloDcha2Obj = new Muslo();
        this.MusloDcha3Obj = new Muslo();
        this.SubMusloDcha1Obj = new Muslo();
        this.SubMusloDcha2Obj = new Muslo();

        this.MusloDcha1Geo = this.MusloDcha1Obj.children[0].geometry;
        this.MusloDcha2Geo = this.MusloDcha2Obj.children[0].geometry;
        this.MusloDcha3Geo = this.MusloDcha3Obj.children[0].geometry;
        this.SubMusloDcha1Geo = this.SubMusloDcha1Obj.children[0].geometry;
        this.SubMusloDcha2Geo = this.SubMusloDcha2Obj.children[0].geometry;

        
        this.MusloIzda1Geo.scale(0.4, 0.4, 0.4);
        this.MusloIzda1Geo.rotateZ(Math.PI / -6);
        this.MusloIzda1Geo.translate(-0.2, -0.5, 0.2);

        
        this.MusloIzda2Geo.scale(0.3, 0.3, 0.3);
        this.MusloIzda2Geo.rotateZ(Math.PI / -6);
        this.MusloIzda2Geo.translate(-0.5, -0.50, 0.3);

        
        this.MusloIzda3Geo.scale(0.3, 0.3, 0.3);
        this.MusloIzda3Geo.rotateX(Math.PI / -3);
        this.MusloIzda3Geo.rotateY(Math.PI / -6);
        this.MusloIzda3Geo.translate(-1.2, -0.5, 0.7);

        
        this.SubMusloIzda1Geo.scale(0.2, 0.1, 0.2);
        this.SubMusloIzda1Geo.translate(-0.15, -0.6, 0.2);

        
        this.SubMusloIzda2Geo.scale(0.2, 0.3, 0.2);
        this.SubMusloIzda2Geo.rotateX(Math.PI / -3);
        this.SubMusloIzda2Geo.rotateY(Math.PI / -3);
        this.SubMusloIzda2Geo.translate(-0.9, -0.7, 0.6);

        this.MusloDcha1Geo.scale(0.4, 0.4, 0.4);
        this.MusloDcha1Geo.rotateZ(Math.PI / -6);
        this.MusloDcha1Geo.translate(-0.2, -0.5, -0.2);

        this.MusloDcha2Geo.scale(0.3, 0.3, 0.3);
        this.MusloDcha2Geo.rotateZ(Math.PI / -6);
        this.MusloDcha2Geo.translate(-0.5, -0.50, -0.3);

        this.MusloDcha3Geo.scale(0.3, 0.3, 0.3);
        this.MusloDcha3Geo.rotateX(Math.PI / 3);
        this.MusloDcha3Geo.rotateY(Math.PI / 6);
        this.MusloDcha3Geo.translate(-1.2, -0.5, -0.7);

        this.SubMusloDcha1Geo.scale(0.2, 0.1, 0.2);
        this.SubMusloDcha1Geo.translate(-0.15, -0.6, -0.2);

        this.SubMusloDcha2Geo.scale(0.2, 0.3, 0.2);
        this.SubMusloDcha2Geo.rotateX(Math.PI / 3);
        this.SubMusloDcha2Geo.rotateY(Math.PI / 3);
        this.SubMusloDcha2Geo.translate(-0.9, -0.7, -0.6);

        

        let G1 = new CSG.Brush(this.seccionTorax1, this.OriginalMaterial);
        let G2 = new CSG.Brush(this.seccionTorax2, this.OriginalMaterial);

        let MusloIzda1Brush = new CSG.Brush(this.MusloIzda1Geo, this.OriginalMaterial);
        let MusloIzda2Brush = new CSG.Brush(this.MusloIzda2Geo, this.OriginalMaterial);
        let MusloIzda3Brush = new CSG.Brush(this.MusloIzda3Geo, this.OriginalMaterial);
        let SubMusloIzda1Brush = new CSG.Brush(this.SubMusloIzda1Geo, this.OriginalMaterial);
        let SubMusloIzda2Brush = new CSG.Brush(this.SubMusloIzda2Geo, this.OriginalMaterial);
        let MusloDcha1Brush = new CSG.Brush(this.MusloDcha1Geo, this.OriginalMaterial);
        let MusloDcha2Brush = new CSG.Brush(this.MusloDcha2Geo, this.OriginalMaterial);
        let MusloDcha3Brush = new CSG.Brush(this.MusloDcha3Geo, this.OriginalMaterial);
        let SubMusloDcha1Brush = new CSG.Brush(this.SubMusloDcha1Geo, this.OriginalMaterial);
        let SubMusloDcha2Brush = new CSG.Brush(this.SubMusloDcha2Geo, this.OriginalMaterial);

        let evaluator = new CSG.Evaluator();
        let cuerpo = evaluator.evaluate(G1, G2, CSG.ADDITION);
        let musloIzda1 = evaluator.evaluate(cuerpo, MusloIzda1Brush, CSG.ADDITION);
        let musloIzda2 = evaluator.evaluate(musloIzda1, MusloIzda2Brush, CSG.ADDITION);
        let musloIzda3 = evaluator.evaluate(musloIzda2, MusloIzda3Brush, CSG.ADDITION);
        let subMusloIzda1 = evaluator.evaluate(musloIzda3, SubMusloIzda1Brush, CSG.ADDITION);   
        let subMusloIzda2 = evaluator.evaluate(subMusloIzda1, SubMusloIzda2Brush, CSG.ADDITION);
        let musloDcha1 = evaluator.evaluate(subMusloIzda2, MusloDcha1Brush, CSG.ADDITION);
        let musloDcha2 = evaluator.evaluate(musloDcha1, MusloDcha2Brush, CSG.ADDITION);
        let musloDcha3 = evaluator.evaluate(musloDcha2, MusloDcha3Brush, CSG.ADDITION);
        let subMusloDcha1 = evaluator.evaluate(musloDcha3, SubMusloDcha1Brush, CSG.ADDITION);
        let total = evaluator.evaluate(subMusloDcha1, SubMusloDcha2Brush, CSG.ADDITION);
      
        total.scale.set(0.06, 0.06, 0.06);
        this.add(total);


    }
}

export { Torax };
