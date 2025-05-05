import * as THREE from '../../../../libs/three.module.js';

class Antena extends THREE.Object3D {
    constructor() {
        super();
        this.antenaShape = new THREE.Shape();
        this.antenaShape.lineTo(0, 0.5);
        this.antenaShape.quadraticCurveTo(0.5, 0.5, 0.5, 0.8);
        this.drawSolid();
    }

    drawLines() {
        const points = this.antenaShape.getPoints(100); 
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });
    
        const points = this.antenaShape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p.x, p.y, 0))
        );
    
        const radius = 0.02;
    
        this.tubeGeometry = new THREE.TubeGeometry(curve, 100, radius, 16, false);
        const tubeMesh = new THREE.Mesh(this.tubeGeometry, this.OriginalMaterial);
        this.add(tubeMesh);
    }
}

export { Antena };
