import * as THREE from 'three';
import * as CSG from 'csg';
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

    // Función auxiliar para aplicar transformaciones comunes
    applyTransformations(geo, scale, rotateX, rotateY, rotateZ, translate) {
        geo.scale(...scale);
        geo.rotateX(rotateX);
        geo.rotateY(rotateY);
        geo.rotateZ(rotateZ);
        geo.translate(...translate);
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

        // Crear Muslos y Sub-Muslos (izquierda y derecha)
        const muslosIzda = ['MusloIzda1', 'MusloIzda2', 'MusloIzda3'];
        const muslosDcha = ['MusloDcha1', 'MusloDcha2', 'MusloDcha3'];
        const subMuslosIzda = ['SubMusloIzda1', 'SubMusloIzda2'];
        const subMuslosDcha = ['SubMusloDcha1', 'SubMusloDcha2'];

        // Crear Muslos Izda y Dcha
        const muslos = [...muslosIzda, ...muslosDcha];
        const musloGeos = {};
        muslos.forEach(muslo => {
            this[muslo + 'Obj'] = new Muslo();
            musloGeos[muslo] = this[muslo + 'Obj'].children[0].geometry;
        });

        // Crear Sub-Muslos Izda y Dcha
        const subMuslos = [...subMuslosIzda, ...subMuslosDcha];
        const subMusloGeos = {};
        subMuslos.forEach(subMuslo => {
            this[subMuslo + 'Obj'] = new Muslo();
            subMusloGeos[subMuslo] = this[subMuslo + 'Obj'].children[0].geometry;
        });

        // Aplicar transformaciones a los Muslos y Sub-Muslos
        this.applyTransformations(musloGeos.MusloIzda1, [0.4, 0.4, 0.4], 0, 0, Math.PI / -6, [-0.2, -0.5, 0.2]);
        this.applyTransformations(musloGeos.MusloIzda2, [0.3, 0.3, 0.3], 0, 0, Math.PI / -6, [-0.5, -0.50, 0.3]);
        this.applyTransformations(musloGeos.MusloIzda3, [0.3, 0.3, 0.3], Math.PI / -3, Math.PI / -6, 0, [-1.2, -0.5, 0.7]);
        this.applyTransformations(subMusloGeos.SubMusloIzda1, [0.2, 0.1, 0.2], 0, 0, 0, [-0.15, -0.6, 0.2]);
        this.applyTransformations(subMusloGeos.SubMusloIzda2, [0.2, 0.3, 0.2], Math.PI / -3, Math.PI / -3, 0, [-0.9, -0.7, 0.6]);

        this.applyTransformations(musloGeos.MusloDcha1, [0.4, 0.4, 0.4], 0, 0, Math.PI / -6, [-0.2, -0.5, -0.2]);
        this.applyTransformations(musloGeos.MusloDcha2, [0.3, 0.3, 0.3], 0, 0, Math.PI / -6, [-0.5, -0.50, -0.3]);
        this.applyTransformations(musloGeos.MusloDcha3, [0.3, 0.3, 0.3], Math.PI / 3, Math.PI / 6, 0, [-1.2, -0.5, -0.7]);
        this.applyTransformations(subMusloGeos.SubMusloDcha1, [0.2, 0.1, 0.2], 0, 0, 0, [-0.15, -0.6, -0.2]);
        this.applyTransformations(subMusloGeos.SubMusloDcha2, [0.2, 0.3, 0.2], Math.PI / 3, Math.PI / 3, 0, [-0.9, -0.7, -0.6]);

        // CSG Brushes
        let G1 = new CSG.Brush(this.seccionTorax1, this.OriginalMaterial);
        let G2 = new CSG.Brush(this.seccionTorax2, this.OriginalMaterial);

        let evaluator = new CSG.Evaluator();
        let cuerpo = evaluator.evaluate(G1, G2, CSG.ADDITION);
        
        // Evaluar las operaciones de CSG para los Muslos
        const allBrushes = Object.keys(musloGeos).map(muslo => new CSG.Brush(musloGeos[muslo], this.OriginalMaterial));
        const allSubBrushes = Object.keys(subMusloGeos).map(subMuslo => new CSG.Brush(subMusloGeos[subMuslo], this.OriginalMaterial));

        let result = cuerpo;
        allBrushes.forEach(brush => {
            result = evaluator.evaluate(result, brush, CSG.ADDITION);
        });
        allSubBrushes.forEach(brush => {
            result = evaluator.evaluate(result, brush, CSG.ADDITION);
        });

        // Aplicar escalado y agregar el resultado final
        result.scale.set(0.06, 0.06, 0.06);
        this.add(result);
    }
}

export { Torax };
