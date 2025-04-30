import * as THREE from '../../libs/three.module.js';
import * as CSG from '../../libs/three-bvh-csg.js'

class Hormiga extends THREE.Object3D {
    constructor(name) {
        super();
        this.name = name;

        let material = new THREE.MeshNormalMaterial();
        let radius = 0.035;

        let Trasero = new THREE.SphereGeometry(radius, 32, 32);
        let Torso = new THREE.SphereGeometry(0.07, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        let Cabeza = new THREE.SphereGeometry(0.07, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);

        Trasero.translate(0, radius, 0);

        let TraseroMesh = new THREE.Mesh(Trasero, material);
        this.add(TraseroMesh);
    }  
}

export { Hormiga };
