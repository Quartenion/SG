import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'
import {ADDITION, Brush} from "../../../libs/three-bvh-csg.js";


class Pieza1 extends THREE.Object3D {
    constructor() {
        super();

        let shape = new THREE.Shape();
        let x,y, width, height, hole_radius;

        x=y=0;
        hole_radius = 0.3;
        width = 2.5;
        height = 3.5;
        // Vamos a imaginar que cada borde de curva son 0.4, la mitad 0.2

        const extrudeSettings = {
            steps: 100,
            depth: 0.5,
            bevelEnabled: true,
            bevelSize: 0.2,
            bevelThickness: 0.2,
            bevelSegments: 10,
            offset: 0
        }


        // Creamos la shape de la pieza
        // Como tiene curvas en los 4 lados, la primera curva es media curva
        // la última curva será media también para completar, el resto son enteras
        shape.moveTo(x+width/2,y);
        shape.quadraticCurveTo(x+width/2, y+0.1,
                                 x+width/2 - 0.05, y+0.2);

        // Hacia arriba
        shape.lineTo(x+0.2 ,y+height/2 -0.05);
        shape.quadraticCurveTo(x,y+height/2+0.15,x-0.2,y+height/2 -0.05)

        // Hacia abajo
        shape.lineTo(x-width/2 + 0.05 ,y+0.2);
        shape.quadraticCurveTo(x-width/2-0.1, y,x-width/2+ 0.05,y-0.2);

        // Sigue hacia abajo
        shape.lineTo(x-0.2,y-height/2 +0.05)
        shape.quadraticCurveTo(x,y-height/2-0.15,x+0.2,y-height/2 +0.05)

        // Hacia arriba
        shape.lineTo(x+width/2 - 0.05,y-0.2);
        shape.quadraticCurveTo(x+width/2, y-0.1,
                                 x+width/2,y);



        const hole = new THREE.Shape();
        hole.absarc(x, y-0.9, hole_radius, 0, Math.PI * 2-0.01, false);
        hole.absarc(x, y+0.9, hole_radius, 0, Math.PI * 2-0.01, false);

        shape.holes.push(hole);

        let piezaGeometry = new THREE.ExtrudeGeometry(shape,extrudeSettings);
        let material = new THREE.MeshNormalMaterial();


        // Ahora voy a hacer un cilindro con suavizado por abajo utilizando revolución
        x=y=0;
        let radius = 0.5;
        let cheight = 1;
        let cShape = new THREE.Shape();

        cShape.moveTo(x,y);
        cShape.lineTo(x+radius+0.1,y);
        cShape.bezierCurveTo(x+radius+0.03, y,x+radius,y+0.03, x+radius,y+0.1)
        cShape.lineTo(x+radius, y+cheight);
        cShape.lineTo(x, y+cheight);
        cShape.lineTo(x, y);

        let cilinderGeometry = new THREE.LatheGeometry(cShape.getPoints(100), 100);
        cilinderGeometry.rotateX(90*(Math.PI/180));
        cilinderGeometry.translate(0,0,0.688);

        // Hacemos el add
        let brush1 = new CSG.Brush(cilinderGeometry, material);
        let brush2 = new CSG.Brush(piezaGeometry, material);
        let evaluator = new CSG.Evaluator();
        let piezaCompuesta = evaluator.evaluate(brush1, brush2, CSG.ADDITION);

        let insideCG = new THREE.CylinderGeometry(0.25, 0.25, 6, 100, 100);
        insideCG.rotateX(90*(Math.PI/180));
        brush1 = new CSG.Brush(insideCG, material);

        piezaCompuesta = evaluator.evaluate(piezaCompuesta, brush1, CSG.SUBTRACTION);

        this.add(piezaCompuesta);

        /*
        let piezaMesh = new THREE.Mesh(piezaGeometry, material);
        this.add(piezaMesh);
        */


    }


    update() {}
}

export {Pieza1}