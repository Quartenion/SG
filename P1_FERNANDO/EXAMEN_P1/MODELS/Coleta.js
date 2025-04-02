import * as THREE from '../../../libs/three.module.js'

class Coleta extends THREE.Object3D {
    constructor() {
        super();

        const points = [];
        points.push(new THREE.Vector3(0,0,0));
        points.push(new THREE.Vector3(0,0,-0.1));
        points.push(new THREE.Vector3(0,0,-0.15));
        points.push(new THREE.Vector3(0,-0.1,-0.16));
        points.push(new THREE.Vector3(0,-0.2,-0.20));
        points.push(new THREE.Vector3(0,-0.4,-0.27));
        points.push(new THREE.Vector3(0,-0.5,-0.4));
        points.push(new THREE.Vector3(0,-0.5,-0.5));

        const curve = new THREE.CatmullRomCurve3(points);

        const hairGeometry = new THREE.TubeGeometry(curve, points.length, 0.02, 8, false);
        const material = new THREE.MeshNormalMaterial();

        const hairMesh = new THREE.Mesh(hairGeometry, material);
        this.add(hairMesh);
    }
}

export { Coleta };

