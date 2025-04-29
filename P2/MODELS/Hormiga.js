import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js'

class Hormiga extends THREE.Object3D {
    constructor() {
        super();
        var material = new THREE.MeshNormalMaterial();
        var Trasero = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0);
        var Torso = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        var Cabeza = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);

        var TraseroMesh = new THREE.Mesh(Trasero, material);
        
        this.add(TraseroMesh);
    }  
}

export { Hormiga };
