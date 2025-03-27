import * as THREE from '../../../libs/three.module.js'
import {Beetle_shape} from "./Beetle_shape.js";

class Beetle extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);

        this.bshape = new Beetle_shape();

        let revGeometry = new THREE.LatheGeometry(this.bshape.getShapePoints(), 10);
        let material = new THREE.MeshNormalMaterial();

        this.beetle = new THREE.Mesh(revGeometry, material);
        this.add (this.beetle);
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            resolution: 10,

            reset : () => {
                this.guiControls.resolution = 10;
            }
        }

        let folderBeetle = gui.addFolder(titleGui);
        folderBeetle.add(this.guiControls, 'resolution', 3, 20, 1)
            .name('Resolution : ')
            .listen()
            .onChange(() => this.updateGeometry());
    }


    updateGeometry(){
        this.beetle.geometry.dispose();
        this.beetle.geometry = new THREE.LatheGeometry(this.bshape.getShapePoints(), this.guiControls.resolution);
    }

    update() {}
}
export {Beetle};