import * as THREE from '../../../libs/three.module.js'

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
            bevelEnabled: false
        };


        // Creamos la forma exterior de la tuerca con un agujero en el centro
        const hole = new THREE.Shape();
        hole.absarc(x, y, hole_radius, 0, Math.PI * 2);
        shape.moveTo(x+radius,y);
        shape.lineTo(x+radius/2,y+radius);
        shape.lineTo(x-(radius/2),y+radius);
        shape.lineTo(x-(radius),y);
        shape.lineTo(x-(radius/2),y-(radius));
        shape.lineTo(x+radius/2,y-(radius));
        shape.lineTo(x+radius,y);

        shape.holes.push(hole);

        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        let material = new THREE.MeshNormalMaterial();
        let tuerca = new THREE.Mesh(geometry, material);

        this.add(tuerca);




        // Creamos las incisiciones interiores
        let smallCircleShape = new THREE.Shape();
        x=y=0;
        radius = 0.1;
        smallCircleShape.absarc(x,y,radius,0,Math.PI * 2);

        const points = [];
        const numPoints = 200;
        radius = hole_radius;
        const height = 1.9;
        const turns = 6;

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
        let extrudeMesh = new THREE.Mesh(extrudeGeometry, material);
        this.add(extrudeMesh);


        // Creamos la esfera de mismo radio que nos permitirá darle bordes redondeados a
        // la tuerca
        let sphereGeometry = new THREE.SphereGeometry(3);
        let sphereMesh = new THREE.Mesh(sphereGeometry, material);


    }

    update() {}
}

export {Tuerca};