import * as THREE from 'three';
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Pata } from './Pata.js';

const conectorMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });
const conectorGeom1 = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8); // antes: 100 segmentos
const conectorGeom2 = new THREE.CylinderGeometry(0.01, 0.01, 0.03, 8);

class Hormiga extends THREE.Object3D {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;

        // === ABDOMEN ===
        this.abdomen = new Abdomen();
        this.abdomen.position.set(-0.03, 0.01, 0);
        this.abdomen.rotation.z = Math.PI / 1.8;
        this.add(this.abdomen);

        // === TÓRAX ===
        this.torax = new Torax();
        this.torax.position.set(0.02, 0.02, 0);
        this.add(this.torax);

        // === CABEZA ===
        this.cabeza = new Cabeza();
        this.cabeza.position.set(0.05, 0.02, 0);
        this.cabeza.rotation.z = -Math.PI / 5;
        this.add(this.cabeza);

        // === CONECTORES ===
        this.conector1 = new THREE.Mesh(conectorGeom1, conectorMaterial);
        this.conector1.position.set(-0.03, 0.01, 0);
        this.conector1.rotation.z = -Math.PI / 3;
        this.add(this.conector1);

        this.conector2 = new THREE.Mesh(conectorGeom2, conectorMaterial);
        this.conector2.position.set(0.05, 0.02, 0);
        this.conector2.rotation.z = Math.PI / 3;
        this.add(this.conector2);

        // === PATAS ===
        const crearPata = (x, y, z, rotY, rotZ = 0) => {
            const pata = new Pata();
            pata.scale.set(0.05, 0.05, 0.05);
            pata.position.set(x, y, z);
            pata.rotation.set(0, rotY, rotZ);
            return pata;
        };

        // Frontales
        this.add(crearPata(0.009, -0.013, 0.01, Math.PI / 1.5));     // Derecha
        this.add(crearPata(0.009, -0.013, -0.01, -Math.PI / 1.5));  // Izquierda

        // Centrales
        this.add(crearPata(-0.03, -0.02, 0.03, Math.PI / 2, -Math.PI / 64));   // Derecha
        this.add(crearPata(-0.03, -0.02, -0.03, -Math.PI / 2, Math.PI / 64));  // Izquierda

        // Traseras
        this.add(crearPata(-0.045, -0.01, 0.035, Math.PI / 6, Math.PI / 32));   // Izquierda
        this.add(crearPata(-0.045, -0.01, -0.035, -Math.PI / 6, -Math.PI / 32)); // Derecha

        // === ESCALA Y POSICIÓN GLOBAL ===
        this.position.y = 0.03;
        this.scale.set(0.4, 0.4, 0.4);
        this.rotation.y = Math.PI / 2;
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

export { Hormiga };
