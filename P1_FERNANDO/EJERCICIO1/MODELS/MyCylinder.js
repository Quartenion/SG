import * as THREE from '../../../libs/three.module.js'

class MyCylinder extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear el cilindro y añadirlo a la escena
    var cylinder = this.createCylinder(this.guiControls.resolution);
    this.add(cylinder);
    this.cylinder = cylinder;
  }

  createCylinder(resolution) {
    var cylinderGeom = new THREE.CylinderGeometry(1, 1, 2, resolution); // Radio superior e inferior: 1, altura: 2
    var cylinderMat = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(cylinderGeom, cylinderMat);
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      height: 2.0, // Ajustar la altura del cilindro
      radius: 1.0, // Ajustar el radio del cilindro

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      resolution: 8, // Resolución inicial para el cilindro

      flatShading : true,
      
      reset: () => {
        this.guiControls.height = 2.0;
        this.guiControls.radius = 1.0;

        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

        this.guiControls.resolution = 8;

        this.updateCylinder();
      },

      hide : () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (el cilindro)
      }
    } 
    
    var folder = gui.addFolder(titleGui);
    folder.add (this.guiControls, 'height', 0.1, 5.0, 0.1).name ('Height : ').listen();
    folder.add (this.guiControls, 'radius', 0.1, 2.0, 0.1).name ('Radius : ').listen();
    
    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name ('Rotation X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name ('Rotation Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name ('Rotation Z : ').listen();

    folder.add(this.guiControls, 'resolution', 3, 50, 1).name('Resolution : ').listen().onChange(() => this.updateCylinder());
    
    folder.add (this.guiControls, 'flatShading').listen().onChange(() => this.updateShading());
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Show/Hide ]'); // Botón para alternar visibilidad
  }

  updateCylinder() {
    this.remove(this.cylinder); // Eliminar el cilindro actual
    this.cylinder = this.createCylinder(this.guiControls.resolution);
    this.add(this.cylinder); // Agregar el nuevo cilindro
  }

  updateShading () {
    this.cylinder.material.flatShading = this.guiControls.flatShading;
    this.cylinder.material.needsUpdate  = true;
  }
  
  update() {
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.radius,this.guiControls.height,this.guiControls.radius);
  }
}

export { MyCylinder };
