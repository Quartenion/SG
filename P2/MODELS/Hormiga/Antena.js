import * as THREE from 'three';

class Antena extends THREE.Object3D {
    constructor() {
        super();

        const shape = new THREE.Shape();
        shape.lineTo(0, 0.5);
        shape.quadraticCurveTo(0.5, 0.5, 0.5, 0.8);

        const points = shape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p.x, p.y, 0))
        );

        const geometry = new THREE.TubeGeometry(curve, 100, 0.02, 16, false);
        const material = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });
        const mesh = new THREE.Mesh(geometry, material);

        this.add(mesh);
    }
}

export { Antena };
