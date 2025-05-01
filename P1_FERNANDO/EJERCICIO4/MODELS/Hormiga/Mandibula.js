import * as THREE from '../../../../libs/three.module.js'
import * as CSG from '../../../../libs/three-bvh-csg.js'


class Mandibula extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });

        // Crear geometrías base
        var MandibulaBase = new THREE.CylinderGeometry(1, 1, 0.1, 32);
        var AgujeroBase = new THREE.BoxGeometry(2, 0.5, 2);
        var AgujeroDiente1 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        var AgujeroDiente2 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        var AgujeroDiente3 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        var AgujeroDiente4 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
       
        MandibulaBase.scale(1, 1, 0.8);
        MandibulaBase.translate(1, 0, 0);
        AgujeroBase.translate(1, 0, -1);

        AgujeroDiente1.rotateY(Math.PI / 4);
        AgujeroDiente1.translate(1.79, 0, 0);

        AgujeroDiente2.rotateY(Math.PI / 4);
        AgujeroDiente2.translate(1.37, 0, 0);

        AgujeroDiente3.rotateY(Math.PI / 4);
        AgujeroDiente3.translate(0.95, 0, 0);

        AgujeroDiente4.rotateY(Math.PI / 4);
        AgujeroDiente4.translate(0.53, 0, 0);

        var MandibulaBaseBrush = new CSG.Brush(MandibulaBase, OriginalMaterial);
        var AgujeroBaseBrush = new CSG.Brush(AgujeroBase, OriginalMaterial);
        var AgujeroDiente1Brush = new CSG.Brush(AgujeroDiente1, OriginalMaterial);
        var AgujeroDiente2Brush = new CSG.Brush(AgujeroDiente2, OriginalMaterial);
        var AgujeroDiente3Brush = new CSG.Brush(AgujeroDiente3, OriginalMaterial);
        var AgujeroDiente4Brush = new CSG.Brush(AgujeroDiente4, OriginalMaterial);

        var evaluator = new CSG.Evaluator();
        var MandibulaCuerpo = evaluator.evaluate(MandibulaBaseBrush, MandibulaBaseBrush, CSG.ADDITION);
        var AgujeroBaseCuerpo = evaluator.evaluate(MandibulaCuerpo, AgujeroBaseBrush, CSG.SUBTRACTION);
        var AgujeroDiente1Cuerpo = evaluator.evaluate(AgujeroBaseCuerpo, AgujeroDiente1Brush, CSG.SUBTRACTION);
        var AgujeroDiente2Cuerpo = evaluator.evaluate(AgujeroDiente1Cuerpo, AgujeroDiente2Brush, CSG.SUBTRACTION);
        var AgujeroDiente3Cuerpo = evaluator.evaluate(AgujeroDiente2Cuerpo, AgujeroDiente3Brush, CSG.SUBTRACTION);
        var AgujeroDiente4Cuerpo = evaluator.evaluate(AgujeroDiente3Cuerpo, AgujeroDiente4Brush, CSG.SUBTRACTION);

        this.add(AgujeroDiente4Cuerpo); 

    }
}

export { Mandibula };
