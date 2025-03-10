import * as THREE from '../../../libs/three.module.js'
import { Base } from './Base.js';
import { Circle } from './Circle.js';

class Club extends THREE.Object3D {
    constructor() {
        super();
        
        this.base = new Base();
        this.add(this.base);

        // HOJAS DEL TEBOL
        this.circle1 = new Circle(0.4);
        this.circle1.drawSolid();
        this.circle1.position.set(0, 1.5, -0.15);
        this.add(this.circle1);

        this.circle2 = new Circle(0.4);
        this.circle2.drawSolid();
        this.circle2.position.set(0.4, 0.8, -0.15);
        this.add(this.circle2);

        this.circle3 = new Circle(0.4);
        this.circle3.drawSolid();
        this.circle3.position.set(-0.4, 0.8, -0.15);
        this.add(this.circle3);

        this.circle4 = new Circle(0.3);
        this.circle4.drawSolid();
        this.circle4.position.set(0, 1, -0.15);
        this.add(this.circle4);

        this.clubShape = new THREE.Shape();
        this.add(this.clubShape);
    }
}

export { Club };
