import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'


class Auricular extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();

        // Crear geometrías base
        var CabezaAuricular = new THREE.CylinderGeometry(0.5, 1, 1, 32);
        var AgujeroAuricular = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
        var NucaAuricular = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        var CuerpoAuricular = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);

        CabezaAuricular.rotateZ(Math.PI / 2);
        AgujeroAuricular.rotateZ(Math.PI / 2);
        AgujeroAuricular.translate(-0.5, 0, 0);
        NucaAuricular.rotateZ(-Math.PI / 2);
        NucaAuricular.translate(0.5, 0, 0);
        CuerpoAuricular.translate(0.9, -1.5, 0);

        let CabezaBrush = new CSG.Brush(CabezaAuricular, material);
        let AgujeroBrush = new CSG.Brush(AgujeroAuricular, material);
        let NucaBrush = new CSG.Brush(NucaAuricular, material);
        let CuerpoBrush = new CSG.Brush(CuerpoAuricular, material);

        let evaluator = new CSG.Evaluator();
        let Cara = evaluator.evaluate(CabezaBrush, AgujeroBrush, CSG.SUBTRACTION);
        let Cabeza = evaluator.evaluate(Cara, NucaBrush, CSG.ADDITION);
        let Auricular = evaluator.evaluate(Cabeza, CuerpoBrush, CSG.ADDITION);

        // Agregar la taza al objeto
        this.add(Auricular);
    }
}

export { Auricular };
