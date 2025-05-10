import * as THREE from 'three';

class Muslo extends THREE.Object3D {
    constructor() {
        super();

        const material = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });

        const shape = new THREE.Shape();
        shape.quadraticCurveTo(0.5, 0.0, 0.4, 0.7);
        shape.quadraticCurveTo(0.45, 0.8, 0.5, 1);
        shape.quadraticCurveTo(0.8, 2, 0, 2);

        const points = shape.getPoints(50);
        const geo = new THREE.LatheGeometry(points, 50);
        const mesh = new THREE.Mesh(geo, material);

        this.add(mesh);
    }
}

export { Muslo };
