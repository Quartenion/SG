import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js';

class Caballo extends THREE.Object3D {
    constructor() {
        super();

        const material = new THREE.MeshNormalMaterial();

        var CaraGeo = new THREE.CylinderGeometry(0.1, 0.2, 0.8, 50);
        var OcicoGeo = new THREE.SphereGeometry(0.1, 50, 50, 0, Math.PI * 2, 0, Math.PI / 2);

        OcicoGeo.translate(0,0.4,0);

        let CaraBrush = new CSG.Brush(CaraGeo, material);
        let OcicoBrush = new CSG.Brush(OcicoGeo, material);

        let evaluator = new CSG.Evaluator();
        let caballo = evaluator.evaluate(CaraBrush, OcicoBrush, CSG.ADDITION);

        this.add(caballo);
        
    }
}

export { Caballo };
