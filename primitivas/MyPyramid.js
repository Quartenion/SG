import * as THREE from '../libs/three.module.js'
 
class MyPyramid extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear la pirámide y añadirla a la escena
    var pyramid = this.createPyramid(this.guiControls.resolution);
    this.add(pyramid);
    this.pyramid = pyramid;

    pyramid.position.y = 0.5;    
  }

  createPyramid(resolution) {
    var pyramidGeom = new THREE.ConeGeometry(1, 1, resolution); // Tamaño base: radio = 1, altura = 2
    var pyramidMat = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(pyramidGeom, pyramidMat);
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      sizeX: 1.0,
      sizeY: 1.0,
      sizeZ: 1.0,

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,

      resolution: 3,
      
      reset: () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;

        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

        this.guiControls.resolution = 3;

        this.updatePyramid();
      },

      hide : () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (la caja)
      }
    } 
    
    var folder = gui.addFolder(titleGui);
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotación Z : ').listen();
    
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.01).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.01).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.01).name ('Posición Z : ').listen();

    folder.add(this.guiControls, 'resolution', 3, 10, 1).name('Resolución : ').listen().onChange(() => this.updatePyramid());
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]'); // Botón para alternar visibilidad
  }

  updatePyramid() {
    this.remove(this.pyramid); // Eliminar la pirámide actual
    this.pyramid = this.createPyramid(this.guiControls.resolution);
    this.add(this.pyramid); // Agregar la nueva pirámide
    this.pyramid.position.y = 0.5;
  }
  
  update() {
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyPyramid };
