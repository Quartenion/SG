import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'

class Destornillador extends THREE.Object3D {
  constructor(numAgujeros = 9) {
    super();

    // Crear material
    var material = new THREE.MeshNormalMaterial();

    // --- 1. Crear y transformar geometrías antes de pasarlas a CSG ---
    // Cuerpo superior
    var CuerpoSuperior = new THREE.CylinderGeometry(0.3, 0.5, 0.5, 32);
    CuerpoSuperior.translate(0, 2, 0);

    // Cuerpo inferior
    var CuerpoInferior = new THREE.CylinderGeometry(0.5, 0.2, 0.7, 32);
    CuerpoInferior.translate(0, 1.4, 0);

    // Soporte
    var Soporte = new THREE.CylinderGeometry(0.2, 0.3, 0.4, 32);
    Soporte.translate(0, 0.9, 0);

    // Agarre
    var Agarre = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 32);
    Agarre.translate(0, 0.65, 0);

    // Brazo
    var Brazo = new THREE.CylinderGeometry(0.07, 0.07, 2, 32);
    // Ponlo donde desees. Por ejemplo:
    Brazo.translate(0, -0.35, 0);

    // Punta
    var Punta = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    Punta.rotateX(Math.PI / 7);
    Punta.translate(0, -0.95, 0.12);

    // Punta2
    var Punta2 = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    Punta2.rotateX(-Math.PI / 7);
    Punta2.translate(0, -0.95, -0.12);

    // --- 2. Crear los Brushes a partir de las geometrías ya transformadas ---
    let materialBrush = material; // Reutilizamos el mismo material

    let CuerpoSuperiorBrush = new CSG.Brush(CuerpoSuperior, materialBrush); 
    let CuerpoInferiorBrush = new CSG.Brush(CuerpoInferior, materialBrush);
    let SoporteBrush = new CSG.Brush(Soporte, materialBrush);
    let AgarreBrush = new CSG.Brush(Agarre, materialBrush);
    let BrazoBrush = new CSG.Brush(Brazo, materialBrush);
    let PuntaBrush = new CSG.Brush(Punta, materialBrush);
    let Punta2Brush = new CSG.Brush(Punta2, materialBrush);

    // --- 3. Unir (ADD) o restar (SUBTRACTION) de manera coherente ---
    let evaluator = new CSG.Evaluator();

    // Unir cuerpo superior e inferior
    let Cuerpo = evaluator.evaluate(CuerpoSuperiorBrush, CuerpoInferiorBrush, CSG.ADDITION);

    // Añadir Soporte al cuerpo
    let SoporteCuerpo = evaluator.evaluate(Cuerpo, SoporteBrush, CSG.ADDITION);

    // Añadir Brazo
    let BrazoSoporte = evaluator.evaluate(SoporteCuerpo, BrazoBrush, CSG.ADDITION);

    // Añadir Agarre
    let AgarreBrazo = evaluator.evaluate(BrazoSoporte, AgarreBrush, CSG.ADDITION);

    // Restar la primera Punta
    let PrimeraPunta = evaluator.evaluate(AgarreBrazo, PuntaBrush, CSG.SUBTRACTION);

    // Restar la segunda Punta
    let Destornillador = evaluator.evaluate(PrimeraPunta, Punta2Brush, CSG.SUBTRACTION);

    // --- 4. Agregar el resultado final a la escena ---
    this.add(Destornillador);
  }
}

export { Destornillador };
