import * as THREE from '../../../libs/three.module.js'

class Dodecahedron extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI (gui,titleGui);

        // El detail es un atributo que si está a 0 que es el default
        // es un dodecahedro, pero luego deja de serlo.

        // Definimos geometría y material
        let dodGeometry = new THREE.DodecahedronGeometry (1,0);
        let dodMate = new THREE.MeshNormalMaterial ();

        // Añadimos a la clase y la escena
        this.dodecahedron = new THREE.Mesh(dodGeometry,dodMate);
        this.add (this.dodecahedron);
    }


    createGUI (gui,titleGui) {
        this.guiControls = {
            radius : 1,
            detail : 0,

            reset : () => {
                this.guiControls.radius = 1;
                this.detail = 0;
            }
        }

        let folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'radius', 0.3, 5.0, 0.01).name('radius : ').listen();
        folder.add(this.guiControls, 'detail', 0, 5, 1).name('detail : ').listen().onChange(() => this.updateGeometry());
        folder.add(this.guiControls, 'reset').name ('[ Reset ]');
    }

    updateGeometry() {
        this.dodecahedron.geometry.dispose();
        this.dodecahedron.geometry = new THREE.DodecahedronGeometry (1,this.guiControls.detail);
    }

    update () {
        this.scale.set(this.guiControls.radius, this.guiControls.radius, this.guiControls.radius);
    }

}

export {Dodecahedron};