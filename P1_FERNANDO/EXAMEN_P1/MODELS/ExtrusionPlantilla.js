import * as THREE from '../../libs/three.module.js'

class Extrusion extends THREE.Object3D {
    constructor() {
        super();

        // SHAPE
        this.extrusionShape = new THREE.Shape();
        this.extrusionShape.moveTo(0, 0);
        this.extrusionShape.lineTo(1, 0);
        this.extrusionShape.lineTo(1, 1);
        this.extrusionShape.lineTo(0, 1);
        this.extrusionShape.lineTo(0, 0);

        // AGUJEROS

        this.drawSolid();
    }

    drawLines() {
        const points = this.extrusionShape.getPoints(100);

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);

        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: false,
        };

        const geometry = new THREE.ExtrudeGeometry(this.extrusionShape, extrudeSettings);
        const material = new THREE.MeshNormalMaterial();

        geometry.rotateX(Math.PI / 2);
        geometry.translate(-0.5, 0, -0.5);

        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Extrusion };