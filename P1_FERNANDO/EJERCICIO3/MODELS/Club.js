import * as THREE from '../../../libs/three.module.js'
import { Base } from './Base.js';

class Club extends THREE.Object3D {
    constructor() {
        super();
        
        this.base = new Base();
        this.add(this.base);

        const clubShape = new THREE.Shape();
        const radius = 0.5;
        
        this.material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0x342104
        });

        clubShape.absarc(0, 1.5, radius, 0, Math.PI * 2, false);
        clubShape.absarc(-radius, 0.8, radius, 0, Math.PI * 2, false);
        clubShape.absarc(radius, 0.8, radius, 0, Math.PI * 2, false);
        
        /*
        const extrudeSettings = { 
            depth: 0.3, 
            bevelEnabled: true, 
            bevelSegments: 2, 
            steps: 2, 
            bevelSize: 0.1, 
            bevelThickness: 0.1 
        };
        
        const geometry = new THREE.ExtrudeGeometry(clubShape, extrudeSettings);
        const mesh = new THREE.Mesh(geometry, this.material);

        this.add(mesh);
        */
    }
}

export { Club };
