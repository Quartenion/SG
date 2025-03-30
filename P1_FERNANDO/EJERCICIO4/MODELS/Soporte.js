import * as THREE from '../../../libs/three.module.js'

class Soporte extends THREE.Object3D {
    constructor() {
        super();

        let width = 1;
        let height = 1.5;

        this.soporteShape = new THREE.Shape();
        this.soporteShape.moveTo(0, 0);
        this.soporteShape.bezierCurveTo(0.1 * width, 0, 0.2 * width, 0, 0.4 * width, 0.6 * height);
        this.soporteShape.bezierCurveTo(0.42 * width, 0.7 * height, 0.42 * width, 0.7 * height, 0.4 * width, 0.8 * height);
        this.soporteShape.bezierCurveTo(0.2 * width, 1.4 * height, 0.1 * width, 1.4 * height, 0, 1.4 * height);
        this.soporteShape.bezierCurveTo(-0.1 * width, 1.4 * height, -0.2 * width, 1.4 * height, -0.4 * width, 0.8 * height);
        this.soporteShape.bezierCurveTo(-0.42 * width, 0.7 * height, -0.42 * width, 0.7 * height, -0.4 * width, 0.6 * height);
        this.soporteShape.bezierCurveTo(-0.2 * width, 0, -0.1 * width, 0, 0, 0);

        this.hole = new THREE.Shape();
        this.hole.absarc(0, 0.3, 0.17, 0, Math.PI * 2 - 0.1, false);
        this.soporteShape.holes.push(this.hole);

        this.hole = new THREE.Shape();
        this.hole.absarc(0, 1.8, 0.17, 0, Math.PI * 2 - 0.1, false);
        this.soporteShape.holes.push(this.hole);

        this.drawSolid();
        
    }

    drawLines() {
        const points = this.soporteShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.001, 
            bevelEnabled: true, 
            bevelSegments: 100,
        };
        
        const geometry = new THREE.ExtrudeGeometry(this.soporteShape, extrudeSettings);
        const material = new THREE.MeshPhysicalMaterial({ 
            color: 0x00FFFF,  
            transparent: true, 
            opacity: 0.5,      
            roughness: 0.1,    
            metalness: 0.3,    
            transmission: 0.7, 
            side: THREE.DoubleSide,
        });
        
        
        geometry.rotateX(Math.PI / 2);
        geometry.rotateY(Math.PI / 2);
        geometry.translate(-1, 0, 0);
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Soporte };
