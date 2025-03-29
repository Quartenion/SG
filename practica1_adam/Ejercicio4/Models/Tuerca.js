import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'


class Tuerca extends THREE.Object3D {
    constructor() {
        super();

        let shape = new THREE.Shape();
        let x,y, radius, hole_radius;

        x=y=0;
        radius = 3;
        hole_radius = 1.5;

        const extrudeSettings = {
            depth: 2,
            bevelEnabled: true,
            bevelSize: 0.05,
        };


        // Creamos la forma exterior de la tuerca con un agujero en el centro

        shape.moveTo(x+radius,y);
        shape.lineTo(x+radius/2,y+radius*0.866); // El numero se saca por el triangulo pitagoras
        shape.lineTo(x-(radius/2),y+radius*0.866);
        shape.lineTo(x-(radius),y);
        shape.lineTo(x-(radius/2),y-(radius*0.866));
        shape.lineTo(x+radius/2,y-(radius*0.866));
        shape.lineTo(x+radius,y);

        const hole = new THREE.Shape();
        hole.absarc(x, y, hole_radius, 0, Math.PI * 2);
        shape.holes.push(hole);

        let tuercaGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        let material = new THREE.MeshNormalMaterial();



        // Creamos las incisiciones interiores
        let smallCircleShape = new THREE.Shape();
        x=y=0;
        radius = 0.1;
        smallCircleShape.absarc(x,y,radius,0,Math.PI * 2);

        const points = [];
        const numPoints = 100;
        radius = hole_radius;
        const height = 2;
        const turns = 10;

        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const angle = turns * 2 * Math.PI * t;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const z = height * t;
            points.push(new THREE.Vector3(x, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(points);

        const extrudePathSettings = {
            steps:100,
            bevelEnabled: false,
            extrudePath: curve
        };

        let extrudeGeometry = new THREE.ExtrudeGeometry(smallCircleShape, extrudePathSettings);


        // Hacemos el booleano de las incisiones con la tuerca
        let brush1 = new CSG.Brush(tuercaGeometry, material);
        let brush2 = new CSG.Brush(extrudeGeometry, material);
        let evaluator = new CSG.Evaluator();
        let baseTuerca = evaluator.evaluate(brush1, brush2, CSG.SUBTRACTION);


        // Creamos la esfera de mismo radio que nos permitirá darle bordes redondeados a
        // la tuerca
        let sphereGeometry = new THREE.SphereGeometry(3);
        sphereGeometry.translate(0,0,1); // Se translada el ancho de la tuerca


        // Hacemos el booleano con la esfera
        brush2 = new CSG.Brush(sphereGeometry, material);
        let tuercaFinal = evaluator.evaluate(baseTuerca, brush2, CSG.INTERSECTION);

        this.add(tuercaFinal);
    }

    update() {}
}

export {Tuerca};
