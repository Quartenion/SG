import * as THREE from 'three';
import { Abdomen } from './Abdomen.js';
import { Femur } from './Femur.js';
import { Ala } from './Ala.js';
import { Cabeza } from './Cabeza.js';
import { Torax } from './Torax.js';
import { Pata } from './Pata.js';
import { Insect } from "../Insect.js";

class Saltamontes extends Insect {
    constructor(name, type, team) {
        super(name, type, team);
        
        const geometry = new THREE.TorusGeometry(0.85, 0.05, 30);
        const material = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, material);
        this.halo.rotation.x = Math.PI / 2;

        this.scale.set(0.05, 0.05, 0.05);
        this.translateY(0.016);
        this.rotateY(Math.PI / 2);

        // Abdomen
        this.Abdomen = new Abdomen(this.OriginalMaterial);
        this.Abdomen.translateX(-0.5);
        this.Abdomen.rotateZ(-Math.PI / 2);
        this.add(this.Abdomen);

        // Torax
        this.Torax = new Torax(this.OriginalMaterial);
        this.Torax.scale.set(0.3, 0.2, 0.2);
        this.Torax.translateX(0.6);
        this.Torax.translateY(0.1);
        this.Torax.rotateZ(Math.PI / 4);
        this.Torax.rotateY(Math.PI);
        this.add(this.Torax);

        // Cabeza
        this.Cabeza = new Cabeza(this.OriginalMaterial);
        this.Cabeza.scale.set(0.3, 0.3, 0.3);
        this.Cabeza.translateX(0.7);
        this.Cabeza.translateY(-0.1);
        this.add(this.Cabeza);

        // Alas
        this.AlaIzda = new Ala(this.OriginalMaterial);
        this.AlaIzda.translateY(0.15);
        this.AlaIzda.translateX(0.6);
        this.AlaIzda.rotateX(-Math.PI / 4);
        this.AlaIzda.rotateZ(Math.PI / 2.1);
        this.AlaIzda.rotateY(Math.PI / 2);
        this.add(this.AlaIzda);

        this.AlaDcha = new Ala(this.OriginalMaterial);
        this.AlaDcha.translateY(0.158);
        this.AlaDcha.translateX(0.6);
        this.AlaDcha.rotateX(Math.PI / 4);
        this.AlaDcha.rotateZ(Math.PI / 2.1);
        this.AlaDcha.rotateY(-Math.PI / 2);
        this.add(this.AlaDcha);

        // Fémures
        this.FemurDcha = new Femur(this.OriginalMaterial);
        this.FemurDcha.scale.set(0.5, 0.5, 0.5);
        this.FemurDcha.translateX(0.2);
        this.FemurDcha.translateY(-0.1);
        this.FemurDcha.translateZ(0.1);
        this.FemurDcha.rotateY(Math.PI / 6);
        this.FemurDcha.rotateZ(Math.PI / 6);
        this.add(this.FemurDcha);

        this.FemurIzda = new Femur(this.OriginalMaterial);
        this.FemurIzda.scale.set(0.5, 0.5, 0.5);
        this.FemurIzda.translateX(0.2);
        this.FemurIzda.translateY(-0.1);
        this.FemurIzda.translateZ(-0.1);
        this.FemurIzda.rotateY(-Math.PI / 6);
        this.FemurIzda.rotateZ(Math.PI / 6);
        this.add(this.FemurIzda);

        // Patas Izquierda
        this.PataIzdaFrontal = new Pata(this.OriginalMaterial);
        this.PataIzdaFrontal.scale.set(0.3, 0.3, 0.3);
        this.PataIzdaFrontal.translateX(0.5);
        this.PataIzdaFrontal.rotateY(-Math.PI / 1.5);
        this.add(this.PataIzdaFrontal);

        this.PataIzdaCentral = new Pata(this.OriginalMaterial);
        this.PataIzdaCentral.scale.set(0.3, 0.3, 0.3);
        this.PataIzdaCentral.translateX(0.4);
        this.PataIzdaCentral.rotateY(-Math.PI / 2.5);
        this.add(this.PataIzdaCentral);

        this.PataIzdaTrasera = new Pata(this.OriginalMaterial);
        this.PataIzdaTrasera.scale.set(0.3, 0.8, 0.8);
        this.PataIzdaTrasera.translateX(-0.1);
        this.PataIzdaTrasera.translateY(0.53);
        this.PataIzdaTrasera.translateZ(-0.28);
        this.PataIzdaTrasera.rotateY(-Math.PI / 6);
        this.add(this.PataIzdaTrasera);

        // Patas Derecha
        this.PataDchaFrontal = new Pata(this.OriginalMaterial);
        this.PataDchaFrontal.scale.set(0.3, 0.3, 0.3);
        this.PataDchaFrontal.translateX(0.5);
        this.PataDchaFrontal.rotateY(Math.PI / 1.5);
        this.add(this.PataDchaFrontal);

        this.PataDchaCentral = new Pata(this.OriginalMaterial);
        this.PataDchaCentral.scale.set(0.3, 0.3, 0.3);
        this.PataDchaCentral.translateX(0.4);
        this.PataDchaCentral.rotateY(Math.PI / 2.5);
        this.add(this.PataDchaCentral);

        this.PataDchaTrasera = new Pata(this.OriginalMaterial);
        this.PataDchaTrasera.scale.set(0.3, 0.8, 0.8);
        this.PataDchaTrasera.translateX(-0.1);
        this.PataDchaTrasera.translateY(0.53);
        this.PataDchaTrasera.translateZ(0.28);
        this.PataDchaTrasera.rotateY(Math.PI / 6);
        this.add(this.PataDchaTrasera);
    }

    update() {
        // Lógica de actualización futura
    }
}

export { Saltamontes };
