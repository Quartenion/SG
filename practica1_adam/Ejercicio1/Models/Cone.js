import * as THREE from '../../../libs/three.module.js'


class Cone extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui,titleGui);
        // Por defecto los otros atributos son 1,false,0,2*Math.PI -> segmentos altura, abierto por abajo, inicio, final
        let coneGeometry = new THREE.ConeGeometry(0.5,1,5,1);
        let coneMat= new THREE.MeshNormalMaterial();

        // Montamos el mesh
        this.cone = new THREE.Mesh(coneGeometry, coneMat);
        this.add (this.cone);
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          radius : 0.5,
          height : 1.0,
          flatShading : false,
          radialSegments : 5,
          heightSegments : 1,

          reset : () => {
            this.guiControls.radius = 0.5;
            this.guiControls.height = 1.0;
            this.flatShading = false;
            this.guiControls.radialSegments = 5;
            this.guiControls.heightSegments = 1;
          }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radius', 0.1, 5.0, 0.01).name ('radius : ').listen();
        folder.add (this.guiControls, 'height', 0.1, 5.0, 0.01).name ('height : ').listen();
        folder.add (this.guiControls, 'flatShading').listen().onChange(() => this.updateShading());
        folder.add (this.guiControls, 'radialSegments', 3, 20, 1).name ('radialSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'heightSegments', 1, 20, 1).name ('heightSegments : ').listen().onChange(() => this.updateGeometry());

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    updateGeometry (){
        this.cone.geometry.dispose();
        this.cone.geometry = new THREE.ConeGeometry(0.5,1,this.guiControls.radialSegments, this.guiControls.heightSegments);
    }

    updateShading () {
        this.cone.material.flatShading = this.guiControls.flatShading;
        this.cone.material.needsUpdate  = true;
    }

    update () {
        this.scale.set (this.guiControls.radius,this.guiControls.height,this.guiControls.radius);
    }

}

export {Cone}
