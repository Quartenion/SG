import * as THREE from 'three';
import { Escarabajo } from './Escarabajo.js';
import { Pelota } from './Pelota.js';
import { Insect } from "../Insect.js";

const negro = new THREE.Color(0x2a1b0a);
const blanco = new THREE.Color(0xF8F6F0); 

class EscarabajoPelotero extends Insect {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;

        // Material según el equipo
        const materialColor = (team === 'white') ? blanco : negro;
        const material = new THREE.MeshStandardMaterial({ color: materialColor });

        // Transformaciones iniciales
        this.scale.set(0.5, 0.5, 0.5);

        // Halo de selección (no depende del equipo)
        const geometry = new THREE.TorusGeometry(0.1, 0.005, 30);
        geometry.translate(0, 0, -0.05);
        const materialHalo = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, materialHalo);
        this.halo.rotation.x = Math.PI / 2;

        this.Escarabajo = new Escarabajo(material);
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

export { EscarabajoPelotero };
