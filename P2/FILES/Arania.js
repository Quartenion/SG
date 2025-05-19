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



        this.scale.set(10,10,10);
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
        let height = 1;

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
        const height = 0.2;
        const width = 0.15;


        // Creamos la base de la cabeza



        // Creamos los ojos
        const geoOjo = new THREE.SphereGeometry(width/5, this.radialSegments);

        // Esta la opción de mover la geometría antes de crear el mesh para cada uno pero
        // mejor creo que es compartir la geometría y luego mover el mesh
        const ojoIzqUp = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        const ojoDrchUp = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        const ojoIzqD = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);
        const ojoDrchD = new THREE.Mesh(geoOjo, this.boxingGloveMaterial);


        const head = new THREE.Group();
        head.add(ojoIzqUp);
        head.add(ojoIzqD);
        head.add(ojoDrchD);
        head.add(ojoDrchUp);

        return head;
    }

    createAss(){

    }

}
export {Arania};