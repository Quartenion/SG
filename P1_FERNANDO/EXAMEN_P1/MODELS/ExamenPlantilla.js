import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js';
import { Revolucion } from './RevolucionPlantilla.js';
import { Extrusion } from './ExtrusionPlantilla.js';

class Examen extends THREE.Object3D {
    constructor() {
        super();

        // MATERIAL
        const material = new THREE.MeshNormalMaterial();

        // GEOMETRÍAS BASE
        var RevolucionObj = new Revolucion();
        var RevolucionMesh = RevolucionObj.children[0];
        var RevolucionGeo = RevolucionMesh.geometry;

        var ExtrusionObj = new Extrusion();
        var ExtrusionMesh = ExtrusionObj.children[0];
        var ExtrusionGeo = ExtrusionMesh.geometry;

        // TRANSFORMACIONES

        // BRUSHES
        let RevolucionBrush = new CSG.Brush(RevolucionGeo, material);
        let ExtrusionBrush = new CSG.Brush(ExtrusionGeo, material);

        // OPERACIONES CSG
        let evaluator = new CSG.Evaluator();
        let result = evaluator.evaluate(RevolucionBrush, ExtrusionBrush, CSG.SUBTRACTION);

        this.add(result);
    }
}

export { Examen };
