import * as THREE from '../../../libs/three.module.js'
import {Beetle_shape} from "./Beetle_shape.js";

class Beetle extends THREE.Object3D {
    constructor() {
        super();

        this.bshape = new Beetle_shape();

        let revGeometry = new THREE.LatheGeometry(this.bshape.getShapePoints(), 10);
        let material = new THREE.MeshNormalMaterial();

        this.beetle = new THREE.Mesh(revGeometry, material);
        this.add (this.beetle);
    }



    updateGeometry(resolution){
        this.beetle.geometry.dispose();
        this.beetle.geometry = new THREE.LatheGeometry(this.bshape.getShapePoints(), resolution);
    }

    update() {}
}
export {Beetle};