import * as THREE from '../../../libs/three.module.js'

class Torus extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);

        let torusGeometry = new THREE.TorusGeometry(1,0.1,20,20);
        let torusMaterial = new THREE.MeshNormalMaterial();

        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.add (this.torus);
    }
    createGUI (gui,titleGui) {
        this.guiControls = {
            radius : 1,
            tube: 0.1,
            radialSegments : 20,
            tubularSegments : 20,
            arc: Math.PI * 2,

            reset : () => {
                this.guiControls.radius  = 2;
                this.guiControls.tube = 0.1;
                this.guiControls.radialSegments  = 20;
                this.guiControls.tubularSegments  = 20;
                this.guiControls.arc = Math.PI * 2;
            }
        }

        let folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.01).name ('radius : ').listen();
        folder.add (this.guiControls, 'tube', 0.1, 3, 0.001).name ('tube : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'radialSegments', 2, 30, 1).name ('radialSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'tubularSegments', 3, 30, 1).name ('tubularSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'arc', 0.1, Math.PI*2, 0.01).name ('arc : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    updateGeometry() {
        this.torus.geometry.dispose();
        this.torus.geometry = new THREE.TorusGeometry (1,this.guiControls.tube,
                this.guiControls.radialSegments, this.guiControls.tubularSegments, this.guiControls.arc);
    }

    update(){
        this.scale.set(this.guiControls.radius,this.guiControls.radius,this.guiControls.radius);
    }

}

export {Torus};