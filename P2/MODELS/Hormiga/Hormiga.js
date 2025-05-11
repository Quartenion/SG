import * as THREE from 'three';
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Pata } from './Pata.js';

const conectorMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });

class Hormiga extends THREE.Object3D {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;

        const geometry = new THREE.TorusGeometry(2, 0.1, 30);
        const material = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, material);
        this.halo.rotation.x = Math.PI / 2;

        this.scale.set(0.02, 0.02, 0.02);
        this.rotateY(Math.PI / 2);
        this.translateY(0.028);

        this.Abdomen = new Abdomen();
        this.Abdomen.translateX(-0.7);
        this.Abdomen.rotateZ(Math.PI / 2);
        this.add(this.Abdomen);

        this.Torax = new Torax();
        this.add(this.Torax);

        this.Cabeza = new Cabeza();
        this.Cabeza.scale.set(0.8, 0.8, 0.8);
        this.Cabeza.translateX(0.6);
        this.Cabeza.translateY(0.2);
        this.Cabeza.rotateZ(-Math.PI / 8);
        this.add(this.Cabeza);

        const conectorGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8);
        const conector = new THREE.Mesh(conectorGeom, conectorMaterial);
        conector.position.set(0.4, 0.3, 0); 
        conector.rotateZ(Math.PI/2.5); 
        this.add(conector);

        this.PataDchaFrontal = new Pata();
        this.PataDchaFrontal.scale.set(0.7, 0.7, 0.7);
        this.PataDchaFrontal.translateX(-0.15);
        this.PataDchaFrontal.translateY(-0.55);
        this.PataDchaFrontal.translateZ(0.2);
        this.PataDchaFrontal.rotateY(Math.PI / 1.5);
        this.add(this.PataDchaFrontal);

        this.PataDchaCentral = new Pata();
        this.PataDchaCentral.scale.set(0.7, 0.7, 0.7);
        this.PataDchaCentral.translateX(-0.85);
        this.PataDchaCentral.translateY(-0.65);
        this.PataDchaCentral.translateZ(0.55);
        this.PataDchaCentral.rotateY(Math.PI / 2);
        this.add(this.PataDchaCentral);

        this.PataDchaTrasera = new Pata();
        this.PataDchaTrasera.scale.set(0.7, 0.7, 0.7);
        this.PataDchaTrasera.translateX(-1.15);
        this.PataDchaTrasera.translateY(-0.5);
        this.PataDchaTrasera.translateZ(0.6);
        this.PataDchaTrasera.rotateY(Math.PI / 8);
        this.add(this.PataDchaTrasera);

        this.PataIzdaFrontal = new Pata();  
        this.PataIzdaFrontal.scale.set(0.7, 0.7, 0.7);
        this.PataIzdaFrontal.translateX(-0.15);
        this.PataIzdaFrontal.translateY(-0.55);
        this.PataIzdaFrontal.translateZ(-0.2);
        this.PataIzdaFrontal.rotateY(-Math.PI / 1.5);
        this.add(this.PataIzdaFrontal);

        this.PataIzdaCentral = new Pata();
        this.PataIzdaCentral.scale.set(0.7, 0.7, 0.7);
        this.PataIzdaCentral.translateX(-0.85);
        this.PataIzdaCentral.translateY(-0.65);
        this.PataIzdaCentral.translateZ(-0.55);
        this.PataIzdaCentral.rotateY(-Math.PI / 2);
        this.add(this.PataIzdaCentral);

        this.PataIzdaTrasera = new Pata();
        this.PataIzdaTrasera.scale.set(0.7, 0.7, 0.7);
        this.PataIzdaTrasera.translateX(-1.15);
        this.PataIzdaTrasera.translateY(-0.5);
        this.PataIzdaTrasera.translateZ(-0.6);
        this.PataIzdaTrasera.rotateY(-Math.PI / 8);
        this.add(this.PataIzdaTrasera);
    }

    select() {
        this.add(this.halo);
    }

    unselect() {
        this.remove(this.halo);
    }

    update() {
        // Lógica de actualización futura
    }
}

export { Hormiga };
