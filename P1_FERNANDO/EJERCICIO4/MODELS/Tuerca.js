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

        // Colocar la tuerca
        this.add(tuerca);
    }
}

export { Tuerca };
