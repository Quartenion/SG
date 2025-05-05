import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js'

class Abdomen extends THREE.Object3D {
    constructor() {
        super();

        this.abdomenShape = new THREE.Shape();
        this.abdomenShape.quadraticCurveTo(0.6, 0.2, 0.5, 0.5);
        this.abdomenShape.quadraticCurveTo(0.55, 0.7, 0.4, 0.9);
        this.abdomenShape.quadraticCurveTo(0.3, 1.2, 0, 1.2);
        this.drawSolid();
    }

    drawLines() {
        const points = this.abdomenShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });

        const points = this.abdomenShape.getPoints(50);

        this.latheGeometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.object = new THREE.Mesh(this.latheGeometry, this.OriginalMaterial);

        this.object.scale.set(0.07, 0.07, 0.07);

        this.add(this.object);
    }
}

export { Abdomen };
