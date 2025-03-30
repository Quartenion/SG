import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'

class Tallado extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();
        var Agujero = new THREE.CylinderGeometry(0.1, 0.1, 1.05, 32);
        var AgujeroMesh = new THREE.Mesh(Agujero, material);
        this.add(AgujeroMesh);
    }
}

export { Tallado };
