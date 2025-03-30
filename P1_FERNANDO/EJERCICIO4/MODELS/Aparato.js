import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js';
import { Tubo } from './Tubo.js';
import { Soporte } from './Soporte.js';

class Aparato extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        const material = new THREE.MeshPhysicalMaterial({ 
            color: 0x00FFFF,  
            transparent: true, 
            opacity: 0.5,      
            roughness: 0.1,    
            metalness: 0.3,    
            transmission: 0.7, 
            side: THREE.DoubleSide,
        });

        // Crear geometrías base
        var TuboObj = new Tubo();
        var TuboMesh = TuboObj.children[0];
        var TuboGeo = TuboMesh.geometry;

        var SoporteObj = new Soporte();
        var SoporteMesh = SoporteObj.children[0];
        var SoporteGeo = SoporteMesh.geometry;

        
        var AgujeroGeo = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
        var BaseGeo = new THREE.BoxGeometry(3, 0.5, 3);

        TuboGeo.translate(0, 0.2, 0);
        AgujeroGeo.translate(0, 0.1, 0);
        BaseGeo.translate(0, -0.25, 0);

        let TuboBrush = new CSG.Brush(TuboGeo, material);
        let SoporteBrush = new CSG.Brush(SoporteGeo, material);
        let AgujeroBrush = new CSG.Brush(AgujeroGeo, material);
        let BaseBrush = new CSG.Brush(BaseGeo, material);

        let evaluator = new CSG.Evaluator();
        let cuerpo = evaluator.evaluate(TuboBrush, SoporteBrush, CSG.ADDITION);
        let agujero = evaluator.evaluate(cuerpo, AgujeroBrush, CSG.SUBTRACTION);
        let aparato = evaluator.evaluate(agujero, BaseBrush, CSG.SUBTRACTION);
        // Agregar la taza al objeto
        this.add(aparato);
    }
}

export { Aparato };
