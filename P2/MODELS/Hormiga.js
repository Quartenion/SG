import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js'

class Hormiga extends THREE.Object3D {
    constructor() {
        super();

        this.torsoShape = new THREE.Shape();
        this.torsoShape.quadraticCurveTo(0.6, 0.2, 0.5, 0.5);
        this.torsoShape.quadraticCurveTo(0.55, 0.7, 0.4, 0.9);
        this.torsoShape.quadraticCurveTo(0.3, 1.2, 0, 1.2);
        this.drawSolid();
    }

    drawLines() {
        const points = this.torsoShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        
        const material = new THREE.MeshPhysicalMaterial({ 
            color: 0x2a1b0a,  
        });

        const points = this.torsoShape.getPoints(50);

        this.latheGeometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.latheMesgh = new THREE.Mesh(this.latheGeometry, material);
        this.add(this.latheMesgh);
    }
}

export { Hormiga };