import * as THREE from 'three';

class Pata extends THREE.Object3D {
    constructor() {
        super();

        const material = new THREE.MeshPhysicalMaterial({ color: 0x9ACD32 });

        const shape = new THREE.Shape();
        shape.lineTo(0, 0.5);
        shape.lineTo(1, 1.5);
        shape.lineTo(1, 2);

        const points = shape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p.x, p.y, 0))
        );

        const radius = 0.03;

        const tubeGeometry = new THREE.TubeGeometry(curve, 100, radius, 16, false);
        tubeGeometry.rotateZ(Math.PI / 2);
        tubeGeometry.rotateX(Math.PI);

        const tubeMesh = new THREE.Mesh(tubeGeometry, material);
        this.add(tubeMesh);
    }
}

export { Pata };
