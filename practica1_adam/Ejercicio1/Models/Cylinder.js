import * as THREE from '../../../libs/three.module.js'

class Cylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui,titleGui);

        // Definimos geometría y material del cilindro
        let cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,30,10);
        let cylinderMat = new THREE.MeshNormalMaterial();

        // Definimos geometría y material de la rejilla del cilindro
        let edgesCylinderGeometry = new THREE.WireframeGeometry(cylinderGeometry);
        let edgesCylinderMat = new THREE.LineBasicMaterial({color:0x000000});

        // Añadimos a la clase y la escena tanto la rejilla como el cilindro
        this.lines = new THREE.LineSegments(edgesCylinderGeometry, edgesCylinderMat);
        this.add(this.lines);
        this.cylinder = new THREE.Mesh(cylinderGeometry,cylinderMat);
        this.add (this.cylinder);

        this.lines.visible = false;
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
          radiusTop : 0.5,
          radiusBottom: 0.5,
          height : 1.0,
          radialSegments : 30,
          heightSegments : 10,
          grid : false,

          reset : () => {
            this.guiControls.radiusTop = 0.5;
            this.guiControls.radiusBottom = 0.5;
            this.guiControls.height = 1.0;
            this.guiControls.radialSegments = 30;
            this.guiControls.heightSegments = 10;
            this.guiControls.grid  = false;
            this.updateGeometry();
            this.lines.visible = false;
          }
        }

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);

        folder.add (this.guiControls, 'radiusTop', 0.1, 5.0, 0.01).name ('radiusTop : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'radiusBottom', 0.1, 5.0, 0.01).name ('radiusBottom : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'height', 0.1, 5.0, 0.01).name ('height : ').listen();
        folder.add (this.guiControls, 'radialSegments', 3, 40, 1).name ('radialSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'heightSegments', 1, 20, 1).name ('hightSegments : ').listen().onChange(() => this.updateGeometry());
        folder.add (this.guiControls, 'grid').name ('grid').listen().onChange((value) => {this.lines.visible = value});
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    updateGeometry () {
        this.cylinder.geometry.dispose();
        this.cylinder.geometry = new THREE.CylinderGeometry (this.guiControls.radiusTop,this.guiControls.radiusBottom,1,
                                                           this.guiControls.radialSegments, this.guiControls.heightSegments);
        this.lines.geometry.dispose();
        this.lines.geometry = new THREE.WireframeGeometry(this.cylinder.geometry)
    }

    update () {
        this.scale.set (1,this.guiControls.height,1);
    }
}

export {Cylinder};