import * as THREE from '../../../../libs/three.module.js';
import * as CSG from '../../../../libs/three-bvh-csg.js'

class Muslo extends THREE.Object3D {
    constructor() {
        super();

        this.musloShape = new THREE.Shape();
        this.musloShape.quadraticCurveTo(0.5, 0.0, 0.4, 0.7);
        this.musloShape.quadraticCurveTo(0.45, 0.8, 0.5, 1);
        this.musloShape.quadraticCurveTo(0.8, 2, 0, 2);
        this.drawSolid();
    }

    drawLines() {
        const points = this.musloShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });

        const points = this.musloShape.getPoints(50);

        this.latheGeometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.object = new THREE.Mesh(this.latheGeometry, this.OriginalMaterial);

        this.add(this.object);
    }
}

export { Muslo };
