import * as THREE from '../../../libs/three.module.js'

class Sphere extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI (gui,titleGui);

        let sphereGeometry = new THREE.SphereGeometry(1,20,20);
        let sphereMaterial = new THREE.MeshNormalMaterial();

        this.sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        this.add (this.sphere);
    }

    createGUI (gui,titleGui) {
        this.guiControls = {
            radius : 1,
            radialSegments : 20,
            heightSegments : 20,
            phiStart : 0,
            phiLength : Math.PI * 2,
            thetaStart : 0,
            thetaLength : Math.PI * 2,

            reset : () => {
                this.guiControls.radius  = 1;
                this.guiControls.radialSegments  = 20;
                this.guiControls.heightSegments  = 20;
                this.guiControls.phiStart   = 0;
                this.guiControls.phiLength  = Math.PI * 2;
                this.guiControls.thetaStart   = 0;
                this.guiControls.thetaLength  = Math.PI * 2;
            }
        }

        let folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.01).name ('radius : ').listen();
        folder.add (this.guiControls, 'radialSegments', 3, 30, 1).name ('radialSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'heightSegments', 1, 30, 1).name ('heightSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'phiStart', 0.1, Math.PI*2, 0.01).name ('phiStart : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'phiLength', 0.1, Math.PI*2, 0.01).name ('phiLength : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'thetaStart',0.1, Math.PI*2, 0.01).name ('thetaStart : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'thetaLength',0.1, Math.PI*2, 0.01).name ('thetaLength : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    updateGeometry() {
        this.sphere.geometry.dispose();
        this.sphere.geometry = new THREE.SphereGeometry (1,this.guiControls.radialSegments,
                this.guiControls.heightSegments, this.guiControls.phiStart, this.guiControls.phiLength,
                this.guiControls.thetaStart , this.guiControls.thetaLength,);
    }

    update(){
        this.scale.set(this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);
    }
}

export {Sphere};