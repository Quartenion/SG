import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js'; // Asegúrate de tener esta librería

class Taza extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        const material = new THREE.MeshNormalMaterial();

        // Crear geometrías base
        const cuerpoExtGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const cuerpoIntGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.05, 32);
        const mangoGeo = new THREE.TorusGeometry(0.2, 0.06, 16, 100);

        // Crear mallas base
        const cuerpoExtMesh = new THREE.Mesh(cuerpoExtGeo, material);
        const cuerpoIntMesh = new THREE.Mesh(cuerpoIntGeo, material);
        const mangoMesh = new THREE.Mesh(mangoGeo, material);

        // Ajustar posición y orientación del mango
        mangoMesh.rotation.y = Math.PI / 2;
        mangoMesh.position.set(0.55, 0, 0);

        // Convertir las mallas a objetos CSG
        let cuerpoExtCSG = CSG.fromMesh(cuerpoExtMesh);
        let cuerpoIntCSG = CSG.fromMesh(cuerpoIntMesh);
        let mangoCSG = CSG.fromMesh(mangoMesh);

        // Aplicar operaciones booleanas
        let tazaCSG = cuerpoExtCSG.union(mangoCSG);  // Agregar el mango
        tazaCSG = tazaCSG.subtract(cuerpoIntCSG);    // Restar el interior

        // Convertir de vuelta a Mesh
        let tazaMesh = CSG.toMesh(tazaCSG, new THREE.Matrix4(), material);

        // Agregar la taza al objeto
        this.add(tazaMesh);
    }
}

export { Taza };
