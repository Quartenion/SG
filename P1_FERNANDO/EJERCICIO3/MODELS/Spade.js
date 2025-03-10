import * as THREE from '../../../libs/three.module.js';
import { Base } from './Base.js';
import { Heart } from './Heart.js';

class Spade extends THREE.Object3D {
    constructor() {
        super();
        this.material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0x342104
        });

        this.base = new Base();
        this.heart = new Heart(this.material);
        this.heart.rotateZ(Math.PI);
        this.heart.position.set(0, 3.6, 0);

        this.add(this.base);
        this.add(this.heart);
    }
}

export { Spade };