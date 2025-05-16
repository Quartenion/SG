import * as THREE from 'three';
import { Abdomen } from './Abdomen.js';
import { Torax } from './Torax.js';
import { Cabeza } from './Cabeza.js';
import { Pata } from './Pata.js';
import { Insect } from "../Insect.js";

const negro = new THREE.Color(0x2a1b0a);
const blanco = new THREE.Color(0xF8F6F0); 

class Hormiga extends Insect {
    constructor(name, type, team) {
        super();
        this.name = name;
        this.type = type;
        this.team = team;

        // Material según el equipo
        const materialColor = (team === 'white') ? blanco : negro;
        const material = new THREE.MeshStandardMaterial({ color: materialColor });

        // Halo de selección (no depende del equipo)
        const geometry = new THREE.TorusGeometry(2, 0.1, 30);
        const materialHalo = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, materialHalo);
        this.halo.rotation.x = Math.PI / 2;

        // Transformaciones iniciales
        this.scale.set(0.02, 0.02, 0.02);
        this.rotateY(Math.PI / 2);
        this.translateY(0.028);

        // Cuerpo
        this.Abdomen = new Abdomen(material);
        this.Abdomen.translateX(-0.7);
        this.Abdomen.rotateZ(Math.PI / 2);
        this.add(this.Abdomen);

        this.Torax = new Torax(material);
        this.add(this.Torax);

        this.Cabeza = new Cabeza(material);
        this.Cabeza.scale.set(0.8, 0.8, 0.8);
        this.Cabeza.translateX(0.6);
        this.Cabeza.translateY(0.2);
        this.Cabeza.rotateZ(-Math.PI / 8);
        this.add(this.Cabeza);

        const conectorGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8);
        const conector = new THREE.Mesh(conectorGeom, material);
        conector.position.set(0.4, 0.3, 0); 
        conector.rotateZ(Math.PI / 2.5); 
        this.add(conector);

        // Patas
        const patas = [
            { name: 'PataDchaFrontal', tx: -0.15, ty: -0.55, tz:  0.2, ry:  Math.PI / 1.5 },
            { name: 'PataDchaCentral', tx: -0.85, ty: -0.65, tz:  0.55, ry: Math.PI / 2 },
            { name: 'PataDchaTrasera', tx: -1.15, ty: -0.5,  tz:  0.6, ry:  Math.PI / 8 },
            { name: 'PataIzdaFrontal', tx: -0.15, ty: -0.55, tz: -0.2, ry: -Math.PI / 1.5 },
            { name: 'PataIzdaCentral', tx: -0.85, ty: -0.65, tz: -0.55, ry: -Math.PI / 2 },
            { name: 'PataIzdaTrasera', tx: -1.15, ty: -0.5,  tz: -0.6, ry: -Math.PI / 8 }
        ];

        patas.forEach(p => {
            const pata = new Pata(material);
            pata.scale.set(0.7, 0.7, 0.7);
            pata.translateX(p.tx);
            pata.translateY(p.ty);
            pata.translateZ(p.tz);
            pata.rotateY(p.ry);
            this.add(pata);
            this[p.name] = pata;
        });
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
