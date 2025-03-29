import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js';

class Tuerca extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();
        var base = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 6);
        var agujero = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 32);
        var bordes = new THREE.SphereGeometry(0.48, 500);

        base.translate(0, 0.5, 0);
        agujero.translate(0, 0.5, 0);
        bordes.translate(0, 0.5, 0);

        let baseBrush = new CSG.Brush(base, material);
        let agujeroBrush = new CSG.Brush(agujero, material);
        let bordesBrush = new CSG.Brush(bordes, material);

        let evaluator = new CSG.Evaluator();
        let tuercaBase = evaluator.evaluate(baseBrush, agujeroBrush, CSG.SUBTRACTION);
        let tuerca = evaluator.evaluate(tuercaBase, bordesBrush, CSG.INTERSECTION);

        // Generar la trayectoria de la espiral (muelle)
        const points = [];
        const turns = 10; // Número de vueltas
        const height = 0.4; // Altura total del muelle
        const radius = 0.2; // Radio del muelle

        for (let i = 0; i <= turns * 100; i++) {
            const angle = i * Math.PI * 2 / 100;  // Ángulo de cada punto (giro)
            const y = i * height / (turns * 100);  // Altura
            const x = Math.cos(angle) * radius;  // Radio del muelle
            const z = Math.sin(angle) * radius;  // Radio del muelle
            points.push(new THREE.Vector3(x, y, z));
        }

        // Crear la Catmull-Rom curve
        const curve = new THREE.CatmullRomCurve3(points);
        
        // Crear un tube (como un muelle) a lo largo de la curva
        const tubeGeometry = new THREE.TubeGeometry(curve, points.length, 0.01, 8, false);
        tubeGeometry.translate(0, 0.3, 0); // Ajustar la posición del tubo

        let ranuras = new CSG.Brush(tubeGeometry, material);

        let tuercaFinal = evaluator.evaluate(tuerca, ranuras, CSG.SUBTRACTION);
        // Agregar la geometría de la tuerca y el muelle (el tubo)
        this.add(tuercaFinal);
    }
}

export { Tuerca };
