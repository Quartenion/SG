import * as THREE from '../../../../libs/three.module.js';
import * as CSG from '../../../../libs/three-bvh-csg.js'
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Pata } from './Pata.js';

class Hormiga extends THREE.Object3D {
    constructor(name) {
        super();
        this.name = name;
        // ABDOMEN
        this.abdomen = new Abdomen();
        this.abdomen.translateY(0.01);
        this.abdomen.translateX(-0.03);
        this.abdomen.rotateZ(Math.PI / 1.8);
        this.add(this.abdomen);

        // TORAX
        this.torax = new Torax();
        this.torax.translateY(0.02);
        this.torax.translateX(0.02);
        this.add(this.torax);

        // CABEZA
        this.cabeza = new Cabeza();
        this.cabeza.translateY(0.02);
        this.cabeza.translateX(0.05);
        this.cabeza.rotateZ(Math.PI / -5);
        this.add(this.cabeza);

        // CONECTORES
        this.conector1 = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.05, 100), new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a }));
        this.conector1.translateY(0.01);
        this.conector1.translateX(-0.03);
        this.conector1.rotateZ(Math.PI / -3);
        this.add(this.conector1);

        this.conector2 = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.03, 100), new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a }));
        this.conector2.translateY(0.02);
        this.conector2.translateX(0.05);
        this.conector2.rotateZ(Math.PI / 3);
        this.add(this.conector2);

        // PATAS
        // PATA FRONTAL
        this.pata1 = new Pata();
        this.pata1.scale.set(0.05, 0.05, 0.05);
        this.pata1.rotateZ(Math.PI / 2);
        this.add(this.pata1);

        // PATA CENTRAL
        this.pata2 = new Pata();
        this.pata2.scale.set(0.05, 0.05, 0.05);
        this.pata2.rotateX(Math.PI);
        this.pata2.translateX(-0.03);
        this.pata2.translateY(0.02);
        this.pata2.translateZ(-0.035);
        this.pata2.rotateX(Math.PI / -4);
        this.pata2.rotateZ(Math.PI / 3);
        this.add(this.pata2);

        // PATA TRASERA

    }

    select(){
        this.object.material = new THREE.MeshBasicMaterial({color: 0xff0000});
    }

    unselect(){
        this.object.material = this.OriginalMaterial;
    }

    update(){
        // console.log(`updating hormiga: ${this.name}`)
    }
}

export { Hormiga };
