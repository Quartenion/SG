import * as TWEEN from '../../../libs/tween.module.js';
import * as THREE from '../../../libs/three.module.js';
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Pata } from './Pata.js';
import { LegAnimator } from './LegAnimator.js';

class Hormiga extends THREE.Object3D {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;
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
        // PATAS FRONTALES
        this.pataDcha1 = new Pata();
        this.pataDcha1.scale.set(0.05, 0.05, 0.05);
        this.pataDcha1.translateX(0.009);
        this.pataDcha1.translateY(-0.013);
        this.pataDcha1.translateZ(0.01);
        this.pataDcha1.rotateY(Math.PI / 1.5);
        this.add(this.pataDcha1);

        this.pataIzq1 = new Pata();
        this.pataIzq1.scale.set(0.05, 0.05, 0.05);
        this.pataIzq1.translateX(0.009);
        this.pataIzq1.translateY(-0.013);
        this.pataIzq1.translateZ(-0.01);
        this.pataIzq1.rotateY(Math.PI / -1.5);
        this.add(this.pataIzq1);

        // PATAS CENTRALES
        this.pataDcha2 = new Pata();
        this.pataDcha2.scale.set(0.05, 0.05, 0.05);
        this.pataDcha2.translateX(-0.03);
        this.pataDcha2.translateY(-0.02);
        this.pataDcha2.translateZ(0.03);
        this.pataDcha2.rotateY(Math.PI / 2);
        this.pataDcha2.rotateZ(Math.PI / -64);
        this.add(this.pataDcha2);

        this.pataIzq2 = new Pata();
        this.pataIzq2.scale.set(0.05, 0.05, 0.05);
        this.pataIzq2.translateX(-0.03);
        this.pataIzq2.translateY(-0.02);
        this.pataIzq2.translateZ(-0.03);
        this.pataIzq2.rotateY(Math.PI / -2);
        this.pataIzq2.rotateZ(Math.PI / 64);
        this.add(this.pataIzq2);

        // PATAS TRASERAS
        this.pataIzq3 = new Pata();
        this.pataIzq3.scale.set(0.05, 0.05, 0.05);
        this.pataIzq3.translateX(-0.045);
        this.pataIzq3.translateY(-0.01);
        this.pataIzq3.translateZ(0.035);
        this.pataIzq3.rotateY(Math.PI / 6);
        this.pataIzq3.rotateZ(Math.PI / 32);
        this.add(this.pataIzq3);

        this.pataDer3 = new Pata();
        this.pataDer3.scale.set(0.05, 0.05, 0.05);
        this.pataDer3.translateX(-0.045);
        this.pataDer3.translateY(-0.01);
        this.pataDer3.translateZ(-0.035);
        this.pataDer3.rotateY(Math.PI / -6);
        this.pataDer3.rotateZ(Math.PI / -32);
        this.add(this.pataDer3);
    }

    select(){
        this.cabeza.material = new THREE.MeshBasicMaterial({color: 0xff0000});
    }

    unselect(){
        this.cabeza.material = this.OriginalMaterial;
    }

    update(){
        // console.log(`updating hormiga: ${this.name}`)
    }
}

export { Hormiga };
