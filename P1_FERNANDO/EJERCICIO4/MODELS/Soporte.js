import * as THREE from '../../../libs/three.module.js'

class Soporte extends THREE.Object3D {
    constructor() {
        super();

        this.diamondShape = new THREE.Shape();
        let x, y, width;
        x = 0;
        y = 0;
        width = 0.5;
        this.diamondShape.moveTo(0, 0);
        this.diamondShape.quadraticCurveTo(0.5, 0, 0.7, 0.5);

        this.drawLines();
    }

    drawLines() {
        const points = this.diamondShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.1, 
            bevelEnabled: true, 
            bevelSegments: 100,
        };
        
        const geometry = new THREE.ExtrudeGeometry(this.diamondShape, extrudeSettings);
        const material = new THREE.MeshNormalMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0xff0000
        });
        
        geometry.rotateX(Math.PI / 2);
        geometry.rotateY(Math.PI / 2);
        geometry.translate(-1, 0, 0);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Soporte };
