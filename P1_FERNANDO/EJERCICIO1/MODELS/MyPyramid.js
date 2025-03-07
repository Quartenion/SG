import * as THREE from '../../../libs/three.module.js'
 
class MyPyramid extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear la pirámide y añadirla a la escena
    var pyramid = this.createPyramid(this.guiControls.resolution);
    this.add(pyramid);
    this.pyramid = pyramid;
  }

  createPyramid(resolution) {
    var pyramidGeom = new THREE.ConeGeometry(1, 1, resolution); // Tamaño base: radio = 1, altura = 2
    var pyramidMat = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(pyramidGeom, pyramidMat);
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      height: 1.0,
      radius : 1.0,

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      resolution: 3,

      flatShading : true,
      
      reset: () => {
        this.guiControls.height = 1.0;
        this.guiControls.radius = 1.0;

        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

        this.guiControls.resolution = 3;

        this.updatePyramid();
      },

      hide : () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (la caja)
      }
    } 
    
    var folder = gui.addFolder(titleGui);
    folder.add (this.guiControls, 'height', 0.1, 2.0, 0.1).name ('height : ').listen();
    folder.add (this.guiControls, 'radius', 0.1, 2.0, 0.1).name ('radius : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();

    folder.add(this.guiControls, 'resolution', 3, 50, 1).name('Resolución : ').listen().onChange(() => this.updatePyramid());
    
    folder.add (this.guiControls, 'flatShading').listen().onChange(() => this.updateShading());
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]'); // Botón para alternar visibilidad
  }

  updatePyramid() {
    this.remove(this.pyramid); // Eliminar la pirámide actual
    this.pyramid = this.createPyramid(this.guiControls.resolution);
    this.add(this.pyramid); // Agregar la nueva pirámide
  }

  updateShading () {
    this.pyramid.material.flatShading = this.guiControls.flatShading;
    this.pyramid.material.needsUpdate  = true;
  }
  
  update() {
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.radius,this.guiControls.height,this.guiControls.radius);
  }
}

export { MyPyramid };