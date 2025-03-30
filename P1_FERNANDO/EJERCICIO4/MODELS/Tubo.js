import * as THREE from '../../../libs/three.module.js'

class Tubo extends THREE.Object3D {
    constructor() {
        super();

        this.tuboShape = new THREE.Shape();
        this.tuboShape.moveTo(0, 0);
        this.tuboShape.lineTo(0.4, 0);
        this.tuboShape.quadraticCurveTo(0.3, 0, 0.3, 0.5);
        this.tuboShape.lineTo(0,0.5)
        this.drawSolid();
    }

    drawLines() {
        const points = this.tuboShape.getPoints(100); // Más puntos para suavizar la curva
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        
        const material = new THREE.MeshPhysicalMaterial({ 
            color: 0x00FFFF,  
            transparent: true, 
            opacity: 0.5,      
            roughness: 0.1,    
            metalness: 0.3,    
            transmission: 0.7, 
            side: THREE.DoubleSide,
        });

        const points = this.tuboShape.getPoints(50);

        this.latheGeometry = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.latheMesgh = new THREE.Mesh(this.latheGeometry, material);
        this.add(this.latheMesgh);
    }
}

export { Tubo };
