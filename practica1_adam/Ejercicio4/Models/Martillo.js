import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'
import {Brush} from "../../../libs/three-bvh-csg.js";

class Martillo extends THREE.Object3D {
    constructor() {
        super();

        this.material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});
        let brushMango = this.mangoGeometry(); // Devuelve el brush
        let brushHead = this.headGeometry();

    }

    mangoGeometry() {
        // Hacemos el primer mango
        let cilinder = new THREE.CylinderGeometry(0.25, 0.25, 2);
        let box = new THREE.BoxGeometry(0.1, 2, 0.5);
        box.translate(0.25, 0, 0);

        let brush1 = new CSG.Brush(cilinder, this.material);
        let brush2 = new CSG.Brush(box, this.material);
        let evaluator = new CSG.Evaluator();
        let mango1 = evaluator.evaluate(brush1, brush2, CSG.SUBTRACTION);

        let box2 = new THREE.BoxGeometry(0.1, 2, 0.5);
        box2.translate(-0.25, 0, 0);
        brush2 = new CSG.Brush(box2, this.material);
        mango1 = evaluator.evaluate(mango1, brush2, CSG.SUBTRACTION);

        // Hacemos el segundo mango
        let mango2 = new Brush(mango1.geometry.clone(), this.material);
        mango2.geometry.scale(0.9, 1, 0.9);
        mango2.geometry.translate(0, 2, 0);

        let mango = evaluator.evaluate(mango1, mango2, CSG.ADDITION);

        //this.add(mango);
        return mango;
    }

    headGeometry() {
        // Voy a hacer la parte de atrás primero
        const extrudeSettings ={
            steps: 100,
            depth: 0.7,
            bevelEnabled: false,
        }

        let x,y;
        x=y=0;
        let length = 1;
        let heigth = 0.3;
        let shape = new THREE.Shape();
        shape.moveTo(x,y);
        shape.bezierCurveTo(x-length/2+0.2, y, x-0.2, y+heigth/2 ,x-length, y-heigth);
        shape.lineTo(shape.currentPoint.x-0.02, shape.currentPoint.y+0.02);
        shape.bezierCurveTo(x-length/2-0.2, y+0.2, x-0.2, y+0.3 , x, y+heigth);
        shape.lineTo(x,y);

        let tailGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        tailGeometry.scale(1.7,1,1);

        let cilindro = new THREE.CylinderGeometry(0.0001,0.5,3);
        cilindro.scale(10,1,1);
        cilindro.rotateZ(270*(Math.PI/180));
        cilindro.translate(-1.6,0,0.35);

        let brush2 = new CSG.Brush(cilindro, this.material);
        let brush1 = new CSG.Brush(tailGeometry, this.material);
        let evaluator = new CSG.Evaluator();
        let parteTrasera = evaluator.evaluate(brush1, brush2, CSG.SUBTRACTION);

        this.add(parteTrasera);

        // Hacemos el cuerpo principal


    }

    update(){}
}

export {Martillo}