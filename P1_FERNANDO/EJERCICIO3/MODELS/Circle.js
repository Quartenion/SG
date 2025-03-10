import * as THREE from '../../../libs/three.module.js'

class Circle extends THREE.Object3D {
    constructor(radius) {
        super();

        this.circleShape = new THREE.Shape();
        this.circleShape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    }

    drawLines() {
        const points = this.circleShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.3, 
            bevelEnabled: false // Desactivamos el bisel para evitar caras solapadas
        };
        
        const geometry = new THREE.ExtrudeGeometry(this.circleShape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0x342104
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Circle };
