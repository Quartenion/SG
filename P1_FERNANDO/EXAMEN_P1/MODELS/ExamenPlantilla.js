import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js';
import { Revolucion } from './RevolucionPlantilla.js';
import { Extrusion } from './ExtrusionPlantilla.js';
import { Caballo } from './Caballo.js'
import { Coleta } from './Coleta.js'

class Examen extends THREE.Object3D {
    constructor() {
        super();

        // MATERIAL
        const material = new THREE.MeshNormalMaterial();

        // GEOMETRÍAS BASE
        var ExtrusionObj = new Extrusion();
        var ExtrusionMesh = ExtrusionObj.children[0];
        var ExtrusionGeo = ExtrusionMesh.geometry;

        var TorsoObj = new Caballo();
        var TorsoMesh = TorsoObj.children[0];
        var TorsoGeo = TorsoMesh.geometry;

        var OcicoObj = new Caballo();
        var OcicoMesh = OcicoObj.children[0];
        var OcicoGeo = OcicoMesh.geometry;

        var ColetaObj = new Coleta();
        var ColetaMesh = ColetaObj.children[0];
        var ColetaGeo = ColetaMesh.geometry;

        var AgujeroGeo1 = new THREE.CylinderGeometry(0.3, 0.3, 1, 50);
        var AgujeroGeo2 = new THREE.CylinderGeometry(0.3, 0.3, 1, 50);
        var AgujeroGeo3 = new THREE.CylinderGeometry(0.3, 0.3, 1, 50);
        var AgujeroGeo4 = new THREE.CylinderGeometry(0.3, 0.3, 1, 50);

        // TRANSFORMACIONES
        AgujeroGeo1.translate(0.5,0,0.5);
        AgujeroGeo2.translate(0.5,0,-0.5);
        AgujeroGeo3.translate(-0.5,0,0.5);
        AgujeroGeo4.translate(-0.5,0,-0.5);

        TorsoGeo.translate(0,0.4,0);

        OcicoGeo.rotateX(Math.PI/1.6);
        OcicoGeo.translate(0,1.4,0.4);
        OcicoGeo.scale(0.5,0.5,0.5);

        ColetaGeo.translate(0,0.9,0.05);


        // BRUSHES
        let ExtrusionBrush = new CSG.Brush(ExtrusionGeo, material);
        let AgujeroBrush1 = new CSG.Brush(AgujeroGeo1, material);
        let AgujeroBrush2 = new CSG.Brush(AgujeroGeo2, material);
        let AgujeroBrush3 = new CSG.Brush(AgujeroGeo3, material);
        let AgujeroBrush4 = new CSG.Brush(AgujeroGeo4, material);
        let TorsoBrush = new CSG.Brush(TorsoGeo, material);     
        let OcicoBrush = new CSG.Brush(OcicoGeo, material);  
        let ColetaBrush = new CSG.Brush(ColetaGeo, material);  


        // OPERACIONES CSG
        let evaluator = new CSG.Evaluator();
        let iter1 = evaluator.evaluate(ExtrusionBrush, AgujeroBrush1, CSG.SUBTRACTION);
        let iter2 = evaluator.evaluate(iter1, AgujeroBrush2, CSG.SUBTRACTION);
        let iter3 = evaluator.evaluate(iter2, AgujeroBrush3, CSG.SUBTRACTION);
        let iter4 = evaluator.evaluate(iter3, AgujeroBrush4, CSG.SUBTRACTION);
        let iter5 = evaluator.evaluate(iter4, TorsoBrush, CSG.ADDITION);
        let iter6 = evaluator.evaluate(iter5, OcicoBrush, CSG.ADDITION);
        let iter7 = evaluator.evaluate(iter6, ColetaBrush, CSG.ADDITION);


        //this.add(AgujeroMesh);
        this.add(iter7);
    }
}

export { Examen };
