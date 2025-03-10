import * as THREE from '../../../libs/three.module.js';

class MySphere extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear la esfera y añadirla a la escena
    var sphere = this.createSphere(this.guiControls.resolution);
    this.add(sphere);
    this.sphere = sphere;
  }

  createSphere(resolution) {
    // Crear geometría de la esfera con el radio y resolución definidos
    var sphereGeom = new THREE.SphereGeometry(this.guiControls.radius, resolution, resolution); 
    // Crear material con sombreado plano
    var sphereMat = new THREE.MeshNormalMaterial({
      flatShading: this.guiControls.flatShading  // Aplica flatShading al material desde el principio
    });
    return new THREE.Mesh(sphereGeom, sphereMat);
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      radius: 0.8,  // Radio de la esfera

      rotX: 0.0,
      rotY: 0.0,
      rotZ: 0.0,

      resolution: 16,  // Resolución de la esfera

      flatShading: true, // Por defecto, el sombreado plano está activado

      reset: () => {
        this.guiControls.radius = 1.0;
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

        this.guiControls.resolution = 16;
        this.guiControls.flatShading = true;

        this.updateShading();
        this.updateSphere();  // Actualizar la esfera al restablecer
      },

      hide: () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (la esfera)
      }
    };

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'radius', 0.1, 1.0, 0.1).name('Radio : ').listen();
    folder.add(this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name('Rotación Z : ').listen();

    folder.add(this.guiControls, 'resolution', 3, 50, 1).name('Resolución : ').listen().onChange(() => this.updateSphere());
    
    folder.add(this.guiControls, 'flatShading').listen().onChange(() => this.updateShading());
    folder.add(this.guiControls, 'reset').name('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]'); // Botón para alternar visibilidad
  }

  updateSphere() {
    // Eliminar la esfera actual
    this.remove(this.sphere); 
    // Crear una nueva esfera con el sombreado plano actualizado
    this.sphere = this.createSphere(this.guiControls.resolution);
    // Agregar la nueva esfera a la escena
    this.add(this.sphere); 
  }

  updateShading() {
    // Actualizar el sombreado plano en el material
    this.sphere.material.flatShading = this.guiControls.flatShading;
    this.sphere.material.needsUpdate = true; // Marcar el material como necesitado de actualización
  }
  
  update() {
    // Aplicar las rotaciones a la esfera
    this.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
    // Ajustar la escala de la esfera según el radio
    this.scale.set(this.guiControls.radius, this.guiControls.radius, this.guiControls.radius); 
  }
}

export { MySphere };
