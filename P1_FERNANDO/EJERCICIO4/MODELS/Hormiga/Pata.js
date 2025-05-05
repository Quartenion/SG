import * as THREE from '../../../../libs/three.module.js';
import * as CSG from '../../../../libs/three-bvh-csg.js'

class Pata extends THREE.Object3D {
    constructor() {
        super();
        this.pataShape = new THREE.Shape();
        this.pataShape.lineTo(0, 0.5);
        this.pataShape.lineTo(1, 1.5);
        this.pataShape.lineTo(1, 2);
        this.drawSolid();
    }

    drawLines() {
        const points = this.pataShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const object = new THREE.Line(geometry, this.OriginalMaterial);

        this.add(object);
    }

    drawSolid() {
        this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1b0a,
        });
    
        const points = this.pataShape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            points.map(p => new THREE.Vector3(p.x, p.y, 0))
        );
    
        const radius = 0.03;
    
        this.tubeGeometry = new THREE.TubeGeometry(curve, 100, radius, 16, false);
        this.tubeGeometry.rotateZ(Math.PI / 2);
        this.tubeGeometry.rotateX(Math.PI);
        const tubeMesh = new THREE.Mesh(this.tubeGeometry, this.OriginalMaterial);
        this.add(tubeMesh);
    }
}

export { Pata };
