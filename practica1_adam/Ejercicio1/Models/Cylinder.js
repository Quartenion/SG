import * as THREE from '../../../libs/three.module.js'

class Cylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui,titleGui);

        // Se podría descartar y generar otra geometría en el update para cambiar de manera individual los modelos
        let cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,30,10);
        let cylinderMat = new THREE.MeshNormalMaterial();

        // Montamos el Mesh
        this.cylinder = new THREE.Mesh(cylinderGeometry,cylinderMat);
        this.add (this.cylinder);
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          radiusTop : 0.5,
          radiusBottom: 0.5,
          height : 1.0,
          radialSegments : 30,
          hightSegments : 10,

          reset : () => {
            this.guiControls.radiusTop = 0.5;
            this.guiControls.radiusBottom = 0.5;
            this.guiControls.height = 1.0;
            this.guiControls.radialSegments = 30;
            this.guiControls.hightSegments = 10;
          }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radiusTop', 0.1, 5.0, 0.01).name ('radiusTop : ').listen();
        folder.add (this.guiControls, 'radiusBottom', 0.1, 5.0, 0.01).name ('radiusBottom : ').listen();
        folder.add (this.guiControls, 'height', 0.1, 5.0, 0.01).name ('height : ').listen();
        folder.add (this.guiControls, 'radialSegments', 3, 40, 1).name ('radialSegments : ').listen();
        folder.add (this.guiControls, 'hightSegments', 1, 20, 1).name ('hightSegments : ').listen();
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    update () {
        this.cylinder.geometry.dispose();
        this.cylinder.geometry = new THREE.CylinderGeometry (this.guiControls.radiusTop,this.guiControls.radiusBottom,this.guiControls.height,
                                                           this.guiControls.radialSegments, this.guiControls.heightSegments);
    }
}

export {Cylinder};