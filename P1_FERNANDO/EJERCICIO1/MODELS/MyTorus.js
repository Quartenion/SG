import * as THREE from '../../../libs/three.module.js';

class MyTorus extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear el toroide y añadirlo a la escena
    var torus = this.createTorus(this.guiControls.resolution);
    this.add(torus);
    this.torus = torus;
  }

  createTorus(resolution) {
    // Crear geometría del toroide con el radio y resolución definidos
    var torusGeom = new THREE.TorusGeometry(this.guiControls.radius, this.guiControls.tube, resolution, resolution); 
    // Crear material con sombreado plano
    var torusMat = new THREE.MeshNormalMaterial({
      flatShading: this.guiControls.flatShading  // Aplica flatShading al material desde el principio
    });
    return new THREE.Mesh(torusGeom, torusMat);
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      radius: 1.0,  // Radio del toroide (radio externo)
      tube: 0.4,    // Radio del tubo del toroide

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      resolution: 16,  // Resolución del toroide

      flatShading: true, // Por defecto, el sombreado plano está activado

      reset: () => {
        this.guiControls.radius = 1.0;
        this.guiControls.tube = 0.4;
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

        this.guiControls.resolution = 16;

        this.updateTorus();  // Actualizar el toroide al restablecer
      },

      hide: () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (el toroide)
      }
    };

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio del toroide : ').listen();
    folder.add(this.guiControls, 'tube', 0.1, 2.0, 0.1).name('Radio del tubo : ').listen();
    folder.add(this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name('Rotación Z : ').listen();

    folder.add(this.guiControls, 'resolution', 3, 50, 1).name('Resolución : ').listen().onChange(() => this.updateTorus());
    
    folder.add(this.guiControls, 'flatShading').listen().onChange(() => this.updateShading());
    folder.add(this.guiControls, 'reset').name('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]'); // Botón para alternar visibilidad
  }

  updateTorus() {
    // Eliminar el toroide actual
    this.remove(this.torus); 
    // Crear un nuevo toroide con el sombreado plano actualizado
    this.torus = this.createTorus(this.guiControls.resolution);
    // Agregar el nuevo toroide a la escena
    this.add(this.torus); 
  }

  updateShading() {
    // Actualizar el sombreado plano en el material
    this.torus.material.flatShading = this.guiControls.flatShading;
    this.torus.material.needsUpdate = true; // Marcar el material como necesitado de actualización
  }
  
  update() {
    // Aplicar las rotaciones al toroide
    this.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
    // Ajustar la escala del toroide según el radio
    this.scale.set(this.guiControls.radius, this.guiControls.radius, this.guiControls.radius); 
  }
}

export { MyTorus };
