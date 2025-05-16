import * as THREE from '../../../libs/three.module.js';
import * as CSG from '../../../libs/three-bvh-csg.js';

import { Muslo } from './Muslo.js';

class Torax extends THREE.Object3D {
    constructor(material = null) {
        super();

        this.material = material; 

        this.toraxShape = new THREE.Shape();
        this.toraxShape.moveTo(0, 0);
        this.toraxShape.bezierCurveTo(0.7, 0, 0.4, 1, 0, 1);

        this.drawSolid();
    }

    drawSolid() {
        const points = this.toraxShape.getPoints(50);
        this.seccionTorax1 = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2);
        this.seccionTorax2 = new THREE.LatheGeometry(points, 50, 0, Math.PI * 2); 
        
        this.seccionTorax1.rotateZ(Math.PI / -2);
        this.seccionTorax1.translate(-0.8, 0, 0);

        this.seccionTorax2.rotateZ(Math.PI / -6);
        this.seccionTorax2.translate(-0.2, -0.2, 0);

        let G1 = new CSG.Brush(this.seccionTorax1, this.material);
        let G2 = new CSG.Brush(this.seccionTorax2, this.material);

        let evaluator = new CSG.Evaluator();
        let cuerpo = evaluator.evaluate(G1, G2, CSG.ADDITION);
        this.add(cuerpo); 

        // Crear y posicionar los muslos
        const crearMusloTransformado = (musloObj, scale, rotationX, rotationY, rotationZ, translation) => {
            musloObj.scale.set(...scale);
            musloObj.rotateY(rotationY);
            musloObj.rotateX(rotationX);
            musloObj.rotateZ(rotationZ);
            musloObj.position.set(...translation);
            this.add(musloObj);
        };

        // Muslos izquierdos
        crearMusloTransformado(new Muslo(this.material), [0.4, 0.4, 0.4], 0, 0, -Math.PI / 6, [-0.2, -0.5, 0.2]);
        crearMusloTransformado(new Muslo(this.material), [0.3, 0.3, 0.3], 0, 0, -Math.PI / 6, [-0.5, -0.5, 0.3]);
        crearMusloTransformado(new Muslo(this.material), [0.3, 0.3, 0.3], -Math.PI / 3, -Math.PI / 6, 0, [-1.2, -0.5, 0.7]);
        crearMusloTransformado(new Muslo(this.material), [0.2, 0.1, 0.2], 0, 0, 0, [-0.15, -0.6, 0.2]);
        crearMusloTransformado(new Muslo(this.material), [0.2, 0.3, 0.2], -Math.PI / 3, -Math.PI / 3, 0, [-0.9, -0.7, 0.6]);

        // Muslos derechos
        crearMusloTransformado(new Muslo(this.material), [0.4, 0.4, 0.4], 0, 0, -Math.PI / 6, [-0.2, -0.5, -0.2]);
        crearMusloTransformado(new Muslo(this.material), [0.3, 0.3, 0.3], 0, 0, -Math.PI / 6, [-0.5, -0.5, -0.3]);
        crearMusloTransformado(new Muslo(this.material), [0.3, 0.3, 0.3], Math.PI / 3, Math.PI / 6, 0, [-1.2, -0.5, -0.7]);
        crearMusloTransformado(new Muslo(this.material), [0.2, 0.1, 0.2], 0, 0, 0, [-0.15, -0.6, -0.2]);
        crearMusloTransformado(new Muslo(this.material), [0.2, 0.3, 0.2], Math.PI / 3, Math.PI / 3, 0, [-0.9, -0.7, -0.6]);
    }
}

export { Torax };
