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

        const geometry = new THREE.TorusGeometry(0.1, 0.005, 30);
        geometry.translate(0, 0, -0.05);
        const material = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, material);
        this.halo.rotation.x = Math.PI / 2;

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
