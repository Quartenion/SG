import * as THREE from '../../libs/three.module.js'

class Revolucion extends THREE.Object3D {
    constructor() {
        super();

        this.revolucionShape = new THREE.Shape();
        this.revolucionShape.moveTo(0, 0);
        this.revolucionShape.lineTo(0.5, 0);
        this.revolucionShape.lineTo(0.5, 1);
        this.revolucionShape.lineTo(0, 1);
        this.drawLines();
    }

    drawLines() {
        const points = this.revolucionShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        
        const material = new THREE.MeshNormalMaterial();
        const points = this.revolucionShape.getPoints(50);

        this.latheGeometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.latheMesh = new THREE.Mesh(this.latheGeometry, material);
        this.add(this.latheMesh);
    }
}

export { Revolucion };
