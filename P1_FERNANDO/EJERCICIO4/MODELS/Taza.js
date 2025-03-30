import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'


class Taza extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();

        // Crear geometrías base
        var cuerpoExtGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        var cuerpoIntGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.05, 32);
        var mangoGeo = new THREE.TorusGeometry(0.3, 0.07, 16, 100);

        // Colocar el mango
        mangoGeo.translate(0.5, 0.5, 0);
        // Colocar el cuerpo interior
        cuerpoExtGeo.translate(0, 0.5, 0);
        cuerpoIntGeo.translate(0, 0.6, 0);


        // Hacemos el booleano de las incisiones con la taza
        let cuerpoExtBrush = new CSG.Brush(cuerpoExtGeo, material);
        let cuerpoIntBrush = new CSG.Brush(cuerpoIntGeo, material);
        let mangoBrush = new CSG.Brush(mangoGeo, material);

        let evaluator = new CSG.Evaluator();
        let tazaMango = evaluator.evaluate(cuerpoExtBrush, mangoBrush, CSG.ADDITION);
        let taza = evaluator.evaluate(tazaMango, cuerpoIntBrush, CSG.SUBTRACTION);
        

        // Agregar la taza al objeto
        this.add(taza);
    }
}

export { Taza };
