
import * as THREE from '../../libs/three.module.js'
import * as CSG from '../../libs/three-bvh-csg.js';
import TWEEN from "../../libs/tween.module.js";
import {Insect} from "./Insect.js";

class Arania extends Insect {
    static legGeometry = null;
    constructor(name, type, team){
        super(name, type, team);

        const core = this.createCore();
        this.add(core);

        const head = this.createHead();
        head.translateY(0.2+ 1/5 * 0.7);
        head.translateZ(-1/5 -0.02);
        this.add(head);

        const ass = this.createAss();
        this.add(ass);

        this.scale.set(0.09,0.09,0.09);
    }

    createLeg(){
        if (!Arania.legGeometry) {
            // El shape va a ser una especie de elipse
            const shape = new THREE.Shape();

            shape.moveTo(0, 0);
            shape.quadraticCurveTo(0.005, -0.007, 0.01, 0);
            shape.quadraticCurveTo(0.005, 0.007, 0, 0);


            // Creamos el camino que va a seguir el shape
            const legShape = new THREE.Shape();
            legShape.moveTo(0, 0.25);
            legShape.lineTo(0.15, 0.35);
            legShape.lineTo(0.30, 0.55);
            legShape.lineTo(0.45, 0.35);
            legShape.lineTo(0.6, 0);

            const shapePoints = legShape.getPoints(100);

            const path = new THREE.CatmullRomCurve3(
                shapePoints.map(p => new THREE.Vector3(p.x, p.y, 0)));

            const extrudeSettings = {
                steps: 50,
                bevelEnabled: true,
                bevelSegments: 10,
                bevelSize: 0.1,
                bevelThickness: 0.2,
                extrudePath: path,
            }

            Arania.legGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }

        return new THREE.Mesh(Arania.legGeometry, this.OriginalMaterial);
    }

    createCore(){
        // Creamos el torso
        let width = 1;

        const torso = new THREE.SphereGeometry(width/5, this.radialSegments);
        torso.scale(0.85, 0.7, 1);

        torso.translate(0,0.2 + (width/5 * 0.7),0);

        // Usamos la función de crear patas para crear las 8 y colocarlas,
        // voy a colocarlas todas desde el centro usando un algoritmo de revolución en 8 partes
        const core = new THREE.Group();

        const offset = 24;
        for (let i = 0; i < 360; i+=(360/8)){
            const leg = this.createLeg();
            leg.rotateY((i+offset)*Math.PI/180);
            core.add(leg);
        }

        core.add(new THREE.Mesh(torso, this.OriginalMaterial));
        return core;
    }

    createHead(){

        const head = new THREE.Group();
        const width = 0.15;

        // Creamos la base de la cabeza
        const headBase = new THREE.SphereGeometry(width/2, this.radialSegments);
        headBase.scale(1, 0.9, 0.95);

        const headBaseMesh = new THREE.Mesh(headBase, this.OriginalMaterial);
        head.add(headBaseMesh);

        // Creamos los ojos
        const geoOjo = new THREE.SphereGeometry(width/6, this.radialSegments);
        geoOjo.scale(1,0.7,0.7);

        // Esta la opción de mover la geometría antes de crear el mesh para cada uno pero
        // mejor creo que es compartir la geometría y luego mover el mesh
        const ojoIzqUp = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        ojoIzqUp.translateZ(-width/6 * 0.7 - width/2 * 0.95 + width/5);
        ojoIzqUp.translateY(width/6 * 1.1);
        ojoIzqUp.translateX(width/6* 1.4);
        ojoIzqUp.rotateY(Math.PI/180*-25);

        const ojoDrchUp = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        ojoDrchUp.translateZ(-width/6 * 0.7 - width/2 * 0.95 + width/5);
        ojoDrchUp.translateY(width/6 * 1.1);
        ojoDrchUp.translateX(-width/6 * 1.4);
        ojoDrchUp.rotateY(Math.PI/180*25);

        const ojoIzqD = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        ojoIzqD.scale.set(0.7,0.7,0.7);
        ojoIzqD.translateZ(-width/6 * 0.7 - width/2 * 0.95 + width/5);
        ojoIzqD.translateY(-width/7 * 0.3);
        ojoIzqD.translateX(width/6);
        ojoIzqD.rotateY(Math.PI/180*-25);

        const ojoDrchD = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        ojoDrchD.scale.set(0.7,0.7,0.7);
        ojoDrchD.translateZ(-width/6 * 0.7 - width/2 * 0.95 + width/5);
        ojoDrchD.translateY(-width/7 * 0.3);
        ojoDrchD.translateX(-width/6);
        ojoDrchD.rotateY(Math.PI/180*25);

        head.add(ojoIzqUp);
        head.add(ojoIzqD);
        head.add(ojoDrchD);
        head.add(ojoDrchUp);

        return head;
    }

    createAss(){
        let width = 1;

        const torso = new THREE.SphereGeometry(width/4, this.radialSegments);
        torso.scale(0.8, 0.7, 1.2);

        torso.translate(0,0.2 + (width/4 * 0.7),width/4*1.2 + width/6);

        return new THREE.Mesh(torso, this.OriginalMaterial);
    }

    update() {
    }

}
export {Arania};