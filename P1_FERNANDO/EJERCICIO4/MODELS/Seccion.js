import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'
import { Tallado } from './Tallado.js';

class Seccion extends THREE.Object3D {
    constructor(numAgujeros = 9) {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();

        // Crear el cilindro principal
        var Cuerpo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        let CuerpoMesh = new THREE.Mesh(Cuerpo, material);
        let CuerpoBrush = new CSG.Brush(CuerpoMesh.geometry, material); // Convertir a CSG

        let evaluator = new CSG.Evaluator(); // Evaluador para CSG

        // Crear y sustraer los agujeros
        for (let i = 0; i < numAgujeros; i++) {
            var AgujeroObj = new Tallado();
            var AgujeroMesh = AgujeroObj.children[0].clone(); // Clonar el objeto base
            AgujeroMesh.geometry = AgujeroMesh.geometry.clone(); // Clonar la geometría

            // Calcular el ángulo de rotación
            var angulo = (i * 2 * Math.PI) / numAgujeros;

            // Posicionar correctamente el agujero
            let AgujeroGeo = AgujeroMesh.geometry;
            AgujeroGeo.translate(0.5, 0, 0); // Mover fuera del centro
            AgujeroGeo.rotateY(angulo); // Rotar en el eje Y

            let AgujeroBrush = new CSG.Brush(AgujeroGeo, material); // Convertir a CSG

            // Restar el agujero del cilindro
            CuerpoBrush = evaluator.evaluate(CuerpoBrush, AgujeroBrush, CSG.SUBTRACTION);
        }

        // Convertir el resultado de la sustracción a Mesh y agregarlo a la escena
        let resultadoMesh = new THREE.Mesh(CuerpoBrush.geometry, material);
        this.add(resultadoMesh);
    }
}

export { Seccion };
