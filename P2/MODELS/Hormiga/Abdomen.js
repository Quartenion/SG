import * as THREE from 'three';

class Abdomen extends THREE.Object3D {
    constructor() {
        super();

        // Material
        const material = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });

        // Forma del abdomen
        const shape = new THREE.Shape();
        shape.quadraticCurveTo(0.6, 0.2, 0.5, 0.5);
        shape.quadraticCurveTo(0.55, 0.7, 0.4, 0.9);
        shape.quadraticCurveTo(0.3, 1.2, 0, 1.2);

        const points = shape.getPoints(50);
        const geo = new THREE.LatheGeometry(points, 50);
        const mesh = new THREE.Mesh(geo, material);
        mesh.scale.set(0.07, 0.07, 0.07);

        this.add(mesh);
    }
}

export { Abdomen };
