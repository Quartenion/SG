import * as THREE from '../../../libs/three.module.js';

class Taza extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();

        // Crear geometrías base
        var cuerpoExtGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        var cuerpoIntGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.05, 32);
        var mangoGeo = new THREE.TorusGeometry(0.3, 0.07, 16, 100);

        // Crear mallas base
        var cuerpoExtMesh = new THREE.Mesh(cuerpoExtGeo, material);
        var cuerpoIntMesh = new THREE.Mesh(cuerpoIntGeo, material);
        var mangoMesh = new THREE.Mesh(mangoGeo, material);

        cuerpoExtMesh.position.y = 0.5;
        cuerpoIntMesh.position.y = 0.53;
        mangoMesh.position.set(0.5, 0.5, 0);

        // Crear la taza
        const tazaMesh = new THREE.Group();
        tazaMesh.add(cuerpoExtMesh);
        tazaMesh.add(cuerpoIntMesh);
        tazaMesh.add(mangoMesh);
        

        // Agregar la taza al objeto
        this.add(tazaMesh);
    }
}

export { Taza };
