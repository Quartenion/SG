import * as THREE from 'three';
import * as CSG from 'csg';

class Mandibula extends THREE.Object3D {
    constructor() {
        super();

        const material = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });

        const base = new THREE.CylinderGeometry(1, 1, 0.1, 32);
        base.translate(1, 0, 0);

        const hole = new THREE.BoxGeometry(2, 0.5, 2);
        hole.translate(1, 0, -1);

        const createTooth = x => {
            const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            geo.rotateY(Math.PI / 4);
            geo.translate(x, 0, 0);
            return geo;
        };

        const toothPositions = [1.79, 1.37, 0.95, 0.53];
        const evaluator = new CSG.Evaluator();

        let result = new CSG.Brush(base, material);
        result = evaluator.evaluate(result, new CSG.Brush(hole, material), CSG.SUBTRACTION);

        for (const pos of toothPositions) {
            const tooth = createTooth(pos);
            result = evaluator.evaluate(result, new CSG.Brush(tooth, material), CSG.SUBTRACTION);
        }

        this.add(result);
    }
}

export { Mandibula };
