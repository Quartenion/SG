import * as THREE from '../../../libs/three.module.js'

class Extrusion extends THREE.Object3D {
    constructor() {
        super();



        /*
        CURVAS PARA LA EXTRUSIÓN

        const curve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(0, 0, 0),
        ])

        const extrudeSettings = {
          curveSegments: 12,
          extrudePath: curve,
        }

        let hola = new THREE.ExtrudeGeometry(geometry, extrudeSettings);
        */

        /*
        let shape = new THREE.Shape();

        // lo creas
        shape.moveTo(0,0);
        shape.lineTo(1,0);
        shape.lineTo(1,1);
        shape.lineTo(0,1);
        shape.lineTo(0,0);


        let geom = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
        let material = new THREE.LineBasicMaterial({ color: 0x000000 });
        let lines = new THREE.Line(geom, material);
        this.add(lines);
        */

        // SHAPE
        this.extrusionShape = new THREE.Shape();
        this.extrusionShape.moveTo(0, 0);
        this.extrusionShape.lineTo(0.5, 0);
        this.extrusionShape.lineTo(0.5, 0.5);
        this.extrusionShape.lineTo(0, 0.5);
        this.extrusionShape.lineTo(0, 0);
        
        // AGUJEROS
        this.hole = new THREE.Shape();
        this.hole.absarc(0.25, 0.25, 0.17, 0, Math.PI * 2 - 0.1, false);
        this.extrusionShape.holes.push(this.hole);

        this.drawSolid();
    }

    drawLines() {
        const points = this.extrusionShape.getPoints(100); 

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const line = new THREE.Line(geometry, material);
        
        this.add(line);
    }

    drawSolid() {
        const extrudeSettings = { 
            depth: 0.001, 
            bevelEnabled: true, 
            bevelSegments: 100,
        };
        
        const geometry = new THREE.ExtrudeGeometry(this.extrusionShape, extrudeSettings);
        const material = new THREE.MeshNormalMaterial();

        geometry.rotateX(Math.PI / 2);
        geometry.translate(-0.25, 0, -0.25);   

        const mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}

export { Extrusion };
