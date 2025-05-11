import * as THREE from 'three';
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Antena } from './Antena.js';
import { Pata } from './Pata.js';

class Escarabajo extends THREE.Object3D {
    constructor() {
        super();

        const material = new THREE.MeshPhysicalMaterial({ color: 0x3b2f2f });

        this.Abdomen = new Abdomen();
        this.Abdomen.scale.set(1.5, 1, 0.7);
        this.Abdomen.translateZ(-0.52);
        this.Abdomen.translateY(0.15);
        this.Abdomen.rotateX(Math.PI / 2);
        this.add(this.Abdomen);

        this.Torax = new Torax();
        this.Torax.scale.set(0.7, 1.3, 1.1);
        this.Torax.translateX(0.1);
        this.Torax.translateY(0.15);
        this.Torax.translateZ(-0.015);
        this.Torax.rotateZ(Math.PI / 2);
        this.add(this.Torax);

        this.Cabeza = new Cabeza();
        this.Cabeza.scale.set(0.3, 0.5, 0.5);
        this.Cabeza.translateX(-0.55);
        this.Cabeza.translateY(0.15);
        this.Cabeza.rotateZ(Math.PI / 2);
        this.add(this.Cabeza);

        this.AntenaIzda = new Antena();
        this.AntenaIzda.scale.set(0.5, 0.5, 0.5);
        this.AntenaIzda.translateX(-0.3);
        this.AntenaIzda.translateY(0.2);
        this.AntenaIzda.translateZ(0.1);
        this.AntenaIzda.rotateZ(Math.PI / 2);
        this.AntenaIzda.rotateY(Math.PI / 2);
        this.AntenaIzda.rotateZ(Math.PI / 8);
        this.add(this.AntenaIzda);

        this.AntenaDcha = new Antena();
        this.AntenaDcha.scale.set(0.5, 0.5, 0.5);
        this.AntenaDcha.translateX(-0.3);
        this.AntenaDcha.translateY(0.2);
        this.AntenaDcha.translateZ(-0.1);
        this.AntenaDcha.rotateZ(Math.PI / 2);
        this.AntenaDcha.rotateY(-Math.PI / 2);
        this.AntenaDcha.rotateZ(Math.PI / 8);
        this.add(this.AntenaDcha);

        this.MusloDchoFrontal = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.05, 0.1, 8), material);
        this.MusloDchoFrontal.translateX(-0.4);
        this.MusloDchoFrontal.translateY(0.1);
        this.MusloDchoFrontal.translateZ(-0.47);
        this.MusloDchoFrontal.rotateX(-Math.PI / 2);
        this.MusloDchoFrontal.rotateZ(Math.PI / 8);
        this.add(this.MusloDchoFrontal);

        this.MusloDchoCentral = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.05, 0.2, 8), material);
        this.MusloDchoCentral.translateX(0);
        this.MusloDchoCentral.translateY(0.1);
        this.MusloDchoCentral.translateZ(-0.55);
        this.MusloDchoCentral.rotateX(-Math.PI / 2);
        this.add(this.MusloDchoCentral);

        this.MusloDchoTrasero = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.05, 0.2, 8), material);
        this.MusloDchoTrasero.translateX(0.4);
        this.MusloDchoTrasero.translateY(0.1);
        this.MusloDchoTrasero.translateZ(-0.47);
        this.MusloDchoTrasero.rotateX(-Math.PI / 2);
        this.MusloDchoTrasero.rotateZ(-Math.PI / 8);
        this.add(this.MusloDchoTrasero);

        this.PataDchaFrontal = new Pata();
        this.PataDchaFrontal.scale.set(2, 2, 2);
        this.PataDchaFrontal.translateX(-0.4);
        this.PataDchaFrontal.translateY(0.1);
        this.PataDchaFrontal.translateZ(-0.6);
        this.PataDchaFrontal.rotateZ(Math.PI / 2);
        this.PataDchaFrontal.rotateY(-Math.PI / 2);
        this.PataDchaFrontal.rotateZ(Math.PI / 8);
        this.add(this.PataDchaFrontal);

        this.PataDchaCentral = new Pata();
        this.PataDchaCentral.scale.set(1.5, 1.5, 1.5);
        this.PataDchaCentral.translateX(-0.03);
        this.PataDchaCentral.translateY(0.1);
        this.PataDchaCentral.translateZ(-0.7);
        this.PataDchaCentral.rotateZ(Math.PI / 2);
        this.PataDchaCentral.rotateY(Math.PI / 2);
        this.PataDchaCentral.rotateZ(-Math.PI / 1.3);
        this.add(this.PataDchaCentral);

        this.PataDchaTrasera = new Pata();
        this.PataDchaTrasera.scale.set(2, 2, 2);
        this.PataDchaTrasera.translateX(0.49);
        this.PataDchaTrasera.translateY(0.1);
        this.PataDchaTrasera.translateZ(-0.64);
        this.PataDchaTrasera.rotateZ(-Math.PI / 2);
        this.PataDchaTrasera.rotateY(-Math.PI / 2);
        this.PataDchaTrasera.rotateZ(-Math.PI / 8);
        this.add(this.PataDchaTrasera);

        this.MusloIzdoFrontal = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.025, 0.1, 8), material);
        this.MusloIzdoFrontal.translateX(-0.4);
        this.MusloIzdoFrontal.translateY(0.1);
        this.MusloIzdoFrontal.translateZ(0.47);
        this.MusloIzdoFrontal.rotateX(-Math.PI / 2);
        this.MusloIzdoFrontal.rotateZ(-Math.PI / 8);
        this.add(this.MusloIzdoFrontal);

        this.MusloIzdoCentral = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.025, 0.2, 8), material);
        this.MusloIzdoCentral.translateX(0);
        this.MusloIzdoCentral.translateY(0.1);
        this.MusloIzdoCentral.translateZ(0.55);
        this.MusloIzdoCentral.rotateX(-Math.PI / 2);
        this.add(this.MusloIzdoCentral);

        this.MusloIzdoTrasero = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.025, 0.2, 8), material);
        this.MusloIzdoTrasero.translateX(0.4);
        this.MusloIzdoTrasero.translateY(0.1);
        this.MusloIzdoTrasero.translateZ(0.47);
        this.MusloIzdoTrasero.rotateX(-Math.PI / 2);
        this.MusloIzdoTrasero.rotateZ(Math.PI / 8);
        this.add(this.MusloIzdoTrasero);

        this.PataIzdaFrontal = new Pata();
        this.PataIzdaFrontal.scale.set(2, 2, 2);
        this.PataIzdaFrontal.translateX(-0.4);
        this.PataIzdaFrontal.translateY(0.1);
        this.PataIzdaFrontal.translateZ(0.6);
        this.PataIzdaFrontal.rotateZ(Math.PI / 2);
        this.PataIzdaFrontal.rotateY(Math.PI / 2);
        this.PataIzdaFrontal.rotateZ(Math.PI / 8);
        this.add(this.PataIzdaFrontal);

        this.PataIzdaCentral = new Pata();
        this.PataIzdaCentral.scale.set(1.5, 1.5, 1.5);
        this.PataIzdaCentral.translateX(-0.03);
        this.PataIzdaCentral.translateY(0.1);
        this.PataIzdaCentral.translateZ(0.7);
        this.PataIzdaCentral.rotateZ(Math.PI / 2);
        this.PataIzdaCentral.rotateY(-Math.PI / 2);
        this.PataIzdaCentral.rotateZ(-Math.PI / 1.3);
        this.add(this.PataIzdaCentral);

        this.PataIzdaTrasera = new Pata();
        this.PataIzdaTrasera.scale.set(2, 2, 2);
        this.PataIzdaTrasera.translateX(0.49);
        this.PataIzdaTrasera.translateY(0.1);
        this.PataIzdaTrasera.translateZ(0.64);
        this.PataIzdaTrasera.rotateZ(-Math.PI / 2);
        this.PataIzdaTrasera.rotateY(Math.PI / 2);
        this.PataIzdaTrasera.rotateZ(-Math.PI / 8);
        this.add(this.PataIzdaTrasera);

    }
}

export { Escarabajo };
