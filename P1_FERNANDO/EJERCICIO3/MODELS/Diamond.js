import * as THREE from '../../../libs/three.module.js'

class Diamond extends THREE.Object3D {
    constructor() {
        super();

        this.diamondShape = new THREE.Shape();

        this.diamondShape.moveTo(0, 0, 0);
        this.diamondShape.lineTo(0.8, 1);
        this.diamondShape.lineTo(0, 2);
        this.diamondShape.lineTo(-0.8, 1);
        this.diamondShape.lineTo( 0, 0);

    }

    drawLines() {
        const points = this.diamondShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.1, 
            bevelEnabled: false, 
            
        };
        
        const geometry = new THREE.ExtrudeGeometry(this.diamondShape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0xff0000
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Diamond };
