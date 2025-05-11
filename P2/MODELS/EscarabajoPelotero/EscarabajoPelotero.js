import * as THREE from 'three';
import { Escarabajo } from './Escarabajo.js';
import { Pelota } from './Pelota.js';

class EscarabajoPelotero extends THREE.Object3D {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;
        this.scale.set(0.5, 0.5, 0.5);

        this.Escarabajo = new Escarabajo();
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
        this.OriginalMaterial = this.cabeza.material; // Guarda el original por si no lo estaba guardando antes
        this.cabeza.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }

    unselect() {
        if (this.OriginalMaterial)
            this.cabeza.material = this.OriginalMaterial;
    }

    update() {
        // Lógica de actualización futura
    }
}

export { EscarabajoPelotero };
