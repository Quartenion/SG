import * as THREE from '../../../libs/three.module.js';

class Emoji extends THREE.Object3D {
    constructor() {
        super();

        this.emojiShape = new THREE.Shape();

        // Dibuja un círculo con centro en (0,0) y radio 1
        // CONTORNO EXTERIOR
        this.emojiShape.absarc(0, 0, 1, 0, Math.PI * 2 -0.01, false);

        // OJOS
        this.hole = new THREE.Shape();
        this.hole.absarc(-0.4, 0.3, 0.2, 0, Math.PI * 2 -0.01, false);
        this.emojiShape.holes.push(this.hole);

        this.hole = new THREE.Shape();
        this.hole.absarc(0.4, 0.3, 0.2, 0, Math.PI * 2 -0.01, false);
        this.emojiShape.holes.push(this.hole);

        // BOCA
        this.hole = new THREE.Shape();
        this.hole.moveTo(-0.4, -0.2);
        this.hole.absarc(0, -0.2, 0.4, 0, Math.PI, true);
        this.emojiShape.holes.push(this.hole);

        this.drawSolid();
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.1, 
            bevelEnabled: true, 
            bevelThickness: 0.15,
        };
            
        const geometry = new THREE.ExtrudeGeometry(this.emojiShape, extrudeSettings);
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            color: 0xffff00
        });
            
        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Emoji };
