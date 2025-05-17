import * as THREE from 'three';
import { Escarabajo } from './Escarabajo.js';
import { Pelota } from './Pelota.js';
import { Insect } from "../Insect.js";

const negro = new THREE.Color(0x2a1b0a);
const blanco = new THREE.Color(0xF8F6F0); 

class EscarabajoPelotero extends Insect {
    constructor(name, type, team) {
        super(name, type, team);

        // Transformaciones iniciales
        this.scale.set(0.5, 0.5, 0.5);

        this.Escarabajo = new Escarabajo(this.OriginalMaterial);
        this.Escarabajo.scale.set(0.05, 0.05, 0.05);
        this.Escarabajo.translateY(0.05);
        this.Escarabajo.translateZ(0.05);
        this.Escarabajo.rotateY(Math.PI / 2);
        this.Escarabajo.rotateZ(Math.PI / 2.5);
        this.add(this.Escarabajo);

        this.Pelota = new Pelota();
        this.Pelota.translateY(0.05);
        this.Pelota.rotateZ(Math.PI / 2);
        this.add(this.Pelota);
    }

    update() {
        // Lógica de actualización futura
    }
}

export { EscarabajoPelotero };
