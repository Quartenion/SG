import * as THREE from '../../../libs/three.module.js'
import {Beetle_shape} from "./Beetle_shape.js";


class BeetleRev extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        this.createGUI(gui, titleGui);

        this.bshape = new Beetle_shape();

        let revGeometry = new THREE.LatheGeometry(this.bshape.getShapePoints(), 10);
        let material = new THREE.MeshNormalMaterial();

        this.beetleRev = new THREE.Mesh(revGeometry, material);
        this.add (this.beetleRev);
    }


    createGUI(gui, titleGui) {
        this.guiControls = {
            resolution: 10,
            phiStart: 0,
            phiEnd: Math.PI * 2,

            reset : () => {
                this.guiControls.resolution = 10;
                this.guiControls.phiStart = 0;
                this.guiControls.phiEnd = Math.PI * 2;
            }
        }

        let folderBeetle = gui.addFolder(titleGui);
        folderBeetle.add(this.guiControls, 'resolution', 3, 20, 1)
            .name('Resolution : ')
            .listen()
            .onChange(() => this.updateGeometry());
        folderBeetle.add(this.guiControls, 'phiStart', 0, Math.PI * 2, 0.01)
            .name('phiStart: ')
            .listen()
            .onChange(() => this.updateGeometry());
        folderBeetle.add(this.guiControls, 'phiEnd', 0, Math.PI * 2, 0.01)
            .name('phiEnd: ')
            .listen()
            .onChange(() => this.updateGeometry());
    }

    updateGeometry() {
        this.beetleRev.geometry.dispose();
        this.beetleRev.geometry = new THREE.LatheGeometry(this.bshape.getShapePoints(),
            this.guiControls.resolution, this.guiControls.phiStart, this.guiControls.phiEnd);
    }

    update() {}
}

export {BeetleRev};