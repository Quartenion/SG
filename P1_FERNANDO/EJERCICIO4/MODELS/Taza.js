import * as THREE from '../../../libs/three.module.js';
import { Brush, Evaluator, SUBTRACTION, ADDITION } from '../../../libs/three-bvh-csg.js';

class Taza extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        const material = new THREE.MeshNormalMaterial();

        // Crear geometrías base
        const cuerpoExtGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const cuerpoIntGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.1, 32);
        const mangoGeo = new THREE.TorusGeometry(0.3, 0.1, 16, 100);

        // Crear mallas base
        const cuerpoExtMesh = new THREE.Mesh(cuerpoExtGeo, material);
        const cuerpoIntMesh = new THREE.Mesh(cuerpoIntGeo, material);
        const mangoMesh = new THREE.Mesh(mangoGeo, material);

        // Mover el mango a un lado de la taza
        mangoMesh.position.set(0.6, 0, 0);
        cuerpoExtMesh.updateMatrixWorld(true);
        cuerpoIntMesh.updateMatrixWorld(true);
        mangoMesh.updateMatrixWorld(true);

        // Convertir a objetos CSG
        const cuerpoExtBrush = Brush.create(cuerpoExtMesh);
        const cuerpoIntBrush = Brush.create(cuerpoIntMesh);
        const mangoBrush = Brush.create(mangoMesh);

        // Evaluar operaciones CSG
        let tazaBrush = Evaluator.eval(SUBTRACTION, cuerpoExtBrush, cuerpoIntBrush); // Vaciar la taza
        tazaBrush = Evaluator.eval(ADDITION, tazaBrush, mangoBrush); // Agregar el mango

        // Convertir de vuelta a Mesh
        let tazaMesh = tazaBrush.toMesh();
        tazaMesh.material = material;

        this.add(tazaMesh);
    }
}

export { Taza };
