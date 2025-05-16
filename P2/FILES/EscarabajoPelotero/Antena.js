import * as THREE from 'three';

class Antena extends THREE.Object3D {
    constructor(material = null) {
        super();

        const shape = new THREE.Shape();
        shape.lineTo(0, 1);
        shape.quadraticCurveTo(0.05, 1.05, 0.1, 1);

        const points = shape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, p.y, 0)));
        const geometry = new THREE.TubeGeometry(curve, 100, 0.02, 16, false);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Antena };
