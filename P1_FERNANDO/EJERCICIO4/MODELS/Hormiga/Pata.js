import * as THREE from '../../../../libs/three.module.js';
import * as CSG from '../../../../libs/three-bvh-csg.js'

class Pata extends THREE.Object3D {
    constructor() {
        super();
        this.pataShape = new THREE.Shape();
        this.pataShape.lineTo(0, 0.5);
        this.pataShape.lineTo(0.5, 1);
        this.pataShape.lineTo(0.5, 1.5);
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
    
        const shapePoints = this.pataShape.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            shapePoints.map(p => new THREE.Vector3(p.x, p.y, 0))
        );
    
        const radius = 0.03;
    
        // Crear el tubo
        this.tubeGeometry = new THREE.TubeGeometry(curve, 100, radius, 16, false);
        const tubeMesh = new THREE.Mesh(this.tubeGeometry, this.OriginalMaterial);
        this.add(tubeMesh);
    
        // Crear tapa frontal
        const start = curve.getPointAt(0);
        const startNormal = curve.getTangentAt(0);
        const startCap = new THREE.Mesh(
            new THREE.CircleGeometry(radius, 16),
            this.OriginalMaterial
        );
        startCap.position.copy(start);
        startCap.lookAt(start.clone().add(startNormal)); // Orienta la tapa
        //startCap.rotateY(Math.PI); // Para orientar hacia adentro
        this.add(startCap);
    
        // Crear tapa trasera
        const end = curve.getPointAt(1);
        const endNormal = curve.getTangentAt(1);
        const endCap = new THREE.Mesh(
            new THREE.CircleGeometry(radius, 16),
            this.OriginalMaterial
        );
        endCap.position.copy(end);
        endCap.lookAt(end.clone().add(endNormal));
        this.add(endCap);
    }
}

export { Pata };
